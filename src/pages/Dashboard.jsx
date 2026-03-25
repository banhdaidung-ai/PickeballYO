import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeToSchedule, getSchedule } from '../services/dataService';
import { useAuth } from '../contexts/AuthContext';
import { getAllUsers } from '../services/authService';
import { subscribeToNews } from '../services/newsService';
import ParticipantModal from '../components/ParticipantModal';

const WEEKDAY_LABELS = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [todaySession, setTodaySession] = useState(null);
  const [tomorrowSession, setTomorrowSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);

  // Leaderboard data
  const [topUsers, setTopUsers] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  // News data
  const [latestNews, setLatestNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeNews = subscribeToNews((data) => {
      setLatestNews(data.slice(0, 3)); // Only show top 3
      setNewsLoading(false);
    }, false);
    
    return () => unsubscribeNews();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToSchedule((data) => {
      const todayIndex = new Date().getDay();
      const tomorrowIndex = (todayIndex + 1) % 7;
      
      const sessionForToday = data.find(s => s.dayIndex === todayIndex);
      const sessionForTomorrow = data.find(s => s.dayIndex === tomorrowIndex);
      
      setTodaySession(sessionForToday || null);
      setTomorrowSession(sessionForTomorrow || null);
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
          <div className="font-label text-xs font-semibold text-secondary uppercase tracking-wider mb-4 px-1 flex items-center justify-between">
             <span>Lịch tập tiếp theo</span>
             {todaySession && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">Hôm nay</span>}
          </div>
          
          {loading ? (
            <div className="bg-white rounded-[2rem] p-6 flex justify-center py-12 border border-[#F2F0ED]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="relative">
              {/* Today's Session Card */}
              {todaySession ? (
                <div 
                  onClick={() => navigate(`/session/${todaySession.id}`)}
                  className="bg-white rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(255,122,0,0.12)] relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-500 z-20 border border-primary/10 mb-[-20px]"
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
                        </div>
                        <p className="font-label text-sm text-secondary flex items-center gap-1 mt-1 font-medium">
                          <span className="material-symbols-outlined text-base">schedule</span> {todaySession.startTime || '00:00'} - {todaySession.timeRange?.split('-')[1]?.trim() || 'Hết giờ'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowParticipants(true); }}
                      className="flex items-center gap-2 hover:bg-slate-50 px-3 py-1.5 rounded-xl transition-colors active:scale-95"
                    >
                      <span className="material-symbols-outlined text-secondary text-sm">group</span>
                      <span className="text-xs font-bold text-secondary">{todaySession.participants?.length || 0} đăng ký</span>
                    </button>
                    <button className="velocity-gradient text-white px-6 py-2.5 rounded-xl text-xs font-label font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all">
                      Tham gia
                    </button>
                  </div>
                </div>
              ) : !tomorrowSession ? (
                <div className="bg-white rounded-[2rem] p-8 text-center border border-dashed border-[#F2F0ED]">
                  <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">event_busy</span>
                  <h3 className="font-headline font-bold text-on-surface text-lg">Không có lịch tập gần nhất</h3>
                </div>
              ) : null}

              {/* Tomorrow's Session Card (3D Stacking Effect) */}
              {tomorrowSession && (
                <div 
                  onClick={() => navigate(`/session/${tomorrowSession.id}`)}
                  className={`bg-white/80 rounded-[2rem] p-6 border border-[#F2F0ED] shadow-sm cursor-pointer transition-all duration-500 scale-[0.92] origin-bottom hover:scale-[0.95] hover:opacity-100 relative group overflow-hidden ${todaySession ? 'opacity-40 translate-y-2' : 'scale-100 opacity-100'}`}
                >
                  {!todaySession && <div className="absolute top-4 right-6 text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Ngày mai</div>}
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                      <div className="bg-slate-100 rounded-2xl w-14 h-14 flex flex-col items-center justify-center text-slate-500 shrink-0">
                        <span className="text-[10px] font-label font-bold uppercase">{WEEKDAY_LABELS[tomorrowSession.dayIndex]}</span>
                        <span className="text-xl font-headline font-extrabold leading-none">
                          {new Date(new Date().setDate(new Date().getDate() + 1)).getDate()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline text-base font-bold text-slate-700 line-clamp-1">{tomorrowSession.courtName}</h3>
                        <p className="font-label text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">schedule</span> {tomorrowSession.startTime}
                        </p>
                      </div>
                    </div>
                    {todaySession && (
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Ngày mai</span>
                    )}
                  </div>
                </div>
              )}
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


        {/* Latest News Section */}
        <section className="pb-12 border-t border-slate-100 pt-10">
          <div className="flex justify-between items-center mb-6 px-1">
            <div>
              <span className="font-label text-xs font-bold text-primary uppercase tracking-widest block mb-1">Cập nhật</span>
              <h3 className="font-headline font-black text-2xl text-on-surface tracking-tight">Tin tức mới nhất</h3>
            </div>
            <button 
              onClick={() => navigate('/news')}
              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-label text-[10px] font-bold uppercase tracking-widest hover:bg-primary-container hover:text-primary transition-all shadow-sm active:scale-95"
            >
              Tất cả
            </button>
          </div>
          
          {newsLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : latestNews.length === 0 ? (
            <div className="text-center py-10 bg-surface-container-low rounded-3xl">
              <p className="text-secondary text-sm font-medium">Chưa có tin tức mới.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => navigate(`/news/${item.id}`)}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 cursor-pointer group"
                >
                  <div className="h-40 relative">
                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg text-[9px] font-bold text-primary uppercase tracking-wider shadow-sm">
                      {item.category || 'Thông báo'}
                    </span>
                  </div>
                  <div className="p-5">
                    <h4 className="font-headline font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2">
                       {item.title}
                    </h4>
                    <p className="text-on-surface-variant text-[11px] font-medium line-clamp-2 mb-4 leading-relaxed">
                      {item.summary || item.content?.substring(0, 80) + '...'}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                       <span className="text-[9px] font-bold text-[#8C7A6B] uppercase tracking-widest">
                         {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString('vi-VN') : ''}
                       </span>
                       <span className="material-symbols-outlined text-sm text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
