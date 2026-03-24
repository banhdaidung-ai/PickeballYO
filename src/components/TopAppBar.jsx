import React from 'react';

const TopAppBar = () => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md fixed top-0 z-50 flex justify-between items-center w-full px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
          <img alt="Club Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClKc3euq-d_fgDVuIMabKEkSp2EjfEzrixT4UUqRLsCVp775SU4f7m-iaj_LwtJ_Asxls3A267Wx4SFKrKA9YYHMQ9Z1BN4RNW0TzxKf-vVUSgO5tkD-o36RQJ6uOaOFkSp2EjfEzrixT4UUqRLsCVp775SU4f7m-iaj_LwtJ_Asxls3A267Wx4SFKrKA9YYHMQ9Z1BN4RNW0TzxKf-vVUSgO5tkD-o36RQJ6uOaOFkSzyp-GR1ij1_wp45M6cPvwmUSjxWeON8Q4thn5eORErrR2Vf66GgqLK7JV53Dymo7zfxsLD8tCmcKAEKQONUATJqwv3_RJiDODEJSlgbH4VmJFmCIWfFNiVvsh2llpPoeKUm8n_4gwGk"/>
        </div>
        <h1 className="text-xl font-bold tracking-tighter text-slate-900 dark:text-slate-50 font-headline">CLB Pickleball YODY</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>notifications</span>
        </button>
      </div>
    </header>
  );
};

export default TopAppBar;
