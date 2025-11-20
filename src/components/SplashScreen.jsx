import React from 'react';
import { LucideScale } from 'lucide-react';

export const SplashScreen = ({ onAnimationEnd }) => (
  <div 
    className="fixed inset-0 bg-indigo-600 flex flex-col items-center justify-center z-[100] font-spartan transition-opacity duration-700 ease-in-out"
    onTransitionEnd={onAnimationEnd}
  >
    <div className="text-white text-center animate-pulse">
      <LucideScale className="w-24 h-24 mx-auto mb-4" />
      <h1 className="text-4xl font-extrabold">Kalkulator Pajak</h1>
      <p className="text-lg mt-2 text-indigo-200">Memuat aplikasi...</p>
    </div>
  </div>
);