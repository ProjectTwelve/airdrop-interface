import { useMemo } from 'react';
import { SBT_LEVEL } from '@/constants';

export function useSBTLevelConfig(nftLevel?: SBT_LEVEL) {
  return useMemo(() => {
    switch (nftLevel) {
      case SBT_LEVEL.ORANGE:
        return {
          text: 'text-orange',
          rarity: 'LEGENDARY',
          bg: 'bg-orange/20',
          hover: 'hover:bg-orange/30',
        };
      case SBT_LEVEL.PURPLE:
        return {
          text: 'text-purple',
          rarity: 'EPIC',
          bg: 'bg-purple/20',
          hover: 'hover:bg-purple/30',
        };
      case SBT_LEVEL.BLUE:
        return {
          text: 'text-blue',
          rarity: 'RARE',
          bg: 'bg-blue/20',
          hover: 'hover:bg-blue/30',
        };
      case SBT_LEVEL.GREEN:
        return {
          text: 'text-green',
          rarity: 'UNCOMMON',
          bg: 'bg-green/20',
          hover: 'hover:bg-green/30',
        };
      case SBT_LEVEL.WHITE:
        return {
          text: 'text-[#99A7C3]',
          rarity: 'COMMON',
          bg: 'bg-[#99A7C3]/20',
          hover: 'hover:bg-[#99A7C3]/30',
        };
      case SBT_LEVEL.REKT:
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
