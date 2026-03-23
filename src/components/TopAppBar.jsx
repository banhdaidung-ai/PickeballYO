import React from 'react';

const TopAppBar = () => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md fixed top-0 z-50 flex justify-between items-center w-full px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-primary">
          <img alt="Club Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANYak03OFMpHe7s0Q3Pw6qmhiUTiybF2GMnP_KAo_nxCBi8rcePolozlswvDXtUJnL_IRW7T0ajcksoXs3dnJYJoVq6uBFQDRhc8Hz3SluixBqw9dGOSrxE_3j9jHBbQ1Oe4vS2wcHMjjjre31JyvYHWKnl2QcsiCxWt4FswnrDdR71EGbZt7mD6qwbO4zsqLdNGFHrImcr_pd2hsj4tinnZGUQfRYlbNSqUVQxMpXxkaUM-d_mtDLpjhHvjpW8PNVQYILg7wIGho"/>
        </div>
        <h1 className="text-xl font-bold tracking-tighter text-slate-900 dark:text-slate-50 font-headline">CLB PickeBall YODY</h1>
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
