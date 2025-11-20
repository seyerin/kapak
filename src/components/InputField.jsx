import React, { useState, useEffect } from 'react';
import { parseIDR } from '@/utils/formatters.js';

export const InputField = ({ label, value, onChange, icon: Icon }) => {
  const [displayValue, setDisplayValue] = useState(
    value.toLocaleString('id-ID', { maximumFractionDigits: 0 })
  );

  useEffect(() => {
    if (document.activeElement?.id !== label.replace(/\s/g, '-')) {
        setDisplayValue(value.toLocaleString('id-ID', { maximumFractionDigits: 0 }));
    }
  }, [value, label]);

  const handleChange = (e) => {
    const rawValue = e.target.value;
    setDisplayValue(rawValue);
    const numericValue = parseIDR(rawValue);
    onChange(numericValue);
  };
  
  const handleBlur = () => {
    const formattedValue = value > 0 ? value.toLocaleString('id-ID', { maximumFractionDigits: 0 }) : '0';
    setDisplayValue(formattedValue);
  };

  return (
    <div className="flex flex-col space-y-1 font-spartan">
      <label htmlFor={label.replace(/\s/g, '-')} className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative rounded-lg shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-indigo-500" aria-hidden="true" />
        </div>
        <input
          id={label.replace(/\s/g, '-')} type="text" value={displayValue} onChange={handleChange} onBlur={handleBlur}
          className="block w-full rounded-lg border-gray-300 pl-10 pr-4 py-2 text-lg text-right font-mono tracking-wider focus:border-indigo-600 focus:ring-indigo-600 transition duration-150 ease-in-out"
          placeholder="0"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 text-sm font-medium">IDR</span>
        </div>
      </div>
    </div>
  );
};