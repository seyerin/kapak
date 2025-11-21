import React from 'react';

export const ResultRow = ({ label, value, isTax = false, isTotal = false, isTaxable = false }) => (
  <div className={`flex justify-between items-center py-2.5 px-3 rounded-md transition duration-150 ease-in-out 
    ${isTotal ? 'bg-navy-900/50 -mx-3 px-6 py-4' : ''}
  `}>
    <span className={`text-sm ${isTotal ? 'font-semibold text-navy-200' : 'text-navy-300'}`}>{label}</span>
    <span className={`text-right  
      ${isTotal ? 'text-3xl font-bold text-white' : 'text-base font-semibold'} 
      ${isTax ? 'text-red-400' : 'text-navy-100'}
      ${isTaxable ? 'text-sky-400' : ''}
    `}>
      {value}
    </span>
  </div>
);