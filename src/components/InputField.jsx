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
      <label htmlFor={label.replace(/\s/g, '-')} className="text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-slate-400" aria-hidden="true" />
        </div>
        <input
          id={label.replace(/\s/g, '-')} type="text" value={displayValue} onChange={handleChange} onBlur={handleBlur}
          className="block w-full rounded-lg border-slate-300 bg-white pl-10 pr-4 py-2 text-lg text-right font-mono tracking-wider shadow-sm transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          placeholder="0"
        />
      </div>
    </div>
  );
};