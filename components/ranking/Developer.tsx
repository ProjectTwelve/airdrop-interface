import React, { useMemo, useState } from 'react';
import { wrap } from 'popmotion';
import { useAccount } from 'wagmi';
import classNames from 'classnames';
import Pagination from 'rc-pagination';
import { AnimatePresence, motion } from 'framer-motion';
import { LeftCircle } from '../svg/LeftCircle';
import DevTimeRankingItem, { DevTimeRankingHeader } from './DevTimeRankingItem';
import DevTokenRankingItem, { DevTokenRankingHeader } from './DevTokenRankingItem';
import { useDeveloperRank, useDeveloperTimeRank, useDeveloperTokenRank, useDeveloperVerifiedCount } from '../../hooks/ranking';
import { getCountMemo } from '../../utils';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

function DeveloperRanking() {
  const [[swipePage, swipeDirection], setSwipePage] = useState([0, 0]);
  const [timeRankPage, setTimeRankPage] = useState(1);
  const [tokenRankPage, setTokenRankPage] = useState(1);
  const { address } = useAccount();
  const { data: verified } = useDeveloperVerifiedCount();
  const { data: devRankData } = useDeveloperRank(address);
  const { data: timeRankData } = useDeveloperTimeRank({ page: timeRankPage, size: 10 });
  const { data: tokenRankData } = useDeveloperTokenRank({ page: tokenRankPage, size: 10 });
  const imageIndex = wrap(0, devRankData?.games.length || 0, swipePage);
  const item = useMemo(() => devRankData?.games[imageIndex], [devRankData?.games, imageIndex]);

  const paginate = (newDirection: number) => {
    setSwipePage([swipePage + newDirection, newDirection]);
  };

  return (
    <div className="p-8 sm:p-3">
      <div className="flex md:flex-col">
        <div className="mr-8 md:mr-0 md:mb-2">
          <h3 className="text-sm font-medium leading-5">Total Games</h3>
          <div className="gradient__box mt-3 h-[84px] w-[180px] text-center font-ddin text-[32px] font-medium leading-[84px] sm:w-auto">
            {new Intl.NumberFormat().format(verified?.total ?? 0)}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium leading-5">Your Ranking</h3>
          <div className="relative">
            <div
              className={classNames(
                'absolute -left-[18px] top-1/2 z-10 -translate-y-1/2 select-none',
                !devRankData?.games.length && 'hidden',
              )}
              onClick={() => paginate(-1)}
            >
              <LeftCircle />
            </div>
            <div
              className={classNames(
                'absolute -right-[18px] top-1/2 z-10 -translate-y-1/2 select-none',
                !devRankData?.games.length && 'hidden',
              )}
              onClick={() => paginate(1)}
            >
              <LeftCircle className="rotate-180" />
            </div>
            <div className="gradient__box mt-3 h-[84px] sm:h-[150px]">
              <div className="relative h-full w-full overflow-hidden">
                <AnimatePresence initial={false} custom={swipeDirection}>
                  <motion.div
                    className="absolute flex h-full w-full py-3 px-4 sm:flex-wrap sm:px-2"
                    key={swipePage}
                    custom={swipeDirection}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                  >
                    <div className="h-[60px] flex-1 sm:basis-full">
                      <div className="relative float-left mr-3 h-[60px] w-[112px] flex-none overflow-hidden rounded-2xl bg-[#CEDCFF]/10">
                        {item ? (
                          <img
                            alt="header_image"
                            loading="lazy"
                            className="h-full w-full object-cover"
                            src={item.header_image}
                          />
                        ) : (
                          <p className="text-center text-xs leading-[60px] text-p12-bg">No Game</p>
                        )}
                      </div>
                      <div className="truncate">
                        {item ? (
                          <>
                            <h4 className="mt-2 truncate">{item?.name}</h4>
                            <div className="mt-1.5 text-xs">{item?.release_date}</div>
                          </>
                        ) : (
                          <p className="font-medium leading-[60px]">NO GAME YET</p>
                        )}
                      </div>
                    </div>
                    <div className="m-2 w-[1px] bg-[#949FA9] sm:hidden" />
                    <div
                      onClick={() => {
                        item && setTokenRankPage(Math.ceil(item.tokenRank / 10));
                      }}
                      className="flex flex-1 cursor-pointer items-center justify-center rounded-2xl text-sm hover:bg-[#7980AF]/30"
                    >
                      By Token Rarity
                      <span className="pl-3 font-ddin text-2xl font-bold">{getCountMemo(item?.tokenRank) || '--'}</span>
                    </div>
                    <div className="m-2 w-[1px] bg-[#949FA9] sm:hidden" />
                    <div
                      onClick={() => {
                        item && setTimeRankPage(Math.ceil(((timeRankData?.rankLength || 0) - item.timeRank + 1) / 10));
                      }}
                      className="flex flex-1 cursor-pointer items-center justify-center rounded-2xl text-sm hover:bg-[#7980AF]/30"
                    >
                      By Claim Time
                      <span className="pl-3 font-ddin text-2xl font-bold">{getCountMemo(item?.timeRank) || '--'}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-1">
        <div className="w-full">
          <h2 className="border-b border-p12-line pb-3 text-center text-xl font-medium">Latest</h2>
          <DevTimeRankingHeader />
          <div className="grid gap-4">
            {timeRankData?.rankList.map((item, index) => (
              <DevTimeRankingItem data={item} key={item.appid || index} />
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
          <DevTokenRankingHeader />
          <div className="grid gap-4">
            {tokenRankData?.rankList.map((item, index) => (
              <DevTokenRankingItem data={item} key={item.appid || index} />
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

export default DeveloperRanking;
