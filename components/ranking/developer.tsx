import Image from 'next/image';
import TimeRankingItem from './TimeRankingItem';
import React from 'react';
import TokenRankingItem from './TokenRakingItem';
import Pagination from 'rc-pagination';

function DeveloperRanking() {
  return (
    <div className="px-8 py-12">
      <div className="flex gap-8">
        <div>
          <h3 className="text-sm font-medium leading-5">Total Verified Games</h3>
          <div className="ranking__box mt-3 h-[90px] w-[180px] text-center text-[32px] font-medium leading-[90px]">222</div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium leading-5">Your Ranking</h3>
          <div className="ranking__box relative mt-3 h-[90px]">
            <div className="flex h-full gap-2 py-2 px-4">
              <div className="w-[33%]">
                <div className="relative float-left mr-3 h-[72px] w-[112px] flex-none overflow-hidden rounded-2xl">
                  <Image layout="fill" alt="header" objectFit="cover" src="https://cdn.p12.games/steam/apps/570/header.jpg" />
                </div>
                <div className="mt-2 truncate">
                  <h4 className="truncate">DEAD & CELLS</h4>
                  <div className="mt-1.5 text-xs">14 Jul, 2014 9FingerGames,9Fing...</div>
                </div>
              </div>
              <div className="my-2 w-[1px] bg-[#949FA9]" />
              <div className="flex w-[33%] cursor-pointer items-center justify-center rounded-2xl text-sm hover:bg-[#7980AF]/30">
                Token Ranking <span className="pl-3 font-['D-DIN'] text-2xl font-bold">7</span>
              </div>
              <div className="my-2 w-[1px] bg-[#949FA9]" />
              <div className="flex w-[33%] cursor-pointer items-center justify-center rounded-2xl text-sm hover:bg-[#7980AF]/30">
                Time Ranking <span className="pl-3 font-['D-DIN'] text-2xl font-bold">68</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 flex gap-8 md:flex-col">
        <div className="w-full">
          <h2 className="border-b border-p12-line pb-3 text-center text-xl font-medium">Token RankList</h2>
          <div className="flex flex-col gap-4">
            <TimeRankingItem />
            <TimeRankingItem />
            <TimeRankingItem />
            <TimeRankingItem />
            <TimeRankingItem />
            <TimeRankingItem />
            <TimeRankingItem />
            <TimeRankingItem />
            <TimeRankingItem />
            <TimeRankingItem />
          </div>
          <Pagination simple total={2000} />
        </div>
        <div className="w-full">
          <h2 className="border-b border-p12-line pb-3 text-center text-xl font-medium">Latest Verify List</h2>
          <div className="flex flex-col gap-4">
            <TokenRankingItem />
            <TokenRankingItem />
            <TokenRankingItem />
            <TokenRankingItem />
            <TokenRankingItem />
            <TokenRankingItem />
            <TokenRankingItem />
            <TokenRankingItem />
            <TokenRankingItem />
            <TokenRankingItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeveloperRanking;
