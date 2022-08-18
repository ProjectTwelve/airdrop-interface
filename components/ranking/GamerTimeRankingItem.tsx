import React, { MouseEvent } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { GamerRankInfo } from '../../lib/types';
import { formatMinutes, openLink } from '../../utils';

export function GamerTimeRankingHeader() {
  return (
    <div className="flex px-4 pt-5 pb-2.5 text-xs font-medium sm:py-2">
      <p className="w-[120px] sm:hidden">Timestamp</p>
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
      className="flex cursor-pointer items-center justify-start overflow-hidden rounded-2xl bg-p12-black/80 p-4 hover:bg-[#7980AF]/20 sm:px-2"
    >
      <div className="mr-2 h-[72px] flex-none break-words pt-3 font-medium sm:hidden lg:text-sm 2xl:mr-4">
        <p>{data.createdAt && dayjs(data.createdAt).format('MMM D, YYYY')}</p>
        <p>{data.createdAt && dayjs(data.createdAt).format('h:mm A')}</p>
      </div>
      <div className="flex-1">
        <div className="float-left mr-2 h-[52px] w-[52px] flex-none overflow-hidden rounded bg-[#CEDCFF]/10">
          {data.avatar_full && <img loading="lazy" src={data.avatar_full} alt="avatar" />}
        </div>
        <div className="group float-right flex h-[55px] items-center justify-between" onClick={handleToGamerProfile}>
          <span className="hidden text-p12-sub group-hover:text-white 2xl:block">Details</span>
          <svg
            className="stroke-p12-sub pl-1 group-hover:stroke-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1376 2.875L19.625 6.36244V14V21.125H13H4.375V14V2.875H16.1376Z" strokeWidth="1.75" />
            <path d="M16.5 15H7.5" strokeWidth="1.75" />
            <path d="M16.5 10L7.5 10" strokeWidth="1.75" />
          </svg>
        </div>
        <div className="float-right mr-2  flex-none rounded bg-p12-tips/20 px-2.5 pb-1.5 pt-1 lg:hidden xs:hidden">
          <p className="border-b border-p12-tips/30 pb-1 text-center text-xs text-p12-link">SS Games</p>
          <p
            className={classNames(
              'mt-1.5 text-center leading-[18px] text-p12-link',
              data.ss_game_count !== undefined && data.ss_game_count > 10 ? 'text-xs' : 'text-sm',
            )}
          >
            {data.ss_game_playtime !== undefined ? data.ss_game_count + '/' + formatMinutes(data.ss_game_playtime) : '--'}
          </p>
        </div>
        <div className="float-right mr-2 rounded bg-p12-tips/20 px-2.5 pb-1.5 pt-1">
          <p className="border-b border-p12-tips/30 pb-1 text-center text-xs text-p12-link">Steam year</p>
          <p className="mt-1.5 text-center text-sm leading-[18px] text-p12-link">
            {data.time_created ? dayjs.unix(data.time_created).format('YYYY') : '--'}
          </p>
        </div>
        <div className="mr-2 overflow-hidden">
          <p className="my-0.5 truncate font-medium">{data.person_name}</p>
          {data.ss_game_count && data.ss_game_count > 0 ? (
            <span className="whitespace-nowrap rounded bg-[#C859FF]/20 px-2 py-[1.5px] text-xs text-[#FC59FF]">SS Gamer</span>
          ) : null}
          <div className="w-48" />
        </div>
      </div>
    </div>
  );
}
