import React from 'react';

const Logo = ({ iconClassName = "w-10 h-10", textColor = "text-[#FF7A00]", showText = false, fontSize = "text-xl", iconOnly = false }) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`flex-shrink-0 ${iconClassName}`}>
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pickleball Paddle */}
          <g transform="rotate(-15 50 50)">
            {/* Paddle Head */}
            <rect 
              x="30" y="15" width="40" height="45" rx="15" 
              fill="#FF7A00" 
            />
            {/* Handle */}
            <rect 
              x="46" y="60" width="8" height="25" rx="4" 
              fill="#FF7A00" 
            />
          </g>
          {/* Ball */}
          <circle cx="75" cy="75" r="8" fill="#FF7A00" />
        </svg>
      </div>
      {showText && !iconOnly && (
        <span className={`${textColor} font-headline font-black italic tracking-tighter ${fontSize} uppercase whitespace-nowrap`}>
          Pickleball Club
        </span>
      )}
    </div>
  );
};

export default Logo;
