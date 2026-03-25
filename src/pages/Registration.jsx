import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/authService';
import Logo from '../components/Logo';

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registrationSuccess) return;
    setError('');
    
    // Basic Validation
    if (!formData.fullName.trim()) {
      setError("Vui lòng nhập họ và tên.");
      return;
    }
    if (!formData.email.trim()) {
      setError("Vui lòng nhập địa chỉ email.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Email không đúng định dạng. Ví dụ: name@example.com");
      return;
    }
    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    setLoading(true);

    try {
      await signUp(formData.email, formData.password, {
        fullName: formData.fullName,
        phone: formData.phone
      });
      
      setRegistrationSuccess(true);
      // Redirect after 2 seconds to show success message
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error("Registration handle error:", err);
      let friendlyMessage = "Đã có lỗi xảy ra. Vui lòng thử lại.";
      
      if (err.code === 'auth/email-already-in-use') {
        friendlyMessage = "Email này đã được sử dụng. Vui lòng dùng email khác hoặc đăng nhập.";
      } else if (err.code === 'auth/invalid-email') {
        friendlyMessage = "Địa chỉ email không hợp lệ.";
      } else if (err.code === 'auth/weak-password') {
        friendlyMessage = "Mật khẩu quá yếu. Vui lòng chọn mật khẩu mạnh hơn.";
      } else if (err.code === 'auth/network-request-failed') {
        friendlyMessage = "Lỗi kết nối mạng. Vui lòng kiểm tra lại internet.";
      } else if (err.message) {
        friendlyMessage = err.message;
      }
      
      setError(friendlyMessage);
    } finally {
      if (!registrationSuccess) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] font-body text-[#4A2C2A] pb-10 relative">
      {/* Success Notification Overlay */}
      {registrationSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#FFF8F3]/90 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl shadow-orange-900/20 text-center space-y-6 scale-up-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-green-900/20">
              <span className="material-symbols-outlined text-white text-5xl font-black">check_circle</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-headline font-black text-[#4A2C2A] italic tracking-tighter uppercase">SUCCESS!</h3>
              <p className="text-[#4A2C2A]/70 font-bold text-sm leading-relaxed">
                Tài khoản của bạn đã được khởi tạo thành công.<br/>Đang đưa bạn đến trang chủ...
              </p>
            </div>
            <div className="pt-2">
              <div className="w-full h-1.5 bg-[#FDF0E5] rounded-full overflow-hidden">
                <div className="h-full bg-green-500 animate-progress"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-6 sticky top-0 bg-[#FFF8F3]/80 backdrop-blur-md z-50">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm active:scale-95 transition-all text-[#FF7A00]"
        >
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <Logo iconClassName="w-8 h-8" showText={true} fontSize="text-xl" />
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FF7A00] shadow-lg shadow-orange-900/20 text-white">
          <span className="material-symbols-outlined font-bold">help</span>
        </button>
      </header>

      <main className="px-6 space-y-8 max-w-lg mx-auto">
        {/* Step Indicator */}
        <section className="relative px-2">
          <div className="flex justify-between items-start relative z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#C35A00] text-white flex items-center justify-center font-headline font-black text-xl shadow-xl shadow-orange-900/30 ring-4 ring-white">1</div>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">INFO</span>
            </div>
            <div className="flex flex-col items-center gap-2 mt-2">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-[#EAD0C0] text-[#D5B8A6] flex items-center justify-center font-headline font-bold text-lg">2</div>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">PLAN</span>
            </div>
            <div className="flex flex-col items-center gap-2 mt-2">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-[#EAD0C0] text-[#D5B8A6] flex items-center justify-center font-headline font-bold text-lg">3</div>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">PAYMENT</span>
            </div>
          </div>
          <div className="absolute top-6 left-12 right-12 h-[2px] bg-[#EAD0C0] -z-0"></div>
        </section>

        {/* Title */}
        <section>
          <h2 className="text-4xl font-headline font-black text-[#4A2C2A] relative inline-block">
            PersonalInfo
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#FF7A00] rounded-full"></span>
          </h2>
          {error && <p className="text-red-500 text-xs mt-2 font-bold">{error}</p>}
        </section>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#4A2C2A]/60 ml-1">FULL NAME</label>
            <input 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              type="text" 
              placeholder="Enter your full name"
              className="w-full h-14 bg-[#FDF0E5] border-none rounded-2xl px-6 focus:ring-2 focus:ring-[#FF7A00]/20 transition-all placeholder:text-[#D5B8A6] font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#4A2C2A]/60 ml-1">PHONE NUMBER</label>
            <input 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel" 
              placeholder="+84 ..."
              className="w-full h-14 bg-[#FDF0E5] border-none rounded-2xl px-6 focus:ring-2 focus:ring-[#FF7A00]/20 transition-all placeholder:text-[#D5B8A6] font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#4A2C2A]/60 ml-1">EMAIL</label>
            <input 
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email" 
              placeholder="hello@example.com"
              className="w-full h-14 bg-[#FDF0E5] border-none rounded-2xl px-6 focus:ring-2 focus:ring-[#FF7A00]/20 transition-all placeholder:text-[#D5B8A6] font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#4A2C2A]/60 ml-1">PASSWORD</label>
            <input 
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password" 
              placeholder="••••••••"
              className="w-full h-14 bg-[#FDF0E5] border-none rounded-2xl px-6 focus:ring-2 focus:ring-[#FF7A00]/20 transition-all placeholder:text-[#D5B8A6] font-medium"
            />
          </div>

          {/* Banner Section */}
          <section className="relative h-44 rounded-[2rem] overflow-hidden group shadow-xl shadow-orange-900/10 my-6">
            <img 
              src="images/registration-banner.png" 
              alt="Pickleball Player" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-6 right-6">
              <h3 className="text-2xl font-headline font-black text-white leading-none mb-1 tracking-tighter">
                JOIN THE <span className="text-[#FF7A00] italic">MOVEMENT.</span>
              </h3>
              <p className="text-white/70 text-[8px] font-bold uppercase tracking-widest">LEVEL UP YOUR GAME TODAY</p>
            </div>
          </section>

          {/* Action Button */}
          <button 
            type="submit"
            disabled={loading}
            className={`w-full h-16 bg-gradient-to-br from-[#A54B00] via-[#FF7A00] to-[#FF9E4D] text-white rounded-2xl font-headline font-black text-lg tracking-tight shadow-xl shadow-orange-900/40 flex items-center justify-center gap-3 active:scale-95 transition-all uppercase px-8 ${loading ? 'opacity-70' : ''}`}
          >
            {loading ? 'Đang đăng ký...' : 'CONFIRM REGISTRATION'}
            {!loading && <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>}
          </button>
        </form>
      </main>

      <div className="fixed -bottom-20 -right-20 w-80 h-80 bg-[#FF7A00]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
    </div>
  );
};

export default Registration;
