import { LucideCalculator } from 'lucide-react';

export function SplashScreen({ onAnimationEnd, style }) {
  return (
    <div
      onTransitionEnd={onAnimationEnd} // <-- KUNCI PERBAIKANNYA DI SINI
      style={style}
      className="fixed inset-0 flex flex-col items-center justify-center bg-slate-800 transition-opacity duration-500 ease-in-out"
    >
      <div className="flex items-center space-x-4 text-white">
        <LucideCalculator size={48} className="animate-pulse" />
        <div className="text-4xl font-bold font-spartan tracking-widest">
          PAJAKIN
        </div>
      </div>
      <p className="text-slate-400 mt-4">Kalkulator Pajak Modern</p>
    </div>
  );
}