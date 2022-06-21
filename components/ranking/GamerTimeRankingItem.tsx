import React from 'react';
import classNames from 'classnames';

export function GamerTimeRankingHeader() {
  return (
    <div className="flex px-4 pt-5 pb-2.5 text-xs font-medium xs:py-2">
      <p className="w-[65px]">Rank</p>
      <p className="w-[120px] xs:hidden">Timestamp</p>
      <p>User Info</p>
    </div>
  );
}

type GamerTimeRankingItemProps = {
  hover?: boolean;
};

export default function GamerTimeRankingItem({ hover }: GamerTimeRankingItemProps) {
  return (
    <div
      className={classNames(
        'flex items-center justify-start overflow-hidden rounded-2xl bg-p12-black/80 p-4',
        hover ? 'cursor-pointer hover:bg-[#7980AF]/20' : '',
      )}
    >
      <div className="mr-4 h-[72px] w-[50px] text-center font-medium leading-[72px]">222</div>
      <div className="mt-3 mr-4 w-[100px] break-words font-medium xs:hidden">
        <p>06/12/222</p>
        <p>14:42</p>
      </div>
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
        <div className="clear-both" />
      </div>
    </div>
  );
}
