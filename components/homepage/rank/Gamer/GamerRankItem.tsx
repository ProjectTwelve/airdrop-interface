import React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { formatMinutes, openLink } from '@/utils';
import { GamerRankInfo } from '@/lib/types';
import { GAMER_BADGES } from '@/constants';

export function GamerRankItemHeader() {
  return (
    <div className="flex px-4 pb-2.5 pt-5 text-xs font-medium sm:py-2">
      <p className="w-[55px]">Rank</p>
      <p>User Info</p>
      <p className="flex-1 pr-8 text-right md:pr-4 2xl:pr-24">Power Level</p>
      <p className="w-10 2xl:w-[50px]">Badge</p>
    </div>
  );
}

type GamerRankItemProps = {
  data: Partial<GamerRankInfo>;
};
export default function GamerRankItem({ data }: GamerRankItemProps) {
  const handleToProfile = () => {
    openLink('/gamer/' + data.wallet_address);
  };

  return (
    <div onClick={handleToProfile} className="rank-item gap-2">
      <div className="w-7.5 flex-none text-center text-xs/11 font-medium 2xl:mr-4 2xl:w-10">{data.index}</div>
      <div className="h-11 w-11 overflow-hidden rounded bg-gray-200/10">
        {data.avatar_full && <img loading="lazy" src={data.avatar_full} alt="avatar" />}
      </div>
      <div className="overflow-hidden">
        <p className="w-20 truncate text-sm font-medium">{data.person_name}</p>
        {data.ss_game_count && data.ss_game_count > 0 ? (
          <span className="whitespace-nowrap rounded bg-purple-500/20 px-2 py-[1.5px] text-xs text-purple">SS Gamer</span>
        ) : null}
      </div>
      <div className=" rounded bg-blue-550/20 px-2 py-1">
        <p className="border-b border-blue-550/30 pb-[3px] text-center text-xs/3.5 text-blue">Steam year</p>
        <p className="mt-1 text-center text-xs/3.5 text-blue">
          {data.time_created ? dayjs.unix(data.time_created).format('YYYY') : '--'}
        </p>
      </div>
      <div className="rounded bg-blue-550/20 px-2 py-1 lg:hidden xs:hidden">
        <p className="border-b border-blue-550/30 pb-[3px] text-center text-xs/3.5 text-blue">SS Games</p>
        <p className="text-p12-lin mt-1 text-center text-xs/3.5 text-blue">
          {data.ss_game_playtime !== undefined ? data.ss_game_count + '/' + formatMinutes(data.ss_game_playtime) : '--'}
        </p>
      </div>
      <div className="flex-1 px-3 text-xl/7 font-semibold text-yellow">27368</div>
      <div className={classNames('mr-3 h-13 w-13', data.nft_level ?? 'bg-gray-200/10')}>
        {data.nft_level !== undefined && <img src={GAMER_BADGES[data.nft_level].img} className="w-full" alt="badge" />}
      </div>
    </div>
  );
}
