import React from 'react';

export const ResultRow = ({ label, value, isTax = false, isTotal = false, isTaxable = false }) => (
  <div className={`flex justify-between items-center py-2 px-3 rounded-md transition duration-150 ease-in-out 
    ${isTotal ? 'bg-navy-700/10' : ''}
  `}>
    <span className={`font-spartan text-sm ${isTotal ? 'font-bold text-navy-800' : 'text-navy-700'}`}>{label}</span>
    <span className={`text-right font-mono 
      ${isTotal ? 'text-xl font-bold text-navy-900' : 'text-base font-medium'} 
      ${isTax ? 'text-red-600' : 'text-navy-900'}
      ${isTaxable ? 'text-amber-600' : ''}
    `}>
      {value}
    </span>
  </div>
);