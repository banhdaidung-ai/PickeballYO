import React from 'react';

const Profile = () => {
  return (
    <main className="pt-20 px-4 md:px-8 max-w-4xl mx-auto space-y-12">
      <section className="relative mt-8">
        <div className="flex flex-col md:flex-row gap-8 items-end">
          <div className="relative -ml-2">
            <div className="w-32 h-32 rounded-3xl overflow-hidden bg-surface-container-high ring-4 ring-white shadow-xl">
              <img alt="Profile Picture" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0xP9ny_xdC40sX0n1ldgUdtsXXk4zfxM6HbmFokYv3ynn-5B40CgInSGdyyKRasEWCJml5rZTuWq-IEZoI_v-RAQER0rIk-r3i3hRdATYRqoXpnagdmwgo46owZ9WHVNtAzkXfJWnzqWtl9nSpD68rpxslwRlxOmswVFdppi8c8alHbBZR_-A8E-oMUw1qbVBe9NkKpmajwrAN2ANNE4kfdy8it7RRGN9j69TlgJc1tZoGvQ-1RDRnVmKEorN3eJMhsKau4hs3Tg" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-sm">edit</span>
            </div>
          </div>
          <div className="flex-1 pb-2">
            <p className="font-label text-sm font-medium text-tertiary mb-1">PRO MEMBER</p>
            <h2 className="text-4xl font-extrabold tracking-tight font-headline text-on-surface">Minh Nguyễn</h2>
            <p className="text-on-surface-variant font-label mt-1">Hạng: Kim Cương • ID: #KC8829</p>
          </div>
          <div className="flex gap-4 pb-2">
            <div className="text-center px-6">
              <p className="text-3xl font-bold font-headline text-primary">42</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant font-label">Buổi tập</p>
            </div>
            <div className="w-[1px] h-12 bg-outline-variant/30"></div>
            <div className="text-center px-6">
              <p className="text-3xl font-bold font-headline text-secondary">156</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant font-label">Điểm XP</p>
            </div>
          </div>
        </div>
      </section>

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
              <div className="space-y-1">
                <p className="font-label text-xs opacity-80">Valid until Dec 2024</p>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  <span className="font-bold text-sm">ACTIVE ACCOUNT</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-inner flex flex-col items-center">
              <img alt="QR Code" className="w-32 h-32" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEmQi4--KtvQY20pP6afymxsOLR60JLHdh_O_bIGocCoalwCF5CZ5qzvYbqGNtlNnoV-ipKGx18BE-Gr-jtTAwscbn_G9cUfH2B1SVx1dP1J6_-13qp2pzwvXdVFZUnl65L70ZyxPeJ1EKgWhyo1T9jM8nMG9_XU5nP3J5XvHyPU1QOBsJfZ3VHakX4b3FnITSBuqiPyV2Y6iDJw-ADzdhWrf7lD4snRny_gZscMKAmmZPXUDp13e0qZNA0lxOvGSwefaQhflv7tU" />
              <p className="text-black font-label text-[10px] text-center mt-2 font-bold">SCAN TO CHECK-IN</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <h3 className="font-headline font-bold text-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">emoji_events</span> Bảng thành tích
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col items-center text-center group hover:bg-surface-container-high transition-colors border-b-2 border-transparent hover:border-primary/20">
              <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-on-primary-container">bolt</span>
              </div>
              <p className="font-headline font-bold text-sm">Siêu tốc độ</p>
              <p className="font-label text-[10px] text-on-surface-variant mt-1">Hoàn thành 10 buổi tập liên tiếp</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col items-center text-center group hover:bg-surface-container-high transition-colors border-b-2 border-transparent hover:border-primary/20">
              <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-on-secondary-container">workspace_premium</span>
              </div>
              <p className="font-headline font-bold text-sm">Nhà vô địch</p>
              <p className="font-label text-[10px] text-on-surface-variant mt-1">Thắng giải đấu nội bộ quý 3</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col items-center text-center opacity-50">
              <div className="w-12 h-12 bg-surface-container-highest rounded-full flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-on-surface-variant">lock</span>
              </div>
              <p className="font-headline font-bold text-sm">Bất bại</p>
              <p className="font-label text-[10px] text-on-surface-variant mt-1">Chuỗi 5 trận thắng liên tục</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary text-on-secondary p-6 rounded-[32px] flex flex-col justify-between shadow-lg">
          <div>
            <h4 className="font-headline font-bold text-lg leading-tight">Thống kê tuần này</h4>
            <p className="font-label text-xs opacity-70 mt-1">Dựa trên 4 buổi tập gần nhất</p>
          </div>
          <div className="py-6 space-y-4">
            <div className="flex justify-between items-end">
              <span className="font-label text-xs">Cường độ</span>
              <span className="font-headline font-bold text-primary-fixed">85%</span>
            </div>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[85%] rounded-full shadow-[0_0_8px_rgba(255,122,0,0.6)]"></div>
            </div>
            <div className="flex justify-between items-end mt-4">
              <span className="font-label text-xs">Calo tiêu thụ</span>
              <span className="font-headline font-bold text-primary-fixed">2,450</span>
            </div>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[60%] rounded-full shadow-[0_0_8px_rgba(255,122,0,0.6)]"></div>
            </div>
          </div>
          <button className="w-full py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl font-label text-xs font-bold uppercase tracking-widest border border-white/10">
            Chi tiết
          </button>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="font-headline font-bold text-xl mb-6">Cài đặt &amp; Tài khoản</h3>
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm">
          <a className="flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors group" href="#">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary-container/30 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">person_outline</span>
              </div>
              <div>
                <p className="font-bold text-on-surface">Thông tin cá nhân</p>
                <p className="text-xs text-on-surface-variant font-label">Tên, Email, Số điện thoại</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
          </a>
          <div className="h-px bg-surface-container mx-5"></div>
          <a className="flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors group" href="#">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary-container/30 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">notifications_active</span>
              </div>
              <div>
                <p className="font-bold text-on-surface">Thông báo</p>
                <p className="text-xs text-on-surface-variant font-label">Nhắc lịch tập, Tin nhắn từ CLB</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
          </a>
          <div className="h-px bg-surface-container mx-5"></div>
          <a className="flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors group" href="#">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary-container/30 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">credit_card</span>
              </div>
              <div>
                <p className="font-bold text-on-surface">Gói thành viên &amp; Thanh toán</p>
                <p className="text-xs text-on-surface-variant font-label">Quản lý thẻ, Lịch sử nạp tiền</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
          </a>
          <div className="h-px bg-surface-container mx-5"></div>
          <a className="flex items-center justify-between p-5 hover:bg-error-container/20 transition-colors group" href="#">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-error-container/30 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-error">logout</span>
              </div>
              <div>
                <p className="font-bold text-error">Đăng xuất</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-error group-hover:translate-x-1 transition-transform">chevron_right</span>
          </a>
        </div>
      </section>
    </main>
  );
};
export default Profile;
