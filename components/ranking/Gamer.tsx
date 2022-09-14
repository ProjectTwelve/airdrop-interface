import React, { useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import classNames from 'classnames';
import Pagination from 'rc-pagination';
import { useGamerRank, useGamerTimeRank, useGamerTokenRank, useGamerVerifiedCount } from '../../hooks/ranking';
import GamerTimeRankingItem, { GamerTimeRankingHeader } from './GamerTimeRankingItem';
import GamerTokenRankingItem, { GamerTokenRankingHeader } from './GamerTokenRankingItem';
import { getCountMemo } from '../../utils';
import { GAMER_NFT_LEVEL } from '../../constants';

export default function GamerRanking() {
  const { data: verified } = useGamerVerifiedCount();
  const [timeRankPage, setTimeRankPage] = useState(1);
  const [tokenRankPage, setTokenRankPage] = useState(1);
  const { address } = useAccount();
  const { data: gamerRankData } = useGamerRank(address);
  const { data: timeRankData } = useGamerTimeRank({ page: timeRankPage, size: 10 });
  const { data: tokenRankData } = useGamerTokenRank({ page: tokenRankPage, size: 10 });
  const commonCount = useMemo(
    () => (verified ? (verified.verifiedCount[4] || 0) + (verified.verifiedCount[5] || 0) : 0),
    [verified],
  );

  const levelCount = useMemo(
    () => [
      { color: 'text-[#FFAA2C]', num: verified?.verifiedCount[0] ?? 0 },
      { color: 'text-[#FC59FF]', num: verified?.verifiedCount[1] ?? 0 },
      { color: 'text-[#43BBFF]', num: verified?.verifiedCount[2] ?? 0 },
      { color: 'text-[#6EEB7A]', num: verified?.verifiedCount[3] ?? 0 },
      {
        color: 'text-[#BDC9E3]',
        num: commonCount,
      },
    ],
    [commonCount, verified?.verifiedCount],
  );
  const isInRanking = useMemo(() => !!gamerRankData?.tokenRank && gamerRankData.tokenRank <= 1000, [gamerRankData?.tokenRank]);

  const isLowLevelToken = (num?: number) => num === GAMER_NFT_LEVEL.WHITE || num === GAMER_NFT_LEVEL.REKT;

  return (
    <div className="p-8 sm:p-4">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-1 md:gap-2">
        <div>
          <h3 className="text-sm font-medium leading-5">Verified Gamers</h3>
          <div className="gradient__box mt-3 grid grid-cols-3 py-[21px] py-2 leading-[90px] 2xl:flex 2xl:items-center">
            <div className="h-[40px] w-full border-[#949FA9]/50 2xl:w-[130px] 2xl:border-r">
              <p className="h-[14px] text-center text-xs">Total</p>
              <p className="mt-1 text-center font-ddin text-xl leading-5">
                {new Intl.NumberFormat().format(verified?.total ?? 0)}
              </p>
            </div>
            {levelCount.map((item, index) => (
              <p
                key={index}
                className={classNames(
                  'h-[40px] flex-1 border-[#949FA9]/50 text-center font-ddin text-lg leading-[40px]',
                  '2xl:border-r 2xl:last:border-r-0',
                  item.color,
                )}
              >
                {new Intl.NumberFormat().format(item.num)}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium leading-5">Your Ranking</h3>
          <div className="gradient__box mt-3 h-[124px] 2xl:h-[84px]">
            <div className="flex h-full w-full flex-wrap py-2 px-4 px-2">
              <div className="flex h-[68px] basis-full items-center justify-center truncate 2xl:flex-1">
                {gamerRankData?.avatar_full && (
                  <div className="mr-3 h-[44px] w-[44px] flex-none overflow-hidden rounded bg-[#CEDCFF]/10">
                    <img src={gamerRankData.avatar_full} alt="avatar" />
                  </div>
                )}
                <div className="truncate">{gamerRankData?.person_name || 'Please login first'}</div>
              </div>
              <div className="mx-2 my-3.5 hidden w-[1px] bg-[#949FA9] 2xl:block" />
              <div
                onClick={() => {
                  isInRanking && setTokenRankPage(Math.ceil(gamerRankData!.tokenRank! / 10));
                }}
                className={classNames(
                  'flex min-h-[38px] flex-1 items-center justify-center rounded-2xl text-xs',
                  isInRanking && 'cursor-pointer hover:bg-[#7980AF]/30',
                )}
              >
                By Token Rarity
                <span className="pl-3 font-ddin text-lg font-bold">
                  {getCountMemo(gamerRankData?.tokenRank) || '--'}
                  {isLowLevelToken(gamerRankData?.nft_level) ? '+' : null}
                </span>
              </div>
              <div className="mx-2 my-3.5 hidden w-[1px] bg-[#949FA9] 2xl:block" />
              <div className="flex flex-1 items-center justify-center rounded-2xl text-xs">
                By Claim Time
                <span className="pl-3 font-ddin text-lg font-bold">{getCountMemo(gamerRankData?.timeRank) || '--'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-1 lg:gap-4 xl:gap-4">
        <div className="w-full">
          <h2 className="border-b border-p12-line pb-3 text-center text-xl font-medium">Latest</h2>
          <GamerTimeRankingHeader />
          <div className="grid gap-4">
            {timeRankData?.rankList.map((item, index) => (
              <GamerTimeRankingItem data={item} key={item.steam_id || index} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center">
            {timeRankData && timeRankData.rankLength > 10 && (
              <Pagination
                simple
                current={timeRankPage}
                total={timeRankData.rankLength}
                onChange={(page) => setTimeRankPage(page)}
              />
            )}
          </div>
        </div>
        <div className="w-full">
          <h2 className="border-b border-p12-line pb-3 text-center text-xl font-medium">Leaderboard</h2>
          <GamerTokenRankingHeader />
          <div className="grid gap-4">
            {tokenRankData?.rankList.map((item, index) => (
              <GamerTokenRankingItem data={item} key={item.steam_id || index} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center">
            {tokenRankData && tokenRankData.rankLength > 10 && (
              <Pagination
                simple
                current={tokenRankPage}
                total={tokenRankData.rankLength}
                onChange={(page) => setTokenRankPage(page)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
