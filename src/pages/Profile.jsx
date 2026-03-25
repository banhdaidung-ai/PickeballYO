import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { logout, updateUserPassword, updateUserProfile } from '../services/authService';
import { getUserBookings } from '../services/bookingService';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, userData, loading, setUserData } = useAuth();
  const navigate = useNavigate();
  
  // Password states
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Profile Edit states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ fullName: '', phone: '', photoURL: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = React.useRef(null);

  // Bookings states
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      setBookingsLoading(true);
      getUserBookings(user.uid).then(data => {
        // Sort by bookedAt date descending
        const sorted = data.sort((a,b) => {
          const pA = a.participants.find(p => p.userId === user.uid);
          const pB = b.participants.find(p => p.userId === user.uid);
          return new Date(pB.bookedAt) - new Date(pA.bookedAt);
        });
        setBookings(sorted);
      }).catch(console.error)
      .finally(() => setBookingsLoading(false));
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setPasswordError('Mật khẩu phải từ 6 ký tự trở lên.');
      return;
    }
    setPasswordLoading(true);
    setPasswordError('');
    setPasswordSuccess('');
    try {
      await updateUserPassword(newPassword);
      setPasswordSuccess('Đổi mật khẩu thành công!');
      setNewPassword('');
      setTimeout(() => setIsChangingPassword(false), 2000);
    } catch (err) {
      if (err.code === 'auth/requires-recent-login') {
        setPasswordError('Phiên đăng nhập đã cũ. Vui lòng Đăng xuất và Đăng nhập lại để thực hiện đổi mật khẩu.');
      } else {
        setPasswordError(`Đã có lỗi xảy ra: ${err.message}`);
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  // Compress image using canvas and return Base64 string
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 300;
          let w = img.width;
          let h = img.height;
          if (w > h) { if (w > MAX_SIZE) { h *= MAX_SIZE / w; w = MAX_SIZE; } }
          else { if (h > MAX_SIZE) { w *= MAX_SIZE / h; h = MAX_SIZE; } }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.75));
        };
      };
    });
  };

  const handleAvatarFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const compressed = await compressImage(file);
    setAvatarPreview(compressed);
    setEditForm(prev => ({ ...prev, photoURL: compressed }));
  };

  const handleEditOpen = () => {
    setEditForm({
      fullName: userData?.fullName || '',
      phone: userData?.phone || '',
      photoURL: userData?.photoURL || ''
    });
    setAvatarPreview(null);
    setIsEditingProfile(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      await updateUserProfile(user.uid, editForm);
      setUserData({ ...userData, ...editForm });
      setIsEditingProfile(false);
    } catch (err) {
      alert("Lỗi cập nhật: " + err.message);
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#FFF8F3]">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl mb-6">
          <span className="material-symbols-outlined text-4xl text-[#D5B8A6]">person_off</span>
        </div>
        <h2 className="text-2xl font-black font-headline text-[#4A2C2A] mb-2 uppercase italic tracking-tighter">Bạn chưa đăng nhập</h2>
        <p className="text-[#4A2C2A]/60 mb-8 max-w-[240px] font-medium leading-relaxed">Hãy đăng ký tài khoản để bắt đầu lịch trình tập luyện của riêng bạn.</p>
        <button 
          onClick={() => navigate('/registration')}
          className="w-full max-w-[280px] h-16 bg-gradient-to-br from-[#FF7A00] to-[#C35A00] text-white rounded-2xl font-headline font-black text-lg tracking-tight shadow-xl shadow-orange-900/30 flex items-center justify-center gap-3 active:scale-95 transition-all uppercase px-8"
        >
          Đăng ký ngay
          <span className="material-symbols-outlined font-bold">arrow_forward</span>
        </button>
      </div>
    );
  }

  // Calculate monthly stats
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthBookings = bookings.filter(b => {
    const pInfo = b.participants.find(p => p.userId === user.uid);
    if (!pInfo || !pInfo.bookedAt) return false;
    const d = new Date(pInfo.bookedAt);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  return (
    <main className="pt-20 px-4 md:px-8 max-w-4xl mx-auto space-y-12 pb-32">
      {/* Profile Header Block */}
      <section className="relative mt-8">
        <div className="flex flex-col md:flex-row gap-8 items-end">
          <div className="relative -ml-2">
            <div className="w-32 h-32 rounded-3xl overflow-hidden bg-surface-container-high ring-4 ring-white shadow-xl flex items-center justify-center">
              {userData?.photoURL ? (
                <img alt="Profile" className="w-full h-full object-cover" src={userData.photoURL} />
              ) : (
                <span className="material-symbols-outlined text-6xl text-outline-variant">person</span>
              )}
            </div>
            <button 
              onClick={handleEditOpen}
              className="absolute -bottom-2 -right-2 bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
          </div>
          <div className="flex-1 pb-2">
            <p className="font-label text-sm font-medium text-tertiary mb-1 uppercase tracking-widest">THÔNG TIN CÁ NHÂN</p>
            <h2 className="text-4xl font-extrabold tracking-tight font-headline text-on-surface">{userData?.fullName || 'Người dùng'}</h2>
            <div className="flex items-center gap-2 text-on-surface-variant font-label mt-2">
              <span className="material-symbols-outlined text-sm">mail</span>
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label mt-1">
              <span className="material-symbols-outlined text-sm">call</span>
              <span>{userData?.phone || 'Chưa cập nhật SĐT'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Profile Logic/Modal */}
      {isEditingProfile && (
        <section className="bg-white p-6 rounded-3xl shadow-xl shadow-orange-900/10 border border-primary/20 animate-fade-in">
          <h3 className="font-headline font-bold text-lg mb-4 text-primary">Cập nhật Hồ Sơ</h3>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold font-label uppercase text-outline tracking-wider mb-1 block">Họ và Tên</label>
              <input 
                type="text" 
                value={editForm.fullName}
                onChange={e => setEditForm({...editForm, fullName: e.target.value})}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm font-medium"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold font-label uppercase text-outline tracking-wider mb-1 block">Số điện thoại</label>
              <input 
                type="tel" 
                value={editForm.phone}
                onChange={e => setEditForm({...editForm, phone: e.target.value})}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm font-medium"
              />
            </div>
            <div>
              <label className="text-xs font-bold font-label uppercase text-outline tracking-wider mb-2 block">Ảnh Đại Diện (Avatar)</label>
              {/* Hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleAvatarFileChange}
              />
              <div 
                onClick={() => fileInputRef.current.click()}
                className="w-full flex flex-col items-center justify-center gap-3 p-5 bg-surface-container-lowest border-2 border-dashed border-outline-variant/40 rounded-2xl cursor-pointer hover:bg-primary/5 hover:border-primary/40 transition-all group"
              >
                {(avatarPreview || editForm.photoURL) ? (
                  <div className="relative">
                    <img 
                      src={avatarPreview || editForm.photoURL} 
                      alt="Avatar Preview" 
                      className="w-24 h-24 rounded-2xl object-cover shadow-md"
                    />
                    <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white text-2xl">camera_alt</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-surface-variant/50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-outline-variant">add_photo_alternate</span>
                  </div>
                )}
                <div className="text-center">
                  <p className="font-bold text-xs text-on-surface-variant">{avatarPreview ? 'Bấm để đổi ảnh khác' : 'Bấm để chọn ảnh'}</p>
                  <p className="text-[10px] text-outline mt-0.5">JPG, PNG, WEBP – Tự động nén & lưu</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => setIsEditingProfile(false)} className="flex-1 py-3 rounded-xl font-bold font-label text-xs uppercase tracking-widest bg-surface-variant/30 text-on-surface-variant">Huỷ</button>
              <button type="submit" disabled={editLoading} className="flex-1 py-3 rounded-xl font-bold font-label text-xs uppercase tracking-widest velocity-gradient text-white shadow-lg">{editLoading ? 'Lưu...' : 'Lưu Thay Đổi'}</button>
            </div>
          </form>
        </section>
      )}

      {/* Member Card Component */}
      <section>
        <h3 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">badge</span> Thẻ thành viên điện tử
        </h3>
        <div className="velocity-gradient rounded-[32px] p-8 text-on-primary relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full -ml-10 -mb-10 blur-2xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-6 text-center md:text-left">
              <div>
                <p className="font-label text-[10px] tracking-[0.2em] uppercase opacity-80">Membership Status</p>
                <h4 className="text-3xl font-black font-headline tracking-tighter italic">ELITE ATHLETE</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  <span className="font-bold text-sm uppercase tracking-wide">Tài khoản Active</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                  <span className="material-symbols-outlined text-primary-container text-sm">local_fire_department</span>
                  <span className="font-bold text-xs">Tháng {currentMonth + 1}: <span className="text-lg text-primary-container font-black">{thisMonthBookings.length}</span> lượt tập</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-inner flex flex-col items-center">
              <img alt="QR Code" className="w-32 h-32" src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user.uid}`} />
              <p className="text-black font-label text-[10px] text-center mt-2 font-bold uppercase">Mã ID: {user.uid.substring(0,6)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking History */}
      <section className="space-y-4">
        <h3 className="font-headline font-bold text-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">history</span> Lịch sử tham gia
        </h3>
        {bookingsLoading ? (
           <p className="text-outline text-sm animate-pulse">Đang tải dữ liệu lịch...</p>
        ) : bookings.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-3xl p-8 text-center border border-dashed border-outline-variant/30">
            <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">event_busy</span>
            <p className="text-on-surface-variant font-medium">Bạn chưa đăng ký tham gia buổi tập nào.</p>
            <button onClick={() => navigate('/schedule')} className="mt-4 text-primary font-bold text-sm uppercase tracking-widest hover:underline">Xem Lịch Tập Ngay</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map(session => {
              const pInfo = session.participants.find(p => p.userId === user.uid);
              const bookedDate = new Date(pInfo.bookedAt).toLocaleDateString('vi-VN');
              return (
                <div key={session.id} className="bg-white p-5 rounded-3xl border border-surface-variant shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-secondary text-sm">{session.date || "Chưa ấn định ngày"}</p>
                      <h4 className="font-headline font-bold text-lg">{session.title}</h4>
                    </div>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase">Đã Đăng Ký</span>
                  </div>
                  <div className="flex gap-4 text-xs font-medium text-on-surface-variant">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> {session.time}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> {session.location}</span>
                  </div>
                  <div className="pt-3 border-t border-surface-variant text-[10px] text-outline uppercase tracking-widest font-bold">
                    Booking thao tác ngày: {bookedDate}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Account Settings */}
      <section className="space-y-4">
        <h3 className="font-headline font-bold text-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">settings</span> Cài đặt &amp; Tài khoản
        </h3>
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-surface-variant">
          
          {isChangingPassword ? (
            <div className="p-5 bg-orange-50/50">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-primary text-xl">lock_reset</span>
                <p className="font-bold text-on-surface">Đổi mật khẩu mới</p>
              </div>
              <form onSubmit={handlePasswordChange} className="space-y-3">
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới (từ 6 ký tự)"
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-white focus:ring-2 focus:ring-primary/30 outline-none text-sm tracking-widest"
                  required
                />
                {passwordError && <p className="text-error text-[10px] font-bold uppercase tracking-widest">{passwordError}</p>}
                {passwordSuccess && <p className="text-green-600 text-[10px] font-bold uppercase tracking-widest">{passwordSuccess}</p>}
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setIsChangingPassword(false)} className="flex-1 py-3 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant bg-surface-variant/30 rounded-xl hover:bg-surface-variant/50 transition-colors">Hủy</button>
                  <button type="submit" disabled={passwordLoading} className="flex-1 py-3 text-[10px] uppercase tracking-widest font-bold text-white bg-primary rounded-xl hover:bg-orange-600 disabled:opacity-50 transition-colors">
                    {passwordLoading ? 'Đang xử lý...' : 'Xác nhận'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <button onClick={() => setIsChangingPassword(true)} className="w-full flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors group">
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 bg-primary-container/30 rounded-xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Đổi mật khẩu</p>
                  <p className="text-xs text-on-surface-variant font-label">Cập nhật mật khẩu bảo mật mới</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>
          )}

          <div className="h-px bg-surface-container mx-5"></div>
          
          <button onClick={handleLogout} className="w-full flex items-center justify-between p-5 hover:bg-error-container/20 transition-colors group">
            <div className="flex items-center gap-4 text-left">
              <div className="w-10 h-10 bg-error-container/30 rounded-xl flex items-center justify-center text-error">
                <span className="material-symbols-outlined">logout</span>
              </div>
              <div>
                <p className="font-bold text-error">Đăng xuất</p>
                <p className="text-xs text-error font-label">Thoát khỏi ứng dụng trên máy này</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-error group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Profile;
