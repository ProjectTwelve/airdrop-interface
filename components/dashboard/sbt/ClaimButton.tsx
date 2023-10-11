import React, { useMemo } from 'react';
import classNames from 'classnames';
import { openLink } from '@/utils';
import Button from '@/components/button';
import { GenesisNFT } from '@/lib/types-nest';
import { useSBTLevelConfig } from '@/hooks/dashboard/useSBTLevelConfig';
import { useFetchGenesisPL, useMutationGenesisUpgrade } from '@/hooks/dashboard/powerLevel';
import { DEV_BADGES, GAMER_BADGES, GenesisClaim, GenesisRarity, GenesisRole } from '@/constants';
import { GenesisUpgradeStatus, useGenesisNFTUpgrade } from '@/hooks/dashboard/useGenesisNFTUpgrade';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';

type ClaimButtonProps = {
  role: GenesisRole;
  data?: GenesisNFT;
  powerLevel: number;
  onUpgradeSuccess?: () => void;
};
export default function ClaimButton({ data, role, powerLevel, onUpgradeSuccess }: ClaimButtonProps) {
  const { data: genesisPL } = useFetchGenesisPL();
  const { address } = useAccount();
  const upgrade = useGenesisNFTUpgrade({ powerLevel, currentLevel: data?.nftLevel, data: genesisPL });
  const upLevelConfig = useSBTLevelConfig(upgrade.upLevel);
  const nftConfig = useMemo(() => (role === GenesisRole.Gamer ? GAMER_BADGES : DEV_BADGES), [role]);
  const { mutateAsync, isLoading } = useMutationGenesisUpgrade({
    onSuccess: () => {
      toast.success('Upgrade Genesis NFT successfully');
      onUpgradeSuccess?.();
    },
  });

  return data?.credential ? (
    data.nftClaim === GenesisClaim.Unclaimed ? (
      <Button
        type="gradient"
        className="w-full py-3 text-base/5 font-semibold"
        onClick={() => openLink(nftConfig[data.nftLevel].claim)}
      >
        Claim
      </Button>
    ) : data.nftLevel === GenesisRarity.Legendary ? (
      <Button className="w-full py-3 text-base/5 font-semibold text-gray-450" disabled>
        The highest level
      </Button>
    ) : (
      <>
        {upgrade.status === GenesisUpgradeStatus.CanUpgrade && (
          <div
            onClick={() => {
              if (!address || isLoading) return;
              mutateAsync({ address, role }).then();
            }}
            className={classNames(
              'flex-center cursor-pointer gap-3 rounded-full py-3 text-center text-base/5 font-semibold',
              upLevelConfig.bg,
              upLevelConfig.text,
              upLevelConfig.hover,
            )}
          >
            {isLoading && (
              <svg
                className={classNames('animate-spin', upLevelConfig.loading)}
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.5 16C13.0899 16 16 13.0899 16 9.5C16 5.91015 13.0899 3 9.5 3C8.67157 3 8 2.32843 8 1.5C8 0.671576 8.67157 2.91176e-06 9.5 2.98418e-06C14.7467 3.44286e-06 19 4.2533 19 9.5C19 14.7467 14.7467 19 9.5 19C4.2533 19 3.71835e-07 14.7467 8.30516e-07 9.5C9.0294e-07 8.67157 0.671575 8 1.5 8C2.32843 8 3 8.67157 3 9.5C3 13.0899 5.91015 16 9.5 16Z"
                  fill="current"
                />
              </svg>
            )}
            Upgrade To [{upLevelConfig.rarity}]
          </div>
        )}
        {upgrade.status === GenesisUpgradeStatus.NotUpgrade && (
          <Button className="w-full py-3 text-base/5 font-semibold" disabled>
            Need <span className="text-xl/5 text-yellow">{upgrade.diff} PL</span> to Upgrade
          </Button>
        )}
      </>
    )
  ) : (
    <Button className="w-full py-3 text-base/5 font-semibold text-gray-450" disabled>
      You are NOT eligible
    </Button>
  );
}
