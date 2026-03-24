import React from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF8F3] font-body text-[#4A2C2A] pb-10">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-6 sticky top-0 bg-[#FFF8F3]/80 backdrop-blur-md z-50">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm active:scale-95 transition-all text-[#FF7A00]"
        >
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h1 className="text-xl font-black italic tracking-tighter text-[#4A2C2A] font-headline uppercase">CLUB JOIN</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FF7A00] shadow-lg shadow-orange-900/20 text-white">
          <span className="material-symbols-outlined font-bold">help</span>
        </button>
      </header>

      <main className="px-6 space-y-10 max-w-lg mx-auto">
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
          {/* Connector Lines */}
          <div className="absolute top-6 left-12 right-12 h-[2px] bg-[#EAD0C0] -z-0"></div>
        </section>

        {/* Title */}
        <section>
          <h2 className="text-4xl font-headline font-black text-[#4A2C2A] relative inline-block">
            PersonalInfo
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#FF7A00] rounded-full"></span>
          </h2>
        </section>

        {/* Form Fields */}
        <section className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#4A2C2A]/60 ml-1">FULL NAME</label>
            <input 
              type="text" 
              placeholder="Enter your full name"
              className="w-full h-16 bg-[#FDF0E5] border-none rounded-3xl px-6 focus:ring-2 focus:ring-[#FF7A00]/20 transition-all placeholder:text-[#D5B8A6] font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#4A2C2A]/60 ml-1">PHONE NUMBER</label>
            <input 
              type="tel" 
              placeholder="+84 ..."
              className="w-full h-16 bg-[#FDF0E5] border-none rounded-3xl px-6 focus:ring-2 focus:ring-[#FF7A00]/20 transition-all placeholder:text-[#D5B8A6] font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#4A2C2A]/60 ml-1">EMAIL</label>
            <input 
              type="email" 
              placeholder="hello@example.com"
              className="w-full h-16 bg-[#FDF0E5] border-none rounded-3xl px-6 focus:ring-2 focus:ring-[#FF7A00]/20 transition-all placeholder:text-[#D5B8A6] font-medium"
            />
          </div>
        </section>

        {/* Banner Section */}
        <section className="relative h-56 rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-orange-900/10">
          <img 
            src="images/registration-banner.png" 
            alt="Pickleball Player" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-8 right-8">
            <h3 className="text-3xl font-headline font-black text-white leading-none mb-1 tracking-tighter">
              JOIN THE <span className="text-[#FF7A00] italic">MOVEMENT.</span>
            </h3>
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">LEVEL UP YOUR GAME TODAY</p>
          </div>
        </section>

        {/* Action Button */}
        <section className="pt-4">
          <button className="w-full h-20 bg-gradient-to-br from-[#A54B00] via-[#FF7A00] to-[#FF9E4D] text-white rounded-[2rem] font-headline font-black text-xl tracking-tight shadow-xl shadow-orange-900/40 flex items-center justify-center gap-3 active:scale-95 transition-all uppercase px-8">
            CONFIRM REGISTRATION
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
          </button>
        </section>
      </main>

      {/* Decorative background elements */}
      <div className="fixed -bottom-20 -right-20 w-80 h-80 bg-[#FF7A00]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed top-40 -left-20 w-64 h-64 bg-[#FF7A00]/5 rounded-full blur-[80px] pointer-events-none -z-10"></div>
    </div>
  );
};

export default Registration;
