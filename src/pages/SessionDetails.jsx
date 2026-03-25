import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { subscribeToSession } from '../services/dataService';
import { bookSession, cancelBooking } from '../services/bookingService';
import Logo from '../components/Logo';

const SessionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, userData } = useAuth();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToSession(id, (data) => {
      setSession(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  const isUserParticipating = session?.participants?.some(p => p.userId === user?.uid);

  const handleJoin = async () => {
    if (!user) {
      navigate('/registration');
      return;
    }
    setBooking(true);
    try {
      await bookSession(id, user.uid, userData?.fullName || user.email);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setBooking(false);
    }
  };

  const handleCancel = async () => {
    if (!user?.uid) {
      console.error("[SessionDetails] No user.uid found during cancel");
      setModalError("Vui lòng đăng nhập lại để thực hiện.");
      return;
    }
    
    setModalError('');
    setBooking(true);
    try {
      console.log(`[SessionDetails] Current State - User: ${user.uid}, SessionID: ${id}`);
      console.log(`[SessionDetails] Participants in state:`, session.participants);
      
      await cancelBooking(id, user.uid);
      
      console.log("[SessionDetails] Cancellation success!");
      setShowConfirm(false);
      setCancelSuccess(true);
      setTimeout(() => setCancelSuccess(false), 3000);
    } catch (error) {
      console.error("[SessionDetails] Cancellation failed with error:", error);
      setModalError(error.message || "Đã có lỗi xảy ra. Thử lại.");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-surface">
        <h2 className="text-2xl font-black font-headline text-on-surface mb-4 uppercase italic tracking-tighter">Không tìm thấy buổi tập</h2>
        <button onClick={() => navigate('/schedule')} className="bg-primary text-white px-8 py-3 rounded-xl font-bold">Quay lại lịch tập</button>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen pb-32 relative">
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl text-center space-y-6 scale-up-center">
            <div className="w-20 h-20 bg-orange-50 rounded-full mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-orange-500 text-4xl">help</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-headline font-black text-[#4A2C2A] tracking-tighter uppercase">XÁC NHẬN HỦY</h3>
              <p className="text-[#4A2C2A]/70 font-medium text-sm">
                Bạn có chắc chắn muốn hủy tham gia buổi tập này không?
              </p>
              {modalError && (
                <div className="mt-2 p-3 bg-red-50 rounded-xl">
                  <p className="text-xs font-bold text-red-600 leading-tight">
                    {modalError}
                  </p>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirm(false)}
                disabled={booking}
                className="flex-1 py-4 bg-[#FDF0E5] text-[#4A2C2A] rounded-2xl font-bold text-sm uppercase transition-colors cursor-pointer touch-manipulation disabled:opacity-50"
              >
                Không
              </button>
              <button 
                onClick={handleCancel}
                disabled={booking}
                className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold text-sm uppercase shadow-lg shadow-red-900/20 active:scale-95 transition-all cursor-pointer touch-manipulation flex items-center justify-center gap-2"
              >
                {booking ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Đang hủy...</span>
                  </>
                ) : 'Đúng, Hủy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification Overlay */}
      {cancelSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-orange-50/90 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl shadow-orange-900/10 text-center space-y-6 scale-up-center">
            <div className="w-20 h-20 bg-red-100 rounded-full mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-red-600 text-4xl font-black">cancel</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-headline font-black text-[#4A2C2A] tracking-tighter uppercase">ĐÃ HỦY THÀNH CÔNG</h3>
              <p className="text-[#4A2C2A]/70 font-medium text-sm">
                Bạn đã hủy tham gia buổi tập này.
              </p>
            </div>
            <button 
              onClick={() => setCancelSuccess(false)}
              className="w-full py-4 bg-[#FDF0E5] text-[#4A2C2A] rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#F3E2D5] transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      <header className="fixed top-0 w-full z-50 bg-orange-50/80 dark:bg-slate-950/80 backdrop-blur-md flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)}
            className="text-orange-600 active:scale-95 duration-200 cursor-pointer touch-manipulation"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <Logo iconClassName="w-8 h-8" showText={true} fontSize="text-xl" textColor="text-orange-600 dark:text-orange-400" />
        </div>
        <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-primary-container">
          <img className="w-full h-full object-cover" alt="User profile" src={user?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuAnKA1RmjFvYnMEzjttpJ2pGlM4QzXFgMLEuaNn729YytQS2C0vmfwxShnjeyGJOaw7spJH7YdXGr7ufHtvaZnDqm2W1elLE9HRI16ZbCfotNBZ3gnWKLLaZUDLmGn76Gsq9EeVctEXmbRqIQkcDzRPadW8QH3vZIa1tpjOA-rYzIBwVsWYtk6o5_u_k6K21NR1PJ_NwasUJC760gvPPOyUZelXfpJs5os58He9aUpSSCnMUkvU8kmS7KcWgY_B9suxuelRcGHhLqc"}/>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-8">
        <section className="relative">
          <div className="absolute -left-4 top-0 w-1 h-16 bg-primary-container rounded-full"></div>
          <h1 className="text-4xl font-black tracking-tighter leading-none mb-4 uppercase">
            {session.courtName} <span className="text-primary-container italic">{session.startTime}</span>
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{session.type || 'Sân Pickleball'}</span>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${session.isLive ? 'bg-orange-500 text-white animate-pulse' : 'bg-surface-container-highest text-on-surface-variant'}`}>
              {session.isLive ? 'LIVE NOW' : 'Scheduled'}
            </span>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-6 rounded-xl space-y-2">
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Ngày tập</p>
              <p className="text-lg font-bold">{session.dayLabel}</p>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl space-y-2">
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Thời gian</p>
              <p className="text-lg font-bold">{session.timeRange}</p>
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-1 border-l-2 border-primary-container">
              Đã tham gia ({session.participants?.length || 0})
            </h3>
          </div>
          <div className="flex -space-x-3 items-center overflow-x-auto py-2">
            {session.participants?.map((participant, index) => (
              <div key={index} className="w-12 h-12 rounded-full border-4 border-surface bg-surface-container-highest flex items-center justify-center overflow-hidden hover:translate-y-[-4px] transition-all" title={participant.userName}>
                <span className="text-[10px] font-bold uppercase">{participant.userName?.substring(0, 2)}</span>
              </div>
            ))}
            {(!session.participants || session.participants.length === 0) && (
              <p className="text-xs text-on-surface-variant italic ml-3">Chưa có người tham gia</p>
            )}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-1 border-l-2 border-primary-container">Vị trí sân</h3>
            <p className="text-xs font-bold">{session.courtName}</p>
          </div>
          <a
            href={session.courtName?.toUpperCase().includes('DIVO') ? 'https://www.google.com/maps/search/?api=1&query=20.92091941833496,106.33627319335938' : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-inner bg-surface-container group">
              <img className="w-full h-full object-cover opacity-80 mix-blend-multiply group-hover:opacity-100 transition-opacity" alt="Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9YEORW4Nt5peRLtjPJqG3eoBrvcxRyPZnTIz4ysfBEUJFApl_jacICmePF1zAdc4mU2fBz3yeElaT5RifYrut2JMjr9wHOymSZOouEUYG33QMhfxxffLm4vnkOhW-cKeo1D8nF8zpd4n7eWrveKrPehNCAGE7imoVyJxzD30-Fhr8UxChLZaU1SKeGm_Zszm0avez51lD-zjfpyCt7u-GxRIYdACKonbyezyi7HvDxb6IE_u14JrvgspldBuJs5WdfEX6xYH5DIU"/>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="material-symbols-outlined text-primary-container text-4xl drop-shadow-lg" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              </div>
              {session.courtName?.toUpperCase().includes('DIVO') && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow">
                  <span className="material-symbols-outlined text-[14px] text-primary">open_in_new</span>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Xem trên Google Maps</span>
                </div>
              )}
            </div>
          </a>
        </section>
      </main>

      <div className="fixed bottom-0 w-full z-50 p-6 pb-12 sm:pb-6 bg-gradient-to-t from-surface via-surface to-transparent shadow-[0_-20px_20px_-5px_rgba(255,255,255,0.8)]" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 32px)' }}>
        {isUserParticipating ? (
          <div className="flex gap-3">
            <div className="flex-1 h-16 rounded-xl bg-green-600 text-white flex items-center justify-center gap-2 font-black text-base uppercase shadow-xl">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Bạn đã tham gia
            </div>
            <button
              onClick={() => setShowConfirm(true)}
              disabled={booking}
              className="h-16 px-5 rounded-xl bg-red-100 text-red-600 font-black text-sm uppercase flex items-center justify-center gap-1 shadow active:scale-95 transition-all disabled:opacity-50 border border-red-200 cursor-pointer touch-manipulation"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
              {booking ? '...' : 'Hủy'}
            </button>
          </div>
        ) : (
          <button
            onClick={handleJoin}
            disabled={booking}
            className="w-full h-16 rounded-xl font-black text-lg tracking-tight shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all uppercase bg-gradient-to-br from-[#FF7A00] to-[#C35A00] text-white shadow-orange-900/20 disabled:opacity-60 cursor-pointer touch-manipulation"
          >
            {booking ? 'Đang xử lý...' : 'Xác nhận tham gia'}
            {!booking && <span className="material-symbols-outlined">bolt</span>}
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionDetails;
