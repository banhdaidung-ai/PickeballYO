import React from 'react';
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
  const navigate = useNavigate();

  return (
    <main className="pt-20 px-6 max-w-4xl mx-auto">
      <section className="mb-8">
        <span className="font-label text-xs font-semibold tracking-widest text-primary uppercase mb-1 block">Lịch trình của bạn</span>
        <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Lịch tập</h2>
      </section>

      <section className="mb-10">
        <div className="bg-surface-container-low rounded-3xl p-4">
          <div className="flex justify-between items-center mb-6 px-2">
            <h3 className="font-headline font-bold text-lg text-secondary">Tháng 10, 2024</h3>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-surface-container-highest text-secondary hover:bg-secondary-container transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="p-2 rounded-full bg-surface-container-highest text-secondary hover:bg-secondary-container transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="flex justify-between overflow-x-auto hide-scrollbar gap-2 pb-2">
            <div className="flex flex-col items-center min-w-[56px] py-4 rounded-2xl bg-surface-container-highest/50 text-on-surface-variant transition-all">
              <span className="font-label text-[10px] uppercase font-bold mb-2">Th 2</span>
              <span className="font-headline text-lg font-extrabold">21</span>
            </div>
            <div className="flex flex-col items-center min-w-[56px] py-4 rounded-2xl bg-surface-container-highest/50 text-on-surface-variant transition-all">
              <span className="font-label text-[10px] uppercase font-bold mb-2">Th 3</span>
              <span className="font-headline text-lg font-extrabold">22</span>
            </div>
            <div className="flex flex-col items-center min-w-[56px] py-4 rounded-2xl bg-primary text-white scale-110 shadow-lg shadow-primary/20 transition-all">
              <span className="font-label text-[10px] uppercase font-bold mb-2">Th 4</span>
              <span className="font-headline text-lg font-extrabold">23</span>
            </div>
            <div className="flex flex-col items-center min-w-[56px] py-4 rounded-2xl bg-surface-container-highest/50 text-on-surface-variant transition-all">
              <span className="font-label text-[10px] uppercase font-bold mb-2">Th 5</span>
              <span className="font-headline text-lg font-extrabold">24</span>
            </div>
            <div className="flex flex-col items-center min-w-[56px] py-4 rounded-2xl bg-surface-container-highest/50 text-on-surface-variant transition-all">
              <span className="font-label text-[10px] uppercase font-bold mb-2">Th 6</span>
              <span className="font-headline text-lg font-extrabold">25</span>
            </div>
            <div className="flex flex-col items-center min-w-[56px] py-4 rounded-2xl bg-surface-container-highest/50 text-on-surface-variant transition-all">
              <span className="font-label text-[10px] uppercase font-bold mb-2">Th 7</span>
              <span className="font-headline text-lg font-extrabold">26</span>
            </div>
            <div className="flex flex-col items-center min-w-[56px] py-4 rounded-2xl bg-surface-container-highest/50 text-on-surface-variant transition-all">
              <span className="font-label text-[10px] uppercase font-bold mb-2">CN</span>
              <span className="font-headline text-lg font-extrabold">27</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-end mb-2">
          <h3 className="font-headline font-bold text-xl text-secondary">Các ca tập hôm nay</h3>
          <span className="font-label text-xs text-on-surface-variant">4 Ca tập khả dụng</span>
        </div>

        {/* Session Card 1 */}
        <div className="group relative bg-surface-container-lowest rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary-container flex flex-col items-center justify-center text-primary shrink-0">
                <span className="font-label text-[10px] font-bold uppercase leading-none mb-1">Bắt đầu</span>
                <span className="font-headline text-lg font-extrabold leading-none">08:00</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="font-label text-[10px] font-bold text-primary uppercase tracking-widest">Đang trống</span>
                </div>
                <h4 className="font-headline font-bold text-xl text-on-surface">Sân Pickleball A1</h4>
                <p className="font-body text-sm text-on-surface-variant">8:00 AM - 10:00 AM • Sân trong nhà</p>
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-4 md:pt-0 border-surface-container-low">
              <div className="flex -space-x-2">
                <img alt="User" className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrRBkxTZG2i30tl6ZRzlIfjfOZPHXktDGhf928UZbZmsTvY1oxrPPh57QIYslY1wmK1RiWrI6-cKlk0dRPeegSGEb0h2KBvadxRm98_JZ1PtCvjSku3L-2fnNSJQHrPazczu1yoDWtNLtkktj66afP_qtfreqCbQzrWCuUvJJit3VmeZxovKxg1dj4Ym-CXmJTIYdPgjdFe5PKvlpGovmfU5bqqhJTG_LwWFM0LclRu10RFLVwJxvF5_wTBTbwhVN4tSwKIhLp-eU" />
                <img alt="User" className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXYA8ll7vejiFOBcuFyREY0iqWx-Z9PkD2dd6XKsPieueV410fVSk3W1VA8Dsjwn1E_RkhUG7VlZLk3GHGsIM66uN03NHbDgq1gztp2EVWvSoCR0ovKxKhVZU8tOZmXskR_9jZZ7fuKbzVtu0McnLsOrIjmgBt3ciumiJp6G_NNLMSkr7-e_AZnzsTbe56uNgtMVQB0lzvf7kcVxxMYzvRC7RHXd65-yHUF-bJeQLOjQ9OOdA5r3ceZqR3zm9TUT7Pwte6GRUi7gY" />
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-secondary-fixed-variant">+2</div>
              </div>
              <button 
                onClick={() => navigate('/session/1')}
                className="velocity-gradient text-white px-8 py-3 rounded-full font-label font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                Tham gia
              </button>
            </div>
          </div>
        </div>

        {/* Session Card 2 */}
        <div className="group relative bg-surface-container-low rounded-[2rem] p-6 opacity-80 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex flex-col items-center justify-center text-on-surface-variant shrink-0">
                <span className="font-label text-[10px] font-bold uppercase leading-none mb-1">Bắt đầu</span>
                <span className="font-headline text-lg font-extrabold leading-none">10:30</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-label text-[10px] font-bold text-secondary uppercase tracking-widest">Đã đặt</span>
                </div>
                <h4 className="font-headline font-bold text-xl text-on-surface">Sân Pickleball B4</h4>
                <p className="font-body text-sm text-on-surface-variant">10:30 AM - 12:30 PM • Sân ngoài trời</p>
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-4 md:pt-0 border-surface-container-low">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                <span className="font-label text-xs font-bold text-secondary">4/4 Full</span>
              </div>
              <button className="bg-surface-container-highest text-on-surface-variant cursor-not-allowed px-8 py-3 rounded-full font-label font-bold text-sm">Đầy chỗ</button>
            </div>
          </div>
        </div>

        {/* Session Card 3 */}
        <div className="group relative bg-surface-container-lowest rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary-container flex flex-col items-center justify-center text-primary shrink-0">
                <span className="font-label text-[10px] font-bold uppercase leading-none mb-1">Bắt đầu</span>
                <span className="font-headline text-lg font-extrabold leading-none">14:00</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-label text-[10px] font-bold text-primary uppercase tracking-widest">Đang trống</span>
                </div>
                <h4 className="font-headline font-bold text-xl text-on-surface">Sân VIP 01</h4>
                <p className="font-body text-sm text-on-surface-variant">2:00 PM - 4:00 PM • Sân trong nhà cao cấp</p>
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-4 md:pt-0 border-surface-container-low">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-container-low flex items-center justify-center text-[10px] font-bold text-secondary-fixed-variant">0/4</div>
              </div>
              <button 
                onClick={() => navigate('/session/1')}
                className="velocity-gradient text-white px-8 py-3 rounded-full font-label font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                Tham gia
              </button>
            </div>
          </div>
        </div>

        {/* Session Card 4 */}
        <div className="group relative bg-surface-container-lowest rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary-container flex flex-col items-center justify-center text-primary shrink-0">
                <span className="font-label text-[10px] font-bold uppercase leading-none mb-1">Bắt đầu</span>
                <span className="font-headline text-lg font-extrabold leading-none">17:00</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-label text-[10px] font-bold text-primary uppercase tracking-widest">Đang trống</span>
                </div>
                <h4 className="font-headline font-bold text-xl text-on-surface">Sân Pickleball A2</h4>
                <p className="font-body text-sm text-on-surface-variant">5:00 PM - 7:00 PM • Sân trong nhà</p>
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-4 md:pt-0 border-surface-container-low">
              <div className="flex -space-x-2">
                <img alt="User" className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7LHGCpIKsGkBPPcGlx9fOFamhOiBPPnXIIrwlGQgKEboqiQr8twFKRA8qVx88hLHWkYA1IJq8lGIezcgn9hGNfpF3ijaXcvmvwPKOHxMl26qyza2KizdmhbFXQpIp0Z_6091Dq4BFdO9tI1yZKhGt_KWMBcT0ZCUe-UFiYi_HXZkoVyCclwxrPVfnKv3vkMkff4JUkqEGh4-m5y-vLipdwGmvKW9F1eFu_IL3LOTmO5VBI0VPMjR379GvYXI68yhcQEquLC2Wydk" />
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-secondary-fixed-variant">+1</div>
              </div>
              <button className="velocity-gradient text-white px-8 py-3 rounded-full font-label font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">Tham gia</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Schedule;
