import React, { useMemo } from 'react';
import { useAccount } from 'wagmi';
import classNames from 'classnames';
import { Tooltip } from '@/components/tooltip';
import { digitalFormat } from '@/utils/format';
import { useDeveloperInfo } from '@/hooks/developer';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useFetchGenesisNFT } from '@/hooks/dashboard/genesis';
import TokenStatus from '@/components/dashboard/sbt/TokenStatus';
import ClaimButton from '@/components/dashboard/sbt/ClaimButton';
import { useDevTokenStatus } from '@/hooks/dashboard/useTokenStatus';
import { DEV_BADGES, GenesisRole, GenesisSource, GenesisClaim } from '@/constants';
import CredentialTask from '@/components/dashboard/sbt/CredentialTask';
import { dashboardSelectedTabAtom, userPowerLevelAtom } from '@/store/dashboard/state';

export default function SteamDeveloperSBT() {
  const { address } = useAccount();
  useDeveloperInfo(address);
  const setSelectedTab = useSetRecoilState(dashboardSelectedTabAtom);
  const { data: developerNFT, refetch } = useFetchGenesisNFT({ address, role: GenesisRole.Developer });
  const { developerPL } = useRecoilValue(userPowerLevelAtom);
  const nftSource = useMemo(() => developerNFT?.nftSource ?? [], [developerNFT?.nftSource]);
  const tokenStatus = useDevTokenStatus(developerNFT);

  const isClaimed = useMemo(() => developerNFT?.nftClaim === GenesisClaim.Claimed, [developerNFT?.nftClaim]);

  return (
    <div className="relative flex h-full flex-col gap-3.5">
      <div className="flex gap-6 xs:flex-wrap">
        <div className="w-full max-w-[217px]">
          {isClaimed ? (
            <div
              className="-mt-[15px] aspect-square bg-cover"
              style={{ backgroundImage: `url(${DEV_BADGES[developerNFT!.nftLevel].asset256})` }}
            />
          ) : (
            <img className="mb-4 aspect-square w-full max-w-[186px]" src="/img/unclaimed.webp" alt="unclaimed" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex gap-3 text-lg/4.5">P12 GENESIS Badge</div>
          <p className="mt-4 text-xs/3">Power Level</p>
          <div className="mt-2 flex gap-1.5">
            <div className={classNames('text-[34px]/10 font-bold', isClaimed ? 'text-gradient-yellow' : 'text-gray-400')}>
              {digitalFormat.integer(developerPL)}
            </div>
            {isClaimed ? (
              <img className="h-10 w-10" src="/img/pl/power_level.png" alt="PL" />
            ) : (
              <Tooltip label="Claim P12 GENESIS Badge to activate Developer Power Level.">
                <img className="w-7" src="/svg/warning_badge.svg" alt="warning" />
              </Tooltip>
            )}
          </div>
          {isClaimed ? (
            <div className="mt-6">
              <TokenStatus data={tokenStatus} />
            </div>
          ) : (
            <div className="mt-3">
              <CredentialTask
                onClick={() => setSelectedTab(0)}
                status={nftSource.includes(GenesisSource.Arcana)}
                text="Publish a creation in P12 Arcana"
              />
              <p className="text-center text-xs">OR</p>
              <CredentialTask
                onClick={() => setSelectedTab(2)}
                status={nftSource.includes(GenesisSource.Steam)}
                text="Complete Steam game verify process"
              />
            </div>
          )}
        </div>
      </div>
      <ClaimButton
        data={developerNFT}
        powerLevel={developerPL}
        role={GenesisRole.Developer}
        onUpgradeSuccess={() => refetch().then()}
      />
    </div>
  );
}
