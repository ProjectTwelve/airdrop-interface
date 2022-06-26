import React, { useState } from 'react';
import { useGamerRank, useGamerTimeRank, useGamerTokenRank, useGamerVerifiedCount } from '../../hooks/ranking';
import GamerTimeRankingItem, { GamerTimeRankingHeader } from './GamerTimeRankingItem';
import GamerTokenRankingItem, { GamerTokenRankingHeader } from './GamerTokenRankingItem';
import Pagination from 'rc-pagination';
import { useAccount } from 'wagmi';

export default function GamerRanking() {
  const { data: verified } = useGamerVerifiedCount();
  const [timeRankPage, setTimeRankPage] = useState(1);
  const [tokenRankPage, setTokenRankPage] = useState(1);
  const { data: account } = useAccount();
  const { data: gamerRankData } = useGamerRank(account?.address);
  const { data: timeRankData } = useGamerTimeRank({ page: timeRankPage, size: 10 });
  const { data: tokenRankData } = useGamerTokenRank({ page: tokenRankPage, size: 10 });

  return (
    <div className="px-8 py-12 xs:p-4">
      <div className="flex gap-8 md:flex-col md:gap-2">
        <div>
          <h3 className="text-sm font-medium leading-5">Total Verified Gamers</h3>
          <div className="gradient__box mt-3 h-[90px] w-[180px] text-center text-[32px] font-medium leading-[90px] xs:w-auto">
            {verified?.total}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium leading-5">Your Ranking</h3>
          <div className="gradient__box mt-3 h-[90px] xs:h-[150px]">
            <div className="flex h-full w-full  gap-2 py-2 px-4 xs:flex-wrap xs:gap-0 xs:px-2">
              <div className="flex h-[72px] flex-1 items-center justify-center truncate xs:basis-full">
                {gamerRankData?.avatar_full && (
                  <div className="mr-3 h-[52px] w-[52px] flex-none overflow-hidden rounded bg-[#CEDCFF]/10">
                    <img src={gamerRankData.avatar_full} alt="avatar" />
                  </div>
                )}
                <div className="truncate">{gamerRankData?.person_name || 'Please login first'}</div>
              </div>
              <div className="my-2 w-[1px] bg-[#949FA9] xs:hidden" />
              <div
                onClick={() => {
                  gamerRankData?.tokenRank && setTokenRankPage(Math.ceil(gamerRankData.tokenRank / 10));
                }}
                className="flex flex-1 cursor-pointer items-center justify-center rounded-2xl text-sm hover:bg-[#7980AF]/30"
              >
                By Token Rarity <span className="pl-3 font-['D-DIN'] text-2xl font-bold">{gamerRankData?.tokenRank || '--'}</span>
              </div>
              <div className="my-2 w-[1px] bg-[#949FA9] xs:hidden" />
              <div
                onClick={() => {
                  gamerRankData?.timeRank &&
                    setTimeRankPage(Math.ceil(((verified?.total || 0) - gamerRankData.timeRank + 1) / 10));
                }}
                className="flex flex-1 cursor-pointer items-center justify-center rounded-2xl text-sm hover:bg-[#7980AF]/30"
              >
                By Claim Time <span className="pl-3 font-['D-DIN'] text-2xl font-bold">{gamerRankData?.timeRank || '--'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 flex gap-8 md:flex-col">
        <div className="w-full">
          <h2 className="border-b border-p12-line pb-3 text-center text-xl font-medium">Latest</h2>
          <GamerTimeRankingHeader />
          <div className="flex flex-col gap-4">
            {timeRankData?.rankList.map((item, index) => (
              <GamerTimeRankingItem data={item} key={item.steam_id || index} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center">
            {verified && verified.total > 10 && (
              <Pagination simple current={timeRankPage} total={verified?.total} onChange={(page) => setTimeRankPage(page)} />
            )}
          </div>
        </div>
        <div className="w-full">
          <h2 className="border-b border-p12-line pb-3 text-center text-xl font-medium">Rankings</h2>
          <GamerTokenRankingHeader />
          <div className="flex flex-col gap-4">
            {tokenRankData?.rankList.map((item, index) => (
              <GamerTokenRankingItem data={item} key={item.steam_id || index} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center">
            {verified && verified.total > 10 && (
              <Pagination simple current={tokenRankPage} total={verified?.total} onChange={(page) => setTokenRankPage(page)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
