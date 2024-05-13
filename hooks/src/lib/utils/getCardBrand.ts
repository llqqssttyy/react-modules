import { CARD_BRAND } from '../constants';

function matchesPrefix(cardNumbers: string, prefix: Prefix): boolean {
  if (typeof prefix === 'number') {
    return cardNumbers.startsWith(prefix.toString());
  }

  const prefixLength = prefix.to.toString().length;
  const startNumber = Number(cardNumbers.substring(0, prefixLength));
  return startNumber >= prefix.from && startNumber <= prefix.to;
}

function findCardBrand(cardNumbers: string): Brand {
  for (const [key, { prefixes }] of Object.entries(CARD_BRAND)) {
    const isExistBrand = prefixes.some((prefix) => matchesPrefix(cardNumbers, prefix));

    if (isExistBrand) {
      return key as Brand;
    }
  }
  return 'etc';
}

export default function getCardBrand(cardNumbers: string) {
  return findCardBrand(cardNumbers);
}
