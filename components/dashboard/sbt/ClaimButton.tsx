import React, { useMemo } from 'react';
import classNames from 'classnames';
import { openLink } from '@/utils';
import Button from '@/components/button';
import { GenesisNFT } from '@/lib/types-nest';
import { useSBTLevelConfig } from '@/hooks/dashboard/useSBTLevelConfig';
import { DEV_BADGES, GAMER_BADGES, GenesisNFTType, NFT_CLAIM } from '@/constants';

type ClaimButtonProps = {
  type: GenesisNFTType;
  data?: GenesisNFT;
};
export default function ClaimButton({ data, type }: ClaimButtonProps) {
  const nextLevel = useMemo(() => (data?.nftLevel ? data?.nftLevel - 1 : undefined), [data?.nftLevel]);
  const nextLevelConfig = useSBTLevelConfig(nextLevel);
  const nftConfig = useMemo(() => (type === GenesisNFTType.Gamer ? GAMER_BADGES : DEV_BADGES), [type]);

  return data?.credential ? (
    data.nftClaim === NFT_CLAIM.UNCLAIMED ? (
      <Button type="gradient" className="w-full py-4 font-medium" onClick={() => openLink(nftConfig[data.nftLevel].claim)}>
        Claim
      </Button>
    ) : (
      <div
        className={classNames(
          'cursor-pointer rounded-full py-4.5 text-center text-xl/5 font-medium',
          nextLevelConfig.bg,
          nextLevelConfig.text,
          nextLevelConfig.hover,
        )}
      >
        Upgrade To [{nextLevelConfig.rarity}]
      </div>
    )
  ) : (
    <Button className="w-full py-4 text-gray-450" disabled>
      You are NOT eligible
    </Button>
  );
}
