import React, { MouseEvent } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { GamerRankInfo } from '../../lib/types';
import { GAMER_BADGES } from '../../constants';
import { formatMinutes, getCountMemo, openLink } from '../../utils';

export function GamerTokenRankingHeader() {
  return (
    <div className="flex px-4 pt-5 pb-2.5 text-xs font-medium sm:py-2">
      <p className="w-[55px]">Rank</p>
      <p className="flex-1">User Info</p>
      <p className="w-[70px] 2xl:w-[120px]">Badge</p>
    </div>
  );
}

type GamerTokenRankingItemProps = {
  data: Partial<GamerRankInfo>;
};
export default function GamerTokenRankingItem({ data }: GamerTokenRankingItemProps) {
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
      className="flex cursor-pointer items-center justify-start overflow-hidden rounded-2xl bg-gray-800/80 px-3 py-[10px] hover:bg-[#7980AF]/20 sm:px-2"
    >
      <div className="mr-2 w-[30px] flex-none text-center text-xs font-medium leading-[44px] 2xl:mr-4 2xl:w-[40px]">
        {getCountMemo(data.index)}
      </div>
      <div className="flex-1">
        <div className="float-left mr-2 h-[44px] w-[44px] flex-none overflow-hidden rounded bg-[#CEDCFF]/10">
          {data.avatar_full && <img loading="lazy" src={data.avatar_full} alt="avatar" />}
        </div>
        <div className="float-right ml-2 flex-none rounded bg-blue-550/20 py-1 px-2 lg:hidden xs:hidden">
          <p className="border-b border-blue-550/30 pb-[3px] text-center text-xs leading-[14px] text-blue">SS Games</p>
          <p className="text-p12-lin mt-1 text-center text-xs leading-[14px] text-blue">
            {data.ss_game_playtime !== undefined ? data.ss_game_count + '/' + formatMinutes(data.ss_game_playtime) : '--'}
          </p>
        </div>
        <div className="float-right ml-2 rounded bg-blue-550/20 py-1 px-2">
          <p className="border-b border-blue-550/30 pb-[3px] text-center text-xs leading-[14px] text-blue">Steam year</p>
          <p className="mt-1 text-center text-xs leading-[14px] text-blue">
            {data.time_created ? dayjs.unix(data.time_created).format('YYYY') : '--'}
          </p>
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="truncate text-sm font-medium">{data.person_name}</p>
          {data.ss_game_count && data.ss_game_count > 0 ? (
            <span className="whitespace-nowrap rounded bg-[#C859FF]/20 px-2 py-[1.5px] text-xs text-[#FC59FF]">SS Gamer</span>
          ) : null}
          <div className="w-48" />
        </div>
      </div>
      <div
        className={classNames(
          'float-right ml-1.5 mr-0 h-[52px] w-[52px] flex-none 2xl:mx-4',
          data.nft_level ?? 'bg-[#CEDCFF]/10',
        )}
      >
        {data.nft_level !== undefined && <img src={GAMER_BADGES[data.nft_level].img} className="w-full" alt="badge" />}
      </div>
      <div className="group float-right flex items-center justify-between" onClick={handleToGamerProfile}>
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
      <div className="clear-both" />
    </div>
  );
}
