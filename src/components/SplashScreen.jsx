import { LucideAxe } from 'lucide-react';

export function SplashScreen({ onAnimationEnd, style }) {
  const name = "KAPAK";

  return (
    <div
      onTransitionEnd={onAnimationEnd}
      style={style}
      className="fixed inset-0 flex flex-col items-center justify-center bg-slate-800 transition-opacity duration-500 ease-in-out"
    >
      <div className="flex flex-col items-center justify-center">
        <LucideAxe size={64} className="text-white mb-4 origin-bottom-right animate-swing" />
        <div className="flex text-5xl sm:text-6xl font-bold font-mono tracking-widest text-white">
          {name.split('').map((char, index) => (
            <span key={index} className="animate-bounce-in opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
              {char}
            </span>
          ))}
        </div>
        <p className="text-slate-400 mt-4 animate-bounce-in opacity-0" style={{ animationDelay: '600ms' }}>
          Kalkulator Pajak Ngakak
        </p>
      </div>
    </div>
  );
}