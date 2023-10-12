import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import { DEV_BADGES } from '../../constants';
import { DevRankInfo } from '../../lib/types';
import { getCountMemo, openLink } from '../../utils';

export function DevTokenRankingHeader() {
  return (
    <div className="flex border-b border-[#2E2E31] px-4 pb-3 pt-5 text-xs font-medium sm:py-2">
      <p className="w-[55px]">Rank</p>
      <p className="flex-1">Game</p>
      <p className="w-[50px]">Badge</p>
    </div>
  );
}

type DevDevTokenRankingItemProps = {
  data: Partial<DevRankInfo>;
};
export default function DevTokenRankingItem({ data }: DevDevTokenRankingItemProps) {
  const handleToSteamStore = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    openLink('https://store.steampowered.com/app/' + data.appid);
  };

  return (
    <div
      onClick={handleToSteamStore}
      className="flex cursor-pointer items-center justify-start overflow-hidden border-b border-[#2E2E31] px-3 py-3.5 hover:bg-white/5 sm:px-2"
    >
      <div className="mr-2 w-[30px] flex-none text-center text-xs font-medium leading-[44px] 2xl:mr-4 2xl:w-[40px]">
        {getCountMemo(data.index)}
      </div>
      <div className="flex-1">
        <div className="relative float-left mr-3 h-11 flex-none overflow-hidden rounded bg-[#CEDCFF]/10">
          {data.header_image && (
            <img loading="lazy" className="h-full w-full object-cover" src={data.header_image} alt="header_image" />
          )}
        </div>
        <div className={classNames('float-right h-11 w-11', data.nft_level ?? 'bg-[#CEDCFF]/10')}>
          {data.nft_level !== undefined && <img src={DEV_BADGES[data.nft_level].img} className="w-full" alt="badge" />}
        </div>
        <div className="truncate pr-4">
          <h4 className="flex items-center gap-3 text-sm font-semibold">
            <span className="truncate">{data.name}</span>
            <div className="relative mt-1 flex h-[20px] flex-wrap overflow-hidden">
              {data.genres?.map((genre, index) => (
                <span key={index} className="mb-0.5 mr-1.5 rounded bg-blue/20 px-2 py-[1px] text-xs text-blue">
                  {genre}
                </span>
              ))}
            </div>
          </h4>
          <div className="mt-1 truncate text-xs">
            {data.release_date} &nbsp;&nbsp;
            {data.developers?.toString()}
          </div>
        </div>
        <div className="clear-both"></div>
      </div>
    </div>
  );
}
