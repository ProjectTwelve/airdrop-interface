import React, { useMemo } from 'react';
import classNames from 'classnames';
import { openLink } from '@/utils';
import Button from '@/components/button';
import { GenesisNFT } from '@/lib/types-nest';
import { useSBTLevelConfig } from '@/hooks/dashboard/useSBTLevelConfig';
import { useFetchGenesisPL } from '@/hooks/dashboard/powerLevel';
import { DEV_BADGES, GAMER_BADGES, GenesisRole, NFT_CLAIM, GenesisRarity } from '@/constants';
import { GenesisUpgradeStatus, useGenesisNFTUpgrade } from '@/hooks/dashboard/useGenesisNFTUpgrade';

type ClaimButtonProps = {
  type: GenesisRole;
  data?: GenesisNFT;
  powerLevel: number;
};
export default function ClaimButton({ data, type, powerLevel }: ClaimButtonProps) {
  const { data: genesisPL } = useFetchGenesisPL();
  const upgrade = useGenesisNFTUpgrade({ powerLevel, currentLevel: data?.nftLevel, data: genesisPL });
  const upLevelConfig = useSBTLevelConfig(upgrade.upLevel);
  const nftConfig = useMemo(() => (type === GenesisRole.Gamer ? GAMER_BADGES : DEV_BADGES), [type]);

  return data?.credential ? (
    data.nftClaim === NFT_CLAIM.UNCLAIMED ? (
      <Button type="gradient" className="w-full py-4 font-medium" onClick={() => openLink(nftConfig[data.nftLevel].claim)}>
        Claim
      </Button>
    ) : data.nftLevel === GenesisRarity.Legendary ? (
      <Button className="w-full py-4 text-gray-450" disabled>
        The highest level
      </Button>
    ) : (
      <>
        {upgrade.status === GenesisUpgradeStatus.CanUpgrade && (
          <div
            onClick={() => {
              // TODO: upgrade
            }}
            className={classNames(
              'cursor-pointer rounded-full py-4.5 text-center text-xl/5 font-medium',
              upLevelConfig.bg,
              upLevelConfig.text,
              upLevelConfig.hover,
            )}
          >
            Upgrade To [{upLevelConfig.rarity}]
          </div>
        )}
        {upgrade.status === GenesisUpgradeStatus.NotUpgrade && (
          <Button className="w-full py-4.5 text-lg/5 font-medium" disabled>
            Need <span className="text-2xl/5 text-yellow">{upgrade.diff} PL</span> to Upgrade
          </Button>
        )}
      </>
    )
  ) : (
    <Button className="w-full py-4 text-gray-450" disabled>
      You are NOT eligible
    </Button>
  );
}
