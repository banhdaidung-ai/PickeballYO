import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../services/authService';
import { getAllBookings } from '../services/bookingService';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, bookingsData] = await Promise.all([
          getAllUsers(),
          getAllBookings()
        ]);
        
        const matchCounts = {};
        bookingsData.forEach(booking => {
          if (booking.participants) {
            booking.participants.forEach(p => {
              if (p.userId) {
                matchCounts[p.userId] = (matchCounts[p.userId] || 0) + 1;
              }
            });
          }
        });

        const processedUsers = usersData.map(u => {
          const matchCount = matchCounts[u.uid] || 0;
          let league = "BEGINNER";
          if (matchCount >= 50) league = "PRO";
          else if (matchCount >= 10) league = "INTERMEDIATE";

          return { ...u, matchCount, league };
        }).sort((a, b) => b.matchCount - a.matchCount);

        setUsers(processedUsers);
      } catch (error) {
        console.error("Failed to load leaderboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getAvatar = (user) => {
    if (user?.photoURL) return user.photoURL;
    return "https://api.dicebear.com/7.x/avataaars/svg?seed=" + (user?.uid || "default");
  };

  const top3 = users.slice(0, 3);
  const remainingUsers = users.slice(3, 10); // Display top 10 total

  const firstUser = top3[0];
  const secondUser = top3[1];
  const thirdUser = top3[2];

  return (
    <main className="pt-20 pb-32 px-4 sm:px-6 max-w-2xl mx-auto font-body bg-[#FFF9F3] min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-10 px-2 mt-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-[#D65D00] hover:bg-orange-100 p-2 rounded-full transition-colors hidden mb-1 md:block">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="material-symbols-outlined text-[#FF7A00] text-3xl font-bold">search_insights</span>
          <h1 className="text-2xl font-headline font-black text-[#4A2C2A] tracking-tight">Xếp hạng chăm chỉ</h1>
        </div>
        <button className="text-[#4A2C2A]">
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#FF7A00] border-t-transparent"></div>
          <p className="text-[#8E7C7A] font-medium text-sm animate-pulse">Đang tải bảng xếp hạng...</p>
        </div>
      ) : (
        <>
          {/* Podium */}
          <div className="flex items-end justify-center gap-3 mb-12 h-64 mt-8">
            {/* 2nd Place */}
            {secondUser && (
              <div className="flex flex-col items-center relative z-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="relative mb-3 flex flex-col items-center">
                  <img src={getAvatar(secondUser)} alt={secondUser.fullName} className="w-16 h-16 rounded-full border-4 border-[#F1F5F9] object-cover shadow-lg bg-slate-200" />
                  <div className="absolute -bottom-2.5 bg-[#94A3B8] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full ring-2 ring-white">2nd</div>
                </div>
                <div className="w-24 h-32 bg-gradient-to-b from-[#94A3B8] to-[#64748B] rounded-t-2xl shadow-lg flex flex-col items-center justify-center text-white pb-2 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-2xl font-black font-headline tracking-tighter drop-shadow-md">{secondUser.matchCount}</span>
                  <span className="text-[8px] font-bold tracking-[0.2em] mb-4 opacity-90 drop-shadow-md">SESSIONS</span>
                  <span className="text-xs font-bold font-headline truncate w-full px-2 text-center drop-shadow-md">{secondUser.fullName?.split(' ')[0] || "User"}</span>
                </div>
              </div>
            )}

            {/* 1st Place */}
            {firstUser && (
              <div className="flex flex-col items-center relative z-20 animate-fade-in" style={{ animationDelay: '400ms' }}>
                <div className="relative mb-4 flex flex-col items-center">
                  <div className="absolute -top-6 text-[#EAB308] z-30">
                    <span className="material-symbols-outlined text-3xl drop-shadow-sm" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                  </div>
                  <img src={getAvatar(firstUser)} alt={firstUser.fullName} className="w-20 h-20 rounded-full border-4 border-[#FEF08A] object-cover shadow-xl bg-yellow-100 ring-2 ring-[#EAB308]/30" />
                  <div className="absolute -bottom-3 bg-[#D97706] text-white text-[11px] font-black px-3 py-0.5 rounded-full ring-2 ring-white shadow-sm">1st</div>
                </div>
                <div className="w-28 h-40 bg-gradient-to-b from-[#EAB308] to-[#B45309] rounded-t-2xl shadow-[0_10px_30px_rgba(217,119,6,0.3)] flex flex-col items-center justify-center text-white pb-4 relative overflow-hidden group">
                  <span className="absolute -left-4 top-4 material-symbols-outlined text-6xl text-white/20 -rotate-12 pointer-events-none" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-4xl font-black font-headline tracking-tighter drop-shadow-md mt-4">{firstUser.matchCount}</span>
                  <span className="text-[9px] font-bold tracking-[0.2em] mb-4 opacity-90 drop-shadow-md">SESSIONS</span>
                  <span className="text-sm font-bold font-headline truncate w-full px-2 text-center mt-2 drop-shadow-md">{firstUser.fullName?.split(' ').slice(-1)[0] || firstUser.fullName || "User"}</span>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {thirdUser && (
              <div className="flex flex-col items-center relative z-10 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="relative mb-2 flex flex-col items-center">
                  <img src={getAvatar(thirdUser)} alt={thirdUser.fullName} className="w-14 h-14 rounded-full border-4 border-[#FFEDD5] object-cover shadow-md bg-orange-100" />
                  <div className="absolute -bottom-2 bg-[#9A3412] text-white text-[9px] font-black px-2 py-0.5 rounded-full ring-2 ring-white">3rd</div>
                </div>
                <div className="w-24 h-28 bg-gradient-to-b from-[#D97706] to-[#78350F] rounded-t-2xl shadow-lg flex flex-col items-center justify-center text-white pb-2 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-xl font-black font-headline tracking-tighter drop-shadow-md">{thirdUser.matchCount}</span>
                  <span className="text-[7px] font-bold tracking-[0.2em] mb-4 opacity-90 drop-shadow-md">SESSIONS</span>
                  <span className="text-[11px] font-bold font-headline truncate w-full px-2 text-center drop-shadow-md">{thirdUser.fullName?.split(' ').slice(-1)[0] || "User"}</span>
                </div>
              </div>
            )}
          </div>

          {/* List Header */}
          <div className="flex justify-between items-center mb-6 px-1 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <h2 className="text-xl font-headline font-extrabold text-[#4A2C2A]">Phân hạng câu lạc bộ</h2>
            <span className="bg-[#FFEDD5] text-[#9A3412] text-[10px] font-bold px-3 py-1.5 rounded-full">Cập nhật 2 giờ trước</span>
          </div>

          {/* Ranked List */}
          <div className="space-y-3 mb-10 overflow-hidden" style={{ animation: 'fadeIn 0.8s ease-out forwards', opacity: 0 }}>
            <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>
            {remainingUsers.map((user, index) => (
              <div key={user.uid} className="bg-[#FFF5EC] rounded-2xl p-4 flex items-center shadow-sm hover:shadow-md transition-shadow relative overflow-hidden border border-[#FFE4C4]/50 group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent -translate-y-10 translate-x-10 rounded-full group-hover:scale-110 transition-transform"></div>
                
                <span className="text-lg font-black font-headline text-[#B45309] w-8 text-center shrink-0">{index + 4}</span>
                
                <img src={getAvatar(user)} alt={user.fullName} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm ml-2 bg-slate-100" />
                
                <div className="ml-4 flex-1">
                  <h3 className="font-headline font-bold text-[#4A2C2A] text-sm leading-tight mb-1">{user.fullName || "Ẩn danh"}</h3>
                  <p className="font-label text-[9px] font-black text-[#57534E] tracking-widest uppercase">{user.league}</p>
                </div>
                
                <div className="text-right flex flex-col justify-center">
                  <span className="font-headline font-black text-[#9A3412] text-xl leading-none">{user.matchCount}</span>
                  <span className="font-label text-[8px] font-bold text-[#B45309] tracking-widest uppercase mt-1">BUỔI</span>
                </div>
              </div>
            ))}
            
            {remainingUsers.length === 0 && (
              <div className="text-center p-8 bg-white/50 rounded-2xl">
                <p className="text-sm font-medium text-[#8E7C7A]">Chưa có thêm thành viên nào.</p>
              </div>
            )}
          </div>

          {/* Banner */}
          <div className="bg-gradient-to-r from-[#FF7A00] to-[#E55A00] rounded-2xl p-6 text-white relative overflow-hidden shadow-[0_8px_30px_rgba(255,122,0,0.3)] animate-fade-in" style={{ animationDelay: '800ms' }}>
            {/* Minimal line chart background decoration */}
            <svg className="absolute bottom-0 right-0 h-16 w-full opacity-20 translate-y-4 translate-x-10" viewBox="0 0 200 100" preserveAspectRatio="none">
              <path d="M0 100 L 0 80 L 40 70 L 80 90 L 120 40 L 160 60 L 200 20 L 200 100 Z" fill="white" />
            </svg>
            <div className="relative z-10 flex flex-col">
              <h3 className="text-2xl font-headline font-black tracking-tighter mb-1">Mục tiêu tuần này</h3>
              <p className="font-label text-[10px] font-extrabold tracking-widest uppercase mb-4 opacity-90 leading-relaxed">Cố gắng thêm 2 buổi để thăng hạng!</p>
              <div className="w-full bg-[#CC4A00] rounded-full h-3.5 mb-1 overflow-hidden">
                <div className="bg-white h-full rounded-full w-[70%] mt-0 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Leaderboard;
