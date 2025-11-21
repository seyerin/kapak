import React from 'react';

export function Tooltip({ children, text }) {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute bottom-full mb-2 w-64 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-lg 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                      transform translate-y-2 group-hover:translate-y-0">
        {text}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-800"></div>
      </div>
    </div>
  );
}