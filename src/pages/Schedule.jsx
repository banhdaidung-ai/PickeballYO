import React from 'react';
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
  const navigate = useNavigate();

  return (
    <main className="pt-20 px-6 max-w-4xl mx-auto">
      <section className="mb-8">
        <span className="font-label text-xs font-semibold tracking-widest text-primary uppercase mb-1 block">Lịch trình của bạn</span>
        <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Lịch tập</h2>
      </section>

      <section className="mb-10">
        <div className="bg-surface-container-low rounded-3xl p-4">
          <div className="flex justify-between items-center mb-6 px-2">
            <h3 className="font-headline font-bold text-lg text-secondary">Tháng 10, 2024</h3>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-surface-container-highest text-secondary hover:bg-secondary-container transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="p-2 rounded-full bg-surface-container-highest text-secondary hover:bg-secondary-container transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="flex justify-between overflow-x-auto hide-scrollbar gap-2 pb-2">
            <div className="flex flex-col items-center min-w-[56px] py-4 rounded-2xl bg-surface-container-highest/50 text-on-surface-variant transition-all">
              <span className="font-label text-[10px] uppercase font-bold mb-2">Th 2</span>
              <span className="font-headline text-lg font-extrabold">21</span>
            </div>
            <div className="flex flex-col items-center min-w-[56px] py-4 rounded-2xl bg-surface-container-highest/50 text-on-surface-variant transition-all">
              <span className="font-label text-[10px] uppercase font-bold mb-2">Th 3</span>
              <span className="font-headline text-lg font-extrabold">22</span>
            </div>
            <div className="flex flex-col items-center min-w-[56px] py-4 rounded-2xl bg-primary text-white scale-110 shadow-lg shadow-primary/20 transition-all">
              <span className="font-label text-[10px] uppercase font-bold mb-2">Th 4</span>
              <span className="font-headline text-lg font-extrabold">23</span>
            </div>
            <div className="flex flex-col items-center min-w-[56px] py-4 rounded-2xl bg-surface-container-highest/50 text-on-surface-variant transition-all">
              <span className="font-label text-[10px] uppercase font-bold mb-2">Th 5</span>
              <span className="font-headline text-lg font-extrabold">24</span>
            </div>
            <div className="flex flex-col items-center min-w-[56px] py-4 rounded-2xl bg-surface-container-highest/50 text-on-surface-variant transition-all">
              <span className="font-label text-[10px] uppercase font-bold mb-2">Th 6</span>
              <span className="font-headline text-lg font-extrabold">25</span>
            </div>
            <div className="flex flex-col items-center min-w-[56px] py-4 rounded-2xl bg-surface-container-highest/50 text-on-surface-variant transition-all">
              <span className="font-label text-[10px] uppercase font-bold mb-2">Th 7</span>
              <span className="font-headline text-lg font-extrabold">26</span>
            </div>
            <div className="flex flex-col items-center min-w-[56px] py-4 rounded-2xl bg-surface-container-highest/50 text-on-surface-variant transition-all">
              <span className="font-label text-[10px] uppercase font-bold mb-2">CN</span>
              <span className="font-headline text-lg font-extrabold">27</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-end mb-2">
          <h3 className="font-headline font-bold text-xl text-secondary">Lịch tập cá nhân</h3>
          <span className="font-label text-xs text-on-surface-variant">6 Buổi tập hàng tuần</span>
        </div>

        {/* Monday */}
        <div className="group relative bg-surface-container-lowest rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary-container flex flex-col items-center justify-center text-primary shrink-0">
                <span className="font-label text-[10px] font-bold uppercase leading-none mb-1">Bắt đầu</span>
                <span className="font-headline text-lg font-extrabold leading-none">17:30</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-label text-[10px] font-bold text-primary uppercase tracking-widest">Thứ 2 (T2)</span>
                </div>
                <h4 className="font-headline font-bold text-xl text-on-surface">Sân TDS</h4>
                <p className="font-body text-sm text-on-surface-variant">17:30 - 19:30 • Sân Pickleball</p>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button className="velocity-gradient text-white px-8 py-3 rounded-full font-label font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                Tham gia
              </button>
            </div>
          </div>
        </div>

        {/* Tuesday */}
        <div className="group relative bg-surface-container-lowest rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary-container flex flex-col items-center justify-center text-primary shrink-0">
                <span className="font-label text-[10px] font-bold uppercase leading-none mb-1">Bắt đầu</span>
                <span className="font-headline text-lg font-extrabold leading-none">17:30</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-label text-[10px] font-bold text-primary uppercase tracking-widest">Thứ 3 (T3)</span>
                </div>
                <h4 className="font-headline font-bold text-xl text-on-surface">Sân Divo</h4>
                <p className="font-body text-sm text-on-surface-variant">17:30 - 19:30 • Hợp đồng cố định</p>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button className="velocity-gradient text-white px-8 py-3 rounded-full font-label font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                Tham gia
              </button>
            </div>
          </div>
        </div>

        {/* Wednesday */}
        <div className="group relative bg-surface-container-lowest rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary-container flex flex-col items-center justify-center text-primary shrink-0">
                <span className="font-label text-[10px] font-bold uppercase leading-none mb-1">Bắt đầu</span>
                <span className="font-headline text-lg font-extrabold leading-none">17:30</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="font-label text-[10px] font-bold text-primary uppercase tracking-widest">Thứ 4 (T4)</span>
                </div>
                <h4 className="font-headline font-bold text-xl text-on-surface">Sân TDS</h4>
                <p className="font-body text-sm text-on-surface-variant">17:30 - 19:30 • Sân Pickleball</p>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button 
                onClick={() => navigate('/session/1')}
                className="velocity-gradient text-white px-8 py-3 rounded-full font-label font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                Tham gia
              </button>
            </div>
          </div>
        </div>

        {/* Thursday */}
        <div className="group relative bg-surface-container-lowest rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary-container flex flex-col items-center justify-center text-primary shrink-0">
                <span className="font-label text-[10px] font-bold uppercase leading-none mb-1">Bắt đầu</span>
                <span className="font-headline text-lg font-extrabold leading-none">17:30</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-label text-[10px] font-bold text-primary uppercase tracking-widest">Thứ 5 (T5)</span>
                </div>
                <h4 className="font-headline font-bold text-xl text-on-surface">Sân Divo</h4>
                <p className="font-body text-sm text-on-surface-variant">17:30 - 19:30 • Hợp đồng cố định</p>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button className="velocity-gradient text-white px-8 py-3 rounded-full font-label font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                Tham gia
              </button>
            </div>
          </div>
        </div>

        {/* Saturday */}
        <div className="group relative bg-surface-container-lowest rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary-container flex flex-col items-center justify-center text-primary shrink-0">
                <span className="font-label text-[10px] font-bold uppercase leading-none mb-1">Bắt đầu</span>
                <span className="font-headline text-lg font-extrabold leading-none">06:00</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-label text-[10px] font-bold text-primary uppercase tracking-widest">Thứ 7 (T7)</span>
                </div>
                <h4 className="font-headline font-bold text-xl text-on-surface">Sân Divo</h4>
                <p className="font-body text-sm text-on-surface-variant">06:00 - 08:00 • Hợp đồng cố định</p>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button className="velocity-gradient text-white px-8 py-3 rounded-full font-label font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                Tham gia
              </button>
            </div>
          </div>
        </div>

        {/* Sunday */}
        <div className="group relative bg-surface-container-lowest rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary-container flex flex-col items-center justify-center text-primary shrink-0">
                <span className="font-label text-[10px] font-bold uppercase leading-none mb-1">Bắt đầu</span>
                <span className="font-headline text-lg font-extrabold leading-none">06:00</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-label text-[10px] font-bold text-primary uppercase tracking-widest">Chủ Nhật (CN)</span>
                </div>
                <h4 className="font-headline font-bold text-xl text-on-surface">Sân Divo</h4>
                <p className="font-body text-sm text-on-surface-variant">06:00 - 08:00 • Hợp đồng cố định</p>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button className="velocity-gradient text-white px-8 py-3 rounded-full font-label font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                Tham gia
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Schedule;
