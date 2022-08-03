import React, { MouseEvent } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { GamerRankInfo } from '../../lib/types';
import { formatMinutes, getCountMemo, openLink } from '../../utils';

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
  data: Partial<GamerRankInfo>;
};

export default function GamerTimeRankingItem({ data }: GamerTimeRankingItemProps) {
  const handleToSteamProfile = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    openLink('https://steamcommunity.com/profiles/' + data.steam_id);
  };

  return (
    <div
      onClick={handleToSteamProfile}
      className="flex cursor-pointer items-center justify-start overflow-hidden rounded-2xl bg-p12-black/80 p-4 hover:bg-[#7980AF]/20 xs:px-2"
    >
      <div
        className={classNames(
          'mr-4 h-[72px] w-[50px] flex-none text-center font-medium leading-[72px] xs:mr-2',
          data.index && data.index >= 100000 && 'xs:text-sm xs:leading-[72px]',
        )}
      >
        {getCountMemo(data.index)}
      </div>
      <div className="mt-3 mr-4 w-[100px] flex-none break-words font-medium xs:hidden">
        <p>{data.createdAt && dayjs(data.createdAt).format('MMM D, YYYY')}</p>
        <p>{data.createdAt && dayjs(data.createdAt).format('h:mm A')}</p>
      </div>
      <div>
        <div className="float-left mr-2 h-[52px] w-[52px] flex-none overflow-hidden rounded bg-[#CEDCFF]/10">
          {data.avatar_full && <img loading="lazy" src={data.avatar_full} alt="avatar" />}
        </div>
        <div className="float-right w-[95px] rounded bg-p12-tips/20 px-2.5 pb-1.5 pt-1 xs:hidden">
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
        <div className="float-right mr-2 flex-none rounded bg-p12-tips/20 px-2.5 pb-1.5 pt-1  xs:mr-0">
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
