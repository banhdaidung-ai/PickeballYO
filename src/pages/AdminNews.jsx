import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { subscribeToNews, deleteNews } from '../services/newsService';
import { useAuth } from '../contexts/AuthContext';

const AdminNews = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Security check: Only allow admin
  useEffect(() => {
    if (user && user.email !== 'banhdaidung@gmail.com') {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const unsubscribe = subscribeToNews((data) => {
      setNews(data);
      setLoading(false);
    }, true); // Admin sees everything including drafts
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      try {
        await deleteNews(id);
      } catch (error) {
        alert('Lỗi khi xóa bài viết: ' + error.message);
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const filteredNews = news.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="pt-24 pb-32 px-4 sm:px-6 max-w-7xl mx-auto font-body bg-[#FDFBF9] min-h-screen">
      <section className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-label text-[#FF7A00] font-bold uppercase tracking-[0.2em] text-[10px] mb-1 block">Quản trị nội dung</span>
          <h2 className="text-4xl font-headline font-black text-[#1C1B1F] tracking-tighter">Quản lý tin tức</h2>
        </div>
        <Link 
          to="/admin/news/new"
          className="velocity-gradient text-white px-8 py-4 rounded-2xl font-headline font-black uppercase tracking-tight shadow-xl shadow-orange-900/20 active:scale-95 transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Đăng bài mới
        </Link>
      </section>

      <div className="mb-8 relative group">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#8C7A6B] text-[20px]">search</span>
        <input 
          className="w-full pl-12 pr-4 py-4 bg-white border border-[#F2F0ED] rounded-2xl font-medium text-sm focus:outline-none focus:ring-4 focus:ring-[#FF7A00]/5 shadow-sm transition-all placeholder:text-[#8C7A6B] text-[#1C1B1F]" 
          placeholder="Tìm kiếm bài viết theo tiêu đề hoặc danh mục..." 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-[2.5rem] overflow-hidden border border-[#F2F0ED] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#FFF8F3] border-b border-[#F2F0ED]">
                <th className="px-6 py-5 text-left text-[11px] font-bold font-label text-[#8C7A6B] uppercase tracking-widest">Bài viết</th>
                <th className="px-6 py-5 text-left text-[11px] font-bold font-label text-[#8C7A6B] uppercase tracking-widest">Danh mục</th>
                <th className="px-6 py-5 text-left text-[11px] font-bold font-label text-[#8C7A6B] uppercase tracking-widest">Trạng thái</th>
                <th className="px-6 py-5 text-left text-[11px] font-bold font-label text-[#8C7A6B] uppercase tracking-widest">Ngày tạo</th>
                <th className="px-6 py-5 text-center text-[11px] font-bold font-label text-[#8C7A6B] uppercase tracking-widest">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F0ED]">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#FF7A00] border-t-transparent mx-auto"></div>
                  </td>
                </tr>
              ) : filteredNews.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center text-[#8C7A6B] font-medium">
                    Không tìm thấy bài viết nào.
                  </td>
                </tr>
              ) : (
                filteredNews.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm">
                          <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-headline font-bold text-[#1C1B1F] line-clamp-1 group-hover:text-[#FF7A00] transition-colors">{item.title}</p>
                          <p className="text-[11px] text-[#8C7A6B] font-medium truncate mt-0.5">{item.summary}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="bg-[#FFF0E5] text-[#FF7A00] text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                        {item.category || 'Thông báo'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${item.status === 'published' ? 'bg-green-500' : 'bg-amber-400'}`}></div>
                        <span className={`text-[11px] font-bold font-label uppercase tracking-widest ${item.status === 'published' ? 'text-green-600' : 'text-amber-600'}`}>
                          {item.status === 'published' ? 'Công khai' : 'Nháp'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[#8C7A6B] font-medium text-sm">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => navigate(`/admin/news/edit/${item.id}`)}
                          className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-[#FF7A00] hover:text-white transition-all shadow-sm active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                        <button 
                          onClick={() => navigate(`/news/${item.id}`)}
                          className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all shadow-sm active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default AdminNews;
