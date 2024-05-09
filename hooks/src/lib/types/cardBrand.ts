type Brand = 'visa' | 'master' | 'diners' | 'amex' | 'union' | 'etc';

type Prefix = number | { from: number; to: number };

interface CardBrandConfig {
  cardNumberCount: number;
  prefixes: Prefix[];
  segmentLength: number[];
}

type CardBrand = {
  [key in Brand]: CardBrandConfig;
};
