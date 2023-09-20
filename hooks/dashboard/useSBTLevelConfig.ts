import { useMemo } from 'react';
import { GenesisRarity } from '@/constants';

export function useSBTLevelConfig(nftLevel?: GenesisRarity) {
  return useMemo(() => {
    switch (nftLevel) {
      case GenesisRarity.Legendary:
        return {
          text: 'text-orange',
          rarity: 'LEGENDARY',
          bg: 'bg-orange/20',
          hover: 'hover:bg-orange/30',
        };
      case GenesisRarity.Epic:
        return {
          text: 'text-purple',
          rarity: 'EPIC',
          bg: 'bg-purple/20',
          hover: 'hover:bg-purple/30',
        };
      case GenesisRarity.Rekt:
        return {
          text: 'text-blue',
          rarity: 'RARE',
          bg: 'bg-blue/20',
          hover: 'hover:bg-blue/30',
        };
      case GenesisRarity.Uncommon:
        return {
          text: 'text-green',
          rarity: 'UNCOMMON',
          bg: 'bg-green/20',
          hover: 'hover:bg-green/30',
        };
      case GenesisRarity.Common:
        return {
          text: 'text-[#99A7C3]',
          rarity: 'COMMON',
          bg: 'bg-[#99A7C3]/20',
          hover: 'hover:bg-[#99A7C3]/30',
        };
      case GenesisRarity.Rare:
        return {
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
