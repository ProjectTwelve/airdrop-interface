import React from 'react';
import { useAccount } from 'wagmi';
import { useRecoilValue } from 'recoil';
import { useGamerInfo } from '@/hooks/gamer';
import { GAMER_BADGES, NFT_CLAIM } from '@/constants';
import { gamerInfoAtom } from '@/store/gamer/state';
import dayjs from 'dayjs';
import TokenStatus from '@/components/dashboard/TokenStatus';
import { useGamerTokenStatus } from '@/hooks/dashboard/useTokenStatus';

export default function SteamGamerSBT() {
  const { address } = useAccount();
  useGamerInfo(address);
  const gamerInfo = useRecoilValue(gamerInfoAtom);
  const tokenStatus = useGamerTokenStatus(gamerInfo);

  return (
    <div>
      <div className="flex gap-6">
        <div className="w-full max-w-[232px]">
          {gamerInfo?.nft_claim === NFT_CLAIM.CLAIMED && (
            <div
              className="aspect-square bg-cover"
              style={{ backgroundImage: `url(${GAMER_BADGES[gamerInfo.nft_level!].asset})` }}
            />
          )}
        </div>
        <div className="flex-1">
          <div className="flex gap-3 text-xl/5.5">
            P12 XII-PLORER Badge
            {/*<div className="w-18 cursor-pointer rounded bg-[url(/svg/pl/premium.svg)] bg-cover py-0.5 text-center text-xs/4.5 font-semibold text-gray-750 shadow-md shadow-blue-400/50">*/}
            {/*  Premium*/}
            {/*</div>*/}
            <div className="w-[6.375rem] cursor-pointer rounded bg-[url(/svg/pl/premium_plus.svg)] bg-cover py-0.5 text-center text-xs/4.5 font-semibold text-orange-700 shadow-md shadow-orange-500/50">
              Premium Plus
            </div>
            {/*{gamerInfo && (*/}
            {/*  <Tag*/}
            {/*    size="small"*/}
            {/*    value={GAMER_BADGES[gamerInfo.nft_level!].rarity}*/}
            {/*    type={GAMER_BADGES[gamerInfo.nft_level!].color}*/}
            {/*  />*/}
            {/*)}*/}
          </div>
          <p className="mt-2 text-sm">
            Birthday:&nbsp;{gamerInfo?.birthday ? dayjs(gamerInfo.birthday).format('YYYY/MM/DD') : '--'}
          </p>
          <p className="mt-6 text-sm">Power Level</p>
          <div className="text-gradient-yellow text-5xl font-bold">1,024,25</div>
          <div className="mt-5">
            <TokenStatus data={tokenStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}
