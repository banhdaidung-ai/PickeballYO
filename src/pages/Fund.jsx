import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAllUsers } from '../services/authService';
import {
  getContributions,
  getTransactions,
  togglePaid,
  addContribution,
  updateContribution,
  deleteContribution,
  seedContributionsFromUsers,
  deleteTransaction
} from '../services/fundService';

const VND = (n) => new Intl.NumberFormat('vi-VN').format(n) + 'đ';

// ─── Modal: Member Management ────────────────────────────────────────────────
const MemberModal = ({ member, onClose, onSave }) => {
  const [fullName, setFullName] = useState(member?.fullName || '');
  const [phone, setPhone] = useState(member?.phone || '');
  const [amount, setAmount] = useState(member?.amount || 500000);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!fullName.trim()) { alert('Vui lòng nhập tên'); return; }
    setSaving(true);
    try {
      await onSave(member?.id, { fullName, phone, amount: parseInt(amount) });
      onClose();
    } catch (e) {
      alert('Lỗi: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[2rem] p-7 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-black text-xl text-[#1C1B1F]">
            {member ? 'Sửa thành viên' : 'Thêm thành viên quỹ'}
          </h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F2F0ED] text-[#8C7A6B]">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest block mb-1">Tên đầy đủ</label>
            <input value={fullName} onChange={e => setFullName(e.target.value)} className="w-full px-4 py-3 bg-[#F2F0ED] rounded-xl font-medium text-sm outline-none" />
          </div>
          <div>
            <label className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest block mb-1">Số điện thoại</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 bg-[#F2F0ED] rounded-xl font-medium text-sm outline-none" />
          </div>
          <div>
            <label className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest block mb-1">Số tiền quỹ (VND)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-4 py-3 bg-[#F2F0ED] rounded-xl font-medium text-sm outline-none" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-3 bg-[#F2F0ED] text-[#8C7A6B] rounded-xl font-bold text-sm">Hủy</button>
          <button onClick={handleSave} disabled={saving} className="flex-1 py-3 bg-gradient-to-r from-[#FF7A00] to-[#C35A00] text-white rounded-xl font-bold text-sm disabled:opacity-60">
            {saving ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Modal: Transaction Detail ──────────────────────────────────────────────
const TransactionDetailModal = ({ transaction, onClose, onDelete, onEdit }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[2rem] p-7 shadow-2xl space-y-5 overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-black text-xl text-[#1C1B1F]">Chi tiết giao dịch</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F2F0ED] text-[#8C7A6B]">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest">Loại</p>
              <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                {transaction.type === 'income' ? 'Thu tiền' : 'Chi tiền'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest">Ngày</p>
              <p className="font-bold">{transaction.date || new Date(transaction.createdAt).toLocaleDateString('vi-VN')}</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest">Danh mục & Mô tả</p>
            <p className="font-bold text-lg text-[#1C1B1F]">{transaction.description}</p>
          </div>

          <div>
            <p className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest">Số tiền</p>
            <p className={`text-2xl font-black font-headline ${transaction.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
              {transaction.type === 'income' ? '+' : '-'}{VND(transaction.amount)}
            </p>
          </div>

          {transaction.notes && (
            <div>
              <p className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest">Ghi chú</p>
              <p className="text-sm text-[#1C1B1F] bg-[#FDFBF9] p-3 rounded-xl border border-[#F2F0ED]">{transaction.notes}</p>
            </div>
          )}

          {transaction.imagePreview && (
            <div>
              <p className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest mb-2">Hóa đơn / Chứng từ</p>
              <div className="rounded-2xl overflow-hidden border border-[#F2F0ED]">
                <img src={transaction.imagePreview} alt="Bill" className="w-full object-cover" />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <button onClick={() => { if(window.confirm('Xóa giao dịch này?')) { onDelete(transaction.id); onClose(); } }} className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 rounded-xl">
             <span className="material-symbols-outlined">delete</span>
          </button>
          <button onClick={() => onEdit(transaction.id)} className="w-12 h-12 flex items-center justify-center bg-[#FFF0E5] text-[#FF7A00] rounded-xl">
             <span className="material-symbols-outlined">edit</span>
          </button>
          <button onClick={onClose} className="flex-1 py-3 bg-gradient-to-r from-[#FF7A00] to-[#C35A00] text-white rounded-xl font-bold text-sm shadow">Đóng</button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const Fund = () => {
  const { userData } = useAuth();
  const isAdmin = userData?.role === 'admin';
  const navigate = useNavigate();

  const [contributions, setContributions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | paid | unpaid

  // Time filtering
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Bulk Selection
  const [selectedMemberIds, setSelectedMemberIds] = useState(new Set());
  const [selectedTxIds, setSelectedTxIds] = useState(new Set());

  // Modals
  const [editingMember, setEditingMember] = useState(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [showCalculationDetails, setShowCalculationDetails] = useState(false);

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

  const handleSaveMember = async (id, data) => {
    if (id) {
      await updateContribution(id, data);
      setContributions(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    } else {
      await addContribution(data);
      fetchAll();
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm('Xóa thành viên này khỏi danh sách quỹ?')) return;
    await deleteContribution(id);
    setContributions(prev => prev.filter(c => c.id !== id));
    setSelectedMemberIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleDeleteTx = async (id) => {
    await deleteTransaction(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
    setSelectedTxIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleBulkDeleteMembers = async () => {
    if (!window.confirm(`Xóa ${selectedMemberIds.size} thành viên đã chọn?`)) return;
    setLoading(true);
    try {
      await Promise.all(Array.from(selectedMemberIds).map(id => deleteContribution(id)));
      setContributions(prev => prev.filter(c => !selectedMemberIds.has(c.id)));
      setSelectedMemberIds(new Set());
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDeleteTransactions = async () => {
    if (!window.confirm(`Xóa ${selectedTxIds.size} giao dịch đã chọn?`)) return;
    setLoading(true);
    try {
      await Promise.all(Array.from(selectedTxIds).map(id => deleteTransaction(id)));
      setTransactions(prev => prev.filter(t => !selectedTxIds.has(t.id)));
      setSelectedTxIds(new Set());
    } finally {
      setLoading(false);
    }
  };

  const toggleMemberSelection = (id) => {
    setSelectedMemberIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleTxSelection = (id) => {
    setSelectedTxIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ── Stats Calculation ──
  const totalContributions = contributions.filter(c => c.paid).reduce((s, c) => s + (c.amount || 0), 0);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + (t.amount || 0), 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + (t.amount || 0), 0);
  const balance = totalContributions + totalIncome - totalExpense;

  const paidCount = contributions.filter(c => c.paid).length;
  const unpaidCount = contributions.filter(c => !c.paid).length;

  // Filter contributions by status
  const filteredContributions = contributions.filter(c => {
    if (filter === 'paid') return c.paid;
    if (filter === 'unpaid') return !c.paid;
    return true;
  });

  // Filter transactions by month/year
  const timeFilteredTransactions = transactions.filter(t => {
    const d = new Date(t.date || t.createdAt);
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
  });

  const monthlyIncome = timeFilteredTransactions.filter(t => t.type === 'income').reduce((s, t) => s + (t.amount || 0), 0);
  const monthlyExpense = timeFilteredTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + (t.amount || 0), 0);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-body"><div className="animate-spin rounded-full h-10 w-10 border-4 border-[#FF7A00] border-t-transparent"></div></div>;
  }

  return (
    <main className="pt-20 pb-32 px-4 sm:px-6 max-w-4xl mx-auto font-body bg-[#FDFBF9] min-h-screen">

      {/* Balance Hero Card */}
      <section className="mb-6">
        <div 
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="velocity-gradient rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl cursor-pointer active:scale-[0.98] transition-all"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-1">
              <p className="font-label text-[11px] uppercase tracking-[0.2em] opacity-80">Số dư hiện tại</p>
              <span className="material-symbols-outlined text-white/50 text-xl">info</span>
            </div>
            <h2 className="font-headline text-5xl font-black tracking-tight mb-4">{VND(balance)}</h2>
            
            <div className="flex gap-4">
              <div className="bg-white/15 px-3 py-2 rounded-2xl backdrop-blur-sm border border-white/10 flex-1">
                <p className="text-[9px] uppercase font-bold text-white/70 tracking-widest mb-0.5">Thu tháng này</p>
                <p className="font-headline font-bold text-sm">+{VND(monthlyIncome)}</p>
              </div>
              <div className="bg-white/15 px-3 py-2 rounded-2xl backdrop-blur-sm border border-white/10 flex-1">
                <p className="text-[9px] uppercase font-bold text-white/70 tracking-widest mb-0.5">Chi tháng này</p>
                <p className="font-headline font-bold text-sm">-{VND(monthlyExpense)}</p>
              </div>
            </div>
          </div>
        </div>

        {showCalculationDetails && (
          <div className="mt-4 bg-white rounded-3xl p-6 shadow-sm border border-[#F2F0ED] animate-fade-in">
            <h4 className="font-headline font-bold text-lg text-[#1C1B1F] mb-4">Chi tiết bảng tính</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-[#F2F0ED]">
                <span className="text-sm text-[#8C7A6B]">Quỹ thành viên (đã thu)</span>
                <span className="font-bold text-green-600">+{VND(totalContributions)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#F2F0ED]">
                <span className="text-sm text-[#8C7A6B]">Thu ngoài (tài trợ, phí sân...)</span>
                <span className="font-bold text-green-600">+{VND(totalIncome)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#F2F0ED]">
                <span className="text-sm text-[#8C7A6B]">Chi phí (thuê sân, bóng...)</span>
                <span className="font-bold text-red-500">-{VND(totalExpense)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-[#1C1B1F]">Kết quả cuối cùng</span>
                <span className="font-headline font-black text-xl text-[#FF7A00]">{VND(balance)}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* KPI Section */}
      <section className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#F2F0ED]">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
          </div>
          <p className="font-label text-[10px] font-bold text-[#8C7A6B] uppercase tracking-widest mb-1">Tổng thu</p>
          <p className="font-headline font-black text-2xl text-[#1C1B1F]">{VND(totalContributions + totalIncome)}</p>
        </div>
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#F2F0ED]">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
          </div>
          <p className="font-label text-[10px] font-bold text-[#8C7A6B] uppercase tracking-widest mb-1">Tổng chi</p>
          <p className="font-headline font-black text-2xl text-[#1C1B1F]">{VND(totalExpense)}</p>
        </div>
      </section>

      {/* Members Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
             <h3 className="font-headline font-bold text-2xl text-[#1C1B1F]">Thành viên</h3>
             <span className="bg-[#FFF0E5] text-[#FF7A00] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{contributions.length}</span>
          </div>
          {isAdmin && (
            <div className="flex gap-2">
               {selectedMemberIds.size > 0 && (
                 <button onClick={handleBulkDeleteMembers} className="h-9 px-4 flex items-center gap-1 bg-red-50 text-red-500 rounded-xl font-bold text-[10px] uppercase border border-red-100 animate-fade-in">
                    <span className="material-symbols-outlined text-sm">delete</span> Xóa ({selectedMemberIds.size})
                 </button>
               )}
               <button onClick={handleSeed} className="text-[10px] font-bold text-[#8C7A6B] h-9 px-3 rounded-xl border border-[#F2F0ED] hover:bg-white transition-colors">Đồng bộ</button>
               <button onClick={() => setShowAddMember(true)} className="h-9 w-9 flex items-center justify-center bg-gradient-to-r from-[#FF7A00] to-[#C35A00] text-white rounded-xl shadow-md active:scale-90 transition">
                 <span className="material-symbols-outlined text-xl">add</span>
               </button>
            </div>
          )}
        </div>

        <div className="flex gap-2 bg-[#F2F0ED] p-1 rounded-2xl mb-4">
          {[['all', 'Tất cả'], ['paid', `Đã đóng (${paidCount})`], ['unpaid', `Chưa đóng (${unpaidCount})`]].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`flex-1 py-2.5 text-[11px] font-bold rounded-xl transition-all ${filter === val ? 'bg-white text-[#FF7A00] shadow-sm' : 'text-[#8C7A6B]'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredContributions.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-3xl border-2 border-dashed border-[#F2F0ED]">
              <p className="text-[#8C7A6B] font-medium text-sm">Chưa có dữ liệu thành viên.</p>
            </div>
          ) : filteredContributions.map(c => (
            <div key={c.id} className={`bg-white rounded-3xl p-4 flex items-center gap-3 shadow-sm border transition-all ${selectedMemberIds.has(c.id) ? 'border-[#FF7A00] bg-orange-50/30' : 'border-[#F2F0ED] hover:border-orange-100'} group`}>
              {isAdmin && (
                <button onClick={() => toggleMemberSelection(c.id)} className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selectedMemberIds.has(c.id) ? 'bg-[#FF7A00] border-[#FF7A00]' : 'border-slate-300 bg-white'}`}>
                  {selectedMemberIds.has(c.id) && <span className="material-symbols-outlined text-white text-[14px] font-bold">check</span>}
                </button>
              )}
              <div className="w-12 h-12 rounded-2xl bg-[#F2F0ED] overflow-hidden flex items-center justify-center flex-shrink-0">
                {c.photoURL ? <img src={c.photoURL} alt="" className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-[#8C7A6B] text-2xl">person</span>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#1C1B1F] truncate text-sm">{c.fullName}</p>
                <div className="flex items-center gap-2">
                   <p className={`text-[10px] font-black uppercase tracking-widest ${c.paid ? 'text-green-600' : 'text-[#FF7A00]'}`}>
                    {c.paid ? 'Đã đóng' : 'Chưa đóng'}
                  </p>
                  <span className="text-[#E6E0D8] text-xs">•</span>
                  <p className="text-[11px] text-[#8C7A6B] truncate">{VND(c.amount || 500000)}</p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {isAdmin && (
                  <>
                    <button onClick={() => setEditingMember(c)} className="w-8 h-8 rounded-lg bg-[#FFF0E5] text-[#FF7A00] flex items-center justify-center translate-x-2 group-hover:translate-x-0 transition-transform">
                       <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button onClick={() => handleDeleteMember(c.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center translate-x-2 group-hover:translate-x-0 transition-transform">
                       <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </>
                )}
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
      <section className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
             <h3 className="font-headline font-bold text-2xl text-[#1C1B1F]">Lịch sử giao dịch</h3>
             {isAdmin && selectedTxIds.size > 0 && (
               <button onClick={handleBulkDeleteTransactions} className="h-8 px-3 flex items-center gap-1 bg-red-50 text-red-500 rounded-[12px] font-bold text-[9px] uppercase border border-red-100 animate-fade-in">
                  <span className="material-symbols-outlined text-xs">delete</span> Xóa ({selectedTxIds.size})
               </button>
             )}
          </div>
          
          <div className="flex items-center gap-2 bg-[#F2F0ED] p-1 rounded-[20px]">
            <select 
              value={selectedMonth} 
              onChange={e => setSelectedMonth(parseInt(e.target.value))}
              className="bg-transparent font-bold text-xs text-[#1C1B1F] outline-none px-3 py-1.5 focus:bg-white rounded-2xl transition-all"
            >
              {Array.from({length: 12}, (_, i) => (
                <option key={i} value={i}>Tháng {i + 1}</option>
              ))}
            </select>
            <select 
              value={selectedYear} 
              onChange={e => setSelectedYear(parseInt(e.target.value))}
              className="bg-transparent font-bold text-xs text-[#1C1B1F] outline-none px-3 py-1.5 focus:bg-white rounded-2xl transition-all"
            >
              {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {timeFilteredTransactions.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-[#F2F0ED]">
              <span className="material-symbols-outlined text-4xl text-[#E6E0D8] mb-2 block">receipt_long</span>
              <p className="text-[#8C7A6B] font-medium text-sm">Không tìm thấy giao dịch nào.</p>
            </div>
          ) : timeFilteredTransactions.map(tx => (
            <div 
              key={tx.id} 
              className={`bg-white rounded-3xl p-4 flex items-center gap-3 shadow-sm border transition-all ${selectedTxIds.has(tx.id) ? 'border-[#FF7A00] bg-orange-50/30' : 'border-[#F2F0ED] hover:border-orange-100'} cursor-pointer`}
              onClick={(e) => {
                if (isAdmin && e.target.closest('.checkbox-zone')) return;
                setSelectedTx(tx);
              }}
            >
              {isAdmin && (
                <div onClick={(e) => { e.stopPropagation(); toggleTxSelection(tx.id); }} className="checkbox-zone w-6 h-10 flex items-center">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selectedTxIds.has(tx.id) ? 'bg-[#FF7A00] border-[#FF7A00]' : 'border-slate-300 bg-white'}`}>
                    {selectedTxIds.has(tx.id) && <span className="material-symbols-outlined text-white text-[14px] font-bold">check</span>}
                  </div>
                </div>
              )}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${tx.type === 'income' ? 'bg-green-50' : 'bg-red-50'}`}>
                <span className={`material-symbols-outlined text-[20px] ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                  {tx.type === 'income' ? 'payments' : 'shopping_bag'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#1C1B1F] text-sm truncate">{tx.description}</p>
                <p className="text-[10px] text-[#8C7A6B] font-medium">{tx.date || new Date(tx.createdAt).toLocaleDateString('vi-VN')}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`font-headline font-black text-base ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                  {tx.type === 'income' ? '+' : '-'}{VND(tx.amount)}
                </p>
                 {tx.imagePreview && (
                   <span className="material-symbols-outlined text-[14px] text-[#FF7A00]">image</span>
                 )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {isAdmin && (
        <button
          onClick={() => navigate('/fund/add')}
          className="fixed bottom-28 right-5 w-14 h-14 bg-gradient-to-br from-[#FF7A00] to-[#C35A00] rounded-full flex items-center justify-center shadow-xl shadow-orange-900/30 z-40 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-white text-3xl font-thin">add</span>
        </button>
      )}

      {(showAddMember || editingMember) && (
        <MemberModal 
          member={editingMember} 
          onClose={() => { setShowAddMember(false); setEditingMember(null); }}
          onSave={handleSaveMember}
        />
      )}

      {selectedTx && (
        <TransactionDetailModal 
          transaction={selectedTx} 
          onClose={() => setSelectedTx(null)}
          onDelete={handleDeleteTx}
          onEdit={(id) => navigate(`/fund/edit/${id}`)}
        />
      )}
    </main>
  );
};

export default Fund;
