import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeToSchedule } from '../services/dataService';
import { getUserBookings } from '../services/bookingService';
import { useAuth } from '../contexts/AuthContext';
import ParticipantModal from '../components/ParticipantModal';

const WEEKDAY_LABELS = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'];

const Schedule = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('week');
  const [showParticipants, setShowParticipants] = useState(null); // stores session object
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  useEffect(() => {
    const unsubscribe = subscribeToSchedule((data) => {
      setSessions(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const today = new Date();

  /* ─── Week strip data ─── */
  const todayDow = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((todayDow === 0 ? 7 : todayDow) - 1));
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return { date: d, dayNum: d.getDate(), jsDay: d.getDay(), label: WEEKDAY_LABELS[d.getDay()], isToday: d.toDateString() === today.toDateString() };
  });

  /* ─── Month grid data ─── */
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Offset so grid starts on Monday (Mon=0 col, Sun=6 col)
  const gridOffset = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
  const totalCells = gridOffset + daysInMonth;
  const monthCells = Array.from({ length: Math.ceil(totalCells / 7) * 7 }, (_, i) => {
    const dayNum = i - gridOffset + 1;
    if (dayNum < 1 || dayNum > daysInMonth) return null;
    const d = new Date(year, month, dayNum);
    return { date: d, dayNum, jsDay: d.getDay(), isToday: d.toDateString() === today.toDateString() };
  });

  const monthLabel = currentMonth.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });

  /* ─── Filtered sessions ─── */
  const selectedJsDay = selectedDate ? selectedDate.getDay() : null;
  const displayedSessions = selectedJsDay !== null
    ? sessions.filter(s => s.dayIndex === selectedJsDay)
    : sessions;

  const hasSessionOnDay = (jsDay) => sessions.some(s => s.dayIndex === jsDay);

  // Check if user has a booking on a specific day of week
  const isUserBookedOnDay = (jsDay) => {
    const sessionOnDay = sessions.find(s => s.dayIndex === jsDay);
    return sessionOnDay ? sessionOnDay.participants?.some(p => p.userId === user?.uid) : false;
  };

  return (
    <main className="pt-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <section className="mb-8 flex items-end justify-between">
        <div>
          <span className="font-label text-xs font-semibold tracking-widest text-primary uppercase mb-1 block">Lịch trình của bạn</span>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Lịch tập</h2>
        </div>
        {/* Toggle buttons */}
        <div className="flex gap-1 bg-surface-container-low rounded-xl p-1">
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded-lg font-label text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'week' ? 'velocity-gradient text-white shadow' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Tuần
          </button>
          <button
            onClick={() => setViewMode('month')}
            className={`px-4 py-2 rounded-lg font-label text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'month' ? 'velocity-gradient text-white shadow' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Tháng
          </button>
        </div>
      </section>

      <section className="mb-10">
        <div className="bg-surface-container-low rounded-3xl p-4">
          {/* Header row */}
          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="font-headline font-bold text-lg text-secondary capitalize">{monthLabel}</h3>
            <div className="flex items-center gap-2">
              {selectedDate !== null && (
                <button onClick={() => setSelectedDate(null)} className="text-[10px] font-bold text-primary font-label uppercase tracking-widest hover:underline mr-2">
                  Xem tất cả
                </button>
              )}
              {viewMode === 'month' && (
                <div className="flex gap-1">
                  <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} className="p-2 rounded-xl bg-surface-container-highest text-secondary hover:bg-secondary-container transition-colors">
                    <span className="material-symbols-outlined text-sm leading-none">chevron_left</span>
                  </button>
                  <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} className="p-2 rounded-xl bg-surface-container-highest text-secondary hover:bg-secondary-container transition-colors">
                    <span className="material-symbols-outlined text-sm leading-none">chevron_right</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── WEEK STRIP VIEW ── */}
          {viewMode === 'week' && (
            <div className="flex justify-between overflow-x-auto hide-scrollbar gap-2 pb-2">
              {weekDays.map((wd) => {
                const isSelected = selectedDate && selectedDate.toDateString() === wd.date.toDateString();
                const sessionOnDay = sessions.find(s => s.dayIndex === wd.jsDay);
                const isBooked = sessionOnDay?.participants?.some(p => p.userId === user?.uid);
                return (
                  <button
                    key={wd.jsDay}
                    onClick={() => setSelectedDate(isSelected ? null : wd.date)}
                    className={`flex flex-col items-center min-w-[48px] py-4 rounded-2xl transition-all duration-200 font-headline flex-1
                      ${isSelected
                        ? 'velocity-gradient text-white scale-110 shadow-lg shadow-primary/20'
                        : wd.isToday
                          ? 'bg-primary-container text-primary font-extrabold ring-2 ring-primary/30'
                          : 'bg-surface-container-highest/50 text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                  >
                    <span className="font-label text-[9px] uppercase font-bold mb-2">{wd.label}</span>
                    <span className="text-base font-extrabold leading-none">{wd.dayNum}</span>
                    {hasSessionOnDay(wd.jsDay) && (
                      <span className={`w-1.5 h-1.5 rounded-full mt-2 ${
                        isSelected ? 'bg-white'
                        : isBooked ? 'bg-green-500'
                        : 'bg-primary'
                      }`}></span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* ── FULL MONTH GRID VIEW ── */}
          {viewMode === 'month' && (
            <div>
              {/* Day-of-week headers (Mon–Sun) */}
              <div className="grid grid-cols-7 mb-2">
                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
                  <div key={d} className="text-center font-label text-[9px] font-bold text-outline-variant uppercase py-1">{d}</div>
                ))}
              </div>
              {/* Day cells */}
              <div className="grid grid-cols-7 gap-1">
                {monthCells.map((cell, i) => {
                  if (!cell) return <div key={i} />;
                  // Only this exact date cell gets highlighted, not all cells of the same weekday
                  const isSelected = selectedDate && selectedDate.toDateString() === cell.date.toDateString();
                  const sessionOnDay = sessions.find(s => s.dayIndex === cell.jsDay);
                  const isBooked = sessionOnDay?.participants?.some(p => p.userId === user?.uid);
                  const hasSessions = hasSessionOnDay(cell.jsDay);
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(isSelected ? null : cell.date)}
                      className={`relative flex flex-col items-center justify-center h-10 w-full rounded-xl text-sm font-extrabold font-headline transition-all duration-150
                        ${isSelected
                          ? 'velocity-gradient text-white shadow-md'
                          : cell.isToday
                            ? 'bg-primary-container text-primary ring-2 ring-primary/30'
                            : 'hover:bg-surface-container-high text-on-surface'
                        }`}
                    >
                      {cell.dayNum}
                      {hasSessions && (
                        <span className={`absolute bottom-1 w-1 h-1 rounded-full ${
                          isSelected ? 'bg-white'
                          : isBooked ? 'bg-green-500'
                          : 'bg-primary'
                        }`}></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Session list */}
      <section className="space-y-6 pb-32">
        <div className="flex justify-between items-end mb-2">
          <h3 className="font-headline font-bold text-xl text-secondary">
            {selectedDate !== null
              ? `Lịch ${WEEKDAY_LABELS[selectedDate.getDay()]}, ngày ${selectedDate.getDate()}`
              : 'Lịch tập cá nhân'}
          </h3>
          <span className="font-label text-xs text-on-surface-variant">{displayedSessions.length} buổi tập</span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : displayedSessions.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-lowest rounded-[2rem]">
            <span className="material-symbols-outlined text-5xl text-outline-variant mb-3 block">event_busy</span>
            <p className="text-on-surface-variant font-body">Không có lịch tập cho ngày này.</p>
          </div>
        ) : (
          displayedSessions.map((session) => {
            const sessionWeekDay = weekDays.find(d => d.jsDay === session.dayIndex);
            const realDateLabel = sessionWeekDay
              ? sessionWeekDay.date.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit' })
              : (WEEKDAY_LABELS[session.dayIndex] || session.dayLabel || '');

            const isJoined = session.participants?.some(p => p.userId === user?.uid);
            return (
              <div key={session.id} className={`group relative rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${isJoined ? 'bg-green-50 border border-green-200' : 'bg-surface-container-lowest'}`}>
                {isJoined && (
                  <div className="absolute top-3 right-4 flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                    <span className="material-symbols-outlined text-green-600 text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="text-[9px] font-bold text-green-700 uppercase tracking-widest">Đã đăng ký</span>
                  </div>
                )}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 ${isJoined ? 'bg-green-100 text-green-700' : 'bg-primary-container text-primary'}`}>
                      <span className="font-label text-[10px] font-bold uppercase leading-none mb-1">Bắt đầu</span>
                      <span className="font-headline text-lg font-extrabold leading-none">{session.startTime || '00:00'}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${isJoined ? 'bg-green-500' : 'bg-primary'}`}></span>
                        <span className={`font-label text-[10px] font-bold uppercase tracking-widest ${isJoined ? 'text-green-600' : 'text-primary'}`}>{realDateLabel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-headline font-bold text-xl text-on-surface">{session.courtName || 'Sân trống'}</h4>
                        {session.locationUrl && (
                          <a 
                            href={session.locationUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FFF0E5] text-[#FF7A00] hover:bg-[#FFE0CC] transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">location_on</span>
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="font-body text-sm text-on-surface-variant line-clamp-1">{session.timeRange || ''} • {session.type || 'Sân Pickleball'}</p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setShowParticipants(session); }}
                          className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-secondary"
                        >
                          <span className="material-symbols-outlined text-[14px]">group</span>
                          <span className="text-[11px] font-bold font-label uppercase tracking-wider">{session.participants?.length || 0}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => navigate(`/session/${session.id}`)}
                      className={`px-6 py-3 rounded-full font-label font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2
                        ${isJoined
                          ? 'bg-green-600 text-white shadow-green-900/20'
                          : 'velocity-gradient text-white shadow-primary/20'
                        }`}
                    >
                      {isJoined ? (
                        <>
                          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          Bạn đã tham gia
                        </>
                      ) : 'Tham gia'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>

      {showParticipants && (
        <ParticipantModal 
          participants={showParticipants.participants}
          onClose={() => setShowParticipants(null)}
        />
      )}
    </main>
  );
};

export default Schedule;
