import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { useAccount } from 'wagmi';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import { useGamerInfo } from '@/hooks/gamer';
import { gamerInfoAtom } from '@/store/gamer/state';
import { GAMER_BADGES, NFT_CLAIM } from '@/constants';
import TokenStatus from '@/components/dashboard/TokenStatus';
import { useGamerTokenStatus } from '@/hooks/dashboard/useTokenStatus';
import PremiumPlusTooltip from '@/components/tooltip/PremiumPlusTooltip';
import { useSBTLevelConfig } from '@/hooks/dashboard/useSBTLevelConfig';
import { digitalFormat } from '@/utils/format';
import { userPowerLevelAtom } from '@/store/dashboard/state';

export default function SteamGamerSBT() {
  const { address } = useAccount();
  useGamerInfo(address);
  const { gamerPL } = useRecoilValue(userPowerLevelAtom);
  const gamerInfo = useRecoilValue(gamerInfoAtom);
  const tokenStatus = useGamerTokenStatus(gamerInfo);
  const nextLevel = useMemo(() => (gamerInfo?.nft_level ? gamerInfo?.nft_level - 1 : undefined), [gamerInfo?.nft_level]);
  const nextLevelConfig = useSBTLevelConfig(nextLevel);

  const birthday = useMemo(
    () => (gamerInfo?.birthday ? dayjs(gamerInfo.birthday).format('YY/MM/DD') : '--'),
    [gamerInfo?.birthday],
  );

  return (
    <div className="relative h-full">
      <div className="flex gap-6 pb-20">
        <div className="w-full max-w-[232px]">
          {gamerInfo?.nft_claim === NFT_CLAIM.CLAIMED && (
            <div
              className="aspect-square bg-cover"
              style={{ backgroundImage: `url(${GAMER_BADGES[gamerInfo.nft_level!].asset256})` }}
            />
          )}
        </div>
        <div className="flex-1">
          <div className="flex gap-3 text-xl/5.5">
            P12 XII-PLORER Badge
            <PremiumPlusTooltip data={birthday} placement="bottom">
              <div className="w-18 cursor-pointer rounded bg-[url(/svg/pl/premium_plus.svg)] bg-cover py-0.5 text-center text-xs/4.5 font-semibold text-orange-700 shadow-md shadow-orange-500/50">
                Premium
              </div>
            </PremiumPlusTooltip>
          </div>
          <p className="mt-5 text-sm">Power Level</p>
          <div className="flex gap-1.5 ">
            <div className="text-gradient-yellow text-5xl font-bold">{digitalFormat.integer(gamerPL)}</div>
            <img className="w-7" src="/svg/check_success.svg" alt="check_success" />
          </div>
          <div className="mt-12">
            <TokenStatus data={tokenStatus} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full px-5">
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
      </div>
    </div>
  );
}
