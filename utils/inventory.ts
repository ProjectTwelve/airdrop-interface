import { polygon, bsc } from 'wagmi/chains';

export function ChainIdToName(chainId: number): string {
  if (chainId === polygon.id) {
    return polygon.name;
  } else if (chainId === bsc.id) {
    return bsc.name;
  } else if (chainId === 20736) {
    return 'P12 Chain';
  } else {
    return 'Unknown';
  }
}

export function transferRarity(rarity?: string) {
  if (rarity === 'White') {
    return 'Common';
  } else if (rarity === 'Green') {
    return 'Uncommon';
  } else if (rarity === 'Blue') {
    return 'Rare';
  } else if (rarity === 'Purple') {
    return 'Epic';
  }
}
