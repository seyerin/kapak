import { PTKP_RATES, PPH21_RATES_ANNUAL, TER_RATES, PTKP_TO_TER_CATEGORY } from './taxConstants';

class Pph21Calculator {
  // Perhitungan PPh 21 Bulanan menggunakan TARIF EFEKTIF (TER) untuk metode Gross/Neto
  _calculateTerTax(grossSalaryMonthly, ptkpStatus) {
    const category = PTKP_TO_TER_CATEGORY[ptkpStatus];
    if (!category) return { tax: 0, rate: 0 };

    const terTable = TER_RATES[category];
    let rate = 0;

    for (const tier of terTable) {
      if (grossSalaryMonthly <= tier.limit) {
        rate = tier.rate;
        break;
      }
    }

    const tax = Math.round(grossSalaryMonthly * rate);
    return { tax, rate };
  }

  // Perhitungan PPh 21 Tahunan menggunakan TARIF PROGRESIF (Pasal 17) - untuk Gross Up
  _calculateAnnualProgressiveTax(pkp) {
    let tax = 0;
    let remainingPkp = pkp;
    let previousLimit = 0;

    for (const tier of PPH21_RATES_ANNUAL) {
      if (remainingPkp <= 0) break;

      const taxableInTier = Math.min(remainingPkp, tier.limit - previousLimit);
      tax += taxableInTier * tier.rate;
      remainingPkp -= taxableInTier;
      previousLimit = tier.limit;
    }
    return tax;
  }

  // Perhitungan Gross Up PPh 21 Tahunan yang AKURAT menggunakan metode progresif
  _calculateGrossUpAnnual(netAnnual) {
    let pph21Annual = 0;

    for (const tier of PPH21_RATES_ANNUAL.slice().reverse()) {
      const { limit, rate } = tier;
      const lowerBound = PPH21_RATES_ANNUAL.find(t => t.rate < rate)?.limit || 0;

      if (netAnnual > lowerBound * (1 - rate)) {
        const pkp = (netAnnual - lowerBound * (1 - rate)) / (1 - rate);
        pph21Annual = this._calculateAnnualProgressiveTax(pkp);
        break;
      }
    }
    return pph21Annual;
  }

  _getTerInfo(grossMonthly, ptkpStatus) {
    const category = PTKP_TO_TER_CATEGORY[ptkpStatus];
    if (!category) return { tax: 0, rate: 0 };
    const terTable = TER_RATES[category];
    const tier = terTable.find(t => grossMonthly <= t.limit) || terTable[terTable.length - 1];
    return { tax: Math.round(grossMonthly * tier.rate), rate: tier.rate };
  }

  calculate(inputs) {
    const {
      gajiPokok = 0, tunjangan = 0, thr = 0,
      ptkpStatus, hasNpwp, method = 'gross'
    } = inputs;

    let grossMonthly = gajiPokok + tunjangan;
    let grossAnnual = 0;
    let pph21Monthly = 0;
    let terRate = 0;

    if (method === 'gross') {
      const grossWithThr = grossMonthly + thr;
      const { tax, rate } = this._getTerInfo(grossWithThr, ptkpStatus);
      pph21Monthly = tax;
      terRate = rate;
      grossAnnual = (gajiPokok + tunjangan) * 12 + thr;
    } else { // method === 'gross_up'
      const baseIncomeAnnual = (gajiPokok + tunjangan) * 12 + thr;
      const ptkp = PTKP_RATES[ptkpStatus] || 0;
      const biayaJabatanMax = 6_000_000;
      
      // Perhitungan Neto sebelum PPh untuk Gross Up
      const netBeforeTax = baseIncomeAnnual - biayaJabatanMax;

      const pph21GrossUpAnnual = this._calculateGrossUpAnnual(netBeforeTax - ptkp);
      const tunjanganPajak = pph21GrossUpAnnual;
      
      grossAnnual = baseIncomeAnnual + tunjanganPajak;
      const grossWithThr = (grossAnnual / 12); // Rata-rata per bulan

      const { tax, rate } = this._getTerInfo(grossWithThr, ptkpStatus);
      pph21Monthly = tax;
      terRate = rate;
    }

    // Terapkan penalti non-NPWP
    if (!hasNpwp) {
      pph21Monthly *= 1.20;
    }

    // Rincian Perhitungan Tahunan (untuk ditampilkan)
    const biayaJabatan = Math.min(grossAnnual * 0.05, 6_000_000);
    const netAnnual = grossAnnual - biayaJabatan;
    const ptkp = PTKP_RATES[ptkpStatus] || 0;
    const pkp = Math.max(0, Math.floor((netAnnual - ptkp) / 1000) * 1000); // Pembulatan ke bawah ribuan
    const pph21Annual = this._calculateAnnualProgressiveTax(pkp);

    const takeHomePay = (gajiPokok + tunjangan + thr) - (method === 'gross' ? pph21Monthly : 0);

    return {
      gajiPokok,
      tunjangan,
      thr,
      grossMonthly: grossAnnual / 12,
      biayaJabatan: biayaJabatan / 12, // Tampilkan per bulan
      netoSebulan: (gajiPokok + tunjangan + thr) - (biayaJabatan / 12),
      ptkp,
      pkp, // Ini adalah DPP Tahunan
      pkpBulanan: pkp / 12,
      pph21Monthly: Math.round(pph21Monthly),
      takeHomePay: Math.round(takeHomePay),
      terRate,
      pph21Annual: Math.round(pph21Annual)
    };
  }
}

class Pph42Calculator {
  static RATE = 0.10; // Tarif PPh Final 4(2) untuk Sewa Tanah/Bangunan

  calculate(inputs) {
    const { grossRentalAnnual } = inputs;
    const taxBase = grossRentalAnnual;
    const pph42Annual = Math.round(taxBase * Pph42Calculator.RATE);
    return { taxBase, pph42Annual };
  }
}

class Pph23Calculator {
  static RATE_NPWP = 0.02; // Tarif PPh 23 untuk Jasa

  calculate(inputs) {
    const { grossServiceFee, hasNpwp } = inputs;
    const taxBase = grossServiceFee;
    const rate = hasNpwp ? Pph23Calculator.RATE_NPWP : Pph23Calculator.RATE_NPWP * 2;
    const pph23Amount = Math.round(taxBase * rate);
    return { taxBase, pph23Amount, rate };
  }
}

export const pph21Calculator = new Pph21Calculator();
export const pph42Calculator = new Pph42Calculator();
export const pph23Calculator = new Pph23Calculator();