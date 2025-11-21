import { useState, useMemo } from 'react';
import { InputField } from '@/components/InputField';
import { ResultRow } from '@/components/ResultRow.jsx';
import { pph23Calculator } from '@/features/pph-calculator/logic/pphCalculators.js';
import { LucideBanknote, LucideFileBadge } from 'lucide-react';
import { formatIDR } from '@/utils/formatters.js';

export function Pph23CalculatorUI() {
  const [grossServiceFee, setGrossServiceFee] = useState(0);
  const [hasNpwp, setHasNpwp] = useState(true);

  const pph23 = useMemo(() => {
    return pph23Calculator.calculate({ grossServiceFee, hasNpwp });
  }, [grossServiceFee, hasNpwp]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      {/* Bagian Input */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-700 border-b pb-2">Input PPh 23</h2>
        <InputField label="Nilai Jasa / Royalti / Hadiah" value={grossServiceFee} onChange={setGrossServiceFee} icon={LucideBanknote} />
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-slate-700">Penerima Memiliki NPWP?</label>
          <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
            <button onClick={() => setHasNpwp(true)} className={`w-full py-1.5 text-sm rounded-md transition ${hasNpwp ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>Ya</button>
            <button onClick={() => setHasNpwp(false)} className={`w-full py-1.5 text-sm rounded-md transition ${!hasNpwp ? 'bg-white shadow-sm font-bold' : 'text-slate-600'}`}>Tidak</button>
          </div>
        </div>
        <div className="text-xs text-slate-500 p-3 bg-slate-100 rounded-lg">
          <p className="font-bold mb-1">Metode Hitung (PPh 23):</p>
          <p>Pajak dihitung dengan mengalikan Dasar Pengenaan Pajak (DPP) dengan tarif PPh 23. Untuk jasa, tarifnya adalah 2%. Jika penerima tidak memiliki NPWP, tarif menjadi 100% lebih tinggi (4%).</p>
        </div>
      </div>

      {/* Bagian Hasil */}
      <div className="bg-slate-100 p-4 rounded-lg flex flex-col border shadow-neumorphic-in">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-700 border-b pb-2 mb-4">Hasil Perhitungan</h2>
          <ResultRow label="Dasar Pengenaan Pajak (DPP)" value={formatIDR(pph23.taxBase)} isTaxable />
          <ResultRow label={`Tarif PPh 23`} value={`${(pph23.rate * 100).toFixed(0)}%`} />
          <ResultRow label="Jumlah PPh 23" value={formatIDR(pph23.pph23Amount)} isTotal />
        </div>
      </div>
    </div>
  );
}