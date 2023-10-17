import ClaimButton from '@/components/dashboard/sbt/ClaimButton';
import CredentialTask from '@/components/dashboard/sbt/CredentialTask';
import TokenStatus from '@/components/dashboard/sbt/TokenStatus';
import { Tooltip } from '@/components/tooltip';
import PremiumPlusTooltip from '@/components/tooltip/PremiumPlusTooltip';
import { GAMER_BADGES, GenesisClaim, GenesisPay, GenesisRole, GenesisSource } from '@/constants';
import { useFetchGenesisNFT } from '@/hooks/dashboard/genesis';
import { useGamerTokenStatus } from '@/hooks/dashboard/useTokenStatus';
import { useGamerInfo } from '@/hooks/gamer';
import { dashboardSelectedTabAtom, userPowerLevelAtom } from '@/store/dashboard/state';
import { digitalFormat } from '@/utils/format';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useAccount } from 'wagmi';

export default function SteamGamerSBT() {
  const { address } = useAccount();
  useGamerInfo(address);
  const setSelectedTab = useSetRecoilState(dashboardSelectedTabAtom);
  const { data: gamerNFT, refetch } = useFetchGenesisNFT({ address, role: GenesisRole.Gamer });
  const { gamerPL } = useRecoilValue(userPowerLevelAtom);
  const tokenStatus = useGamerTokenStatus(gamerNFT);
  const nftSource = useMemo(() => gamerNFT?.nftSource ?? [], [gamerNFT?.nftSource]);
  const birthday = useMemo(
    () => (gamerNFT?.createdAt ? dayjs(gamerNFT.createdAt).format('YY/MM/DD') : '--'),
    [gamerNFT?.createdAt],
  );

  const isClaimed = useMemo(() => gamerNFT?.nftClaim === GenesisClaim.Claimed, [gamerNFT?.nftClaim]);

  return (
    <div className="relative flex h-full flex-col gap-3.5">
      <div className="flex gap-6 xs:flex-wrap">
        <div className="w-full max-w-[217px]">
          {isClaimed ? (
            <div
              className="-mt-[15px] aspect-square bg-cover"
              style={{ backgroundImage: `url(${GAMER_BADGES[gamerNFT!.nftLevel].asset256})` }}
            />
          ) : (
            <img className="mb-4 w-full max-w-[186px]" src="/img/unclaimed.webp" alt="unclaimed" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex gap-3 text-lg/4.5">
            P12 XII-PLORER Badge
            {gamerNFT?.payUser === GenesisPay.Golden && (
              <PremiumPlusTooltip data={birthday} placement="bottom">
                <div className="w-18 cursor-pointer rounded bg-[url(/svg/pl/premium_plus.svg)] bg-cover py-0.5 text-center text-xs/4.5 font-semibold text-orange-700 shadow-md shadow-orange-500/50">
                  Premium
                </div>
              </PremiumPlusTooltip>
            )}
          </div>
          <p className="mt-4 text-xs/3">Power Level</p>
          <div className="mt-2 flex gap-1.5">
            <div className={classNames('text-[34px]/10 font-bold', isClaimed ? 'text-gradient-yellow' : 'text-gray-400')}>
              {digitalFormat.integer(gamerPL)}
            </div>
            {isClaimed ? (
              <img className="h-10 w-10" src="/img/pl/power_level.png" alt="PL" />
            ) : (
              <Tooltip label="Claim P12 XII-PLORER Badge to activate Gamer Power Level.">
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
                text="Become a voter in P12 Arcana"
              />
              <p className="text-center text-xs">OR</p>
              <CredentialTask
                onClick={() => setSelectedTab(1)}
                status={nftSource.includes(GenesisSource.Steam)}
                text="Complete Steam verify process in airdrop"
              />
            </div>
          )}
        </div>
      </div>
      <ClaimButton powerLevel={gamerPL} onUpgradeSuccess={() => refetch().then()} role={GenesisRole.Gamer} data={gamerNFT} />
    </div>
  );
}
