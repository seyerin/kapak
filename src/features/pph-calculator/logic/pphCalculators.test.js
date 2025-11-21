import { describe, it, expect } from 'vitest';
import { pph21Calculator, pph42Calculator, pph23Calculator } from './pphCalculators';

describe('Kalkulator Pajak', () => {

  describe('Pph21Calculator (Metode TER)', () => {
    it('harus menghitung PPh 21 bulanan dengan benar untuk Kategori A', () => {
      // Gaji 10jt, status K/0 -> Kategori A, TER 1%
      const inputs = { grossSalaryMonthly: 10_000_000, ptkpStatus: 'K0' };
      const result = pph21Calculator.calculate(inputs);
      expect(result.terRate).toBe(0.01);
      expect(result.pph21Monthly).toBe(100_000);
    });

    it('harus menghitung PPh 21 bulanan dengan benar untuk Kategori B', () => {
      // Gaji 15jt, status K/1 -> Kategori B, TER 1.5%
      const inputs = { grossSalaryMonthly: 15_000_000, ptkpStatus: 'K1' };
      const result = pph21Calculator.calculate(inputs);
      expect(result.terRate).toBe(0.015);
      expect(result.pph21Monthly).toBe(225_000);
    });

    it('harus menghitung PPh 21 bulanan dengan benar untuk Kategori C', () => {
      // Gaji 20jt, status K/3 -> Kategori C, TER 1.75%
      const inputs = { grossSalaryMonthly: 20_000_000, ptkpStatus: 'K3' };
      const result = pph21Calculator.calculate(inputs);
      expect(result.terRate).toBe(0.0175);
      expect(result.pph21Monthly).toBe(350_000);
    });

    it('harus menghasilkan pajak 0 untuk gaji di bawah batas TER', () => {
      // Gaji 5jt, status TK/0 -> Kategori A, TER 0%
      const inputs = { grossSalaryMonthly: 5_000_000, ptkpStatus: 'TK0' };
      const result = pph21Calculator.calculate(inputs);
      expect(result.terRate).toBe(0);
      expect(result.pph21Monthly).toBe(0);
    });
  });

  describe('Pph42Calculator', () => {
    it('harus menghitung PPh 4(2) dengan benar', () => {
      const inputs = { grossRentalAnnual: 100_000_000 };
      const result = pph42Calculator.calculate(inputs);
      expect(result.pph42Annual).toBe(10_000_000); // 10% dari 100jt
    });
  });

  describe('Pph23Calculator', () => {
    it('harus menghitung PPh 23 dengan tarif normal (2%) jika memiliki NPWP', () => {
      const inputs = { grossServiceFee: 50_000_000, hasNpwp: true };
      const result = pph23Calculator.calculate(inputs);
      expect(result.pph23Amount).toBe(1_000_000); // 2% dari 50jt
    });

    it('harus menghitung PPh 23 dengan tarif ganda (4%) jika tidak memiliki NPWP', () => {
      const inputs = { grossServiceFee: 50_000_000, hasNpwp: false };
      const result = pph23Calculator.calculate(inputs);
      expect(result.pph23Amount).toBe(2_000_000); // 4% dari 50jt
    });
  });
});