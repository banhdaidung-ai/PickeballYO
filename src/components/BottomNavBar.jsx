import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNavBar = () => {
  const getNavClass = ({ isActive }) => {
    return `flex flex-col items-center justify-center px-4 py-1.5 transition-all ${
      isActive
        ? 'bg-primary text-on-primary rounded-2xl scale-110 shadow-lg shadow-primary/20'
        : 'text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed'
    }`;
  };

  const getIconStyle = ({ isActive }) => {
    return isActive ? { fontVariationSettings: "'FILL' 1" } : {};
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-t-[24px] z-50 shadow-[0_-8px_24px_rgba(255,122,0,0.08)]">
      <NavLink to="/" className={getNavClass} end>
        {({ isActive }) => (
          <>
            <span className="material-symbols-outlined" style={getIconStyle({isActive})}>home</span>
            <span className="text-[10px] font-semibold font-label tracking-wide uppercase mt-1">Trang chủ</span>
          </>
        )}
      </NavLink>
      <NavLink to="/schedule" className={getNavClass}>
        {({ isActive }) => (
          <>
            <span className="material-symbols-outlined" style={getIconStyle({isActive})}>calendar_today</span>
            <span className="text-[10px] font-semibold font-label tracking-wide uppercase mt-1">Lịch tập</span>
          </>
        )}
      </NavLink>
      <NavLink to="/assets" className={getNavClass}>
        {({ isActive }) => (
          <>
            <span className="material-symbols-outlined" style={getIconStyle({isActive})}>sports_tennis</span>
            <span className="text-[10px] font-semibold font-label tracking-wide uppercase mt-1">Đặt sân</span>
          </>
        )}
      </NavLink>
      <NavLink to="/members" className={getNavClass}>
         {({ isActive }) => (
          <>
            <span className="material-symbols-outlined" style={getIconStyle({isActive})}>group</span>
            <span className="text-[10px] font-semibold font-label tracking-wide uppercase mt-1">Thành viên</span>
          </>
        )}
      </NavLink>
      <NavLink to="/profile" className={getNavClass}>
        {({ isActive }) => (
          <>
            <span className="material-symbols-outlined" style={getIconStyle({isActive})}>person</span>
            <span className="text-[10px] font-semibold font-label tracking-wide uppercase mt-1">Hồ sơ</span>
          </>
        )}
      </NavLink>
    </nav>
  );
};

export default BottomNavBar;
