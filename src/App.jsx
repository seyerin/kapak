import React, { useState, useMemo, useEffect } from 'react';
import { 
  LucideScale, LucideBuilding, 
  LucideBriefcase, LucideFileText
} from 'lucide-react';
import { SplashScreen } from '@/components/SplashScreen';
import { AIAssistant } from '@/features/ai-assistant/AIAssistant';
import { Pph21Content, Pph42Content, Pph23Content } from '@/features/pph-calculator/components';
// =======================================================================
// 5. MAIN APP COMPONENT
// =======================================================================

export default function App() {
  const [activeTab, setActiveTab] = useState('PPh21');
  const [isAppReady, setIsAppReady] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAppReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'PPh4(2)':
        return <Pph42Content />;
      case 'PPh23':
        return <Pph23Content />;
      case 'PPh21':
      default:
        return <Pph21Content />;
    }
  };

  const TabButton = ({ tab, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`
        px-4 py-3 text-sm font-semibold flex items-center justify-center transition-all duration-300 rounded-t-lg
        ${activeTab === tab
          ? 'bg-white text-indigo-600 border-b-2 border-indigo-500'
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 border-b-2 border-transparent'
        } font-spartan
      `}
    >
      <Icon className="w-5 h-5 mr-2" />
      {label}
    </button>
  );

  return (
    <>
      {/* Style sekarang dimuat dari global.css melalui main.jsx */}
      
      {isSplashVisible && (
        <div style={{ opacity: isAppReady ? 0 : 1 }}>
          <SplashScreen onAnimationEnd={() => setIsSplashVisible(false)} />
        </div>
      )}
      
      <div className="min-h-screen bg-slate-50 p-4 sm:p-8 flex items-start justify-center font-spartan transition-opacity duration-500" style={{ opacity: isAppReady ? 1 : 0 }}>
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-subtle border border-slate-200/80">
          <header className="px-6 pt-6">
            <h1 className="text-2xl font-extrabold text-slate-800 flex items-center">
              <LucideScale className="w-7 h-7 mr-3 text-indigo-600" />
              Kalkulator Pajak Penghasilan (PPh)
            </h1>
            <p className="text-sm text-slate-500 mt-1">Simulasi perhitungan PPh Pasal 21, 4(2), dan 23.</p>
          </header>

          {/* Menu Navigasi (Tabs) */}
          <div className="border-b border-slate-200 mt-4 px-6">
            <TabButton tab="PPh21" label="PPh Pasal 21 (Gaji)" icon={LucideFileText} />
            <TabButton tab="PPh4(2)" label="PPh Pasal 4(2) (Final)" icon={LucideBuilding} />
            <TabButton tab="PPh23" label="PPh Pasal 23 (Jasa)" icon={LucideBriefcase} />
          </div>

          <div className="p-6 sm:p-8">
            {renderContent()}
          </div>
        </div>
      </div>
      <AIAssistant />
    </>
  );
}