/**
 * Mengubah string mata uang IDR menjadi angka.
 * Contoh: "1.500.000" -> 1500000
 */
export const parseIDR = (str) => {
  return Number(String(str).replace(/[^0-9]/g, '')) || 0;
};

/**
 * Mengubah angka menjadi format mata uang IDR.
 * Contoh: 1500000 -> "Rp 1.500.000"
 */
export const formatIDR = (num) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num || 0);
};