import React, { useState, useMemo } from 'react';
import { LucideBuilding, LucideDollarSign } from 'lucide-react';
import { pph42Calculator } from '@/features/pph-calculator/logic/pphCalculators';
import { formatIDR } from '@/utils/formatters';
import { InputField } from '@/components/InputField.jsx';
import { ResultRow } from '@/components/ResultRow.jsx';

export const Pph42Content = () => {
  const [grossRentalAnnual, setGrossRentalAnnual] = useState(100_000_000);

  const results = useMemo(() => {
    return pph42Calculator.calculate({ grossRentalAnnual });
  }, [grossRentalAnnual]);

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      <div className="space-y-6 bg-indigo-50 p-6 rounded-xl shadow-md border border-indigo-200">
        <h2 className="text-xl font-bold text-indigo-800 flex items-center border-b border-indigo-200 pb-2">
          <LucideBuilding className="w-5 h-5 mr-2" />1. Data Sewa Tanah/Bangunan
        </h2>
        <InputField label="Nilai Sewa Bruto Tahunan" value={grossRentalAnnual} onChange={setGrossRentalAnnual} icon={LucideDollarSign} />
        <div className="p-3 bg-white rounded-lg border border-indigo-300 text-sm">
            <p className="font-bold text-indigo-700">Tarif PPh Final (4 Ayat 2) Digunakan:</p>
            <p className="text-gray-900 font-mono tracking-wider text-base">10%</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="p-5 rounded-xl bg-green-50 border-4 border-green-300 shadow-xl">
            <h3 className="text-xl font-bold text-green-800 flex items-center mb-3">
                <LucideDollarSign className="w-6 h-6 mr-2" />2. Kewajiban PPh 4(2) Final
            </h3>
            <div className="space-y-3">
                <ResultRow label="Dasar Pengenaan Pajak (DPP)" value={formatIDR(results.taxBase)} isTaxable={true} />
                <ResultRow label="Total PPh 4(2) Final Terutang" value={formatIDR(results.pph42Annual)} isTax={true} isTotal={true} />
            </div>
        </div>
        <p className="text-xs text-gray-500 pt-4 px-1">*Catatan: PPh Final 10% untuk sewa tanah dan/atau bangunan.</p>
      </div>
    </main>
  );
};