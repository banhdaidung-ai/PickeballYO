import React from 'react';

const Members = () => {
  return (
    <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-label text-primary font-semibold uppercase tracking-widest text-[10px] mb-2 block">Cộng đồng</span>
            <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">Thành viên</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative group flex-grow sm:min-w-[300px]">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
              <input className="w-full pl-12 pr-4 py-3 bg-surface-container-high border-none rounded-full font-label text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Tìm kiếm thành viên..." type="text" />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-surface-container-lowest rounded-full shadow-sm hover:shadow-md transition-all border border-outline-variant/20">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              <span className="font-label text-sm font-medium">Bộ lọc</span>
            </button>
          </div>
        </div>
        <div className="flex gap-2 mt-6 overflow-x-auto hide-scrollbar pb-2">
          <button className="velocity-gradient text-white px-6 py-2 rounded-full font-label text-xs font-bold whitespace-nowrap">Tất cả</button>
          <button className="bg-surface-container-lowest text-on-surface-variant px-6 py-2 rounded-full font-label text-xs font-medium border border-outline-variant/10 hover:bg-surface-container-high transition-colors whitespace-nowrap">Beginner</button>
          <button className="bg-surface-container-lowest text-on-surface-variant px-6 py-2 rounded-full font-label text-xs font-medium border border-outline-variant/10 hover:bg-surface-container-high transition-colors whitespace-nowrap">Intermediate</button>
          <button className="bg-surface-container-lowest text-on-surface-variant px-6 py-2 rounded-full font-label text-xs font-medium border border-outline-variant/10 hover:bg-surface-container-high transition-colors whitespace-nowrap">Pro</button>
          <button className="bg-surface-container-lowest text-on-surface-variant px-6 py-2 rounded-full font-label text-xs font-medium border border-outline-variant/10 hover:bg-surface-container-high transition-colors whitespace-nowrap">Thành viên tích cực</button>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="group relative bg-surface-container-lowest rounded-[2rem] p-6 shadow-[0_8px_24px_rgba(255,122,0,0.04)] hover:shadow-[0_20px_48px_rgba(255,122,0,0.12)] transition-all duration-500 overflow-hidden flex flex-col items-center text-center border border-outline-variant/5">
          <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            <span className="font-label text-[10px] font-bold uppercase tracking-wider">Tích cực</span>
          </div>
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-3xl overflow-hidden -rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-xl">
              <img alt="Minh Tuấn" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXtOpWf2sxQtI-JMrHALe-wgt6y9WSGfSn5wSDC33YKUf4slnJkcZEXYfrq3-P4vtLB5SlH7yg5L51VxeAWJ7lckz6vM7l2Yu0RDIuCh0MMPRjJqtOS18B91W1zQNAplskIy2dcZEz9sJhM3c3KQsFap_uVuWgzZ60M91mQfAqnRomYY-ZnbabK7tIc0jrqoHXvEtoAU1Vh0MYABubmAViWj0wNSgnZk81KJL2lThM6rueVdUNVe3LmsvAl5sc233wdUrSkjIezvQ" />
            </div>
          </div>
          <h3 className="font-headline font-bold text-lg text-on-surface mb-1">Trần Minh Tuấn</h3>
          <span className="font-label text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-4">Pro League</span>
          <div className="w-full flex justify-between items-center pt-4 border-t border-surface-container-low mt-auto">
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-label text-outline uppercase tracking-tighter">Xếp hạng</span>
              <span className="font-headline font-bold text-secondary text-sm">#12</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-label text-outline uppercase tracking-tighter">Trận thắng</span>
              <span className="font-headline font-bold text-secondary text-sm">128</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group relative bg-surface-container-lowest rounded-[2rem] p-6 shadow-[0_8px_24px_rgba(255,122,0,0.04)] hover:shadow-[0_20px_48px_rgba(255,122,0,0.12)] transition-all duration-500 overflow-hidden flex flex-col items-center text-center border border-outline-variant/5">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-3xl overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-xl border-4 border-white">
              <img alt="Thùy Chi" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-6hyXidw04j5MdooDtBu8aod2HJsjKCnprU3azRxLhFE5xr8Odpj0dCVFSwOu-4LgvjTkoSR44gKlQjgWIWe-wap37RY4sfMB9W7RKutv-DL7togHlJx63raPikmYOvW5S4sdLbd37sP7kMyvbUdTHBRJUTdM6DhdcKLcqCuBflYxbYJ63q9N3sT-IgFWUnscMRf9RQflya9tuxVRtWmnQAVCO9rJRXXzhVRkknD5SW20OtcjE8hchZf-dk_N-c_O3EAD7CLmP1Q" />
            </div>
          </div>
          <h3 className="font-headline font-bold text-lg text-on-surface mb-1">Nguyễn Thùy Chi</h3>
          <span className="font-label text-[11px] font-bold text-tertiary uppercase tracking-[0.2em] mb-4">Intermediate</span>
          <div className="w-full flex justify-between items-center pt-4 border-t border-surface-container-low mt-auto">
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-label text-outline uppercase tracking-tighter">Xếp hạng</span>
              <span className="font-headline font-bold text-secondary text-sm">#45</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-label text-outline uppercase tracking-tighter">Trận thắng</span>
              <span className="font-headline font-bold text-secondary text-sm">54</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="group relative bg-surface-container-lowest rounded-[2rem] p-6 shadow-[0_8px_24px_rgba(255,122,0,0.04)] hover:shadow-[0_20px_48px_rgba(255,122,0,0.12)] transition-all duration-500 overflow-hidden flex flex-col items-center text-center border border-outline-variant/5">
          <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            <span className="font-label text-[10px] font-bold uppercase tracking-wider">Tích cực</span>
          </div>
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-3xl overflow-hidden -rotate-2 group-hover:rotate-0 transition-transform duration-500 shadow-xl">
              <img alt="Hoàng Nam" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQTSjLiXx-sOmBvq-xpMHHUifsCNefXns2QOIOCxnAJ6-j8FaJTEmFG0WFgqU_nqWKEuJ0EGvwFB7u5Vmq83s6P63k2laosEXOcw9cys3RAWJw5oN00WxtmHp4I63JpCv6Lghw-ALEcB7fxkFbuq2D_odkqEDd3vbmW07iXLhKTgxFcUNtrCcme8wGlcB9aMAdcyopLPYuIVj1zQH5CjILLK6bze-EPMwjxJzY41-oHaLwRl1KqNe8aGrLSq1pqVZWG-r1XJU3L98" />
            </div>
          </div>
          <h3 className="font-headline font-bold text-lg text-on-surface mb-1">Lê Hoàng Nam</h3>
          <span className="font-label text-[11px] font-bold text-outline uppercase tracking-[0.2em] mb-4">Beginner</span>
          <div className="w-full flex justify-between items-center pt-4 border-t border-surface-container-low mt-auto">
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-label text-outline uppercase tracking-tighter">Xếp hạng</span>
              <span className="font-headline font-bold text-secondary text-sm">#112</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-label text-outline uppercase tracking-tighter">Trận thắng</span>
              <span className="font-headline font-bold text-secondary text-sm">12</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="group relative bg-surface-container-lowest rounded-[2rem] p-6 shadow-[0_8px_24px_rgba(255,122,0,0.04)] hover:shadow-[0_20px_48px_rgba(255,122,0,0.12)] transition-all duration-500 overflow-hidden flex flex-col items-center text-center border border-outline-variant/5">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-3xl overflow-hidden rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-xl">
              <img alt="Lan Anh" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvKQwv1iPwTzdBysYmT8bpY7QlzLXBGFuGoHFIdYgp-xBv42qETX-xHNGdrJjI83Izp_j7UaTXrwqu7tuvkIYlsqKIC_3t1tBc6Qf3e0QSPbGWFL4bQ4C4_v4EJr3sirHMUeqdMVhCZFBkDHJ642sX2g8VpUKFc0obkX_MTQ2WuE0yQaNGuXw4_DqSASHPnLHhMsPMmEBBaTDuKNF3y3B2st1NHu-LW0ByFPm1ETuHbCMH4okpS_nSwp_MtjxP1WpHhD3PV3L7RV8" />
            </div>
          </div>
          <h3 className="font-headline font-bold text-lg text-on-surface mb-1">Phạm Lan Anh</h3>
          <span className="font-label text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-4">Pro League</span>
          <div className="w-full flex justify-between items-center pt-4 border-t border-surface-container-low mt-auto">
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-label text-outline uppercase tracking-tighter">Xếp hạng</span>
              <span className="font-headline font-bold text-secondary text-sm">#5</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-label text-outline uppercase tracking-tighter">Trận thắng</span>
              <span className="font-headline font-bold text-secondary text-sm">215</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Members;
