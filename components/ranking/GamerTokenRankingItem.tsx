import React, { MouseEvent } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import classNames from 'classnames';
import { GamerRankInfo } from '../../lib/types';
import { formatMinutes, openLink } from '../../utils';
import { GAMER_BADGES } from '../../constants';

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
  steamProfile?: boolean;
  data: Partial<GamerRankInfo>;
};
export default function GamerTokenRankingItem({ hover, data, steamProfile }: GamerTokenRankingItemProps) {
  const handleToSteamProfile = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    openLink('https://steamcommunity.com/profiles/' + data.steam_id);
  };

  return (
    <div
      onClick={steamProfile ? handleToSteamProfile : undefined}
      className={classNames(
        'flex items-center justify-start overflow-hidden rounded-2xl bg-p12-black/80 p-4 xs:px-2',
        hover ? 'cursor-pointer hover:bg-[#7980AF]/20' : '',
      )}
    >
      <div className="mr-4 h-[72px] w-[50px] flex-none text-center font-medium leading-[72px] xs:mr-2">{data.index}</div>
      <div>
        <div className="float-left mr-2 h-[52px] w-[52px] flex-none overflow-hidden rounded bg-[#CEDCFF]/10">
          {data.avatar_full && <img loading="lazy" src={data.avatar_full} alt="avatar" />}
        </div>
        <div className="float-right ml-2 w-[95px] flex-none rounded bg-p12-tips/20 px-2.5 pb-1.5 pt-1 xs:hidden">
          <p className="border-b border-p12-tips/30 pb-1 text-center text-xs text-p12-link">SS Games</p>
          <p className="mt-1.5 text-center text-sm leading-[18px] text-p12-link">
            {data.ss_game_count}/{formatMinutes(data.ss_game_playtime)}
          </p>
        </div>
        <div className="float-right ml-2 flex-none rounded bg-p12-tips/20 px-2.5 pb-1.5 pt-1 xs:ml-0">
          <p className="border-b border-p12-tips/30 pb-1 text-center text-xs text-p12-link">Steam year</p>
          <p className="mt-1.5 text-center text-sm leading-[18px] text-p12-link">
            {data.time_created && dayjs.unix(data.time_created).format('YYYY')}
          </p>
        </div>
        <div className="overflow-hidden">
          <p className="my-0.5 truncate font-medium">{data.person_name}</p>
          {data.ss_game_count && data.ss_game_count > 0 ? (
            <span className="whitespace-nowrap rounded bg-[#C859FF]/20 px-2 py-[1.5px] text-xs text-[#FC59FF]">SS Gamer</span>
          ) : null}
          <div className="w-48" />
        </div>
      </div>
      <div className="float-right mx-4 flex h-[72px] items-center justify-between gap-2 xs:hidden">
        <p className="cursor-pointer font-din text-xl font-bold">?,???</p>
        <Image layout="fixed" src="/img/p12.png" width={30} height={30} alt="p12" />
      </div>
      <div className={classNames('float-right h-[72px] w-[72px] flex-none xs:hidden', data.nft_level ?? 'bg-[#CEDCFF]/10')}>
        {data.nft_level !== undefined && <img src={GAMER_BADGES[data.nft_level].img} className="w-full" alt="badge" />}
      </div>
      <div className="clear-both" />
    </div>
  );
}

GamerTokenRankingItem.defaultProps = {
  hover: true,
  steamProfile: true,
};
