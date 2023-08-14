import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import { DEV_BADGES } from '../../constants';
import { DevRankInfo } from '../../lib/types';
import { getCountMemo, openLink } from '../../utils';

export function DevTokenRankingHeader() {
  return (
    <div className="flex px-4 pt-5 pb-2.5 text-xs font-medium sm:py-2">
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
      className="cursor-pointer overflow-hidden rounded-xl bg-gray-800/80 p-3.5 hover:bg-[#7980AF]/20 sm:px-2"
    >
      <div className="float-left mr-4 h-[60px] w-[35px] text-center text-xs font-medium leading-[60px]">
        {getCountMemo(data.index)}
      </div>
      <div>
        <div className="relative float-left mr-3 h-[60px] w-[112px] flex-none overflow-hidden rounded-2xl bg-[#CEDCFF]/10">
          {data.header_image && (
            <img loading="lazy" className="h-full w-full object-cover" src={data.header_image} alt="header_image" />
          )}
        </div>
        <div className={classNames('float-right h-[60px] w-[60px]', data.nft_level ?? 'bg-[#CEDCFF]/10')}>
          {data.nft_level !== undefined && <img src={DEV_BADGES[data.nft_level].img} className="w-full" alt="badge" />}
        </div>
        <div className="truncate pr-4">
          <h4 className="truncate text-sm font-medium leading-4">{data.name}</h4>
          <div className="mt-1 truncate text-xs">
            {data.release_date} &nbsp;&nbsp;
            {data.developers?.toString()}
          </div>
          <div className="relative mt-1 flex h-[20px] flex-wrap overflow-hidden">
            {data.genres?.map((genre, index) => (
              <span key={index} className="mr-1.5 mb-0.5 rounded bg-blue/20 px-2 py-[1px] text-xs text-blue">
                {genre}
              </span>
            ))}
          </div>
        </div>
        <div className="clear-both"></div>
      </div>
    </div>
  );
}
