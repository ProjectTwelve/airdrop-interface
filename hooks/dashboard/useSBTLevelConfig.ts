import { useMemo } from 'react';
import { GenesisRarity } from '@/constants';

export function useSBTLevelConfig(nftLevel?: GenesisRarity) {
  return useMemo(() => {
    switch (nftLevel) {
      case GenesisRarity.Legendary:
        return {
          loading: 'fill-orange',
          text: 'text-orange',
          rarity: 'LEGENDARY',
          bg: 'bg-orange/20',
          hover: 'hover:bg-orange/30',
        };
      case GenesisRarity.Epic:
        return {
          loading: 'fill-purple',
          text: 'text-purple',
          rarity: 'EPIC',
          bg: 'bg-purple/20',
          hover: 'hover:bg-purple/30',
        };
      case GenesisRarity.Rare:
        return {
          loading: 'fill-blue',
          text: 'text-blue',
          rarity: 'RARE',
          bg: 'bg-blue/20',
          hover: 'hover:bg-blue/30',
        };
      case GenesisRarity.Uncommon:
        return {
          loading: 'fill-green',
          text: 'text-green',
          rarity: 'UNCOMMON',
          bg: 'bg-green/20',
          hover: 'hover:bg-green/30',
        };
      case GenesisRarity.Common:
        return {
          loading: 'fill-[#99A7C3]',
          text: 'text-[#99A7C3]',
          rarity: 'COMMON',
          bg: 'bg-[#99A7C3]/20',
          hover: 'hover:bg-[#99A7C3]/30',
        };
      case GenesisRarity.Rekt:
        return {
          loading: 'fill-[#99A7C3]',
          text: 'text-[#99A7C3]',
          rarity: 'REKT',
          bg: 'bg-[#99A7C3]/20',
          hover: 'hover:bg-[#99A7C3]/30',
        };
      default:
        return {};
    }
  }, [nftLevel]);
}
