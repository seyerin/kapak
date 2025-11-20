import { PTKP_RATES, PPH21_RATES_ANNUAL, TER_RATES, PTKP_TO_TER_CATEGORY } from './taxConstants';

class Pph21Calculator {
  // Perhitungan PPh 21 Bulanan menggunakan TARIF EFEKTIF (TER)
  calculateMonthlyTax(grossSalaryMonthly, ptkpStatus) {
    const category = PTKP_TO_TER_CATEGORY[ptkpStatus];
    if (!category) return { pph21Monthly: 0, terRate: 0 };

    const terTable = TER_RATES[category];
    let terRate = 0;

    for (const tier of terTable) {
      if (grossSalaryMonthly <= tier.limit) {
        terRate = tier.rate;
        break;
      }
    }

    const pph21Monthly = Math.round(grossSalaryMonthly * terRate);
    return { pph21Monthly, terRate };
  }

  // Perhitungan PPh 21 Tahunan menggunakan TARIF PROGRESIF (Pasal 17)
  calculateAnnualTax(taxableIncome) {
    let tax = 0;
    let remainingIncome = Math.max(0, taxableIncome);
    let previousLimit = 0;

    for (const tier of PPH21_RATES_ANNUAL) {
      if (remainingIncome === 0) break;

      const tierCeiling = tier.limit === Infinity ? Infinity : tier.limit;
      const taxableBaseInTier = Math.min(remainingIncome, tierCeiling - previousLimit);
      
      if (taxableBaseInTier > 0) {
        tax += taxableBaseInTier * tier.rate;
      }

      remainingIncome -= taxableBaseInTier;
      previousLimit = tierCeiling;
    }

    return Math.max(0, Math.round(tax));
  }

  calculate(inputs) {
    const { grossSalaryMonthly, ptkpStatus } = inputs;
    
    // 1. Hitung PPh 21 Bulanan dengan TER
    const { pph21Monthly, terRate } = this.calculateMonthlyTax(grossSalaryMonthly, ptkpStatus);

    // 2. Hitung PPh 21 Tahunan (untuk tujuan perbandingan & rekap)
    const grossSalaryAnnual = grossSalaryMonthly * 12;
    const biayaJabatanAnnual = Math.min(grossSalaryAnnual * 0.05, 6_000_000);
    const netIncomeAnnual = grossSalaryAnnual - biayaJabatanAnnual;
    const ptkpAmount = PTKP_RATES[ptkpStatus] || 0;
    const taxableIncome = Math.max(0, netIncomeAnnual - ptkpAmount);
    const pkpRounded = Math.floor(taxableIncome / 1000) * 1000;
    const pph21Annual = this.calculateAnnualTax(pkpRounded);

    return {
      grossSalaryAnnual, biayaJabatanAnnual, netIncomeAnnual, ptkpAmount,
      taxableIncome: pkpRounded, pph21Annual, pph21Monthly, terRate
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