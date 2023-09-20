import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { useAccount } from 'wagmi';
import classNames from 'classnames';
import { useGamerInfo } from '@/hooks/gamer';
import { Tooltip } from '@/components/tooltip';
import { digitalFormat } from '@/utils/format';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useFetchGenesisNFT } from '@/hooks/dashboard/genesis';
import TokenStatus from '@/components/dashboard/sbt/TokenStatus';
import { useGamerTokenStatus } from '@/hooks/dashboard/useTokenStatus';
import CredentialTask from '@/components/dashboard/sbt/CredentialTask';
import PremiumPlusTooltip from '@/components/tooltip/PremiumPlusTooltip';
import { GAMER_BADGES, GenesisNFTType, GenesisPayUser, NFT_CLAIM } from '@/constants';
import { dashboardSelectedTabAtom, userPowerLevelAtom } from '@/store/dashboard/state';
import ClaimButton from '@/components/dashboard/sbt/ClaimButton';

export default function SteamGamerSBT() {
  const { address } = useAccount();
  useGamerInfo(address);
  const setSelectedTab = useSetRecoilState(dashboardSelectedTabAtom);
  const { data: gamerNFT } = useFetchGenesisNFT({ address, type: GenesisNFTType.Gamer });
  const { gamerPL } = useRecoilValue(userPowerLevelAtom);
  const tokenStatus = useGamerTokenStatus(gamerNFT);
  const nftSource = useMemo(() => gamerNFT?.nftSource ?? [], [gamerNFT?.nftSource]);
  const birthday = useMemo(
    () => (gamerNFT?.createdAt ? dayjs(gamerNFT.createdAt).format('YY/MM/DD') : '--'),
    [gamerNFT?.createdAt],
  );

  const isClaimed = useMemo(() => gamerNFT?.nftClaim === NFT_CLAIM.CLAIMED, [gamerNFT?.nftClaim]);

  return (
    <div className="relative h-full">
      <div className="flex gap-6 pb-20">
        <div className="w-full max-w-[232px]">
          {isClaimed ? (
            <div
              className="aspect-square bg-cover"
              style={{ backgroundImage: `url(${GAMER_BADGES[gamerNFT!.nftLevel].asset256})` }}
            />
          ) : (
            <img className="w-full" src="/img/unclaimed.webp" alt="unclaimed" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex gap-3 text-xl/5.5">
            P12 XII-PLORER Badge
            {gamerNFT?.payUser === GenesisPayUser.Golden && (
              <PremiumPlusTooltip data={birthday} placement="bottom">
                <div className="w-18 cursor-pointer rounded bg-[url(/svg/pl/premium_plus.svg)] bg-cover py-0.5 text-center text-xs/4.5 font-semibold text-orange-700 shadow-md shadow-orange-500/50">
                  Premium
                </div>
              </PremiumPlusTooltip>
            )}
          </div>
          <p className="mt-5 text-sm">Power Level</p>
          <div className="flex gap-1.5 ">
            <div className={classNames('font-bold', isClaimed ? 'text-gradient-yellow text-5xl' : 'text-4xl/9 text-gray-400')}>
              {digitalFormat.integer(gamerPL)}
            </div>
            {isClaimed ? (
              <img className="w-7" src="/svg/check_success.svg" alt="check_success" />
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
                status={nftSource.includes('arcana')}
                text="Become a voter in Arcana Editorium"
              />
              <p className="my-1 text-center text-sm">OR</p>
              <CredentialTask
                onClick={() => setSelectedTab(1)}
                status={nftSource.includes('steam')}
                text="Complete Steam verify process in airdrop"
              />
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 w-full px-5">
        <ClaimButton powerLevel={gamerPL} type={GenesisNFTType.Gamer} data={gamerNFT} />
      </div>
    </div>
  );
}
