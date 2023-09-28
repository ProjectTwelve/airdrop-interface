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
    <div className="relative h-full">
      <div className="flex gap-6 pb-20 xs:flex-wrap">
        <div className="w-full max-w-[232px]">
          {isClaimed ? (
            <div
              className="aspect-square bg-cover"
              style={{ backgroundImage: `url(${DEV_BADGES[developerNFT!.nftLevel].asset256})` }}
            />
          ) : (
            <img className="w-full" src="/img/unclaimed.webp" alt="unclaimed" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex gap-3 text-xl/5.5">P12 Genesis Badge</div>
          <p className="mt-5 text-sm">Power Level</p>
          <div className="flex gap-1.5 ">
            <div className={classNames('font-bold', isClaimed ? 'text-gradient-yellow text-5xl' : 'text-4xl/9 text-gray-400')}>
              {digitalFormat.integer(developerPL)}
            </div>
            {isClaimed ? (
              <img className="h-12 w-12" src="/img/pl/power_level.png" alt="PL" />
            ) : (
              <Tooltip label="Claim P12 XII-PLORER Badge to activate Gamer Power Level.">
                <img className="w-7" src="/svg/warning_badge.svg" alt="warning" />
              </Tooltip>
            )}
          </div>
          {isClaimed ? (
            <div className="mt-12">
              <TokenStatus data={tokenStatus} />
            </div>
          ) : (
            <div className="mt-3">
              <CredentialTask
                onClick={() => setSelectedTab(0)}
                status={nftSource.includes(GenesisSource.Arcana)}
                text="Publish a creation in Arcana Editorium"
              />
              <p className="my-1 text-center text-sm">OR</p>
              <CredentialTask
                onClick={() => setSelectedTab(2)}
                status={nftSource.includes(GenesisSource.Steam)}
                text="Complete Steam game verify process"
              />
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 w-full px-5">
        <ClaimButton
          data={developerNFT}
          powerLevel={developerPL}
          role={GenesisRole.Developer}
          onUpgradeSuccess={() => refetch().then()}
        />
      </div>
    </div>
  );
}
