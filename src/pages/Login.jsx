import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn, signInWithGoogle, signInWithFacebook, isInAppBrowser, signInWithGoogleRedirect, signInWithFacebookRedirect } from '../services/authService';
import Logo from '../components/Logo';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const inAppBrowser = isInAppBrowser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email/mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setPopupBlocked(false);
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      console.error("Google Login Error:", err);
      if (err.code === 'auth/popup-blocked') {
        setPopupBlocked(true);
        setError('Trình duyệt đã chặn cửa sổ đăng nhập.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Bạn chưa bật tính năng Đăng nhập Google trong Firebase Console.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        // Just ignore
      } else {
        setError(`Lỗi: ${err.message}`);
      }
    }
  };

  const handleGoogleRedirect = async () => {
    try {
      await signInWithGoogleRedirect();
    } catch (err) {
      setError(`Lỗi: ${err.message}`);
    }
  };

  const handleFacebookLogin = async () => {
    setError('');
    setPopupBlocked(false);
    try {
      await signInWithFacebook();
      navigate('/');
    } catch (err) {
      console.error("Facebook Login Error:", err);
      if (err.code === 'auth/popup-blocked') {
        setPopupBlocked(true);
        setError('Trình duyệt đã chặn cửa sổ đăng nhập.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Bạn chưa bật Facebook trong Firebase Console.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        // Do nothing
      } else {
        setError(`Lỗi: ${err.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F3] font-body flex items-center justify-center p-4">
      <div className="bg-[#FFF9F5] w-full max-w-md rounded-[2.5rem] shadow-2xl shadow-orange-900/5 p-8 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7A00]/5 rounded-full blur-[80px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF7A00]/5 rounded-full blur-[80px] -z-10"></div>

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Logo iconClassName="w-12 h-12" fontSize="text-2xl" showText={true} />
        </div>

        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl font-headline font-extrabold tracking-tight text-[#4A2C2A]">Chào mừng trở lại</h1>
          <p className="text-[#8E7C7A] text-sm">Vui lòng nhập thông tin để truy cập tài khoản của bạn</p>
        </div>

        {/* In-App Browser Warning */}
        {inAppBrowser && (
          <div className="mb-6 p-4 bg-orange-100 border-l-4 border-orange-500 rounded-lg animate-pulse">
            <div className="flex gap-2">
              <span className="material-symbols-outlined text-orange-600">warning</span>
              <p className="text-xs font-bold text-orange-800 leading-tight">
                Bạn đang sử dụng trình duyệt nhúng (Zalo/FB). 
                Vui lòng nhấn <span className="text-orange-900 underline">"Mở bằng trình duyệt Safari/Chrome"</span> để có thể đăng nhập Google/Facebook.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <p className="text-xs font-bold text-red-600">{error}</p>
            {popupBlocked && (
              <button 
                onClick={handleGoogleRedirect}
                className="mt-2 text-[10px] font-black uppercase tracking-widest text-red-800 underline hover:text-red-950"
              >
                Hoặc nhấn vào đây để thử phương pháp chuyển hướng
              </button>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#8E7C7A] ml-2">Email</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#BBA59E]">mail</span>
              <input 
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full h-14 bg-[#FDF0E5] rounded-2xl pl-12 pr-4 border-none focus:ring-2 focus:ring-[#FF7A00]/30 outline-none text-[#4A2C2A] placeholder:text-[#BBA59E] font-medium transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#8E7C7A] ml-2">Mật khẩu</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#BBA59E]">lock</span>
              <input 
                name="password"
                type={showPassword ? "text" : "password"} 
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full h-14 bg-[#FDF0E5] rounded-2xl pl-12 pr-12 border-none focus:ring-2 focus:ring-[#FF7A00]/30 outline-none text-[#4A2C2A] placeholder:text-[#BBA59E] font-medium tracking-widest transition-all"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BBA59E] hover:text-[#4A2C2A] transition-colors"
              >
                <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 rounded-md border-2 border-[#EAD0C0] text-[#FF7A00] focus:ring-[#FF7A00]/30 checked:bg-[#FF7A00] checked:border-transparent transition-all cursor-pointer appearance-none"
                />
                <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 material-symbols-outlined text-white text-sm pointer-events-none transition-opacity ${rememberMe ? 'opacity-100' : 'opacity-0'}`}>check</span>
              </div>
              <span className="text-xs font-bold text-[#8E7C7A] group-hover:text-[#4A2C2A] transition-colors uppercase tracking-wider">Ghi nhớ mật khẩu</span>
            </label>
            <a href="#" className="text-xs font-bold text-[#A54B00] hover:text-[#FF7A00] transition-colors uppercase tracking-wider">Quên mật khẩu?</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 mt-4 bg-[#D65D00] hover:bg-[#FF7A00] text-white rounded-2xl font-bold font-headline text-lg tracking-wide shadow-lg shadow-orange-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            {!loading && <span className="material-symbols-outlined font-bold">arrow_forward</span>}
          </button>
        </form>

        <div className="flex items-center gap-4 my-8">
          <div className="h-px bg-[#EAD0C0] flex-1"></div>
          <span className="text-[10px] font-bold text-[#BBA59E] uppercase tracking-widest">Hoặc đăng nhập bằng</span>
          <div className="h-px bg-[#EAD0C0] flex-1"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={handleGoogleLogin}
            type="button" 
            className="h-14 bg-[#FCF3EA] hover:bg-[#F3E2D5] rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            <span className="font-bold text-sm text-[#4A2C2A]">Google</span>
          </button>
          <button 
            onClick={handleFacebookLogin}
            type="button" 
            className="h-14 bg-[#FCF3EA] hover:bg-[#F3E2D5] rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
            <span className="font-bold text-sm text-[#4A2C2A]">Facebook</span>
          </button>
        </div>

        <div className="text-center text-sm font-medium text-[#8E7C7A]">
          Chưa có tài khoản?{' '}
          <Link to="/registration" className="font-bold text-[#A54B00] hover:text-[#FF7A00] transition-colors">Đăng ký ngay</Link>
        </div>
      </div>
      
      {/* Decorative background bottom circle matching main layout */}
      <div className="fixed -bottom-20 -right-20 w-80 h-80 bg-[#FF7A00]/5 rounded-full blur-[100px] pointer-events-none -z-20"></div>
    </div>
  );
};

export default Login;
