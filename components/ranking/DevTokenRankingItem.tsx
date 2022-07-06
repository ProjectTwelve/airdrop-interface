import Image from 'next/image';
import { DEV_BADGES } from '../../constants';
import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import { DevRankInfo } from '../../lib/types';
import { getCountMemo, openLink } from '../../utils';

export function DevTokenRankingHeader() {
  return (
    <div className="flex px-4 pt-5 pb-2.5 text-xs font-medium xs:py-2">
      <p className="w-[55px]">Rank</p>
      <p className="flex-1">Game</p>
      <p className="w-[100px] xs:hidden">Reward</p>
      <p className="w-[60px] xs:hidden">Badge</p>
    </div>
  );
}

type DevDevTokenRankingItemProps = {
  hover?: boolean;
  steamStore?: boolean;
  data: Partial<DevRankInfo>;
};
export default function DevTokenRankingItem({ hover, data, steamStore }: DevDevTokenRankingItemProps) {
  const handleToSteamStore = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    openLink('https://store.steampowered.com/app/' + data.appid);
  };

  return (
    <div
      onClick={steamStore ? handleToSteamStore : undefined}
      className={classNames(
        'overflow-hidden rounded-2xl bg-p12-black/80 p-4 xs:px-2',
        hover ? 'cursor-pointer hover:bg-[#7980AF]/20' : '',
      )}
    >
      <div className="float-left mr-4 h-[72px] w-[35px] text-center font-medium leading-[72px]">{getCountMemo(data.index)}</div>
      <div>
        <div className="relative float-left mr-3 h-[72px] w-[112px] flex-none overflow-hidden rounded-2xl bg-[#CEDCFF]/10">
          {data.header_image && (
            <img loading="lazy" className="h-full w-full object-cover" src={data.header_image} alt="header_image" />
          )}
        </div>
        <div className={classNames('float-right h-[72px] w-[72px] xs:hidden', data.nft_level ?? 'bg-[#CEDCFF]/10')}>
          {data.nft_level !== undefined && <img src={DEV_BADGES[data.nft_level].img} className="w-full" alt="badge" />}
        </div>
        <div className="float-right mx-4 flex h-[72px] items-center justify-between xs:hidden">
          <p className="cursor-pointer mr-2 font-din text-xl font-bold">?,???</p>
          <Image src="/img/p12.png" width={30} height={30} alt="p12" />
        </div>
        <div className="truncate">
          <h4 className="truncate font-medium">{data.name}</h4>
          <div className="mt-1.5 truncate text-xs">
            {data.release_date} &nbsp;&nbsp;
            {data.developers?.toString()}
          </div>
          <div className="relative mt-1.5 flex h-[20px] flex-wrap">
            {data.genres?.map((genre, index) => (
              <span key={index} className="rounded bg-p12-link/20 px-2 py-[1.5px] mr-1.5 text-xs text-p12-link">
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

DevTokenRankingItem.defaultProps = {
  hover: true,
  steamStore: true,
};
