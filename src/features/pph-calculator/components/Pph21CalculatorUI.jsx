import { useState, useMemo } from 'react';
import { InputField } from '@/components/InputField';
import { ResultRow } from '@/components/ResultRow.jsx';
import { pph21Calculator } from '@/features/pph-calculator/logic/pphCalculators.js';
import { PTKP_RATES } from '@/features/pph-calculator/logic/taxConstants.js';
import { LucideBanknote, LucideUsers, LucideGift, LucideWallet, LucideChevronsRight, LucideInfo, LucideRotateCcw } from 'lucide-react';
import { formatIDR } from '@/utils/formatters.js';
import { Tooltip } from '@/components/Tooltip.jsx';

const methodTooltipText = (
  <div className="text-left">
    <p><strong className="text-white">Gross (Potong Gaji):</strong> Pajak dihitung dari gaji dan langsung memotong penghasilan yang diterima.</p>
    <p className="mt-2"><strong className="text-white">Gross Up (Tunjangan Pajak):</strong> Perusahaan memberikan tunjangan pajak, sehingga penghasilan yang diterima karyawan tidak terpotong.</p>
  </div>
);

const maritalOptions = { TK: 'Tidak Kawin', K: 'Kawin', KI: 'Istri Bekerja' };
const dependentOptions = [0, 1, 2, 3];

export function Pph21CalculatorUI() {
  const [gajiPokok, setGajiPokok] = useState(0);
  const [tunjangan, setTunjangan] = useState(0);
  const [thr, setThr] = useState(0);
  const [maritalStatus, setMaritalStatus] = useState('TK');
  const [dependents, setDependents] = useState(0);
  const [hasNpwp, setHasNpwp] = useState(true);
  const [pphMethod, setPphMethod] = useState('gross');
  const [showDetails, setShowDetails] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const ptkpStatus = `${maritalStatus}${dependents}`;

  const pph21 = useMemo(() => {
    return pph21Calculator.calculate({
      gajiPokok, tunjangan, thr, ptkpStatus, hasNpwp, method: pphMethod
    });
  }, [gajiPokok, tunjangan, thr, ptkpStatus, hasNpwp, pphMethod, dependents, maritalStatus]);

  const handleReset = () => {
    if (isResetting) return; // Mencegah klik berulang saat animasi berjalan
    setIsResetting(true);

    setGajiPokok(0);
    setTunjangan(0);
    setThr(0);
    setMaritalStatus('TK');
    setDependents(0);
    setHasNpwp(true);
    setPphMethod('gross');
    setShowDetails(false);

    setTimeout(() => {
      setIsResetting(false);
    }, 700); // Durasi animasi + sedikit jeda
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      {/* Bagian Input */}
      <div className="space-y-6 relative">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-bold text-slate-700">Input PPh 21 (Metode TER)</h2>
          <Tooltip text="Reset semua input">
            <button 
              onClick={handleReset} 
              className="p-2 rounded-full transition-all duration-200 text-navy-600 hover:bg-navy-100 active:shadow-neumorphic-in active:bg-navy-50"
            >
              <LucideRotateCcw className={`w-5 h-5 transition-transform duration-300 group-hover:rotate-[-180deg] ${isResetting ? 'rotate-[-360deg]' : ''}`} />
            </button>
          </Tooltip>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Gaji Pokok" value={gajiPokok} onChange={setGajiPokok} icon={LucideBanknote} />
          <InputField label="Tunjangan" value={tunjangan} onChange={setTunjangan} icon={LucideWallet} />
        </div>
        <InputField label="THR / Bonus (jika ada)" value={thr} onChange={setThr} icon={LucideGift} />

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex flex-col space-y-1 col-span-2">
            <label className="text-sm font-medium text-slate-700">Status Perkawinan</label>
            <div className="flex items-center space-x-2 bg-navy-100/70 rounded-lg p-1">
              {Object.entries(maritalOptions).map(([code, label]) => (
                <button key={code} onClick={() => setMaritalStatus(code)} className={`w-full py-1.5 text-sm rounded-md transition ${maritalStatus === code ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>{label}</button>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-1 col-span-2">
            <label className="text-sm font-medium text-slate-700">Jumlah Tanggungan</label>
            <div className="flex items-center space-x-2 bg-navy-100/70 rounded-lg p-1">
              {dependentOptions.map(num => (
                <button key={num} onClick={() => setDependents(num)} className={`w-full py-1.5 text-sm rounded-md transition ${dependents === num ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>{num}</button>
              ))}
            </div>
            <div className="mt-3 text-center bg-navy-100/70 p-2 rounded-lg shadow-neumorphic-in">
              <p className="text-xs text-navy-600">Status PTKP Terpilih</p>
              <p className="font-bold text-lg text-navy-800 tracking-wider">{ptkpStatus}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-slate-700">Memiliki NPWP?</label>
            <div className="flex items-center space-x-2 bg-navy-100/70 rounded-lg p-1">
              <button onClick={() => setHasNpwp(true)} className={`w-full py-1.5 text-sm rounded-md transition ${hasNpwp ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>Ya</button>
              <button onClick={() => setHasNpwp(false)} className={`w-full py-1.5 text-sm rounded-md transition ${!hasNpwp ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>Tidak</button>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-slate-700">Metode Hitung</label>
              <Tooltip text={methodTooltipText}>
                <LucideInfo className="w-4 h-4 text-navy-400 hover:text-navy-600 cursor-pointer" />
              </Tooltip>
            </div>
            <div className="flex items-center space-x-2 bg-navy-100/70 rounded-lg p-1">
              <button onClick={() => setPphMethod('gross')} className={`w-full py-1.5 text-sm rounded-md transition ${pphMethod === 'gross' ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>Gross</button>
              <button onClick={() => setPphMethod('gross_up')} className={`w-full py-1.5 text-sm rounded-md transition ${pphMethod === 'gross_up' ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>Gross Up</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Hasil */}
      <div className="bg-navy-800 p-6 rounded-2xl flex flex-col shadow-lg">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-navy-200 border-b border-navy-700 pb-2 mb-4">Hasil Perhitungan</h2>
          <ResultRow label="Take Home Pay" value={formatIDR(pph21.takeHomePay)} isTotal />
          <ResultRow label="PPh 21 Bulanan" value={formatIDR(pph21.pph21Monthly)} isTax />
          <ResultRow label={`Tarif Efektif (TER)`} value={`${(pph21.terRate * 100).toFixed(2)}%`} />
          <button onClick={() => setShowDetails(!showDetails)} className="text-sm text-navy-300 hover:text-white font-semibold flex items-center space-x-1 mt-4">
            <span>Lihat Rincian</span>
            <LucideChevronsRight className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
          </button>
          {showDetails && (
            <div className="mt-2 space-y-1 border-t pt-2 animate-fade-in">
              <ResultRow label="Total Penghasilan Bruto" value={formatIDR(pph21.grossMonthly)} />
              <ResultRow label="Biaya Jabatan (Bulanan)" value={formatIDR(pph21.biayaJabatan)} />
              <ResultRow label="Penghasilan Neto (Bulanan)" value={formatIDR(pph21.netoSebulan)} />
              <ResultRow label="PTKP (Tahunan)" value={formatIDR(pph21.ptkp)} />
              <ResultRow label="PKP / DPP (Bulanan)" value={formatIDR(pph21.pkpBulanan)} isTaxable />
              <ResultRow label="PKP / DPP (Tahunan)" value={formatIDR(pph21.pkp)} isTaxable />
              <ResultRow label="PPh 21 Terutang (Tahunan)" value={formatIDR(pph21.pph21Annual)} isTax />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}