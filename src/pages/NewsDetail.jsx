import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewsById } from '../services/newsService';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getNewsById(id);
        if (data && data.status === 'published') {
          setArticle(data);
        } else {
          navigate('/news');
        }
      } catch (error) {
        console.error("Error fetching news detail", error);
        navigate('/news');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id, navigate]);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A00]"></div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <main className="pb-32 font-body bg-[#FDFBF9] min-h-screen">
      {/* Article Hero */}
      <div className="relative h-[45vh] lg:h-[60vh] overflow-hidden">
        <img 
          alt={article.title} 
          className="absolute inset-0 w-full h-full object-cover" 
          src={article.imageUrl || 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=1200'} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1F]/90 via-[#1C1B1F]/20 to-transparent"></div>
        
        <div className="absolute inset-x-0 bottom-0 py-12 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-[#FF7A00] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
              {article.category || 'Thông báo'}
            </span>
            <span className="text-white/80 text-[11px] font-bold font-label uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
              {formatDate(article.createdAt)}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-black text-white tracking-tighter leading-tight drop-shadow-md">
            {article.title}
          </h1>
        </div>

        {/* Floating Back Button */}
        <button 
          onClick={() => navigate('/news')}
          className="absolute top-24 left-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#1C1B1F] transition-all shadow-xl active:scale-90 z-20"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>

      {/* Content Section */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        <div 
          className="rich-text-content max-w-none text-[#2A3B4C] font-medium text-base sm:text-lg leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        >
        </div>
        
        {/* Author Footer (Mock) */}
        <div className="mt-16 pt-8 border-t border-[#F2F0ED] flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FF7A00] flex items-center justify-center text-white font-headline font-black text-xl italic shadow-md">
            P
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-widest leading-none mb-1">Cơ quan chủ quản</p>
            <p className="font-headline font-bold text-[#1C1B1F]">Pickleball YODY Administration</p>
          </div>
        </div>
      </article>

      {/* Small Floating Share Link (Mock CTA) */}
      <div className="fixed bottom-12 right-6 flex flex-col gap-3 group z-50">
        <button className="w-14 h-14 rounded-2xl bg-white text-[#1C1B1F] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-[#F2F0ED] flex items-center justify-center hover:bg-[#FF7A00] hover:text-white transition-all transform hover:-translate-y-1">
          <span className="material-symbols-outlined">share</span>
        </button>
      </div>
    </main>
  );
};

export default NewsDetail;
