import React from 'react';
import dayjs from 'dayjs';
import Tag from '@/components/tag';
import { useAccount } from 'wagmi';
import { useRecoilValue } from 'recoil';
import { DEV_BADGES, NFT_CLAIM } from '@/constants';
import { useDeveloperInfo } from '@/hooks/developer';
import { developerGameAtom } from '@/store/developer/state';
import TokenStatus from '@/components/dashboard/TokenStatus';
import { useDevTokenStatus } from '@/hooks/dashboard/useTokenStatus';

export default function SteamDeveloperSBT() {
  const { address } = useAccount();
  const games = useRecoilValue(developerGameAtom);
  useDeveloperInfo(address);
  const gameInfo = games[0];
  const tokenStatus = useDevTokenStatus(gameInfo);

  return (
    <div>
      <div className="flex gap-6">
        <div className="w-full max-w-[232px]">
          {gameInfo?.nft_claim === NFT_CLAIM.CLAIMED && (
            <div
              className="aspect-square bg-cover"
              style={{ backgroundImage: `url(${DEV_BADGES[gameInfo.nft_level!].asset})` }}
            />
          )}
        </div>
        <div className="flex-1">
          <div className="flex gap-3 text-xl/5.5">
            P12 XII-PLORER Badge
            {gameInfo && (
              <Tag size="small" value={DEV_BADGES[gameInfo.nft_level!].rarity} type={DEV_BADGES[gameInfo.nft_level!].color} />
            )}
          </div>
          <p className="mt-2 text-sm">
            Birthday:&nbsp;{gameInfo?.updatedAt ? dayjs(gameInfo.updatedAt).format('YYYY/MM/DD') : '--'}
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
