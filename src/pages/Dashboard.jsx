import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeToSchedule, getSchedule } from '../services/dataService';
import { useAuth } from '../contexts/AuthContext';
import { getAllUsers } from '../services/authService';

const WEEKDAY_LABELS = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'];

// ─── Component: Participant Modal ───────────────────────────────────────────
const ParticipantModal = ({ participants, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-black text-2xl text-[#4A2C2A] tracking-tight italic">Participants</h3>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FFF8F3] text-[#FF7A00] shadow-sm">
            <span className="material-symbols-outlined font-bold">close</span>
          </button>
        </div>
        
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {participants && participants.length > 0 ? (
            participants.map((p, i) => (
              <div key={i} className="flex items-center gap-4 bg-[#FFF8F3] p-4 rounded-2xl border border-orange-100/50">
                <div className="w-10 h-10 rounded-full bg-[#FF7A00] flex items-center justify-center text-white font-headline font-black">
                   {p.userName?.charAt(0) || '?'}
                </div>
                <div>
                  <p className="font-headline font-bold text-[#4A2C2A]">{p.userName || 'Thành viên'}</p>
                  <p className="text-[10px] font-bold text-[#FF7A00] uppercase tracking-widest opacity-60">Đã đăng ký</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-10 text-[#8E7C7A] font-medium italic">Chưa có ai tham gia buổi này.</p>
          )}
        </div>
        
        <button onClick={onClose} className="w-full py-4 velocity-gradient text-white rounded-2xl font-headline font-black uppercase tracking-tight shadow-lg shadow-orange-900/20 active:scale-95 transition-all">
          Đóng
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [todaySession, setTodaySession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);

  // Leaderboard data
  const [topUsers, setTopUsers] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToSchedule((data) => {
      const todayIndex = new Date().getDay();
      const sessionForToday = data.find(s => s.dayIndex === todayIndex);
      setTodaySession(sessionForToday || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const [usersData, scheduleData] = await Promise.all([
          getAllUsers(),
          getSchedule()
        ]);
        
        const matchCounts = {};
        scheduleData.forEach(session => {
          if (session.participants) {
            session.participants.forEach(p => {
              if (p.userId) {
                matchCounts[p.userId] = (matchCounts[p.userId] || 0) + 1;
              }
            });
          }
        });

        const ranked = usersData.map(u => ({
          ...u,
          matchCount: matchCounts[u.uid] || 0
        })).sort((a, b) => b.matchCount - a.matchCount).slice(0, 3);

        setTopUsers(ranked);
      } catch (e) {
        console.error("Leaderboard fetch error:", e);
      } finally {
        setLeaderboardLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Chào buổi sáng';
    if (hour >= 12 && hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  const displayName = user?.displayName?.split(' ')[0] || 'bạn';
  const todayDateObj = new Date();

  return (
    <main className="pt-20 px-6 max-w-2xl mx-auto space-y-10 min-h-screen flex flex-col">
      <div className="flex-grow space-y-10">
        <section className="relative pt-4 text-center md:text-left">
          <div className="flex flex-col">
            <span className="font-label text-sm uppercase tracking-widest text-secondary font-semibold">
              {getGreeting()}, {displayName}
            </span>
            <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mt-1">Sẵn sàng ra sân chưa?</h2>
          </div>
          <div className="absolute -top-4 -right-8 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-9xl">sports_tennis</span>
          </div>
        </section>

        <section>
          <div className="font-label text-xs font-semibold text-secondary uppercase tracking-wider mb-4 px-1">Buổi tập hôm nay</div>
          {loading ? (
            <div className="bg-surface-container-lowest rounded-[2rem] p-6 flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : todaySession ? (
            <div 
              onClick={() => navigate(`/session/${todaySession.id}`)}
              className="bg-surface-container-lowest rounded-[2rem] p-6 shadow-[0_8px_24px_rgba(255,122,0,0.06)] relative overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="absolute top-0 right-0 w-32 h-32 velocity-gradient opacity-10 rounded-bl-full translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="bg-primary-container rounded-2xl w-14 h-14 flex flex-col items-center justify-center text-on-primary-container shrink-0">
                    <span className="text-xs font-label font-bold uppercase">{WEEKDAY_LABELS[todaySession.dayIndex]}</span>
                    <span className="text-xl font-headline font-extrabold leading-none">{todayDateObj.getDate()}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                       {todaySession.locationUrl ? (
                        <a 
                          href={todaySession.locationUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="font-headline text-lg font-bold text-primary hover:text-[#C35A00] transition-colors line-clamp-1 flex items-center gap-1"
                        >
                          {todaySession.courtName || 'Sân trống'}
                          <span className="material-symbols-outlined text-xs">open_in_new</span>
                        </a>
                      ) : (
                        <h3 className="font-headline text-lg font-bold text-on-surface line-clamp-1">{todaySession.courtName || 'Sân trống'}</h3>
                      )}
                      
                      {todaySession.locationUrl && (
                        <a 
                          href={todaySession.locationUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FFF0E5] text-[#FF7A00] hover:bg-[#FFE0CC] transition-colors"
                          title="Xem bản đồ"
                        >
                          <span className="material-symbols-outlined text-lg">location_on</span>
                        </a>
                      )}
                    </div>
                    <p className="font-label text-sm text-secondary flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-base">schedule</span> {todaySession.startTime || '00:00'} - {todaySession.timeRange?.split('-')[1]?.trim() || 'Hết giờ'}
                    </p>
                  </div>
                </div>
                {todaySession.type && (
                  <div className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-[10px] font-label font-bold tracking-wide uppercase whitespace-nowrap hidden sm:block">
                    {todaySession.type}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-surface-container pt-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowParticipants(true); }}
                  className="flex items-center gap-2 hover:bg-surface-container-high px-3 py-1.5 rounded-xl transition-colors active:scale-95"
                >
                  <span className="material-symbols-outlined text-secondary text-sm">group</span>
                  <span className="text-xs font-bold text-secondary">{todaySession.participants?.length || 0} người tham gia</span>
                </button>
                <button 
                  className="velocity-gradient text-white px-5 py-2.5 rounded-xl text-xs font-label font-bold shadow-lg shadow-primary/20 group-hover:scale-105 active:scale-95 transition-all"
                >
                  Tham gia
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-lowest rounded-[2rem] p-8 text-center border border-dashed border-outline-variant/30">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">event_busy</span>
              <h3 className="font-headline font-bold text-on-surface text-lg">Không có lịch tập hôm nay</h3>
              <p className="text-sm text-on-surface-variant mt-1">Hãy chuẩn bị nghỉ ngơi hoặc đặt sân riêng nhé.</p>
            </div>
          )}
        </section>

        {/* ─── Leaderboard Mini Section ─── */}
        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <div className="font-label text-xs font-semibold text-secondary uppercase tracking-wider">Xếp hạng chăm chỉ</div>
            <button onClick={() => navigate('/leaderboard')} className="text-primary text-xs font-label font-bold flex items-center gap-1">
              Xem thêm <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
          
          <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-[#F2F0ED]">
            {leaderboardLoading ? (
              <div className="flex justify-center py-4"><div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" /></div>
            ) : topUsers.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {topUsers.map((u, i) => (
                  <div key={u.uid} className="flex flex-col items-center text-center p-2 rounded-2xl hover:bg-[#FFF8F3] transition-colors relative">
                    <div className="relative mb-2">
                      <img 
                        src={u.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.uid}`} 
                        alt={u.fullName} 
                        className={`w-12 h-12 rounded-full border-2 object-cover ${i === 0 ? 'border-yellow-400' : i === 1 ? 'border-slate-300' : 'border-orange-200'}`}
                      />
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-sm ${i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-slate-400' : 'bg-orange-600'}`}>
                        {i + 1}
                      </div>
                    </div>
                    <span className="text-[10px] font-headline font-black text-[#4A2C2A] truncate w-full">{u.fullName?.split(' ').slice(-1)[0] || 'User'}</span>
                    <span className="text-[9px] font-bold text-primary">{u.matchCount} buổi</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-xs text-[#8E7C7A] py-2">Chưa có dữ liệu xếp hạng.</p>
            )}
          </div>
        </section>

        <section>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-start p-5 bg-surface-container-low rounded-3xl hover:bg-white transition-all group border border-transparent hover:border-outline-variant/20 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">calendar_add_on</span>
              </div>
              <span className="font-headline font-bold text-on-surface">Đặt sân</span>
              <span className="font-label text-[10px] text-secondary uppercase mt-1">Sắp ra mắt</span>
            </button>
            <button className="flex flex-col items-start p-5 bg-surface-container-low rounded-3xl hover:bg-white transition-all group border border-transparent hover:border-outline-variant/20 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-secondary mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">person_add</span>
              </div>
              <span className="font-headline font-bold text-on-surface">Mời bạn</span>
              <span className="font-label text-[10px] text-secondary uppercase mt-1">Tìm đồng đội</span>
            </button>
          </div>
        </section>

        <section className="pb-8">
          <div className="flex justify-between items-center mb-4 px-1">
            <div className="font-label text-xs font-semibold text-secondary uppercase tracking-wider">Tin tức &amp; Sự kiện</div>
            <button className="text-primary text-xs font-label font-bold">Tất cả</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6">
            {/* ... news items ... */}
            <div className="flex-none w-72 h-44 rounded-3xl relative overflow-hidden group">
              <img alt="Tournament" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlZjZ89DDaUIO_29x-16pljPJLQXNwhBSsOnkjt0H634GZPUtOZqVAUhsT1VuluOCTbxxicJMPxAIHDUVh-c8xIUdOP2kKfO-ywGkO-6W7PcbiCih03-z061TwVsX223YP-hP14qBoXvUiv07Z4Hs1ZPKFOUdJAy9BueO3yExVH9ROgkRnIEP909pKyhlwSToiPPv9Clqejg9GQvGnKHmHqESXBEvC2oUd7qJl3yBkeI9cy5sKa0Qp8zQ3O6L1k3XjLhdNc-CeXl0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="bg-primary text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase mb-2 inline-block">Sắp diễn ra</span>
                <h4 className="text-white font-headline font-bold leading-tight">Giải YODY Open 2024</h4>
              </div>
            </div>
            <div 
              onClick={() => navigate('/registration')}
              className="flex-none w-72 h-44 rounded-3xl relative overflow-hidden group cursor-pointer"
            >
              <img alt="Training" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQHqDxb_jjvO21wBYVTK4OpBJAA7BI8sL6Ru9CXYlkpIQegeHvirP6IJiNEAoO2w4s2MjoWEwQi3OCzuu9vLQaQiNo-T-g7fyOiQLGS3msFe3uPvRjTAdqGpr2GEC3knOoGgIBquf3DZk8uYb9E6xWoxqp7qlMbiNLXkJKAkiC-iX6f2q5NnogpA73Hph13GSXBOINT-jOQaezxcFurIPdLQtGhP-gggbJmcgCS-AAA6ZFy-ZrhquZbqTW3GBrtNBZ3MhdZVk3pqk" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="bg-secondary text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase mb-2 inline-block">Ưu đãi</span>
                <h4 className="text-white font-headline font-bold leading-tight">Khóa học Pro-Skills</h4>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="w-full text-center py-6 mt-auto">
        <p className="font-label text-xs text-secondary font-semibold uppercase tracking-widest">
          Ứng dụng được tạo bởi Bành Đại Dũng
        </p>
      </footer>

      {/* Participant Modal State */}
      {showParticipants && todaySession && (
        <ParticipantModal 
          participants={todaySession.participants} 
          onClose={() => setShowParticipants(false)} 
        />
      )}
    </main>
  );
};

export default Dashboard;
