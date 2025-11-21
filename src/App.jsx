import { useState, useMemo, useEffect } from 'react';
import { CalculationMode as TaxTypeSelector } from '@/components/CalculationMode';
import { SplashScreen } from '@/components/SplashScreen.jsx';
import { Pph21CalculatorUI } from '@/features/pph-calculator/components/Pph21CalculatorUI.jsx';
import { Pph42CalculatorUI } from '@/features/pph-calculator/components/Pph42CalculatorUI.jsx';
import { Pph23CalculatorUI } from '@/features/pph-calculator/components/Pph23CalculatorUI.jsx';

// Daftar semua kalkulator yang tersedia
const calculationModes = [
  { id: 'pph', label: 'PPh 21' },
  { id: 'pph42', label: 'PPh 4(2)' },
  { id: 'pph23', label: 'PPh 23' },
  { id: 'impor', label: 'Pajak Impor' },
  // Tambahkan kalkulator lain di sini
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showApp, setShowApp] = useState(false);

  // State untuk PPh 21
  const [mode, setMode] = useState('pph');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAnimationEnd = () => {
    setShowApp(true);
  };

  if (!showApp) {
    return <SplashScreen onAnimationEnd={handleAnimationEnd} style={{ opacity: loading ? 1 : 0 }} />;
  }

  return (
    <main className="p-4 sm:p-8 font-sans bg-[#e0e5ec] min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-wider">KAPAK</h1>
        <p className="text-sm text-slate-500 mt-1">Kalkulator Pajak Ngakak</p>
      </header>

      {/* Navigasi Utama, terpisah dari panel */}
      <div className="mb-6 flex justify-center">
        <TaxTypeSelector modes={calculationModes} currentMode={mode} onModeChange={setMode} />
      </div>

      <div className="max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl shadow-neumorphic-out">
        {/* Router untuk menampilkan kalkulator yang sesuai */}
        {mode === 'pph' && <Pph21CalculatorUI />}
        {mode === 'pph42' && <Pph42CalculatorUI />}
        {mode === 'pph23' && <Pph23CalculatorUI />}
        {mode === 'impor' && <div className="text-center text-slate-500">Kalkulator Pajak Impor akan segera hadir!</div>}
      </div>
    </main>
  )
}
