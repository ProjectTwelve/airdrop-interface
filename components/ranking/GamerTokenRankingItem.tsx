import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';

export function GamerTokenRankingHeader() {
  return (
    <div className="flex px-4 pt-5 pb-2.5 text-xs font-medium xs:py-2">
      <p className="w-[65px]">Rank</p>
      <p className="flex-1">User Info</p>
      <p className="w-[100px] xs:hidden">Reward</p>
      <p className="w-[60px] xs:hidden">Badge</p>
    </div>
  );
}

type GamerTokenRankingItemProps = {
  hover?: boolean;
};
export default function GamerTokenRankingItem({ hover }: GamerTokenRankingItemProps) {
  return (
    <div
      className={classNames(
        'flex items-center justify-start overflow-hidden rounded-2xl bg-p12-black/80 p-4',
        hover ? 'cursor-pointer hover:bg-[#7980AF]/20' : '',
      )}
    >
      <div className="mr-4 h-[72px] w-[50px] text-center font-medium leading-[72px]">1</div>
      <div>
        <div className="float-left mr-2 h-[52px] w-[52px] flex-none overflow-hidden rounded bg-[#CEDCFF]/10">
          <img
            loading="lazy"
            src="https://avatars.cloudflare.steamstatic.com/6cfc2cdffb409479bc9551e5044b06a8c4260aa8_full.jpg"
            alt="avatar"
          />
        </div>
        <div className="float-right ml-2 flex-none rounded bg-p12-tips/20 px-2.5 pb-1.5 pt-1 xs:hidden">
          <p className="border-b border-p12-tips/30 pb-1 text-center text-xs text-p12-link">SS Games</p>
          <p className="mt-1.5 text-center text-sm leading-[18px] text-p12-link">1/2000 h</p>
        </div>
        <div className="float-right ml-2 flex-none rounded bg-p12-tips/20 px-2.5 pb-1.5 pt-1">
          <p className="border-b border-p12-tips/30 pb-1 text-center text-xs text-p12-link">Steam years</p>
          <p className="mt-1.5 text-center text-sm leading-[18px] text-p12-link">7</p>
        </div>
        <div className="overflow-hidden">
          <p className="my-0.5 truncate font-medium">LinChengzzz</p>
          <span className="whitespace-nowrap rounded bg-[#C859FF]/20 px-2 py-[1.5px] text-xs text-[#FC59FF]">SS Gamer</span>
        </div>
      </div>
      <div className="float-right mx-4 flex h-[72px] items-center justify-between gap-2 xs:hidden">
        <p className="cursor-pointer font-['D-DIN'] text-xl font-bold">?,???</p>
        <Image layout="fixed" src="/img/p12.png" width={30} height={30} alt="p12" />
      </div>
      <div className={classNames('flex-none float-right h-[72px] w-[72px] bg-[#CEDCFF]/10 xs:hidden')}>
        <img src="https://cdn1.p12.games/airdrop/img/gamer_badge_orange.png" alt="badge" />
      </div>
      <div className="clear-both" />
    </div>
  );
}
