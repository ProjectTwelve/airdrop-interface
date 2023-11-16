import ClaimButton from '@/components/dashboard/sbt/ClaimButton';
import CredentialTask from '@/components/dashboard/sbt/CredentialTask';
import TokenStatus from '@/components/dashboard/sbt/TokenStatus';
import { Tooltip } from '@/components/tooltip';
import PremiumPlusTooltip from '@/components/tooltip/PremiumPlusTooltip';
import { GAMER_BADGES, GenesisClaim, GenesisPay, GenesisRole, GenesisSource } from '@/constants';
import { EventCategory, EventName } from '@/constants/event';
import { useFetchGenesisNFT } from '@/hooks/dashboard/genesis';
import { useGamerTokenStatus } from '@/hooks/dashboard/useTokenStatus';
import { useGamerInfo } from '@/hooks/gamer';
import { dashboardSelectedTabAtom, userPowerLevelAtom } from '@/store/dashboard/state';
import { openLink } from '@/utils';
import { digitalFormat } from '@/utils/format';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import ReactGA from 'react-ga4';
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
              className="-mt-[15px] aspect-square cursor-pointer bg-cover"
              style={{ backgroundImage: `url(${GAMER_BADGES[gamerNFT!.nftLevel].asset256})` }}
              onClick={() => openLink(`https://galxe.com/nft/${tokenStatus?.id}/0xb034d6bA0b6593Fa5107C6a55042b67746d44605`)}
            />
          ) : (
            <img className="mb-4 w-full max-w-[186px]" src="/img/unclaimed.webp" alt="unclaimed" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex gap-3 text-lg/4.5">
            P12 Gamer SBT
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
              <Tooltip label="Claim P12 Gamer SBT to activate Gamer Power Level.">
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
                onClick={() => {
                  ReactGA.event({ category: EventCategory.Assets, action: EventName.GetNftTask, label: 'gamer_verify_steam' });
                  setSelectedTab(1);
                }}
                status={nftSource.includes(GenesisSource.Steam)}
                text="I am a Steam Gamer"
              />
              <p className="text-center text-xs">OR</p>
              <CredentialTask
                onClick={() => {
                  ReactGA.event({ category: EventCategory.Assets, action: EventName.GetNftTask, label: 'gamer_become_voter' });
                  setSelectedTab(0);
                }}
                status={nftSource.includes(GenesisSource.Arcana)}
                text="I am a P12 Arcana voter"
              />
            </div>
          )}
        </div>
      </div>
      <ClaimButton powerLevel={gamerPL} onUpgradeSuccess={() => refetch().then()} role={GenesisRole.Gamer} data={gamerNFT} />
    </div>
  );
}
