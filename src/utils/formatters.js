// Helper untuk memformat mata uang (IDR)
export const formatIDR = (value) => {
  if (isNaN(value)) value = 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Helper untuk membersihkan string input (menghilangkan non-digit)
export const parseIDR = (value) => {
  const cleanString = String(value).replace(/[^\d]/g, '');
  return parseInt(cleanString) || 0;
};