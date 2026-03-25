import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAllUsers } from '../services/authService';
import {
  getContributions,
  getTransactions,
  togglePaid,
  addTransaction,
  addContribution,
  seedContributionsFromUsers
} from '../services/fundService';

const VND = (n) => new Intl.NumberFormat('vi-VN').format(n) + 'đ';

const Fund = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [contributions, setContributions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchAll = async () => {
    try {
      const [c, t] = await Promise.all([getContributions(), getTransactions()]);
      setContributions(c);
      setTransactions(t);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Seed contributions from users if empty
  const handleSeed = async () => {
    const users = await getAllUsers();
    await seedContributionsFromUsers(users);
    await fetchAll();
    alert('✅ Đã đồng bộ danh sách thành viên vào Quỹ!');
  };

  const handleTogglePaid = async (id, current) => {
    await togglePaid(id, current);
    setContributions(prev => prev.map(c => c.id === id ? { ...c, paid: !current } : c));
  };

  // Stats
  const totalContributions = contributions.filter(c => c.paid).reduce((s, c) => s + (c.amount || 0), 0);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + (t.amount || 0), 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + (t.amount || 0), 0);
  const balance = totalContributions + totalIncome - totalExpense;

  const paidCount = contributions.filter(c => c.paid).length;
  const unpaidCount = contributions.filter(c => !c.paid).length;

  const filteredContributions = contributions.filter(c => {
    if (filter === 'paid') return c.paid;
    if (filter === 'unpaid') return !c.paid;
    return true;
  });

  const currentMonthIncome = transactions
    .filter(t => {
      const d = new Date(t.createdAt);
      const now = new Date();
      return t.type === 'income' && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((s, t) => s + (t.amount || 0), 0);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-4 border-[#FF7A00] border-t-transparent"></div></div>;
  }

  return (
    <main className="pt-20 pb-32 px-4 sm:px-6 max-w-4xl mx-auto font-body bg-[#FDFBF9] min-h-screen">

      {/* Balance Hero Card */}
      <section className="mb-6">
        <div className="velocity-gradient rounded-[2rem] p-6 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="relative z-10">
            <p className="font-label text-[11px] uppercase tracking-[0.2em] opacity-80 mb-1">Số dư tổng cộng</p>
            <h2 className="font-headline text-4xl font-black tracking-tight mb-3">{VND(balance)}</h2>
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
              <span className="font-label text-[11px] font-bold">+{VND(currentMonthIncome)} tháng này</span>
            </div>
          </div>
        </div>
      </section>

      {/* Income / Expense KPI */}
      <section className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F2F0ED]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            <span className="font-label text-[10px] font-bold text-[#8C7A6B] uppercase tracking-widest">Tổng thu</span>
          </div>
          <p className="font-headline font-black text-2xl text-[#1C1B1F]">{new Intl.NumberFormat('vi-VN').format(totalContributions + totalIncome / 1000)}k</p>
          <div className="flex gap-1 mt-3 items-end h-8">
            {[30, 50, 80, 60, 100, 70, 90].map((h, i) => (
              <div key={i} className={`flex-1 rounded-t-sm ${i === 4 ? 'bg-green-500' : 'bg-green-200'}`} style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F2F0ED]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="font-label text-[10px] font-bold text-[#8C7A6B] uppercase tracking-widest">Tổng chi</span>
          </div>
          <p className="font-headline font-black text-2xl text-[#1C1B1F]">{new Intl.NumberFormat('vi-VN').format(totalExpense / 1000)}k</p>
          <div className="flex gap-1 mt-3 items-end h-8">
            {[20, 40, 30, 70, 50, 60, 45].map((h, i) => (
              <div key={i} className={`flex-1 rounded-t-sm ${i === 3 ? 'bg-red-500' : 'bg-red-200'}`} style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-headline font-bold text-2xl text-[#1C1B1F]">Thành viên</h3>
          <div className="flex items-center gap-2">
            <span className="bg-[#FFF0E5] text-[#FF7A00] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{contributions.length} Thành viên</span>
            {contributions.length === 0 && (
              <button onClick={handleSeed} className="text-[10px] font-bold text-primary underline">Đồng bộ</button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 bg-[#F2F0ED] p-1 rounded-2xl mb-4">
          {[['all', 'Tất cả'], ['paid', `Đã đóng (${paidCount})`], ['unpaid', `Chưa đóng (${unpaidCount})`]].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`flex-1 py-2 text-[11px] font-bold rounded-xl transition-all ${filter === val ? 'bg-white text-[#FF7A00] shadow-sm' : 'text-[#8C7A6B]'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Member List */}
        <div className="space-y-3">
          {filteredContributions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-[#8C7A6B] font-medium text-sm mb-3">Chưa có dữ liệu đóng quỹ.</p>
              <button onClick={handleSeed} className="velocity-gradient text-white px-6 py-2.5 rounded-xl font-bold text-sm">
                Tự động đồng bộ từ danh sách thành viên
              </button>
            </div>
          ) : filteredContributions.map(c => (
            <div key={c.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-[#F2F0ED]">
              <div className="w-12 h-12 rounded-2xl bg-[#F2F0ED] overflow-hidden flex items-center justify-center flex-shrink-0">
                {c.photoURL ? (
                  <img src={c.photoURL} alt={c.fullName} className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-[#8C7A6B] text-2xl">person</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#1C1B1F] truncate">{c.fullName}</p>
                <p className="text-[11px] text-[#8C7A6B] font-medium">{c.phone || 'Chưa có SĐT'}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-headline font-black text-base text-[#1C1B1F]">{VND(c.amount || 500000)}</p>
                <p className={`text-[9px] font-black uppercase tracking-widest ${c.paid ? 'text-green-600' : 'text-[#FF7A00]'}`}>
                  {c.paid ? 'Đã đóng' : 'Chưa đóng'}
                </p>
              </div>
              <button
                onClick={() => handleTogglePaid(c.id, c.paid)}
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-90 ${c.paid ? 'bg-green-100 text-green-600' : 'bg-[#FFF0E5] text-[#FF7A00]'}`}
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {c.paid ? 'check_circle' : 'notifications'}
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Transactions Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-headline font-bold text-2xl text-[#1C1B1F]">Lịch sử giao dịch</h3>
        </div>

        <div className="space-y-3">
          {transactions.slice(0, 8).map(tx => (
            <div key={tx.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-[#F2F0ED]">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                <span className={`material-symbols-outlined text-[18px]` + (tx.type === 'income' ? ' text-green-600' : ' text-red-500')} style={{ fontVariationSettings: "'FILL' 1" }}>
                  {tx.type === 'income' ? 'payments' : 'shopping_bag'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#1C1B1F] text-sm truncate">{tx.description}</p>
                <p className="text-[10px] text-[#8C7A6B] font-medium">{new Date(tx.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
              </div>
              <p className={`font-headline font-black text-base flex-shrink-0 ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                {tx.type === 'income' ? '+' : '-'}{VND(tx.amount)}
              </p>
            </div>
          ))}
          {transactions.length === 0 && (
            <div className="text-center py-8 text-[#8C7A6B] text-sm font-medium">Chưa có giao dịch nào.</div>
          )}
        </div>
      </section>

      {/* Add Transaction FAB */}
      <button
        onClick={() => navigate('/fund/add')}
        className="fixed bottom-28 right-5 w-14 h-14 velocity-gradient rounded-full flex items-center justify-center shadow-xl shadow-orange-900/30 z-40 active:scale-90 transition-transform"
      >
        <span className="material-symbols-outlined text-white text-3xl font-thin">add</span>
      </button>

      {/* Add Transaction Modal */}
    </main>
  );
};

export default Fund;
