import React, { useState, useMemo } from 'react';
import { LucideDatabase, LucideDollarSign, LucideCalculator, LucidePercent } from 'lucide-react';
import { pph21Calculator } from '@/features/pph-calculator/logic/pphCalculators';
import { PTKP_RATES, PTKP_TO_TER_CATEGORY } from '@/features/pph-calculator/logic/taxConstants';
import { formatIDR } from '@/utils/formatters';
import { InputField } from '@/components/InputField';
import { ResultRow } from '@/components/ResultRow';

export const Pph21Content = () => {
  const [grossSalaryMonthly, setGrossSalaryMonthly] = useState(10_000_000);
  const [ptkpStatus, setPtkpStatus] = useState('K0');

  const results = useMemo(() => {
    return pph21Calculator.calculate({ grossSalaryMonthly, ptkpStatus });
  }, [grossSalaryMonthly, ptkpStatus]);
  
  const PTKP_OPTIONS = Object.keys(PTKP_RATES).map(key => ({
    value: key,
    label: `${key} - ${PTKP_TO_TER_CATEGORY[key]} (${formatIDR(PTKP_RATES[key])})`,
  }));

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
      <div className="lg:col-span-1 space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 flex items-center border-b border-slate-200 pb-3">
          <LucideDatabase className="w-5 h-5 mr-2" />1. Data Dasar Gaji
        </h2>
        <InputField label="Gaji Bruto Bulanan" value={grossSalaryMonthly} onChange={setGrossSalaryMonthly} icon={LucideDollarSign} />
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-slate-700">Status PTKP & Kategori TER</label>
          <select value={ptkpStatus} onChange={(e) => setPtkpStatus(e.target.value)} className="block w-full rounded-lg border-slate-300 py-2.5 px-3 text-base font-spartan focus:border-indigo-500 focus:ring-indigo-500 transition duration-150">
            {PTKP_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <p className="text-xs text-slate-500 mt-1">TK: Tidak Kawin, K: Kawin, KI: Kawin Istri Bekerja. Angka adalah tanggungan.</p>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="p-5 rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/30">
            <h3 className="text-xl font-bold text-white flex items-center mb-3">
                <LucideDollarSign className="w-6 h-6 mr-2" />Kewajiban PPh 21 Bulanan (Metode TER)
            </h3>
            <div className="space-y-3">
                <ResultRow label="Tarif Efektif Bulanan (TER)" value={`${(results.terRate * 100).toFixed(2)}%`} isTaxable={true} />
                <ResultRow label="Potongan PPh 21 Bulanan" value={formatIDR(results.pph21Monthly)} isTax={true} isTotal={true} />
            </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4 flex items-center">
                <LucideCalculator className="w-5 h-5 mr-2 text-indigo-600" />Estimasi Perhitungan Tahunan (Metode Pasal 17)
            </h3>
            <div className="space-y-2">
                <ResultRow label="Penghasilan Bruto Tahunan" value={formatIDR(results.grossSalaryAnnual)} />
                <ResultRow label="Pengurangan: Biaya Jabatan" value={`(${formatIDR(results.biayaJabatanAnnual)})`} />
                <div className="h-px bg-gray-200 my-2"></div>
                <ResultRow label="Penghasilan Netto Tahunan" value={formatIDR(results.netIncomeAnnual)} isTotal={true} />
                <ResultRow label="Pengurangan: PTKP" value={`(${formatIDR(results.ptkpAmount)})`} />
                <div className="h-px bg-gray-200 my-2"></div>
                <ResultRow label="Penghasilan Kena Pajak (PKP)" value={formatIDR(results.taxableIncome)} isTaxable={true} />
                <ResultRow label="Estimasi PPh 21 Terutang Tahunan" value={formatIDR(results.pph21Annual)} isTax={true} />
            </div>
             <p className="text-xs text-gray-500 pt-4 px-1">
                *Perhitungan tahunan ini digunakan untuk rekalkulasi pada akhir tahun pajak. Perhitungan bulanan menggunakan metode TER.
            </p>
        </div>
      </div>
    </main>
  );
};