// PTKP (Penghasilan Tidak Kena Pajak) - Tabel Besaran PTKP Tahunan
export const PTKP_RATES = {
    'TK0': 54_000_000, 'TK1': 58_500_000, 'TK2': 63_000_000, 'TK3': 67_500_000,
    'K0': 58_500_000,  'K1': 63_000_000,  'K2': 67_500_000,  'K3': 72_000_000,
    'KI0': 112_500_000, 'KI1': 117_000_000, 'KI2': 121_500_000, 'KI3': 126_000_000,
};

// PPH 21 Progressive Tax Rates (Tarif PPh Pasal 17 untuk perhitungan TAHUNAN)
export const PPH21_RATES_ANNUAL = [
  { limit: 60_000_000, rate: 0.05 },
  { limit: 250_000_000, rate: 0.15 },
  { limit: 500_000_000, rate: 0.25 },
  { limit: 5_000_000_000, rate: 0.30 },
  { limit: Infinity, rate: 0.35 },
];

// Tarif Efektif Rata-rata (TER) PPh 21 Bulanan - PP 58/2023
// Kategori A: Untuk status PTKP TK/0, TK/1, K/0
// Kategori B: Untuk status PTKP TK/2, TK/3, K/1, K/2
// Kategori C: Untuk status PTKP K/3

const createTerTier = (limit, rate) => ({ limit, rate });

export const TER_RATES = {
    A: [
        createTerTier(5400000, 0), createTerTier(6200000, 0.0025), createTerTier(7000000, 0.005),
        createTerTier(8200000, 0.0075), createTerTier(9700000, 0.01), createTerTier(11300000, 0.0125),
        createTerTier(13300000, 0.015), createTerTier(15500000, 0.0175), createTerTier(18500000, 0.02),
        createTerTier(22600000, 0.025), createTerTier(26000000, 0.03), createTerTier(30000000, 0.04),
        createTerTier(35000000, 0.05), createTerTier(41000000, 0.06), createTerTier(47000000, 0.07),
        createTerTier(54000000, 0.08), createTerTier(62000000, 0.09), createTerTier(71000000, 0.1),
        createTerTier(81000000, 0.11), createTerTier(93000000, 0.12), createTerTier(107000000, 0.13),
        createTerTier(125000000, 0.14), createTerTier(145000000, 0.15), createTerTier(165000000, 0.16),
        createTerTier(190000000, 0.17), createTerTier(220000000, 0.18), createTerTier(255000000, 0.19),
        createTerTier(295000000, 0.2), createTerTier(340000000, 0.21), createTerTier(390000000, 0.22),
        createTerTier(450000000, 0.23), createTerTier(520000000, 0.24), createTerTier(600000000, 0.25),
        createTerTier(700000000, 0.26), createTerTier(820000000, 0.27), createTerTier(960000000, 0.28),
        createTerTier(1150000000, 0.29), createTerTier(1400000000, 0.3), createTerTier(1750000000, 0.31),
        createTerTier(2200000000, 0.32), createTerTier(3000000000, 0.33), createTerTier(Infinity, 0.34)
    ],
    B: [
        createTerTier(6200000, 0), createTerTier(7300000, 0.0025), createTerTier(8500000, 0.005),
        createTerTier(10000000, 0.0075), createTerTier(11800000, 0.01), createTerTier(13800000, 0.0125),
        createTerTier(16100000, 0.015), createTerTier(19000000, 0.0175), createTerTier(23000000, 0.02),
        createTerTier(27000000, 0.025), createTerTier(31000000, 0.03), createTerTier(36000000, 0.04),
        createTerTier(42000000, 0.05), createTerTier(48000000, 0.06), createTerTier(55000000, 0.07),
        createTerTier(63000000, 0.08), createTerTier(72000000, 0.09), createTerTier(82000000, 0.1),
        createTerTier(94000000, 0.11), createTerTier(109000000, 0.12), createTerTier(127000000, 0.13),
        createTerTier(150000000, 0.14), createTerTier(170000000, 0.15), createTerTier(200000000, 0.16),
        createTerTier(230000000, 0.17), createTerTier(265000000, 0.18), createTerTier(305000000, 0.19),
        createTerTier(350000000, 0.2), createTerTier(400000000, 0.21), createTerTier(460000000, 0.22),
        createTerTier(530000000, 0.23), createTerTier(610000000, 0.24), createTerTier(710000000, 0.25),
        createTerTier(830000000, 0.26), createTerTier(970000000, 0.27), createTerTier(1150000000, 0.28),
        createTerTier(1400000000, 0.29), createTerTier(1750000000, 0.3), createTerTier(2200000000, 0.31),
        createTerTier(3000000000, 0.32), createTerTier(4500000000, 0.33), createTerTier(Infinity, 0.34)
    ],
    C: [
        createTerTier(6600000, 0), createTerTier(7800000, 0.0025), createTerTier(9100000, 0.005),
        createTerTier(10500000, 0.0075), createTerTier(12500000, 0.01), createTerTier(14500000, 0.0125),
        createTerTier(17000000, 0.015), createTerTier(20000000, 0.0175), createTerTier(24000000, 0.02),
        createTerTier(28000000, 0.025), createTerTier(33000000, 0.03), createTerTier(38000000, 0.04),
        createTerTier(44000000, 0.05), createTerTier(50000000, 0.06), createTerTier(58000000, 0.07),
        createTerTier(66000000, 0.08), createTerTier(76000000, 0.09), createTerTier(88000000, 0.1),
        createTerTier(100000000, 0.11), createTerTier(115000000, 0.12), createTerTier(135000000, 0.13),
        createTerTier(160000000, 0.14), createTerTier(185000000, 0.15), createTerTier(210000000, 0.16),
        createTerTier(245000000, 0.17), createTerTier(280000000, 0.18), createTerTier(325000000, 0.19),
        createTerTier(375000000, 0.2), createTerTier(430000000, 0.21), createTerTier(495000000, 0.22),
        createTerTier(570000000, 0.23), createTerTier(660000000, 0.24), createTerTier(760000000, 0.25),
        createTerTier(880000000, 0.26), createTerTier(1050000000, 0.27), createTerTier(1200000000, 0.28),
        createTerTier(1450000000, 0.29), createTerTier(1800000000, 0.3), createTerTier(2300000000, 0.31),
        createTerTier(3100000000, 0.32), createTerTier(4600000000, 0.33), createTerTier(Infinity, 0.34)
    ]
};

// Mapping PTKP status to TER Category
export const PTKP_TO_TER_CATEGORY = {
    'TK0': 'A', 'TK1': 'A', 'K0': 'A',
    'TK2': 'B', 'TK3': 'B', 'K1': 'B', 'K2': 'B',
    'K3': 'C',
    // Istri bekerja (KI) dianggap sama dengan K, karena TER didasarkan pada PTKP gabungan
    'KI0': 'A', 'KI1': 'B', 'KI2': 'B', 'KI3': 'C'
};