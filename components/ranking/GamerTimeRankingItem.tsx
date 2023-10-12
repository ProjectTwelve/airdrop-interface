import React, { MouseEvent } from 'react';
import dayjs from 'dayjs';
import { GamerRankInfo } from '../../lib/types';
import { formatMinutes, openLink } from '../../utils';

export function GamerTimeRankingHeader() {
  return (
    <div className="flex border-b border-[#2E2E31] px-2 pb-3 pt-5 text-xs font-medium sm:py-2">
      <p className="w-[90px] text-left sm:hidden">Timestamp</p>
      <p>User Info</p>
    </div>
  );
}

type GamerTimeRankingItemProps = {
  data: Partial<GamerRankInfo>;
};

export default function GamerTimeRankingItem({ data }: GamerTimeRankingItemProps) {
  const handleToSteamProfile = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    openLink('https://steamcommunity.com/profiles/' + data.steam_id);
  };

  const handleToGamerProfile = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    openLink('/gamer/' + data.wallet_address);
  };

  return (
    <div
      onClick={handleToSteamProfile}
      className="flex cursor-pointer items-center justify-start overflow-hidden border-b border-[#2E2E31] px-3 py-[14px] hover:bg-white/5 sm:px-2"
    >
      <div className="mr-2 h-[44px] flex-none break-words pt-1 text-xs font-medium sm:hidden 2xl:mr-4">
        <p>{data.createdAt && dayjs(data.createdAt).format('MMM D, YYYY')}</p>
        <p>{data.createdAt && dayjs(data.createdAt).format('h:mm A')}</p>
      </div>
      <div className="flex-1">
        <div className="float-left mr-2 h-[44px] w-[44px] flex-none overflow-hidden rounded bg-[#CEDCFF]/10">
          {data.avatar_full && <img loading="lazy" src={data.avatar_full} alt="avatar" />}
        </div>
        <div className="group float-right flex h-[44px] items-center justify-between" onClick={handleToGamerProfile}>
          <span className="hidden text-xs text-gray group-hover:text-white 2xl:block">Details</span>
          <svg
            className="ml-0.5 stroke-gray group-hover:stroke-white"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1376 2.875L19.625 6.36244V14V21.125H13H4.375V14V2.875H16.1376Z" strokeWidth="1.75" />
            <path d="M16.5 15H7.5" strokeWidth="1.75" />
            <path d="M16.5 10L7.5 10" strokeWidth="1.75" />
          </svg>
        </div>
        <div className="float-right mr-2 rounded bg-blue-550/20 px-2 py-1 lg:hidden xs:hidden">
          <p className="border-b border-blue-550/30 pb-[3px] text-center text-xs leading-[14px] text-blue">SS Games</p>
          <p className="mt-1 text-center text-xs leading-[14px] text-blue">
            {data.ss_game_playtime !== undefined ? data.ss_game_count + '/' + formatMinutes(data.ss_game_playtime) : '--'}
          </p>
        </div>
        <div className="float-right mr-2 rounded bg-blue-550/20 px-2 py-1">
          <p className="border-b border-blue-550/30 pb-[3px] text-center text-xs leading-[14px] text-blue">Steam year</p>
          <p className="mt-1 text-center text-xs leading-[14px] text-blue">
            {data.time_created ? dayjs.unix(data.time_created).format('YYYY') : '--'}
          </p>
        </div>
        <div className="mr-2 overflow-hidden">
          <p className="truncate text-sm font-medium">{data.person_name}</p>
          {data.ss_game_count && data.ss_game_count > 0 ? (
            <span className="whitespace-nowrap rounded bg-[#C859FF]/20 px-2 py-[1.5px] text-xs text-[#FC59FF]">SS Gamer</span>
          ) : null}
          <div className="w-48" />
        </div>
      </div>
    </div>
  );
}
