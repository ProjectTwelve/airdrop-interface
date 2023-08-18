import React from 'react';
import { useAccount } from 'wagmi';
import Tag from '@/components/tag';
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
            {gamerInfo && (
              <Tag
                size="small"
                value={GAMER_BADGES[gamerInfo.nft_level!].rarity}
                type={GAMER_BADGES[gamerInfo.nft_level!].color}
              />
            )}
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
