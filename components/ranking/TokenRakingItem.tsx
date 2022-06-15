import Image from 'next/image';
import { BADGES } from '../../constants';
import React from 'react';
import classNames from 'classnames';

type TokenRankingItemProps = {
  hover?: boolean;
};
export default function TokenRankingItem({ hover }: TokenRankingItemProps) {
  return (
    <div className={classNames('overflow-hidden rounded-2xl bg-p12-black/80 p-4', hover ? 'hover:bg-[#7980AF]/20' : '')}>
      <div className="float-left mr-4 w-[40px] text-center font-medium leading-[72px]">1</div>
      <div>
        <div className="relative float-left mr-3 h-[72px] w-[112px] flex-none overflow-hidden rounded-2xl">
          <Image layout="fill" alt="header" objectFit="cover" src="https://cdn.p12.games/steam/apps/570/header.jpg" />
        </div>
        <div className="float-right">
          <img src={BADGES[0].img} className="w-[72px]" alt="badge" />
        </div>
        <div className="float-right mx-4 flex h-[72px] items-center justify-between gap-2">
          <p className="cursor-pointer font-['D-DIN'] text-xl font-bold">?,???</p>
          <Image src="/img/p12.png" width={30} height={30} alt="p12" />
        </div>
        <div className="truncate">
          <h4 className="truncate font-medium">Symphony of War: The Nephilim Saga</h4>
          <div className="mt-1.5 truncate text-xs">14 Jul, 2014 9FingerGames,9FingerGames...</div>
          <div className="relative mt-1.5 flex h-[20px] flex-wrap gap-1.5">
            <span className="rounded bg-p12-link/20 px-2 py-[1.5px] text-xs text-p12-link">Multi-player</span>
            <span className="rounded bg-p12-link/20 px-2 py-[1.5px] text-xs text-p12-link">PvP</span>
            <span className="rounded bg-p12-link/20 px-2 py-[1.5px] text-xs text-p12-link">Online</span>
            <span className="rounded bg-p12-link/20 px-2 py-[1.5px] text-xs text-p12-link">Action</span>
          </div>
        </div>
        <div className="clear-both"></div>
      </div>
    </div>
  );
}

TokenRankingItem.defaultProps = {
  hover: true,
};
