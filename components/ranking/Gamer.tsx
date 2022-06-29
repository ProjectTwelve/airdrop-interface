import React, { useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import classNames from 'classnames';
import Pagination from 'rc-pagination';
import { useGamerRank, useGamerTimeRank, useGamerTokenRank, useGamerVerifiedCount } from '../../hooks/ranking';
import GamerTimeRankingItem, { GamerTimeRankingHeader } from './GamerTimeRankingItem';
import GamerTokenRankingItem, { GamerTokenRankingHeader } from './GamerTokenRankingItem';

export default function GamerRanking() {
  const { data: verified } = useGamerVerifiedCount();
  const [timeRankPage, setTimeRankPage] = useState(1);
  const [tokenRankPage, setTokenRankPage] = useState(1);
  const { data: account } = useAccount();
  const { data: gamerRankData } = useGamerRank(account?.address);
  const { data: timeRankData } = useGamerTimeRank({ page: timeRankPage, size: 10 });
  const { data: tokenRankData } = useGamerTokenRank({ page: tokenRankPage, size: 10 });
  const totalNums = useMemo(
    () => [
      { color: 'text-[#FFAA2C]', num: 1000 },
      { color: 'text-[#FC59FF]', num: 300 },
      { color: 'text-[#43BBFF]', num: 800 },
      { color: 'text-[#1EDB8C]', num: 8888 },
      { color: 'text-[#BDC9E3]', num: 7777 },
    ],
    [],
  );

  return (
    <div className="px-8 py-12 xs:p-4">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-1 md:gap-2">
        <div>
          <h3 className="text-sm font-medium leading-5">Verified Gamers</h3>
          <div className="gradient__box mt-3 grid grid-cols-3 py-2 leading-[90px] tablet:flex tablet:items-center tablet:py-[17px]">
            <div className="h-[54px] border-[#949FA9] tablet:w-[130px] tablet:border-r">
              <p className="h-[16px] text-center text-sm">Total</p>
              <p className="mt-1 text-center font-din text-[32px] leading-[32px]">150000</p>
            </div>
            {totalNums.map((item, index) => (
              <p
                key={index}
                className={classNames(
                  'h-[54px] flex-1 border-[#949FA9]/50 text-center font-din text-2xl leading-[54px]',
                  'last:border-0 tablet:h-auto tablet:border-r tablet:leading-6',
                  item.color,
                )}
              >
                {item.num}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium leading-5">Your Ranking</h3>
          <div className="gradient__box mt-3 h-[90px] xs:h-[150px]">
            <div className="flex h-full w-full py-2 px-4 xs:flex-wrap xs:px-2">
              <div className="flex h-[72px] flex-1 items-center justify-center truncate xs:basis-full">
                {gamerRankData?.avatar_full && (
                  <div className="mr-3 h-[52px] w-[52px] flex-none overflow-hidden rounded bg-[#CEDCFF]/10">
                    <img src={gamerRankData.avatar_full} alt="avatar" />
                  </div>
                )}
                <div className="truncate">{gamerRankData?.person_name || 'Please login first'}</div>
              </div>
              <div className="m-2 w-[1px] bg-[#949FA9] xs:hidden" />
              <div
                onClick={() => {
                  gamerRankData?.tokenRank && setTokenRankPage(Math.ceil(gamerRankData.tokenRank / 10));
                }}
                className="flex flex-1 cursor-pointer items-center justify-center rounded-2xl text-sm hover:bg-[#7980AF]/30"
              >
                By Token Rarity <span className="pl-3 font-din text-2xl font-bold">{gamerRankData?.tokenRank || '--'}</span>
              </div>
              <div className="m-2 w-[1px] bg-[#949FA9] xs:hidden" />
              <div
                onClick={() => {
                  gamerRankData?.timeRank &&
                    setTimeRankPage(Math.ceil(((verified?.total || 0) - gamerRankData.timeRank + 1) / 10));
                }}
                className="flex flex-1 cursor-pointer items-center justify-center rounded-2xl text-sm hover:bg-[#7980AF]/30"
              >
                By Claim Time <span className="pl-3 font-din text-2xl font-bold">{gamerRankData?.timeRank || '--'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-1">
        <div className="w-full">
          <h2 className="border-b border-p12-line pb-3 text-center text-xl font-medium">Latest</h2>
          <GamerTimeRankingHeader />
          <div className="grid gap-4">
            {timeRankData?.rankList.map((item) => (
              <GamerTimeRankingItem data={item} key={item.steam_id} />
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
          <h2 className="border-b border-p12-line pb-3 text-center text-xl font-medium">Rankings</h2>
          <GamerTokenRankingHeader />
          <div className="grid gap-4">
            {tokenRankData?.rankList.map((item) => (
              <GamerTokenRankingItem data={item} key={item.steam_id} />
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
