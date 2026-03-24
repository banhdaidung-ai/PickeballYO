import React from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background font-body text-on-surface min-h-screen selection:bg-primary-container selection:text-on-primary">
      <header className="fixed top-0 w-full z-50 bg-orange-50/80 backdrop-blur-md flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border-2 border-primary-container">
            <span className="text-primary font-black text-lg font-headline leading-none">Y</span>
          </div>
          <span className="text-xl font-black italic text-orange-600 tracking-tight font-headline">CLB Pickleball YODY</span>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 duration-200"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </header>

      <main className="pt-24 pb-12 px-6 max-w-5xl mx-auto">
        <section className="mb-12 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-container/10 rounded-full blur-3xl"></div>
          <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter text-on-surface leading-none mb-4 uppercase">
            JOIN THE <span className="text-primary-fixed italic lowercase">MOMENTUM.</span>
          </h1>
          <p className="text-secondary max-w-md font-medium">Bắt đầu hành trình Pickleball chuyên nghiệp cùng cộng đồng YODY.</p>
        </section>

        <form className="grid grid-cols-1 lg:grid-cols-12 gap-8" onSubmit={(e) => e.preventDefault()}>
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-surface-container-low p-8 rounded-xl shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary-fixed"></span> Thông tin cá nhân
              </h2>
              <div className="space-y-6">
                <div className="relative group">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 ml-1">Họ và tên</label>
                  <input className="w-full bg-surface-container border-none border-b-2 border-transparent focus:ring-0 focus:border-primary-fixed transition-all px-4 py-3 rounded-lg placeholder:text-outline/50" placeholder="Nguyễn Văn A" type="text"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 ml-1">Số điện thoại</label>
                    <input className="w-full bg-surface-container border-none border-b-2 border-transparent focus:ring-0 focus:border-primary-fixed transition-all px-4 py-3 rounded-lg placeholder:text-outline/50" placeholder="090 123 4567" type="tel"/>
                  </div>
                  <div className="relative group">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2 ml-1">Email</label>
                    <input className="w-full bg-surface-container border-none border-b-2 border-transparent focus:ring-0 focus:border-primary-fixed transition-all px-4 py-3 rounded-lg placeholder:text-outline/50" placeholder="example@yody.com" type="email"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary-fixed"></span> Chọn gói thành viên
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="relative cursor-pointer group">
                  <input defaultChecked className="peer sr-only" name="membership" type="radio"/>
                  <div className="h-full p-6 rounded-xl bg-surface-container-low border-2 border-transparent peer-checked:border-primary-fixed peer-checked:bg-surface-container-high transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="material-symbols-outlined text-secondary">star</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter text-secondary opacity-60">Standard</span>
                      </div>
                      <h3 className="text-xl font-black italic tracking-tight text-on-surface mb-1">BASIC</h3>
                      <p className="text-2xl font-black text-primary leading-none mb-4">500k<span className="text-xs font-normal text-on-surface-variant">/tháng</span></p>
                    </div>
                    <ul className="text-[11px] space-y-2 text-on-surface-variant font-medium">
                      <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> 4 buổi/tháng</li>
                      <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> Giờ thường</li>
                    </ul>
                  </div>
                </label>

                <label className="relative cursor-pointer group">
                  <input className="peer sr-only" name="membership" type="radio"/>
                  <div className="h-full p-6 rounded-xl bg-surface-container-low border-2 border-transparent peer-checked:border-primary-fixed peer-checked:bg-surface-container-high transition-all flex flex-col justify-between overflow-hidden">
                    <div className="absolute -right-4 -top-4 bg-primary-fixed text-white text-[8px] font-bold px-8 py-1 rotate-45">POPULAR</div>
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter text-primary-fixed">Pro</span>
                      </div>
                      <h3 className="text-xl font-black italic tracking-tight text-on-surface mb-1">PREMIUM</h3>
                      <p className="text-2xl font-black text-primary leading-none mb-4">1.2M<span className="text-xs font-normal text-on-surface-variant">/tháng</span></p>
                    </div>
                    <ul className="text-[11px] space-y-2 text-on-surface-variant font-medium">
                      <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> 12 buổi/tháng</li>
                      <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> Mọi khung giờ</li>
                      <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> Ưu đãi sự kiện</li>
                    </ul>
                  </div>
                </label>

                <label className="relative cursor-pointer group">
                  <input className="peer sr-only" name="membership" type="radio"/>
                  <div className="h-full p-6 rounded-xl bg-surface-container-low border-2 border-transparent peer-checked:border-primary-fixed peer-checked:bg-surface-container-high transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="material-symbols-outlined text-on-surface" style={{ fontVariationSettings: "'FILL' 1" }}>trophy</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface opacity-60">Elite</span>
                      </div>
                      <h3 className="text-xl font-black italic tracking-tight text-on-surface mb-1">ELITE</h3>
                      <p className="text-2xl font-black text-primary leading-none mb-4">2.5M<span className="text-xs font-normal text-on-surface-variant">/tháng</span></p>
                    </div>
                    <ul className="text-[11px] space-y-2 text-on-surface-variant font-medium">
                      <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> Không giới hạn</li>
                      <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> Huấn luyện viên 1:1</li>
                      <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> Nước &amp; Locker</li>
                    </ul>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="bg-surface-container-high/50 p-8 rounded-2xl border-2 border-surface-container">
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Phương thức thanh toán</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 bg-white rounded-xl cursor-pointer hover:shadow-md transition-shadow group">
                    <input defaultChecked className="peer sr-only" name="payment" type="radio"/>
                    <span className="material-symbols-outlined mr-3 text-secondary peer-checked:text-primary-fixed">credit_card</span>
                    <span className="flex-grow text-sm font-bold text-on-surface">Thẻ tín dụng / Ghi nợ</span>
                    <div className="w-5 h-5 border-2 border-outline-variant rounded-full peer-checked:bg-primary-fixed peer-checked:border-primary-fixed flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 bg-white rounded-xl cursor-pointer hover:shadow-md transition-shadow group">
                    <input className="peer sr-only" name="payment" type="radio"/>
                    <span className="material-symbols-outlined mr-3 text-secondary peer-checked:text-primary-fixed">account_balance</span>
                    <span className="flex-grow text-sm font-bold text-on-surface">Chuyển khoản NH</span>
                    <div className="w-5 h-5 border-2 border-outline-variant rounded-full peer-checked:bg-primary-fixed peer-checked:border-primary-fixed flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 bg-white rounded-xl cursor-pointer hover:shadow-md transition-shadow group">
                    <input className="peer sr-only" name="payment" type="radio"/>
                    <span className="material-symbols-outlined mr-3 text-secondary peer-checked:text-primary-fixed">wallet</span>
                    <span className="flex-grow text-sm font-bold text-on-surface">Ví điện tử (Momo, ZaloPay)</span>
                    <div className="w-5 h-5 border-2 border-outline-variant rounded-full peer-checked:bg-primary-fixed peer-checked:border-primary-fixed flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </label>
                </div>
                <div className="mt-8 pt-6 border-t border-outline-variant/20">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-on-surface-variant font-medium">Tổng thanh toán:</span>
                    <span className="text-3xl font-black text-primary tracking-tight">500.000đ</span>
                  </div>
                  <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white font-headline font-black py-4 rounded-xl shadow-[0_8px_30px_rgba(255,123,4,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-widest" type="submit">
                    Xác nhận đăng ký
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                  <p className="mt-4 text-[10px] text-center text-on-surface-variant/70 leading-relaxed">
                    Bằng cách nhấn xác nhận, bạn đồng ý với <a className="underline" href="#">Điều khoản dịch vụ</a> và <a className="underline" href="#">Chính sách bảo mật</a> của CLB Pickleball YODY.
                  </p>
                </div>
              </div>
              <div className="bg-primary/5 p-6 rounded-2xl flex items-center gap-4">
                <div className="bg-primary-container w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-lg">
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-primary uppercase">Cần hỗ trợ?</p>
                  <p className="text-sm font-medium text-on-surface">Liên hệ ngay hotline 1900 8888 để được tư vấn gói phù hợp nhất.</p>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </main>

      <div className="fixed bottom-0 right-0 -z-10 w-1/2 h-1/2 opacity-20 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-primary-container/40 to-transparent blur-[120px]"></div>
      </div>
    </div>
  );
};

export default Registration;
