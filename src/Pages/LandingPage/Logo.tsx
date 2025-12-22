import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Icon Mark */}
      <div className="w-10 h-10 relative flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* The dark green secure loop forming a subtle shield/circle */}
          <path d="M20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36V31C13.9249 31 9 26.0751 9 20C9 13.9249 13.9249 9 20 9V4Z" fill="#0F4C3A"/>
          <path d="M20 36C28.8366 36 36 28.8366 36 20C36 11.1634 28.8366 4 20 4V9C26.0751 9 31 13.9249 31 20C31 26.0751 26.0751 31 20 31V36Z" fill="#0F4C3A"/>
          
          {/* The bright accents showing movement/arrows at the start and end of the loop */}
          <path d="M31 20L36 15V25L31 20Z" fill="#34D399"/>
          <path d="M9 20L4 25V15L9 20Z" fill="#34D399"/>
        </svg>
      </div>
      
      {/* Text typography */}
      <div className="flex flex-col leading-none">
         <span className="text-2xl font-bold text-[#111827] tracking-tight">
           Safe<span className="text-[#0F4C3A]">Qly</span>
         </span>
      </div>
    </div>
  );
};

export default Logo;