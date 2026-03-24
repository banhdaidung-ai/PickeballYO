import React from 'react';
import { useNavigate } from 'react-router-dom';

const SessionDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface min-h-screen pb-32">
      <header className="fixed top-0 w-full z-50 bg-orange-50/80 dark:bg-slate-950/80 backdrop-blur-md flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)}
            className="text-orange-600 active:scale-95 duration-200"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border-2 border-primary-container">
            <span className="text-yellow-400 font-black text-lg font-headline leading-none">Y</span>
          </div>
          <span className="text-xl font-black italic text-orange-600 dark:text-orange-400 tracking-tight font-headline">CLB Pickleball YODY</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-primary-container">
          <img className="w-full h-full object-cover" alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnKA1RmjFvYnMEzjttpJ2pGlM4QzXFgMLEuaNn729YytQS2C0vmfwxShnjeyGJOaw7spJH7YdXGr7ufHtvaZnDqm2W1elLE9HRI16ZbCfotNBZ3gnWKLLaZUDLmGn76Gsq9EeVctEXmbRqIQkcDzRPadW8QH3vZIa1tpjOA-rYzIBwVsWYtk6o5_u_k6K21NR1PJ_NwasUJC760gvPPOyUZelXfpJs5os58He9aUpSSCnMUkvU8kmS7KcWgY_B9suxuelRcGHhLqc"/>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-8">
        <section className="relative">
          <div className="absolute -left-4 top-0 w-1 h-16 bg-primary-container rounded-full"></div>
          <h1 className="text-4xl font-black tracking-tighter leading-none mb-4 uppercase">
            Pickleball <span className="text-primary-container italic">A1</span>
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Intermediate</span>
            <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Outdoor Court</span>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-6 rounded-xl space-y-2">
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Ngày tập</p>
              <p className="text-lg font-bold">Thứ 2, 12/06</p>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl space-y-2">
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Thời gian</p>
              <p className="text-lg font-bold">8:00 - 10:00</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-container p-6 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg shadow-orange-900/10">
              <img className="w-full h-full object-cover" alt="Coach" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_HYY26xuXr_1Rpw7kadjaum66FUY5CgiV05X35biD2BMtWtkKkoblWkfoIQFd9JbmTqxPNhAZS6fqcug4qJUPgdE83REBU9FOld6MDgI6kh8E1eGto8iEH7tWrkIPNMgF0EGFsgx-6soubNmeczIJNABnJ8KwdA_f8Zc-SuZIgzR4x0YxqZUYGoAoxAPR7WBflAeyjUFExb9a-Ag_kCLGUqA3drJjz7BD1jpe8eb92SVMxFlv5gdm_E40WkPn7LDLHBUVWkseplU"/>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary-container">Huấn luyện viên</p>
              <p className="text-xl font-extrabold italic">Coach Minh Tuấn</p>
              <div className="flex items-center text-primary-fixed text-xs font-bold">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="ml-1">4.9 (120+ Sessions)</span>
              </div>
            </div>
          </div>
          <button className="bg-surface-container-lowest p-2 rounded-full shadow-sm active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-primary-container">chat_bubble</span>
          </button>
        </div>

        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-1 border-l-2 border-primary-container">Đã tham gia (8/10)</h3>
            <span className="text-xs font-bold text-primary">Còn 2 chỗ</span>
          </div>
          <div className="flex -space-x-3 items-center">
            <div className="w-12 h-12 rounded-full border-4 border-surface overflow-hidden hover:translate-y-[-4px] transition-transform">
              <img className="w-full h-full object-cover" alt="Participant 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxAyAg7jDiFu-6SDyPFvUeL3NisoipQ2vwTv_ngtUaz6wfq1oCk_QYCqWw7M9YJaCsOvHUWF8QDvsokYAWfbNr1wx5yfB-NlabfD7ghiOY5i9VAQsAIN4lLYLW0--FPKpuYOh5z4l840u1-n8ZqPZ9VL4x0NzRvQeCREz9wAkK2pBzWRoaX6uG3tiplAJlSXaf49EiFzCQglE3dKYc0PKLZq8kfZm0oVn2svWypOMJsHOnbXgsT80_JQ6v4N65hG-B6AigOQvIf0Q"/>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-surface overflow-hidden hover:translate-y-[-4px] transition-transform">
              <img className="w-full h-full object-cover" alt="Participant 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5HyzCw4pxDrs8ViUk1QOvG4E4aOIe6wv97zN0gn-EG1PHAPfdbGlJYPIWrtY43akHEYk7pjwLWwRbnZwhhDk2WeM-D5II62CG2UmbU_EtH5dxANQMGx6SMVkpuPp8uTp-lbOPYFS3h9YFudSs2rbd95P6yV0dEDRkH7n-8AOEy82TJ6qN1i7TffmNIljTCoTWsG9PFi42-e0Cyc8uq-nlxBH6SGoYFZoi4gRKyfFFm54IkQaWC9aiZI9y3C1-aAJusrgtTEIRFtQ"/>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-surface overflow-hidden hover:translate-y-[-4px] transition-transform">
              <img className="w-full h-full object-cover" alt="Participant 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBknU98y219grAe7--V__16WPT6sAzjPJTeQVNUcCye4CJO1wlT2AMYnqEHmiXHgX2eYwNp6vSp05ZbGTo7nP36Z-0RkcWVqu2ggCL5MzBquA6LYaAL1dt3PdURL9FmWVMx1tdtGVqoHvzsshC3rGI146eNECIx3vFC7R5Qhuns8tn5kZ1_P_8XbqNrvK4aoMFXeFeOFLRKWCujndgf65PBedEaYwBMzCTnEBfMCAvC-7tkuSYcAzJmM43BLfwJLZapW_1zcY-dzds"/>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-surface overflow-hidden hover:translate-y-[-4px] transition-transform">
              <img className="w-full h-full object-cover" alt="Participant 4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbB01qTqHLWRtVCsMKlS8txcBvztNDYw7K8bhlD1viWeWrgjoELs4ktfFfMFynilx9a0MWLdebj4-q2FepF1EHZJq8fXmqh6dA0VRde70Ej6ubzqV_9SCiJpdGunL7DXIoLgQNPfsDcRF2SRmK6nYhUkG3gf6-gZFWSuydR98M_YJqQxvGuAOnqROhPfFFi0Zc2x_k4NGFNQzEdZSu-Xbo6getJUy_OXzFZV5O4BXL1qPUZGr8dYZwcdDr4floIKx1YsKifINb_V8"/>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-surface bg-primary-container flex items-center justify-center text-on-primary font-bold text-sm">
              +4
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-1 border-l-2 border-primary-container">Vị trí sân</h3>
            <p className="text-xs font-bold">Pickleball Center District 7</p>
          </div>
          <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-inner bg-surface-container">
            <img className="w-full h-full object-cover opacity-80 mix-blend-multiply" alt="Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9YEORW4Nt5peRLtjPJqG3eoBrvcxRyPZnTIz4ysfBEUJFApl_jacICmePF1zAdc4mU2fBz3yeElaT5RifYrut2JMjr9wHOymSZOouEUYG33QMhfxxffLm4vnkOhW-cKeo1D8nF8zpd4n7eWrveKrPehNCAGE7imoVyJxzD30-Fhr8UxChLZaU1SKeGm_Zszm0avez51lD-zjfpyCt7u-GxRIYdACKonbyezyi7HvDxb6IE_u14JrvgspldBuJs5WdfEX6xYH5DIU"/>
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <span className="material-symbols-outlined text-primary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/90 kinetic-glass px-3 py-1 rounded-lg">
              <p className="text-[10px] font-bold uppercase text-on-surface">Sân số 04</p>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 w-full z-50 p-6 bg-gradient-to-t from-surface via-surface to-transparent">
        <button 
          onClick={() => navigate('/registration')}
          className="w-full h-16 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl font-black text-lg tracking-tight shadow-xl shadow-orange-900/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          Xác nhận tham gia
          <span className="material-symbols-outlined">bolt</span>
        </button>
      </div>

      <div className="fixed -bottom-20 -right-20 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed top-40 -left-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
    </div>
  );
};

export default SessionDetails;
