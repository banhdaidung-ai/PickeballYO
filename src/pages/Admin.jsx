import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAllUsers, updateUserRole, deleteUserDoc, updateUserProfile } from '../services/authService';
import { subscribeToSchedule, addSession, updateSession, deleteSession } from '../services/dataService';
import { getTransactions, deleteTransaction } from '../services/fundService';
import { resetAndSeed } from '../services/seedService';

const VND = (n) => new Intl.NumberFormat('vi-VN').format(n) + 'đ';

const DAYS = [
  { label: 'Chủ Nhật', value: 0 },
  { label: 'Thứ Hai', value: 1 },
  { label: 'Thứ Ba', value: 2 },
  { label: 'Thứ Tư', value: 3 },
  { label: 'Thứ Năm', value: 4 },
  { label: 'Thứ Sáu', value: 5 },
  { label: 'Thứ Bảy', value: 6 },
];

const emptySession = {
  courtName: '',
  locationUrl: '',
  dayIndex: 1,
  dayLabel: 'Thứ Hai',
  startTime: '08:00',
  timeRange: '08:00 - 10:00',
  type: 'Sân Pickleball',
  isLive: false,
};

// ─── User Edit Modal ──────────────────────────────────────────────────────────
const UserModal = ({ user: targetUser, onClose, onSave }) => {
  const [fullName, setFullName] = useState(targetUser.fullName || '');
  const [phone, setPhone] = useState(targetUser.phone || '');
  const [role, setRole] = useState(targetUser.role || 'member');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(targetUser.uid, { fullName, phone, role });
      onClose();
    } catch (e) {
      alert('Lỗi: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[2rem] p-7 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-black text-xl text-[#1C1B1F]">Chỉnh sửa thành viên</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F2F0ED] text-[#8C7A6B]">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Avatar + email */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F2F0ED] flex items-center justify-center overflow-hidden">
            {targetUser.photoURL
              ? <img src={targetUser.photoURL} alt="" className="w-full h-full object-cover" />
              : <span className="material-symbols-outlined text-[#8C7A6B] text-2xl">person</span>}
          </div>
          <div>
            <p className="text-xs text-[#8C7A6B] font-medium">{targetUser.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest block mb-1">Tên đầy đủ</label>
            <input
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-[#F2F0ED] rounded-xl font-medium text-sm text-[#1C1B1F] outline-none focus:ring-2 focus:ring-[#FF7A00]/30"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest block mb-1">Số điện thoại</label>
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-[#F2F0ED] rounded-xl font-medium text-sm text-[#1C1B1F] outline-none focus:ring-2 focus:ring-[#FF7A00]/30"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest block mb-1">Phân quyền</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full px-4 py-3 bg-[#F2F0ED] rounded-xl font-medium text-sm text-[#1C1B1F] outline-none"
            >
              <option value="member">Thành viên</option>
              <option value="admin">Quản trị viên (Admin)</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button onClick={onClose} className="flex-1 py-3 bg-[#F2F0ED] text-[#8C7A6B] rounded-xl font-bold text-sm">Hủy</button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-3 bg-gradient-to-r from-[#FF7A00] to-[#C35A00] text-white rounded-xl font-bold text-sm shadow disabled:opacity-60"
          >
            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Session Edit Modal ───────────────────────────────────────────────────────
const SessionModal = ({ session, onClose, onSave }) => {
  const [form, setForm] = useState(session || emptySession);
  const [saving, setSaving] = useState(false);

  const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

  const handleDayChange = (val) => {
    const day = DAYS.find(d => d.value === parseInt(val));
    set('dayIndex', parseInt(val));
    set('dayLabel', day?.label || '');
  };

  const handleSave = async () => {
    if (!form.courtName.trim()) { alert('Vui lòng nhập tên sân'); return; }
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (e) {
      alert('Lỗi: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-sm rounded-[2rem] p-7 shadow-2xl space-y-4 my-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-black text-xl text-[#1C1B1F]">
            {session ? 'Chỉnh sửa buổi tập' : 'Tạo buổi tập mới'}
          </h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F2F0ED] text-[#8C7A6B]">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest block mb-1">Tên sân</label>
            <input value={form.courtName} onChange={e => set('courtName', e.target.value)}
              placeholder="VD: Sân DIVO 1"
              className="w-full px-4 py-3 bg-[#F2F0ED] rounded-xl font-medium text-sm text-[#1C1B1F] outline-none focus:ring-2 focus:ring-[#FF7A00]/30" />
          </div>
          <div>
            <label className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest block mb-1">Ngày trong tuần</label>
            <select value={form.dayIndex} onChange={e => handleDayChange(e.target.value)}
              className="w-full px-4 py-3 bg-[#F2F0ED] rounded-xl font-medium text-sm text-[#1C1B1F] outline-none">
              {DAYS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest block mb-1">Giờ bắt đầu</label>
              <input type="time" value={form.startTime} onChange={e => set('startTime', e.target.value)}
                className="w-full px-4 py-3 bg-[#F2F0ED] rounded-xl font-medium text-sm text-[#1C1B1F] outline-none" />
            </div>
            <div>
              <label className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest block mb-1">Thời gian</label>
              <input value={form.timeRange} onChange={e => set('timeRange', e.target.value)}
                placeholder="08:00 - 10:00"
                className="w-full px-4 py-3 bg-[#F2F0ED] rounded-xl font-medium text-sm text-[#1C1B1F] outline-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest block mb-1">Loại sân</label>
            <input value={form.type} onChange={e => set('type', e.target.value)}
              placeholder="VD: Sân Pickleball"
              className="w-full px-4 py-3 bg-[#F2F0ED] rounded-xl font-medium text-sm text-[#1C1B1F] outline-none" />
          </div>
          <div>
            <label className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest block mb-1">Địa chỉ Google Maps</label>
            <input value={form.locationUrl || ''} onChange={e => set('locationUrl', e.target.value)}
              placeholder="https://maps.app.goo.gl/..."
              className="w-full px-4 py-3 bg-[#F2F0ED] rounded-xl font-medium text-sm text-[#1C1B1F] outline-none focus:ring-2 focus:ring-[#FF7A00]/30" />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="font-medium text-sm text-[#1C1B1F]">Đang diễn ra (Live)</span>
            <button
              type="button"
              onClick={() => set('isLive', !form.isLive)}
              className={`relative w-12 h-6 rounded-full transition-colors ${form.isLive ? 'bg-[#FF7A00]' : 'bg-[#E6E0D8]'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.isLive ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button onClick={onClose} className="flex-1 py-3 bg-[#F2F0ED] text-[#8C7A6B] rounded-xl font-bold text-sm">Hủy</button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-3 bg-gradient-to-r from-[#FF7A00] to-[#C35A00] text-white rounded-xl font-bold text-sm shadow disabled:opacity-60"
          >
            {saving ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Confirm Modal ──────────────────────────────────────────────────────────
const ConfirmModal = ({ isOpen, title, message, onConfirm, onClose, loading }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl scale-up-center space-y-6 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-[2rem] mx-auto flex items-center justify-center text-red-500">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-headline font-black text-[#1C1B1F] tracking-tight">{title}</h3>
          <p className="text-[#8C7A6B] text-sm font-medium leading-relaxed">{message}</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button 
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-4 bg-[#F2F0ED] text-[#8C7A6B] rounded-2xl font-bold text-sm hover:bg-[#E6E0D8] transition-colors disabled:opacity-50"
          >
            Hủy
          </button>
          <button 
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-4 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-red-900/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : 'Xác nhận xóa'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Admin Page ──────────────────────────────────────────────────────────
const Admin = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');

  // Users
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  // Sessions
  const [sessions, setSessions] = useState([]);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [editingSession, setEditingSession] = useState(null);
  const [showNewSession, setShowNewSession] = useState(false);

  // Transactions
  const [transactions, setTransactions] = useState([]);
  const [txLoading, setTxLoading] = useState(true);

  // Confirm Modal State
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: null,
    id: null,
    loading: false
  });

  // Maintenance
  const [maintenancing, setMaintenancing] = useState(false);

  // ── Guard: only admin ──
  useEffect(() => {
    if (userData && userData.role !== 'admin') {
      navigate('/', { replace: true });
    }
  }, [userData, navigate]);

  // ── Fetch users ──
  useEffect(() => {
    if (activeTab === 'users') {
      setUserLoading(true);
      getAllUsers().then(data => {
        setUsers(data.sort((a, b) => (a.fullName || '').localeCompare(b.fullName || '')));
        setUserLoading(false);
      });
    }
  }, [activeTab]);

  // ── Subscribe to sessions ──
  useEffect(() => {
    if (activeTab === 'schedule') {
      const unsub = subscribeToSchedule(data => {
        setSessions(data);
        setSessionLoading(false);
      });
      return () => unsub();
    }
  }, [activeTab]);

  // ── Fetch transactions ──
  useEffect(() => {
    if (activeTab === 'fund') {
      setTxLoading(true);
      getTransactions().then(data => {
        setTransactions(data);
        setTxLoading(false);
      });
    }
  }, [activeTab]);

  // ── User handlers ──
  const handleSaveUser = async (uid, data) => {
    await updateUserProfile(uid, { fullName: data.fullName, phone: data.phone });
    await updateUserRole(uid, data.role);
    setUsers(prev => prev.map(u => u.uid === uid ? { ...u, ...data } : u));
  };

  const handleDeleteUser = (uid) => {
    setConfirmState({
      isOpen: true,
      title: 'Xóa thành viên',
      message: 'Bạn có chắc chắn muốn xóa thành viên này khỏi hệ thống? Hành động này không thể hoàn tác.',
      type: 'user',
      id: uid,
      loading: false
    });
  };

  const executeDelete = async () => {
    const { type, id } = confirmState;
    setConfirmState(prev => ({ ...prev, loading: true }));
    
    try {
      if (type === 'user') {
        await deleteUserDoc(id);
        setUsers(prev => prev.filter(u => u.uid !== id));
      } else if (type === 'session') {
        await deleteSession(id);
        setSessions(prev => prev.filter(s => s.id !== id));
      } else if (type === 'tx') {
        await deleteTransaction(id);
        setTransactions(prev => prev.filter(t => t.id !== id));
      }
      setConfirmState({ isOpen: false, title: '', message: '', type: null, id: null, loading: false });
    } catch (e) {
      alert('Lỗi: ' + e.message);
      setConfirmState(prev => ({ ...prev, loading: false }));
    }
  };

  // ── Session handlers ──
  const handleSaveSession = async (form) => {
    if (form.id) {
      const { id, ...data } = form;
      await updateSession(id, data);
      setSessions(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    } else {
      const created = await addSession({ ...form, participants: [] });
      setSessions(prev => [...prev, created].sort((a, b) => a.dayIndex - b.dayIndex));
    }
  };

  const handleDeleteSession = (id) => {
    setConfirmState({
      isOpen: true,
      title: 'Xóa buổi tập',
      message: 'Xác nhận xóa buổi tập này? Thông tin đăng ký của thành viên sẽ bị mất.',
      type: 'session',
      id: id,
      loading: false
    });
  };

  // ── Transaction delete ──
  const handleDeleteTx = (id) => {
    setConfirmState({
      isOpen: true,
      title: 'Xóa giao dịch',
      message: 'Bạn có chắc chắn muốn xóa giao dịch này khỏi lịch sử chi tiêu?',
      type: 'tx',
      id: id,
      loading: false
    });
  };

  const handleSyncTDS = async () => {
    if (!window.confirm('Cập nhật địa chỉ Google Maps cho tất cả sân TDS?')) return;
    setMaintenancing(true);
    try {
      const tdsSessions = sessions.filter(s => s.courtName.toUpperCase().includes('TDS'));
      for (const s of tdsSessions) {
        await updateSession(s.id, { locationUrl: "https://maps.app.goo.gl/WSk6dBzFfs4EkYf29" });
      }
      alert(`Đã cập nhật ${tdsSessions.length} buổi tập.`);
    } catch (e) {
      alert('Lỗi: ' + e.message);
    } finally {
      setMaintenancing(false);
    }
  };

  if (!userData || userData.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9]">
        <div className="text-center p-8">
          <span className="material-symbols-outlined text-6xl text-[#E6E0D8] mb-4 block">lock</span>
          <p className="text-[#8C7A6B] font-medium">Bạn không có quyền truy cập trang này.</p>
        </div>
      </div>
    );
  }

  const TABS = [
    { id: 'users', icon: 'manage_accounts', label: 'Thành viên' },
    { id: 'schedule', icon: 'edit_calendar', label: 'Lịch tập' },
    { id: 'fund', icon: 'account_balance_wallet', label: 'Chi tiêu' },
    { id: 'news', icon: 'newspaper', label: 'Tin tức' },
  ];

  return (
    <main className="pt-24 pb-32 px-4 sm:px-6 max-w-4xl mx-auto font-body bg-[#FDFBF9] min-h-screen">
      {/* Header */}
      <section className="mb-6">
        <span className="font-label text-[#FF7A00] font-bold uppercase tracking-[0.2em] text-[10px] mb-1 block">Hệ thống</span>
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-headline font-black text-[#1C1B1F] tracking-tighter">Quản trị</h2>
          <div className="flex items-center gap-2 bg-[#FFF0E5] px-3 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-[#FF7A00] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
            <span className="font-label text-[10px] font-black text-[#FF7A00] uppercase tracking-widest">Admin</span>
          </div>
        </div>
        <p className="text-[#8C7A6B] text-sm mt-1 font-medium">{userData.email}</p>
      </section>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-[#F2F0ED] p-1 rounded-2xl">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl transition-all text-xs font-bold ${
              activeTab === tab.id
                ? 'bg-white text-[#FF7A00] shadow-sm'
                : 'text-[#8C7A6B]'
            }`}
          >
            <span className="material-symbols-outlined text-xl" style={activeTab === tab.id ? { fontVariationSettings: "'FILL' 1" } : {}}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══ TAB: USERS ═══ */}
      {activeTab === 'users' && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline font-bold text-xl text-[#1C1B1F]">Danh sách thành viên</h3>
            <span className="text-[10px] font-bold text-[#8C7A6B] uppercase">{users.length} người</span>
          </div>
          {userLoading ? (
            <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-10 w-10 border-4 border-[#FF7A00] border-t-transparent" /></div>
          ) : (
            <div className="space-y-3">
              {users.map(u => (
                <div key={u.uid} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-[#F2F0ED]">
                  <div className="w-12 h-12 rounded-2xl bg-[#F2F0ED] flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {u.photoURL ? <img src={u.photoURL} alt="" className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-[#8C7A6B] text-2xl">person</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-[#1C1B1F] truncate text-sm">{u.fullName || 'Chưa đặt tên'}</p>
                      {u.role === 'admin' && (
                        <span className="bg-[#FFF0E5] text-[#FF7A00] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest flex-shrink-0">Admin</span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#8C7A6B] truncate">{u.email}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setEditingUser(u)}
                      className="w-9 h-9 rounded-xl bg-[#FFF0E5] flex items-center justify-center text-[#FF7A00] active:scale-90 transition"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u.uid)}
                      disabled={(confirmState.loading && confirmState.id === u.uid) || u.email === 'banhdaidung@gmail.com'}
                      className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500 active:scale-90 transition disabled:opacity-30"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ═══ TAB: SCHEDULE ═══ */}
      {activeTab === 'schedule' && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline font-bold text-xl text-[#1C1B1F]">Lịch tập</h3>
            <button
              onClick={() => setShowNewSession(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#FF7A00] to-[#C35A00] text-white rounded-xl font-bold text-sm shadow active:scale-95 transition"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Tạo mới
            </button>
          </div>
          <div className="mb-4 flex gap-2">
             <button 
               onClick={handleSyncTDS} 
               disabled={maintenancing}
               className="text-[10px] font-bold uppercase tracking-widest text-[#FF7A00] bg-[#FFF0E5] px-3 py-1.5 rounded-lg active:scale-95 transition disabled:opacity-50"
             >
               {maintenancing ? 'Đang cập nhật...' : 'Sync địa chỉ TDS'}
             </button>
          </div>
          {sessionLoading ? (
            <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-10 w-10 border-4 border-[#FF7A00] border-t-transparent" /></div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-5xl text-[#E6E0D8] block mb-3">event_busy</span>
              <p className="text-[#8C7A6B] font-medium text-sm">Chưa có buổi tập nào. Bấm "Tạo mới" để thêm.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map(s => (
                <div key={s.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-[#F2F0ED]">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF0E5] flex flex-col items-center justify-center flex-shrink-0">
                    <span className="font-label text-[9px] font-bold text-[#FF7A00] uppercase">Bắt đầu</span>
                    <span className="font-headline font-black text-[#FF7A00] text-base leading-tight">{s.startTime}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#1C1B1F] text-sm truncate">{s.courtName}</p>
                    <p className="text-[11px] text-[#8C7A6B]">{s.dayLabel} • {s.timeRange}</p>
                    <p className="text-[10px] text-[#8C7A6B] mt-0.5">{s.participants?.length || 0} người tham gia</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setEditingSession(s)}
                      className="w-9 h-9 rounded-xl bg-[#FFF0E5] flex items-center justify-center text-[#FF7A00] active:scale-90 transition"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteSession(s.id)}
                      className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500 active:scale-90 transition"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ═══ TAB: FUND ═══ */}
      {activeTab === 'fund' && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline font-bold text-xl text-[#1C1B1F]">Lịch sử chi tiêu</h3>
            <button
              onClick={() => navigate('/fund/add')}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#FF7A00] to-[#C35A00] text-white rounded-xl font-bold text-sm shadow active:scale-95 transition"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Thêm
            </button>
          </div>
          {txLoading ? (
            <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-10 w-10 border-4 border-[#FF7A00] border-t-transparent" /></div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-5xl text-[#E6E0D8] block mb-3">receipt_long</span>
              <p className="text-[#8C7A6B] font-medium text-sm">Chưa có giao dịch nào.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map(tx => (
                <div key={tx.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-[#F2F0ED]">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                    <span className={`material-symbols-outlined text-[18px] ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      {tx.type === 'income' ? 'payments' : 'shopping_bag'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#1C1B1F] text-sm truncate">{tx.description}</p>
                    <p className="text-[10px] text-[#8C7A6B]">{tx.date || new Date(tx.createdAt).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <p className={`font-headline font-black text-base flex-shrink-0 ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                    {tx.type === 'income' ? '+' : '-'}{VND(tx.amount)}
                  </p>
                  <button
                    onClick={() => handleDeleteTx(tx.id)}
                    className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500 active:scale-90 transition flex-shrink-0"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ═══ TAB: NEWS ═══ */}
      {activeTab === 'news' && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline font-bold text-xl text-[#1C1B1F]">Quản lý tin tức</h3>
          </div>
          
          <div 
            onClick={() => navigate('/admin/news')}
            className="group bg-white rounded-[2rem] p-8 border border-[#F2F0ED] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center gap-4 py-12"
          >
            <div className="w-20 h-20 rounded-[2rem] bg-[#FFF0E5] text-[#FF7A00] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>newspaper</span>
            </div>
            <div>
              <h4 className="font-headline font-black text-2xl text-[#1C1B1F] mb-2 tracking-tight">Cổng biên tập tin tức</h4>
              <p className="text-[#8C7A6B] text-sm font-medium max-w-xs mx-auto mb-6">Đăng thông báo, cập nhật sự kiện và chia sẻ kiến thức kỹ thuật cho câu lạc bộ.</p>
              
              <div className="inline-flex items-center gap-2 px-8 py-4 velocity-gradient text-white rounded-2xl font-headline font-black uppercase tracking-tight shadow-xl shadow-orange-900/20 active:scale-95 transition-all">
                Truy cập ngay
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
             <div className="bg-[#FFF8F3] p-5 rounded-2xl border border-orange-100 flex items-center gap-3">
                <span className="material-symbols-outlined text-[#FF7A00]">edit_note</span>
                <span className="text-[11px] font-bold font-label text-[#8C7A6B] uppercase tracking-wider">Soạn bài mới</span>
             </div>
             <div className="bg-[#FFF8F3] p-5 rounded-2xl border border-orange-100 flex items-center gap-3">
                <span className="material-symbols-outlined text-[#FF7A00]">visibility</span>
                <span className="text-[11px] font-bold font-label text-[#8C7A6B] uppercase tracking-wider">Xem bảng tin</span>
             </div>
          </div>
        </section>
      )}

      {/* Modals */}
      {editingUser && (
        <UserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSaveUser}
        />
      )}
      {(editingSession || showNewSession) && (
        <SessionModal
          session={editingSession || null}
          onClose={() => { setEditingSession(null); setShowNewSession(false); }}
          onSave={handleSaveSession}
        />
      )}
      <ConfirmModal 
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        loading={confirmState.loading}
        onConfirm={executeDelete}
        onClose={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
      />
    </main>
  );
};

export default Admin;
