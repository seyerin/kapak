import { useState, useMemo } from 'react';
import { InputField } from '@/components/InputField';
import { ResultRow } from '@/components/ResultRow.jsx';
import { pph21Calculator } from '@/features/pph-calculator/logic/pphCalculators.js';
import { PTKP_RATES } from '@/features/pph-calculator/logic/taxConstants.js';
import { LucideBanknote, LucideUsers, LucideGift, LucideWallet, LucideChevronsRight } from 'lucide-react';
import { formatIDR } from '@/utils/formatters.js';

export function Pph21Calculator() {
  const [gajiPokok, setGajiPokok] = useState(0);
  const [tunjangan, setTunjangan] = useState(0);
  const [thr, setThr] = useState(0);
  const [ptkpStatus, setPtkpStatus] = useState('TK0');
  const [hasNpwp, setHasNpwp] = useState(true);
  const [pphMethod, setPphMethod] = useState('gross');
  const [showDetails, setShowDetails] = useState(false);

  const pph21 = useMemo(() => {
    return pph21Calculator.calculate({
      gajiPokok, tunjangan, thr, ptkpStatus, hasNpwp, method: pphMethod
    });
  }, [gajiPokok, tunjangan, thr, ptkpStatus, hasNpwp, pphMethod]);

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
          <div className="flex flex-col space-y-1">
            <label htmlFor="ptkp-status" className="text-sm font-medium text-slate-700">Status PTKP</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <LucideUsers className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <select id="ptkp-status" value={ptkpStatus} onChange={(e) => setPtkpStatus(e.target.value)}
                className="block w-full rounded-lg border-slate-300 bg-white pl-10 pr-4 py-2 text-base text-left font-mono shadow-sm transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                {Object.keys(PTKP_RATES).map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-slate-700">Memiliki NPWP?</label>
            <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
              <button onClick={() => setHasNpwp(true)} className={`w-full py-1.5 text-sm rounded-md transition ${hasNpwp ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>Ya</button>
              <button onClick={() => setHasNpwp(false)} className={`w-full py-1.5 text-sm rounded-md transition ${!hasNpwp ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>Tidak</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-slate-700">Metode Perhitungan</label>
          <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
            <button onClick={() => setPphMethod('gross')} className={`w-full py-1.5 text-sm rounded-md transition ${pphMethod === 'gross' ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>Gross (Potong Gaji)</button>
            <button onClick={() => setPphMethod('gross_up')} className={`w-full py-1.5 text-sm rounded-md transition ${pphMethod === 'gross_up' ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>Gross Up (Tunjangan Pajak)</button>
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