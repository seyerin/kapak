import React from 'react';

export const ResultRow = ({ label, value, isTax = false, isTotal = false, isTaxable = false }) => (
  <div className={`flex justify-between items-center py-2.5 px-4 rounded-lg transition duration-150 ease-in-out 
    ${isTotal ? 'bg-indigo-100 font-semibold' : ''}
    ${isTaxable ? 'bg-yellow-100/60' : ''}
    ${isTax ? 'bg-red-100/60' : ''}
  `}>
    <span className={`font-spartan text-sm ${isTotal ? 'text-indigo-800' : 'text-slate-600'}`}>{label}</span>
    <span className={`text-right font-mono ${isTotal || isTax ? 'text-base font-bold' : 'text-base font-medium'} ${isTax ? 'text-red-700' : 'text-slate-900'}`}>{value}</span>
  </div>
);