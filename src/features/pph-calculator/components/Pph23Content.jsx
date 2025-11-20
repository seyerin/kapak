import React, { useState, useMemo } from 'react';
import { LucideBriefcase, LucideDollarSign } from 'lucide-react';
import { pph23Calculator } from '@/features/pph-calculator/logic/pphCalculators';
import { formatIDR } from '@/utils/formatters';
import { InputField } from '@/components/InputField.jsx';
import { ResultRow } from '@/components/ResultRow.jsx';

export const Pph23Content = () => {
  const [grossServiceFee, setGrossServiceFee] = useState(50_000_000);
  const [hasNpwp, setHasNpwp] = useState(true);

  const results = useMemo(() => {
    return pph23Calculator.calculate({ grossServiceFee, hasNpwp });
  }, [grossServiceFee, hasNpwp]);

  const ratePercentage = (results.rate * 100).toFixed(0);

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      <div className="space-y-6 bg-indigo-50 p-6 rounded-xl shadow-md border border-indigo-200">
        <h2 className="text-xl font-bold text-indigo-800 flex items-center border-b border-indigo-200 pb-2">
          <LucideBriefcase className="w-5 h-5 mr-2" />1. Data Jasa/Royalti
        </h2>
        <InputField label="Nilai Bruto Jasa/Royalti" value={grossServiceFee} onChange={setGrossServiceFee} icon={LucideDollarSign} />
        <div className="flex items-center space-x-2 pt-2">
            <input id="has-npwp" type="checkbox" checked={hasNpwp} onChange={(e) => setHasNpwp(e.target.checked)} className="h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500" />
            <label htmlFor="has-npwp" className="text-sm font-medium text-gray-700 select-none">Penerima memiliki NPWP</label>
        </div>
        <div className="p-3 bg-white rounded-lg border border-indigo-300 text-sm">
            <p className="font-bold text-indigo-700">Tarif PPh Pasal 23 Digunakan:</p>
            <p className="text-gray-900 font-mono tracking-wider text-base">{ratePercentage}% ({hasNpwp ? 'Dengan' : 'Tanpa'} NPWP)</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="p-5 rounded-xl bg-green-50 border-4 border-green-300 shadow-xl">
            <h3 className="text-xl font-bold text-green-800 flex items-center mb-3">
                <LucideDollarSign className="w-6 h-6 mr-2" />2. Kewajiban PPh 23
            </h3>
            <div className="space-y-3">
                <ResultRow label="Dasar Pengenaan Pajak (DPP)" value={formatIDR(results.taxBase)} isTaxable={true} />
                <ResultRow label="Total PPh 23 Dipotong" value={formatIDR(results.pph23Amount)} isTax={true} isTotal={true} />
            </div>
        </div>
        <p className="text-xs text-gray-500 pt-4 px-1">*Catatan: PPh Pasal 23 yang dipotong adalah 2% untuk Jasa (atau 4% tanpa NPWP).</p>
      </div>
    </main>
  );
};