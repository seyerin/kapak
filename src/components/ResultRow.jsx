import React from 'react';

export const ResultRow = ({ label, value, isTax = false, isTotal = false, isTaxable = false }) => (
  <div className={`flex justify-between items-center py-2 px-4 rounded-lg transition duration-150 ease-in-out border ${isTotal ? 'bg-indigo-100 font-semibold border-indigo-400' : isTax ? 'bg-red-50 text-red-700 border-red-300' : isTaxable ? 'bg-yellow-50 text-yellow-800 border-yellow-300' : 'bg-white hover:bg-gray-50 border-gray-100'}`}>
    <span className={`font-spartan ${isTotal ? 'text-base text-indigo-800' : 'text-sm text-gray-600'}`}>{label}</span>
    <span className={`text-right font-mono ${isTotal || isTax ? 'text-lg font-bold' : 'text-base font-medium text-gray-900'}`}>{value}</span>
  </div>
);