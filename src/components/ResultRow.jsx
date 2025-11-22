import React from 'react';

export const ResultRow = ({ label, value, isTax = false, isTotal = false, isTaxable = false }) => (
  <div className={`flex justify-between items-center py-2 px-1 transition duration-150 ease-in-out 
    ${isTotal ? 'border-t border-navy-700 mt-4 pt-4' : ''}
  `}>
    <span className={`text-sm ${isTotal ? 'font-bold text-navy-100' : 'text-navy-300'}`}>{label}</span>
    <span className={`text-right font-sans
      ${isTotal ? 'text-5xl font-bold' : 'text-base font-semibold'}
      ${isTax 
        ? 'text-rose-400' 
        : isTaxable 
          ? 'text-amber-400' 
          : isTotal 
            ? 'text-white' 
            : 'text-navy-100'}
    `}>
      {value}
    </span>
  </div>
);