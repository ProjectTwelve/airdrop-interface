import React, { MouseEvent } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { GamerRankInfo } from '../../lib/types';
import { GAMER_BADGES } from '../../constants';
import { formatMinutes, getCountMemo, openLink } from '../../utils';

export function GamerTokenRankingHeader() {
  return (
    <div className="flex px-4 pt-5 pb-2.5 text-xs font-medium sm:py-2">
      <p className="w-[65px]">Rank</p>
      <p className="flex-1">User Info</p>
      <p className="w-[160px] sm:hidden lg:hidden">Badge</p>
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
      className="flex cursor-pointer items-center justify-start overflow-hidden rounded-2xl bg-p12-black/80 p-4 hover:bg-[#7980AF]/20 sm:px-2"
    >
      <div className="mr-2 h-[72px] w-[50px] flex-none text-center font-medium leading-[72px] 2xl:mr-4">
        {getCountMemo(data.index)}
      </div>
      <div className="flex-1">
        <div className="float-left mr-2 h-[52px] w-[52px] flex-none overflow-hidden rounded bg-[#CEDCFF]/10">
          {data.avatar_full && <img loading="lazy" src={data.avatar_full} alt="avatar" />}
        </div>
        <div className="float-right ml-2 w-[95px] flex-none rounded bg-p12-tips/20 px-2.5 pb-1.5 pt-1 sm:hidden lg:hidden xl:hidden">
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
        <div className="float-right ml-2 flex-none rounded bg-p12-tips/20 px-2.5 pb-1.5 pt-1 sm:hidden lg:hidden xl:hidden">
          <p className="border-b border-p12-tips/30 pb-1 text-center text-xs text-p12-link">Steam year</p>
          <p className="mt-1.5 text-center text-sm leading-[18px] text-p12-link">
            {data.time_created ? dayjs.unix(data.time_created).format('YYYY') : '--'}
          </p>
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="my-0.5 truncate font-medium">{data.person_name}</p>
          {data.ss_game_count && data.ss_game_count > 0 ? (
            <span className="whitespace-nowrap rounded bg-[#C859FF]/20 px-2 py-[1.5px] text-xs text-[#FC59FF]">SS Gamer</span>
          ) : null}
          <div className="w-48" />
        </div>
      </div>
      <div
        className={classNames(
          'float-right mx-4 h-[72px] w-[72px] flex-none sm:hidden lg:hidden',
          data.nft_level ?? 'bg-[#CEDCFF]/10',
        )}
      >
        {data.nft_level !== undefined && <img src={GAMER_BADGES[data.nft_level].img} className="w-full" alt="badge" />}
      </div>
      <div className="group float-right flex h-[72px] items-center justify-between" onClick={handleToGamerProfile}>
        <span className="pr-1 text-p12-sub group-hover:text-white lg:pr-0 lg:text-sm">Details</span>
        <svg
          className="stroke-p12-sub group-hover:stroke-white"
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
      <div className="clear-both" />
    </div>
  );
}
