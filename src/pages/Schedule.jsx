import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeToSchedule } from '../services/dataService';

const Schedule = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToSchedule((data) => {
      // Sort by day if needed, or by time
      setSessions(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
          <span className="font-label text-xs text-on-surface-variant">{sessions.length} Buổi tập hàng tuần</span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-lowest rounded-[2rem]">
            <p className="text-on-surface-variant font-body">Chưa có lịch tập nào được thiết lập.</p>
          </div>
        ) : (
          sessions.map((session) => (
            <div key={session.id} className="group relative bg-surface-container-lowest rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-primary-container flex flex-col items-center justify-center text-primary shrink-0">
                    <span className="font-label text-[10px] font-bold uppercase leading-none mb-1">Bắt đầu</span>
                    <span className="font-headline text-lg font-extrabold leading-none">{session.startTime || '00:00'}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${session.isLive ? 'bg-primary animate-pulse' : 'bg-primary'}`}></span>
                      <span className="font-label text-[10px] font-bold text-primary uppercase tracking-widest">{session.dayLabel || 'Thứ 2'}</span>
                    </div>
                    <h4 className="font-headline font-bold text-xl text-on-surface">{session.courtName || 'Sân trống'}</h4>
                    <p className="font-body text-sm text-on-surface-variant">{session.timeRange || ''} • {session.type || 'Sân Pickleball'}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <button 
                    onClick={() => navigate(`/session/${session.id}`)}
                    className="velocity-gradient text-white px-8 py-3 rounded-full font-label font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    Tham gia
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default Schedule;
