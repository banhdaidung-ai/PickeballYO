import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetAndSeed } from '../services/seedService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [resetting, setResetting] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handleReset = async () => {
    if (resetting) return;
    setResetting(true);
    try {
      const result = await resetAndSeed();
      alert(`✅ Cập nhật lịch thành công! Đã thêm ${result.addedCount} buổi tập mới.`);
      setResetDone(true);
    } catch (e) {
      alert('❌ Lỗi: ' + e.message);
    } finally {
      setResetting(false);
    }
  };


  return (
    <main className="pt-20 px-6 max-w-2xl mx-auto space-y-10">
      <section className="relative pt-4 text-center md:text-left">
        <div className="flex flex-col">
          <span className="font-label text-sm uppercase tracking-widest text-secondary font-semibold">Chào buổi sáng, Nam</span>
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mt-1">Sẵn sàng ra sân chưa?</h2>
        </div>
        <div className="absolute -top-4 -right-8 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-9xl">sports_tennis</span>
        </div>
      </section>

      <section>
        <div className="font-label text-xs font-semibold text-secondary uppercase tracking-wider mb-4 px-1">Buổi tập tiếp theo</div>
        <div className="bg-surface-container-lowest rounded-[2rem] p-6 shadow-[0_8px_24px_rgba(255,122,0,0.06)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 velocity-gradient opacity-10 rounded-bl-full translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-4">
              <div className="bg-primary-container rounded-2xl w-14 h-14 flex flex-col items-center justify-center text-on-primary-container">
                <span className="text-xs font-label font-bold uppercase">Th4</span>
                <span className="text-xl font-headline font-extrabold leading-none">24</span>
              </div>
              <div>
                <h3 className="font-headline text-lg font-bold text-on-surface">Huấn luyện Kỹ thuật</h3>
                <p className="font-label text-sm text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">schedule</span> 18:00 - 19:30
                </p>
              </div>
            </div>
            <div className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-[10px] font-label font-bold tracking-wide uppercase">Sân #04</div>
          </div>
          <div className="flex items-center justify-between border-t border-surface-container pt-4">
            <div className="flex -space-x-2">
              <img alt="Avatar 1" className="w-8 h-8 rounded-full border-2 border-surface-container-lowest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYNofOikiFvv-0UcoUgOEfBwPZYz2_9pk7z4oZDhzlgwOcIxrcjiwklyuweX2y9_xSRMXUqVMa8_QmkwqOgq6F-6X9DxFNcdjBm17AJJhbsBaLuHQGe9tolCeRjHbObx38tZwwY6MK5Tqa-AOuCyaMKP0McNl_SdR9YCCjTEZzQ71MFDACnZwl8_PiAmlC84koB4M5VaLx8RD9Kmlsw_w2qKPpYJ70eu_KykeBJNt9m52Ys0dKFJVCDFlscdWSiSWi3oXgs97TRqk" />
              <img alt="Avatar 2" className="w-8 h-8 rounded-full border-2 border-surface-container-lowest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCub9MmSii8pdO0KtXyYxAaq9NkdHczCsRqUSmXcrXlL4Hg51x7gHWf_QMPCC6fytnM5wP2PT6NMSHnAEOUuMzjeI3oBPelJln1fDj-8jfTXW6kNJt83LlzwJaJ8nGqcFuxGUAFRp7slIADk7QyCjtUvKTjeb1-iysK8BwuZR_32J8zVplJSISUo5XJzP19PrTMSosQHl_Aeo8ehXrp7RJ8VBY8TacsCWHR48ccfTsNFe4Fz6XZgOyGv1Z-lKlEw-SR2RC_6LAbxO8" />
              <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-secondary">+3</div>
            </div>
            <button 
              onClick={() => navigate('/session/1')}
              className="velocity-gradient text-white px-5 py-2.5 rounded-full text-xs font-label font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-col items-start p-5 bg-surface-container-low rounded-3xl hover:bg-white transition-all group border border-transparent hover:border-outline-variant/20">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">calendar_add_on</span>
            </div>
            <span className="font-headline font-bold text-on-surface">Đặt sân</span>
            <span className="font-label text-[10px] text-secondary uppercase mt-1">Còn 4 khung giờ</span>
          </button>
          <button className="flex flex-col items-start p-5 bg-surface-container-low rounded-3xl hover:bg-white transition-all group border border-transparent hover:border-outline-variant/20">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-secondary mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">person_add</span>
            </div>
            <span className="font-headline font-bold text-on-surface">Mời bạn</span>
            <span className="font-label text-[10px] text-secondary uppercase mt-1">Tìm đồng đội mới</span>
          </button>
        </div>
      </section>

      <section className="pb-8">
        <div className="flex justify-between items-center mb-4 px-1">
          <div className="font-label text-xs font-semibold text-secondary uppercase tracking-wider">Tin tức &amp; Sự kiện</div>
          <button className="text-primary text-xs font-label font-bold">Tất cả</button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6">
          <div className="flex-none w-72 h-44 rounded-3xl relative overflow-hidden group">
            <img alt="Tournament" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlZjZ89DDaUIO_29x-16pljPJLQXNwhBSsOnkjt0H634GZPUtOZqVAUhsT1VuluOCTbxxicJMPxAIHDUVh-c8xIUdOP2kKfO-ywGkO-6W7PcbiCih03-z061TwVsX223YP-hP14qBoXvUiv07Z4Hs1ZPKFOUdJAy9BueO3yExVH9ROgkRnIEP909pKyhlwSToiPPv9Clqejg9GQvGnKHmHqESXBEvC2oUd7qJl3yBkeI9cy5sKa0Qp8zQ3O6L1k3XjLhdNc-CeXl0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="bg-primary text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase mb-2 inline-block">Sắp diễn ra</span>
              <h4 className="text-white font-headline font-bold leading-tight">Giải YODY Open 2024</h4>
              <p className="text-white/70 text-[10px] font-label mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">event</span> 15/10 - 20/10
              </p>
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
              <p className="text-white/70 text-[10px] font-label mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">local_activity</span> Giảm 20% đăng ký sớm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin: Reset Schedule */}
      {!resetDone && (
        <section className="pb-8">
          <button
            onClick={handleReset}
            disabled={resetting}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-primary/30 text-primary font-label font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/5 transition disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base">sync</span>
            {resetting ? 'Đang cập nhật Lịch tập...' : 'Cập nhật Lịch tập mới vào hệ thống'}
          </button>
        </section>
      )}
    </main>
  );
};
export default Dashboard;
