import React from 'react';
import { useNavigate } from 'react-router-dom';

const Guide = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Trang chủ',
      icon: 'home',
      description: 'Nơi tổng hợp thông tin quan trọng nhất: lịch tập hôm nay, tin tức mới nhất và bảng xếp hạng thành viên chăm chỉ.',
      color: 'bg-blue-500',
    },
    {
      title: 'Lịch tập',
      icon: 'calendar_today',
      description: 'Xem danh sách các buổi tập trong tuần. Bạn có thể nhấn vào từng buổi để xem chi tiết và đăng ký tham gia.',
      color: 'bg-green-500',
    },
    {
      title: 'Đặt sân',
      icon: 'sports_tennis',
      description: 'Tính năng hỗ trợ đặt sân Pickleball trực tuyến (Sắp ra mắt). Giúp bạn dễ dàng tìm và giữ chỗ sân chơi.',
      color: 'bg-orange-500',
    },
    {
      title: 'Thành viên',
      icon: 'group',
      description: 'Danh sách các thành viên trong câu lạc bộ. Bạn có thể xem thông tin và thứ hạng của đồng đội.',
      color: 'bg-purple-500',
    },
    {
      title: 'Quỹ câu lạc bộ',
      icon: 'account_balance_wallet',
      description: 'Minh bạch thu chi của CLB. Theo dõi các khoản đóng góp và chi phí vận hành sân bãi, bóng tập.',
      color: 'bg-amber-500',
    },
    {
      title: 'Tin tức',
      icon: 'newspaper',
      description: 'Cập nhật những thông báo mới nhất từ ban quản trị và các tin tức hot về bộ môn Pickleball.',
      color: 'bg-red-500',
    },
    {
      title: 'Hồ sơ cá nhân',
      icon: 'person',
      description: 'Quản lý thông tin cá nhân của bạn, xem lại lịch sử tham gia và các hoạt động đã thực hiện.',
      color: 'bg-teal-500',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6 max-w-2xl mx-auto">
      <header className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
          <span className="material-symbols-outlined text-primary text-4xl">info</span>
        </div>
        <h1 className="font-headline text-3xl font-extrabold text-on-surface mb-2">Hướng dẫn sử dụng</h1>
        <p className="text-secondary text-base font-medium">Khám phá các tính năng và cách sử dụng ứng dụng Stitch hiệu quả nhất.</p>
      </header>

      <div className="space-y-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex gap-5 items-start transition-all hover:shadow-md"
          >
            <div className={`${feature.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-current/10`}>
              <span className="material-symbols-outlined">{feature.icon}</span>
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">{feature.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-12 bg-primary/5 rounded-[2rem] p-8 border border-primary/10">
        <h2 className="font-headline text-xl font-bold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">lightbulb</span>
          Mẹo nhỏ cho bạn
        </h2>
        <ul className="space-y-3 text-sm text-on-surface-variant font-medium">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            Hãy luôn kiểm tra <b>Trang chủ</b> để không bỏ lỡ lịch tập hôm nay.
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            Đăng ký tham gia sớm trong mục <b>Lịch tập</b> để CLB sắp xếp sân bãi tốt nhất.
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            Theo dõi mục <b>Thành viên</b> để biết ai là "trùm" của tuần này nhé!
          </li>
        </ul>
      </section>

      <div className="mt-10 flex flex-col items-center gap-4">
        <button 
          onClick={() => navigate('/')}
          className="velocity-gradient text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all w-full"
        >
          Bắt đầu ngay thôi!
        </button>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
          Ứng dụng phát triển bởi Bành Đại Dũng
        </p>
      </div>
    </div>
  );
};

export default Guide;
