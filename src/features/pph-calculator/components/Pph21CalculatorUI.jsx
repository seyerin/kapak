import { useState, useMemo } from 'react';
import { InputField } from '@/components/InputField';
import { ResultRow } from '@/components/ResultRow.jsx';
import { pph21Calculator } from '@/features/pph-calculator/logic/pphCalculators.js';
import { PTKP_RATES } from '@/features/pph-calculator/logic/taxConstants.js';
import { LucideBanknote, LucideUsers, LucideGift, LucideWallet, LucideChevronsRight } from 'lucide-react';
import { formatIDR } from '@/utils/formatters.js';

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

  const ptkpStatus = `${maritalStatus}${dependents}`;

  const pph21 = useMemo(() => {
    return pph21Calculator.calculate({
      gajiPokok, tunjangan, thr, ptkpStatus, hasNpwp, method: pphMethod
    });
  }, [gajiPokok, tunjangan, thr, ptkpStatus, hasNpwp, pphMethod, dependents, maritalStatus]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      {/* Bagian Input */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-700 border-b pb-2">Input PPh 21 (Metode TER)</h2>
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Gaji Pokok" value={gajiPokok} onChange={setGajiPokok} icon={LucideBanknote} />
          <InputField label="Tunjangan" value={tunjangan} onChange={setTunjangan} icon={LucideWallet} />
        </div>
        <InputField label="THR / Bonus (jika ada)" value={thr} onChange={setThr} icon={LucideGift} />

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex flex-col space-y-1 col-span-2">
            <label className="text-sm font-medium text-slate-700">Status Perkawinan</label>
            <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
              {Object.entries(maritalOptions).map(([code, label]) => (
                <button key={code} onClick={() => setMaritalStatus(code)} className={`w-full py-1.5 text-sm rounded-md transition ${maritalStatus === code ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>{label}</button>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-1 col-span-2">
            <label className="text-sm font-medium text-slate-700">Jumlah Tanggungan</label>
            <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
              {dependentOptions.map(num => (
                <button key={num} onClick={() => setDependents(num)} className={`w-full py-1.5 text-sm rounded-md transition ${dependents === num ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>{num}</button>
              ))}
            </div>
            <div className="mt-3 text-center bg-slate-100 p-2 rounded-lg shadow-neumorphic-in">
              <p className="text-xs text-slate-500">Status PTKP Terpilih</p>
              <p className="font-bold text-lg text-indigo-600 font-mono tracking-wider">{ptkpStatus}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-slate-700">Memiliki NPWP?</label>
            <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
              <button onClick={() => setHasNpwp(true)} className={`w-full py-1.5 text-sm rounded-md transition ${hasNpwp ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>Ya</button>
              <button onClick={() => setHasNpwp(false)} className={`w-full py-1.5 text-sm rounded-md transition ${!hasNpwp ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>Tidak</button>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-slate-700">Metode Hitung</label>
            <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
              <button onClick={() => setPphMethod('gross')} className={`w-full py-1.5 text-sm rounded-md transition ${pphMethod === 'gross' ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>Gross</button>
              <button onClick={() => setPphMethod('gross_up')} className={`w-full py-1.5 text-sm rounded-md transition ${pphMethod === 'gross_up' ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>Gross Up</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Hasil */}
      <div className="bg-slate-100 p-4 rounded-lg flex flex-col border shadow-neumorphic-in">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-700 border-b pb-2 mb-4">Hasil Perhitungan</h2>
          <ResultRow label="Take Home Pay" value={formatIDR(pph21.takeHomePay)} isTotal />
          <ResultRow label="PPh 21 Bulanan" value={formatIDR(pph21.pph21Monthly)} isTax />
          <ResultRow label={`Tarif Efektif (TER)`} value={`${(pph21.terRate * 100).toFixed(2)}%`} isTaxable />
          <button onClick={() => setShowDetails(!showDetails)} className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1 mt-2">
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