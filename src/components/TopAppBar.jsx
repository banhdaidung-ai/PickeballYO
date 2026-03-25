import React from 'react';
import Logo from './Logo';

const TopAppBar = () => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md fixed top-0 z-50 flex justify-between items-center w-full px-6 py-3">
      <div className="flex items-center gap-3">
        <Logo iconClassName="w-8 h-8" showText={true} fontSize="text-lg" />
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
