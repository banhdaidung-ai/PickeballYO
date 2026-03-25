import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../services/authService';
import { getAllBookings } from '../services/bookingService';

const Members = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, bookingsData] = await Promise.all([
          getAllUsers(),
          getAllBookings()
        ]);
        
        // Calculate match count per user from bookings
        const matchCounts = {};
        let topCount = 0;
        bookingsData.forEach(booking => {
          if (booking.participants) {
            booking.participants.forEach(p => {
              if (p.userId) {
                matchCounts[p.userId] = (matchCounts[p.userId] || 0) + 1;
                if (matchCounts[p.userId] > topCount) topCount = matchCounts[p.userId];
              }
            });
          }
        });

        // Determine leagues and stats
        const processedUsers = usersData.map(u => {
          const matchCount = matchCounts[u.uid] || 0;
          let league = "BEGINNER";
          let leagueColor = "text-[#8C7A6B]"; // Muted brown/gray
          if (matchCount >= 50) {
            league = "PRO LEAGUE";
            leagueColor = "text-[#FF7A00]"; // Primary Orange
          } else if (matchCount >= 10) {
            league = "INTERMEDIATE";
            leagueColor = "text-[#2A3B4C]"; // Navy Blue
          }

          // Deterministic mock for fund payment based on string length to avoid flicker
          const hasPaidFund = (u.uid && u.uid.charCodeAt(0) % 2 === 0) || matchCount > 5;

          return {
            ...u,
            matchCount,
            league,
            leagueColor,
            isTopMember: matchCount > 0 && matchCount >= (topCount * 0.8), // Top 20% active roughly
            hasPaidFund
          };
        }).sort((a, b) => b.matchCount - a.matchCount);

        setUsers(processedUsers);
      } catch (error) {
        console.error("Failed to load users and bookings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = users.filter(user => {
    const term = searchTerm.toLowerCase();
    const nameMatch = user.fullName && user.fullName.toLowerCase().includes(term);
    const phoneMatch = user.phone && user.phone.includes(term);
    const matchesSearch = nameMatch || phoneMatch;

    if (!matchesSearch) return false;

    if (activeFilter === 'all') return true;
    if (activeFilter === 'beginner' && user.league === 'BEGINNER') return true;
    if (activeFilter === 'intermediate' && user.league === 'INTERMEDIATE') return true;
    if (activeFilter === 'pro' && user.league === 'PRO LEAGUE') return true;

    return false;
  });

  return (
    <main className="pt-24 pb-32 px-4 sm:px-6 max-w-7xl mx-auto font-body bg-[#FDFBF9] min-h-screen">
      {/* Header and Controls */}
      <section className="mb-8">
        <div className="mb-6">
          <span className="font-label text-[#FF7A00] font-bold uppercase tracking-[0.2em] text-[10px] mb-1 block">Cộng đồng</span>
          <h2 className="text-4xl font-headline font-black text-[#1C1B1F] tracking-tighter">Thành viên</h2>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="relative group w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#8C7A6B] text-[20px]">search</span>
            <input 
              className="w-full pl-12 pr-4 py-3.5 bg-[#F2F0ED] rounded-2xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/30 transition-all placeholder:text-[#8C7A6B] text-[#1C1B1F]" 
              placeholder="Tìm kiếm thành viên..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button onClick={() => window.location.hash = '#/leaderboard'} className="relative overflow-hidden flex items-center justify-between w-full p-4 bg-gradient-to-r from-[#FF7A00] via-[#E55A00] to-[#E55A00] rounded-[20px] shadow-lg shadow-[#FF7A00]/30 border border-[#FF7A00]/20 active:scale-[0.98] transition-all group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-16 translate-x-12 pointer-events-none"></div>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                <span className="material-symbols-outlined text-white text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
              </div>
              <div className="text-left">
                <h3 className="font-headline text-lg font-black text-white tracking-wide leading-tight">Xếp hạng chăm chỉ</h3>
                <p className="font-label text-[10px] text-white/80 uppercase tracking-widest font-bold mt-0.5">Vinh danh & Bảng xếp hạng</p>
              </div>
            </div>
            
            <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:translate-x-1 transition-transform">
              <span className="material-symbols-outlined text-white text-sm">arrow_forward_ios</span>
            </div>
          </button>
        </div>

        {/* Statistics Row */}
        {!loading && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F2F0ED] flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFF0E5] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#FF7A00]" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#8C7A6B] uppercase tracking-widest">Tổng</p>
                <p className="text-2xl font-black font-headline text-[#1C1B1F] leading-tight">{users.length}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F2F0ED] flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFF0E5] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#FF7A00]" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#8C7A6B] uppercase tracking-widest">Pro</p>
                <p className="text-2xl font-black font-headline text-[#FF7A00] leading-tight">{users.filter(u => u.league === 'PRO LEAGUE').length}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F2F0ED] flex items-center gap-3">
              <div className="w-10 h-10 bg-[#EBF1F8] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#2A3B4C]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#8C7A6B] uppercase tracking-widest">Inter</p>
                <p className="text-2xl font-black font-headline text-[#2A3B4C] leading-tight">{users.filter(u => u.league === 'INTERMEDIATE').length}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F2F0ED] flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F5F2EF] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#8C7A6B]" style={{ fontVariationSettings: "'FILL' 1" }}>person_play</span>
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#8C7A6B] uppercase tracking-widest">Beginner</p>
                <p className="text-2xl font-black font-headline text-[#8C7A6B] leading-tight">{users.filter(u => u.league === 'BEGINNER').length}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-6 overflow-x-auto hide-scrollbar pb-2">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-2.5 rounded-full font-label text-xs font-bold whitespace-nowrap transition-colors ${activeFilter === 'all' ? 'velocity-gradient text-white shadow-md' : 'bg-white text-[#8C7A6B] border border-[#E6E0D8]'}`}
          >
            Tất cả
          </button>
          <button 
            onClick={() => setActiveFilter('beginner')}
            className={`px-6 py-2.5 rounded-full font-label text-xs font-bold whitespace-nowrap transition-colors ${activeFilter === 'beginner' ? 'velocity-gradient text-white shadow-md' : 'bg-white text-[#8C7A6B] border border-[#E6E0D8]'}`}
          >
            Beginner
          </button>
          <button 
            onClick={() => setActiveFilter('intermediate')}
            className={`px-6 py-2.5 rounded-full font-label text-xs font-bold whitespace-nowrap transition-colors ${activeFilter === 'intermediate' ? 'velocity-gradient text-white shadow-md' : 'bg-white text-[#8C7A6B] border border-[#E6E0D8]'}`}
          >
            Intermediate
          </button>
          <button 
            onClick={() => setActiveFilter('pro')}
            className={`px-6 py-2.5 rounded-full font-label text-xs font-bold whitespace-nowrap transition-colors ${activeFilter === 'pro' ? 'velocity-gradient text-white shadow-md' : 'bg-white text-[#8C7A6B] border border-[#E6E0D8]'}`}
          >
            Pro League
          </button>
        </div>
      </section>

      {/* Main Card Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#FF7A00] border-t-transparent"></div>
          <p className="text-[#8C7A6B] font-medium text-sm animate-pulse">Đang tải dữ liệu thành viên...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-6xl text-[#E6E0D8] mb-4">person_search</span>
          <p className="text-[#8C7A6B] font-medium">Không tìm thấy thành viên phù hợp</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map(user => (
            <div key={user.uid} className="bg-white rounded-[2.5rem] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center text-center relative hover:shadow-[0_8px_30px_rgba(255,122,0,0.06)] transition-all duration-300 border border-[#F2F0ED]">
              
              {user.isTopMember && (
                <div className="absolute -top-3 right-4 bg-[#FF7A00] text-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md z-10">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                  <span className="font-label text-[9px] font-black uppercase tracking-widest">Tích cực</span>
                </div>
              )}

              <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden mb-4 mt-2 shadow-sm bg-[#F2F0ED] border-4 border-white flex items-center justify-center flex-shrink-0 relative">
                {user.photoURL ? (
                  <img alt={user.fullName} className="w-full h-full object-cover" src={user.photoURL} />
                ) : (
                  <span className="material-symbols-outlined text-4xl text-[#8C7A6B]">person</span>
                )}
                {/* Gradient overlay for pure visual styling */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>

              <h3 className="font-headline font-bold text-lg text-[#1C1B1F] mb-1 line-clamp-1 w-full">{user.fullName || "Ẩn danh"}</h3>
              <p className="text-[#8C7A6B] text-[11px] font-medium mb-3">{user.phone || '09xx xxx xxx'}</p>
              
              <p className={`font-label text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${user.leagueColor}`}>
                {user.league}
              </p>

              {user.hasPaidFund ? (
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#E8F5E9] text-[#2E7D32] rounded-full mb-6">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-label text-[9px] font-bold uppercase tracking-widest">Đã đóng quỹ</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#FFEBEE] text-[#C62828] rounded-full mb-6">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
                  <span className="font-label text-[9px] font-bold uppercase tracking-widest">Chưa đóng quỹ</span>
                </div>
              )}

              <div className="w-full pt-4 border-t border-[#F2F0ED] flex items-center justify-between mt-auto">
                <span className="text-[9px] font-label text-[#8C7A6B] uppercase tracking-wider font-bold">Số trận tham gia</span>
                <span className="font-headline font-black text-[#2A3B4C] text-[1.35rem] leading-none">{user.matchCount}</span>
              </div>

            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Members;
