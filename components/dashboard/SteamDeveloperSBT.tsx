import React from 'react';
import Tag from '@/components/tag';
import { useAccount } from 'wagmi';
import { useRecoilValue } from 'recoil';
import { DEV_BADGES, NFT_CLAIM } from '@/constants';
import { useDeveloperInfo } from '@/hooks/developer';
import { developerGameAtom } from '@/store/developer/state';
import Button from '@/components/button';

export default function SteamDeveloperSBT() {
  const { address } = useAccount();
  const games = useRecoilValue(developerGameAtom);
  useDeveloperInfo(address);
  const gameInfo = games[0];
  // const tokenStatus = useDevTokenStatus(gameInfo);

  return (
    <div className="relative h-full">
      <div className="flex gap-6 pb-20">
        <div className="w-full max-w-[232px]">
          {gameInfo?.nft_claim === NFT_CLAIM.CLAIMED ? (
            <div
              className="aspect-square bg-cover"
              style={{ backgroundImage: `url(${DEV_BADGES[gameInfo.nft_level!].asset})` }}
            />
          ) : (
            <img className="w-full" src="/img/unclaimed.webp" alt="unclaimed" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex gap-3 text-xl/5.5">
            P12 Genesis Badge
            {gameInfo && (
              <Tag size="small" value={DEV_BADGES[gameInfo.nft_level!].rarity} type={DEV_BADGES[gameInfo.nft_level!].color} />
            )}
          </div>
          <p className="mt-5 text-sm">Power Level</p>
          <div className="flex gap-1.5">
            <div className="text-4xl/9 font-bold text-gray-400">0</div>
            <img className="w-7" src="/svg/warning.svg" alt="warning" />
          </div>
          <div className="mt-3">
            <div className="flex cursor-pointer gap-2 rounded-lg border border-gray-550/50 bg-gray-700/30 px-3 py-3.5 text-sm font-medium">
              <img className="w-5" src="/svg/play.svg" alt="play" />
              Submit your creation in Editor Arcana
            </div>
            <p className="my-1 text-center text-sm">OR</p>
            <div className="flex cursor-pointer gap-2 rounded-lg border border-gray-550/50 bg-gray-700/30 px-3 py-3.5 text-sm font-medium">
              <img className="w-5" src="/svg/play.svg" alt="play" />
              Complete Steam auth process in airdrop
            </div>
          </div>
          {/*<div className="mt-5">*/}
          {/*  <TokenStatus data={tokenStatus} />*/}
          {/*</div>*/}
        </div>
      </div>
      <div className="absolute bottom-0 w-full px-5">
        <Button className="w-full py-4 text-gray-450" disabled>
          You are NOT eligible
        </Button>
      </div>
    </div>
  );
}
