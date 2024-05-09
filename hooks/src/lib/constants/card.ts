export const CARD_BRAND: Omit<CardBrand, 'etc'> = {
  visa: {
    cardNumberCount: 16,
    prefixes: [4],
    segmentLength: [4, 4, 4, 4],
  },

  master: {
    cardNumberCount: 16,
    prefixes: [{ from: 51, to: 55 }],
    segmentLength: [4, 4, 4, 4],
  },

  diners: {
    cardNumberCount: 14,
    prefixes: [36],
    segmentLength: [4, 6, 4],
  },

  amex: {
    cardNumberCount: 15,
    prefixes: [34, 37],
    segmentLength: [4, 6, 5],
  },

  union: {
    cardNumberCount: 16,
    prefixes: [
      { from: 622126, to: 622925 },
      { from: 624, to: 626 },
      { from: 6282, to: 6288 },
    ],
    segmentLength: [4, 4, 4, 4],
  },
};

export const MONTH = {
  startNumber: 1,
  endNumber: 12,
};

export const CENTURY_PREFIX = 2000;
