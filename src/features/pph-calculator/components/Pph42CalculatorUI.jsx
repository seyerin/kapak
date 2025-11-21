import { useState, useMemo } from 'react';
import { InputField } from '@/components/InputField';
import { ResultRow } from '@/components/ResultRow.jsx';
import { pph42Calculator } from '@/features/pph-calculator/logic/pphCalculators.js';
import { LucideLandmark } from 'lucide-react';
import { formatIDR } from '@/utils/formatters.js';

export function Pph42CalculatorUI() {
  const [grossRentalAnnual, setGrossRentalAnnual] = useState(0);

  const pph42 = useMemo(() => {
    return pph42Calculator.calculate({ grossRentalAnnual });
  }, [grossRentalAnnual]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      {/* Bagian Input */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-700 border-b pb-2">Input PPh 4(2) Final</h2>
        <InputField label="Nilai Sewa Tanah / Bangunan" value={grossRentalAnnual} onChange={setGrossRentalAnnual} icon={LucideLandmark} />
        <div className="text-xs text-slate-500 p-3 bg-slate-100 rounded-lg">
          <p className="font-bold mb-1">Metode Hitung (PPh 4(2) Final):</p>
          <p>Pajak bersifat final dan dihitung dengan tarif 10% dari jumlah bruto nilai persewaan tanah dan/atau bangunan. Pajak ini dipotong oleh penyewa saat pembayaran.</p>
        </div>
      </div>

      {/* Bagian Hasil */}
      <div className="bg-slate-100 p-4 rounded-lg flex flex-col border shadow-neumorphic-in">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-700 border-b pb-2 mb-4">Hasil Perhitungan</h2>
          <ResultRow label="Dasar Pengenaan Pajak (DPP)" value={formatIDR(pph42.taxBase)} isTaxable />
          <ResultRow label="Tarif PPh Final" value="10%" />
          <ResultRow label="Jumlah PPh 4(2) Final" value={formatIDR(pph42.pph42Annual)} isTotal />
        </div>
      </div>
    </div>
  );
}