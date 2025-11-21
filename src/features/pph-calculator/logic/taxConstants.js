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
        createTerTier(5400000, 0), createTerTier(5650000, 0.0025), createTerTier(5950000, 0.005),
        createTerTier(6300000, 0.0075), createTerTier(6750000, 0.01), createTerTier(7500000, 0.0125),
        createTerTier(8550000, 0.015), createTerTier(9650000, 0.0175), createTerTier(10050000, 0.02),
        createTerTier(10350000, 0.0225), createTerTier(10700000, 0.025), createTerTier(11050000, 0.03),
        createTerTier(11600000, 0.035), createTerTier(12500000, 0.04), createTerTier(13750000, 0.05),
        createTerTier(15100000, 0.06), createTerTier(16950000, 0.07), createTerTier(19750000, 0.08),
        createTerTier(24150000, 0.09), createTerTier(26450000, 0.1), createTerTier(28000000, 0.11),
        createTerTier(30050000, 0.12), createTerTier(32400000, 0.13), createTerTier(35400000, 0.14),
        createTerTier(39100000, 0.15), createTerTier(43850000, 0.16), createTerTier(47800000, 0.17),
        createTerTier(51400000, 0.18), createTerTier(56300000, 0.19), createTerTier(62200000, 0.2),
        createTerTier(68600000, 0.21), createTerTier(77500000, 0.22), createTerTier(89000000, 0.23),
        createTerTier(103000000, 0.24), createTerTier(125000000, 0.25), createTerTier(157000000, 0.26),
        createTerTier(206000000, 0.27), createTerTier(337000000, 0.28), createTerTier(454000000, 0.29),
        createTerTier(550000000, 0.3), createTerTier(695000000, 0.31), createTerTier(910000000, 0.32),
        createTerTier(1400000000, 0.33), createTerTier(Infinity, 0.34)
    ],
    B: [
        createTerTier(6200000, 0), createTerTier(6500000, 0.0025), createTerTier(6850000, 0.005),
        createTerTier(7300000, 0.0075), createTerTier(9200000, 0.01), createTerTier(10750000, 0.015),
        createTerTier(11250000, 0.02), createTerTier(11600000, 0.025), createTerTier(12600000, 0.03),
        createTerTier(13600000, 0.04), createTerTier(14950000, 0.05), createTerTier(16400000, 0.06),
        createTerTier(18450000, 0.07), createTerTier(21850000, 0.08), createTerTier(26000000, 0.09),
        createTerTier(27700000, 0.1), createTerTier(29350000, 0.11), createTerTier(31450000, 0.12),
        createTerTier(33950000, 0.13), createTerTier(37100000, 0.14), createTerTier(41100000, 0.15),
        createTerTier(45800000, 0.16), createTerTier(49500000, 0.17), createTerTier(53800000, 0.18),
        createTerTier(58500000, 0.19), createTerTier(64000000, 0.2), createTerTier(71000000, 0.21),
        createTerTier(80000000, 0.22), createTerTier(93000000, 0.23), createTerTier(109000000, 0.24),
        createTerTier(129000000, 0.25), createTerTier(163000000, 0.26), createTerTier(211000000, 0.27),
        createTerTier(374000000, 0.28), createTerTier(459000000, 0.29), createTerTier(555000000, 0.3),
        createTerTier(704000000, 0.31), createTerTier(957000000, 0.32), createTerTier(1405000000, 0.33),
        createTerTier(Infinity, 0.34)
    ],
    C: [
        createTerTier(6600000, 0), createTerTier(6950000, 0.0025), createTerTier(7350000, 0.005),
        createTerTier(7800000, 0.0075), createTerTier(8850000, 0.01), createTerTier(9800000, 0.0125),
        createTerTier(10950000, 0.015), createTerTier(11200000, 0.0175), createTerTier(12050000, 0.02),
        createTerTier(12950000, 0.03), createTerTier(14150000, 0.04), createTerTier(15550000, 0.05),
        createTerTier(17050000, 0.06), createTerTier(19500000, 0.07), createTerTier(22700000, 0.08),
        createTerTier(26600000, 0.09), createTerTier(28100000, 0.1), createTerTier(30100000, 0.11),
        createTerTier(32600000, 0.12), createTerTier(35400000, 0.13), createTerTier(38900000, 0.14),
        createTerTier(43000000, 0.15), createTerTier(47400000, 0.16), createTerTier(51200000, 0.17),
        createTerTier(55800000, 0.18), createTerTier(60400000, 0.19), createTerTier(66700000, 0.2),
        createTerTier(74500000, 0.21), createTerTier(83200000, 0.22), createTerTier(95600000, 0.23),
        createTerTier(110000000, 0.24), createTerTier(134000000, 0.25), createTerTier(169000000, 0.26),
        createTerTier(221000000, 0.27), createTerTier(390000000, 0.28), createTerTier(463000000, 0.29),
        createTerTier(561000000, 0.3), createTerTier(709000000, 0.31), createTerTier(965000000, 0.32),
        createTerTier(1419000000, 0.33), createTerTier(Infinity, 0.34)
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