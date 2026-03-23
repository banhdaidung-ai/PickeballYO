import React from 'react';

const Assets = () => {
  return (
    <main className="mt-20 px-4 md:px-8 max-w-5xl mx-auto">
      <section className="relative mb-12 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <p className="font-label text-primary font-semibold uppercase tracking-widest text-sm mb-2">Trải nghiệm đỉnh cao</p>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-4 leading-tight">Sẵn sàng cho trận đấu tiếp theo?</h2>
          <p className="text-on-surface-variant max-w-md">Đặt sân Pickleball tiêu chuẩn quốc tế tại CLB PickeBall YODY ngay hôm nay.</p>
        </div>
        <div className="relative w-full md:w-1/2 aspect-video rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDmT1O1alfcFtah2fSyqjIGBHpkMk5826jfYUhnqdEu5tR1G9nmlFSfjGbUoM_dkbrjd-z2tUg-bddSBlCsTl7Lmr0KrCMwldgoNcv3k4w6yQoaz-ONxeMZOJSv-VgHwhlzkJmBSY6utbd1vqH_0Bs853dHLD-tUux-YMFRBZ4fp0kXPw4RqM1RdWWWz_t91U3i9Fl3dUopbdErWsWeiu6sTsnCqawk2DXkA5yWV9WCndAQlTYXgMLqqmg6_E8lIAfYE_KvbQQ_iA" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border-none">
            <h3 className="font-headline text-xl font-bold mb-4">Loại sân</h3>
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-between p-4 rounded-2xl bg-primary-container/30 border-2 border-primary transition-all">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">person</span>
                  <span className="font-label font-medium">Single (Đánh đơn)</span>
                </div>
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </button>
              <button className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border-2 border-transparent hover:border-outline-variant transition-all">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined">group</span>
                  <span className="font-label font-medium">Double (Đánh đôi)</span>
                </div>
              </button>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 rounded-3xl border-none">
            <h3 className="font-headline text-xl font-bold mb-4">Ngày tập</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex-shrink-0 w-16 h-20 velocity-gradient rounded-2xl flex flex-col items-center justify-center text-white">
                <span className="font-label text-xs uppercase opacity-80">T2</span>
                <span className="font-headline text-xl font-extrabold">12</span>
              </div>
              <div className="flex-shrink-0 w-16 h-20 bg-surface-container-lowest rounded-2xl flex flex-col items-center justify-center border border-transparent hover:border-primary/20 cursor-pointer">
                <span className="font-label text-xs uppercase text-on-surface-variant">T3</span>
                <span className="font-headline text-xl font-extrabold">13</span>
              </div>
              <div className="flex-shrink-0 w-16 h-20 bg-surface-container-lowest rounded-2xl flex flex-col items-center justify-center border border-transparent hover:border-primary/20 cursor-pointer">
                <span className="font-label text-xs uppercase text-on-surface-variant">T4</span>
                <span className="font-headline text-xl font-extrabold">14</span>
              </div>
              <div className="flex-shrink-0 w-16 h-20 bg-surface-container-lowest rounded-2xl flex flex-col items-center justify-center border border-transparent hover:border-primary/20 cursor-pointer">
                <span className="font-label text-xs uppercase text-on-surface-variant">T5</span>
                <span className="font-headline text-xl font-extrabold">15</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-8 bg-surface-container-lowest p-6 md:p-8 rounded-[32px] shadow-sm">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="font-headline text-2xl font-extrabold text-on-surface">Khung giờ trống</h3>
              <p className="text-sm text-on-surface-variant font-label">Thứ Hai, 12 Tháng 6, 2024</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-tertiary-container/30 text-tertiary rounded-full text-xs font-semibold">
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>Giờ vàng ưu đãi</span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <button className="group p-4 rounded-2xl border-2 border-surface-container-high hover:border-primary transition-all duration-300 text-left">
              <span className="block text-xs font-label text-on-surface-variant uppercase tracking-wider mb-1">Sáng</span>
              <span className="block font-headline text-lg font-bold">06:00 - 08:00</span>
              <span className="mt-2 block text-[10px] text-primary font-bold">150.000đ</span>
            </button>
            <button className="group p-4 rounded-2xl border-2 border-primary bg-primary-container/40 text-left relative overflow-hidden">
              <span className="block text-xs font-label text-primary uppercase tracking-wider mb-1">Sáng</span>
              <span className="block font-headline text-lg font-bold text-on-primary-container">08:00 - 10:00</span>
              <span className="mt-2 block text-[10px] text-primary font-bold">180.000đ</span>
              <div className="absolute -right-2 -bottom-2 opacity-10">
                <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>sports_tennis</span>
              </div>
            </button>
            <button className="group p-4 rounded-2xl border-2 border-surface-container-high hover:border-primary transition-all duration-300 text-left">
              <span className="block text-xs font-label text-on-surface-variant uppercase tracking-wider mb-1">Trưa</span>
              <span className="block font-headline text-lg font-bold">10:00 - 12:00</span>
              <span className="mt-2 block text-[10px] text-primary font-bold">120.000đ</span>
            </button>
            <button className="p-4 rounded-2xl border-2 border-transparent bg-surface-container opacity-50 cursor-not-allowed text-left">
              <span className="block text-xs font-label text-on-surface-variant uppercase tracking-wider mb-1">Chiều</span>
              <span className="block font-headline text-lg font-bold">14:00 - 16:00</span>
              <span className="mt-2 block text-[10px] font-bold">Hết chỗ</span>
            </button>
            <button className="group p-4 rounded-2xl border-2 border-surface-container-high hover:border-primary transition-all duration-300 text-left">
              <span className="block text-xs font-label text-on-surface-variant uppercase tracking-wider mb-1">Chiều</span>
              <span className="block font-headline text-lg font-bold">16:00 - 18:00</span>
              <span className="mt-2 block text-[10px] text-primary font-bold">180.000đ</span>
            </button>
            <button className="group p-4 rounded-2xl border-2 border-tertiary/20 bg-tertiary-container/10 hover:border-tertiary transition-all duration-300 text-left">
              <span className="block text-xs font-label text-tertiary uppercase tracking-wider mb-1">Tối</span>
              <span className="block font-headline text-lg font-bold text-tertiary">18:00 - 20:00</span>
              <span className="mt-2 block text-[10px] text-tertiary font-bold">220.000đ</span>
            </button>
          </div>
        </div>
      </div>

      <section className="mt-12 mb-12 bg-white/40 backdrop-blur-xl p-8 rounded-[40px] border border-white/20 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 blur-[100px] rounded-full"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1">
            <h3 className="font-headline text-3xl font-extrabold mb-6">Xem lại thông tin</h3>
            <div className="flex flex-wrap gap-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">stadium</span>
                </div>
                <div>
                  <p className="text-[10px] font-label uppercase text-on-surface-variant tracking-wider">Loại sân</p>
                  <p className="font-bold text-on-surface">Single (Sân 04)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <p className="text-[10px] font-label uppercase text-on-surface-variant tracking-wider">Thời gian</p>
                  <p className="font-bold text-on-surface">08:00 - 10:00</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <div>
                  <p className="text-[10px] font-label uppercase text-on-surface-variant tracking-wider">Tổng cộng</p>
                  <p className="font-bold text-on-surface text-xl">180.000đ</p>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full md:w-auto velocity-gradient text-on-primary px-12 py-5 rounded-full font-headline text-lg font-extrabold shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-3">
            Xác nhận đặt sân <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Assets;
