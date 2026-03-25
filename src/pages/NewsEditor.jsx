import { addNews, getNewsById, updateNews } from '../services/newsService';
import { useAuth } from '../contexts/AuthContext';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const NewsEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    category: 'Thông báo',
    summary: '',
    content: '',
    status: 'published',
    isPinned: false
  });
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  // Security check: Only allow admin
  useEffect(() => {
    if (user && user.email !== 'banhdaidung@gmail.com') {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isEditMode) {
      const fetchArticle = async () => {
        try {
          const data = await getNewsById(id);
          if (data) {
            setFormData(data);
          } else {
            navigate('/admin/news');
          }
        } catch (error) {
          console.error("Error fetching article for edit", error);
        } finally {
          setLoading(false);
        }
      };
      fetchArticle();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEditMode) {
        await updateNews(id, formData);
      } else {
        await addNews(formData);
      }
      navigate('/admin/news');
    } catch (error) {
      alert('Lỗi khi lưu bài viết: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A00]"></div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-32 px-4 sm:px-6 max-w-4xl mx-auto font-body bg-[#FDFBF9] min-h-screen">
      <section className="mb-10 flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/news')}
          className="w-12 h-12 rounded-2xl bg-white border border-[#F2F0ED] flex items-center justify-center text-[#8C7A6B] hover:text-[#FF7A00] transition-colors shadow-sm active:scale-90"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="font-label text-[#FF7A00] font-bold uppercase tracking-[0.2em] text-[10px] mb-1 block">
             {isEditMode ? 'Chỉnh sửa bài viết' : 'Tạo tin mới'}
          </span>
          <h2 className="text-3xl font-headline font-black text-[#1C1B1F] tracking-tighter">
            Trình soạn thảo tin tức
          </h2>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Cover Image Preview/Input */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-[#F2F0ED] shadow-sm">
          <div className="mb-6">
             <label className="block text-[11px] font-bold font-label text-[#8C7A6B] uppercase tracking-widest mb-3">Hình ảnh tiêu đề (URL)</label>
             <div className="flex gap-4">
                <input 
                  type="url" 
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..." 
                  className="flex-1 px-5 py-4 bg-[#F2F0ED] rounded-2xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/30 transition-all border border-transparent"
                  required
                />
             </div>
          </div>
          
          <div className="h-64 w-full rounded-2xl overflow-hidden bg-slate-50 border-2 border-dashed border-[#F2F0ED] relative flex items-center justify-center">
            {formData.imageUrl ? (
              <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
            ) : (
              <div className="text-center text-[#8C7A6B]">
                <span className="material-symbols-outlined text-4xl mb-2">image_search</span>
                <p className="text-xs font-bold font-label uppercase tracking-widest">Xem trước hình ảnh</p>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-[#F2F0ED] shadow-sm space-y-6">
          <div>
            <label className="block text-[11px] font-bold font-label text-[#8C7A6B] uppercase tracking-widest mb-3">Tiêu đề bài viết</label>
            <input 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Nhập tiêu đề hấp dẫn..." 
              className="w-full px-5 py-4 bg-[#F2F0ED] rounded-2xl font-headline font-black text-xl text-[#1C1B1F] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/30 transition-all border border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold font-label text-[#8C7A6B] uppercase tracking-widest mb-3">Danh mục</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-[#F2F0ED] rounded-2xl font-bold text-sm text-[#1C1B1F] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/30 transition-all border border-transparent appearance-none"
              >
                <option value="Thông báo">📣 Thông báo</option>
                <option value="Sự kiện">🏆 Sự kiện</option>
                <option value="Kỹ thuật">🎾 Kỹ thuật</option>
                <option value="Cộng đồng">🤝 Cộng đồng</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold font-label text-[#8C7A6B] uppercase tracking-widest mb-3">Trạng thái</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-[#F2F0ED] rounded-2xl font-bold text-sm text-[#1C1B1F] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/30 transition-all border border-transparent appearance-none"
              >
                <option value="published">Công khai (Live)</option>
                <option value="draft">Bản nháp (Draft)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold font-label text-[#8C7A6B] uppercase tracking-widest mb-3">Tóm tắt ngắn gọn</label>
            <textarea 
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="2"
              placeholder="Một câu mô tả ngắn gọn về nội dung chính..." 
              className="w-full px-5 py-4 bg-[#F2F0ED] rounded-2xl font-medium text-sm text-[#1C1B1F] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/30 transition-all border border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold font-label text-[#8C7A6B] uppercase tracking-widest mb-3">Nội dung chi tiết</label>
            <div className="quill-editor-container bg-[#F2F0ED] rounded-2xl overflow-hidden border border-transparent focus-within:ring-2 focus-within:ring-[#FF7A00]/30 transition-all">
              <ReactQuill 
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Kể câu chuyện về trận đấu, sự kiện hoặc thông báo quan trọng..."
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'image'],
                    ['clean']
                  ],
                }}
                className="bg-white min-h-[300px]"
              />
            </div>
            <p className="mt-2 text-[10px] text-[#8C7A6B] font-medium italic">* Mẹo: Bạn có thể dán hình ảnh trực tiếp vào nội dung hoặc chèn link hình ảnh.</p>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                name="isPinned"
                checked={formData.isPinned}
                onChange={handleChange}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF7A00]"></div>
              <span className="ml-3 font-label text-[11px] font-bold text-[#8C7A6B] uppercase tracking-widest">Ghim lên đầu trang</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button 
            type="submit"
            disabled={saving}
            className="flex-1 py-5 velocity-gradient text-white rounded-[1.5rem] font-headline font-black uppercase tracking-tight shadow-xl shadow-orange-900/20 active:scale-95 transition-all text-lg flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {saving ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span className="material-symbols-outlined font-black">publish</span>
                {isEditMode ? 'Cập nhật bài viết' : 'Đăng bài ngay'}
              </>
            )}
          </button>
          <button 
            type="button"
            onClick={() => navigate('/admin/news')}
            className="px-10 py-5 bg-white border border-[#F2F0ED] text-[#8C7A6B] rounded-[1.5rem] font-headline font-black uppercase tracking-tight hover:bg-[#F2F0ED] transition-all active:scale-95 text-lg"
          >
            Hủy bỏ
          </button>
        </div>
      </form>
    </main>
  );
};

export default NewsEditor;
