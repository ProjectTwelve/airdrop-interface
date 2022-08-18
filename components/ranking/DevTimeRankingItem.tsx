import React, { MouseEvent } from 'react';
import dayjs from 'dayjs';
import { DevRankInfo } from '../../lib/types';
import { openLink, getCountMemo } from '../../utils';

export function DevTimeRankingHeader() {
  return (
    <div className="flex px-4 pt-5 pb-2.5 text-xs font-medium sm:py-2">
      <p className="w-[55px]">Rank</p>
      <p className="w-[120px] sm:hidden">Timestamp</p>
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
      className="cursor-pointer overflow-hidden rounded-2xl bg-p12-black/80 p-4 hover:bg-[#7980AF]/20 sm:px-2"
    >
      <div className="float-left mr-4 h-[72px] w-[35px] text-center font-medium leading-[72px]">{getCountMemo(data.index)}</div>
      <div className="float-left mt-3 mr-4 w-[100px] break-words font-medium sm:hidden">
        <p>{data.createdAt && dayjs(data.createdAt).format('MMM D, YYYY')}</p>
        <p>{data.createdAt && dayjs(data.createdAt).format('h:mm A')}</p>
      </div>
      <div>
        <div className="relative float-left mr-3 h-[72px] w-[112px] flex-none overflow-hidden rounded-2xl bg-[#CEDCFF]/10">
          {data.header_image && (
            <img loading="lazy" className="h-full w-full object-cover" src={data.header_image} alt="header_image" />
          )}
        </div>
        <div className="truncate">
          <h4 className="truncate font-medium">{data.name}</h4>
          <div className="mt-1.5 truncate text-xs">
            {data.release_date} &nbsp;&nbsp;
            {data.developers?.toString()}
          </div>
          <div className="relative mt-1.5 flex h-[20px] flex-wrap overflow-hidden">
            {data.genres?.map((genre, index) => (
              <span key={index} className="mr-1.5 mb-0.5 rounded bg-p12-link/20 px-2 py-[1.5px] text-xs text-p12-link">
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
