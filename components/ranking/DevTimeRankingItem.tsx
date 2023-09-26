import React, { MouseEvent } from 'react';
import dayjs from 'dayjs';
import { DevRankInfo } from '../../lib/types';
import { openLink, getCountMemo } from '../../utils';

export function DevTimeRankingHeader() {
  return (
    <div className="flex px-4 pb-2.5 pt-5 text-xs font-medium sm:py-2">
      <p className="w-[50px]">Rank</p>
      <p className="w-[100px] sm:hidden">Timestamp</p>
      <p>Game</p>
    </div>
  );
}

type DevTimeRankingItemProps = {
  data: Partial<DevRankInfo>;
};
export default function DevTimeRankingItem({ data }: DevTimeRankingItemProps) {
  const handleToSteamStore = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    openLink('https://store.steampowered.com/app/' + data.appid);
  };

  return (
    <div
      onClick={handleToSteamStore}
      className="cursor-pointer overflow-hidden rounded-xl bg-gray-700/30 p-3.5 hover:bg-[#7980AF]/20 sm:px-2"
    >
      <div className="float-left mr-4 h-[60px] w-[35px] text-center text-xs font-medium leading-[60px]">
        {getCountMemo(data.index)}
      </div>
      <div className="float-left mr-4 mt-3 break-words text-xs font-medium sm:hidden 2xl:w-[80px]">
        <p>{data.createdAt && dayjs(data.createdAt).format('MMM D, YYYY')}</p>
        <p>{data.createdAt && dayjs(data.createdAt).format('h:mm A')}</p>
      </div>
      <div>
        <div className="relative float-left mr-3 h-[60px] w-[112px] flex-none overflow-hidden rounded-2xl bg-[#CEDCFF]/10">
          {data.header_image && (
            <img loading="lazy" className="h-full w-full object-cover" src={data.header_image} alt="header_image" />
          )}
        </div>
        <div className="truncate">
          <h4 className="truncate text-sm font-medium leading-4">{data.name}</h4>
          <div className="mt-1 truncate text-xs">
            {data.release_date} &nbsp;&nbsp;
            {data.developers?.toString()}
          </div>
          <div className="relative mt-1 flex h-[20px] flex-wrap overflow-hidden">
            {data.genres?.map((genre, index) => (
              <span key={index} className="mb-0.5 mr-1.5 rounded bg-blue/20 px-2 py-[1px] text-xs text-blue">
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
