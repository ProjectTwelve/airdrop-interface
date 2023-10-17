import { GenesisRarity } from '@/constants';

export enum GenesisUpgradeStatus {
  None = 'none',
  CanUpgrade = 'canUpgrade',
  NotUpgrade = 'notUpgrade',
}

type GenesisNFTUpgradeProps = {
  powerLevel: number;
  currentLevel?: number;
  data?: number[];
};

export function useGenesisNFTUpgrade({ powerLevel, currentLevel, data }: GenesisNFTUpgradeProps) {
  if (!data || !currentLevel)
    return {
      status: GenesisUpgradeStatus.None,
      diff: 0,
      upLevel: 0,
    };
  if (currentLevel === GenesisRarity.Legendary)
    return {
      status: GenesisUpgradeStatus.None,
      diff: 0,
      upLevel: 0,
    };
  const nextPL = data[currentLevel - 1];
  const upLevel = data.findIndex((pl) => powerLevel >= pl);
  if (powerLevel >= nextPL) {
    return {
      status: GenesisUpgradeStatus.CanUpgrade,
      diff: 0,
      upLevel: upLevel,
    };
  } else {
    return {
      status: GenesisUpgradeStatus.NotUpgrade,
      diff: nextPL - powerLevel,
      upLevel: upLevel,
    };
  }
}
