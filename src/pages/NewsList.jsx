import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeToNews } from '../services/newsService';

const NewsList = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToNews((data) => {
      setNews(data);
      setLoading(false);
    }, false); // Public view only sees published news
    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <main className="pt-24 pb-32 px-4 sm:px-6 max-w-7xl mx-auto font-body bg-[#FDFBF9] min-h-screen">
      <section className="mb-8">
        <span className="font-label text-[#FF7A00] font-bold uppercase tracking-[0.2em] text-[10px] mb-1 block">Tin tức & Sự kiện</span>
        <h2 className="text-4xl font-headline font-black text-[#1C1B1F] tracking-tighter">Bảng tin câu lạc bộ</h2>
      </section>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A00]"></div>
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-[#F2F0ED]">
          <span className="material-symbols-outlined text-6xl text-[#E6E0D8] mb-4">newspaper</span>
          <p className="text-[#8C7A6B] font-medium">Hiện chưa có tin tức nào mới.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div 
              key={item.id} 
              onClick={() => navigate(`/news/${item.id}`)}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(255,122,0,0.1)] transition-all duration-300 cursor-pointer group flex flex-col h-full border border-[#F2F0ED]"
            >
              <div className="h-56 relative overflow-hidden shrink-0">
                <img 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src={item.imageUrl || 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800'} 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-[#FF7A00] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                    {item.category || 'Thông báo'}
                  </span>
                </div>
              </div>
              
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3 text-[#8C7A6B]">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <span className="text-[11px] font-bold font-label uppercase tracking-wider">{formatDate(item.createdAt)}</span>
                </div>
                
                <h3 className="text-xl font-headline font-black text-[#1C1B1F] group-hover:text-[#FF7A00] transition-colors leading-tight mb-3 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-[#8C7A6B] text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                  {item.summary || item.content?.substring(0, 120) + '...'}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-[#F2F0ED]">
                  <span className="text-[#FF7A00] text-[11px] font-bold font-label uppercase tracking-[0.2em]">Xem chi tiết</span>
                  <div className="w-8 h-8 rounded-full bg-[#FFF0E5] flex items-center justify-center text-[#FF7A00] group-hover:translate-x-1 transition-transform">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default NewsList;
