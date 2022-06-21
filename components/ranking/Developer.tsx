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
  const { data: account } = useAccount();
  const { data: verified } = useDeveloperVerifiedCount();
  const { data: developerRankData } = useDeveloperRank(account?.address);
  const { data: timeRankData } = useDeveloperTimeRank({ page: timeRankPage, size: 10 });
  const { data: tokenRankData } = useDeveloperTokenRank({ page: tokenRankPage, size: 10 });
  const imageIndex = wrap(0, developerRankData?.games.length || 0, swipePage);
  const item = useMemo(() => developerRankData?.games[imageIndex], [developerRankData?.games, imageIndex]);

  const paginate = (newDirection: number) => {
    setSwipePage([swipePage + newDirection, newDirection]);
  };

  return (
    <div className="px-8 py-12 xs:p-4">
      <div className="flex gap-8 md:flex-col md:gap-2">
        <div>
          <h3 className="text-sm font-medium leading-5">Total Verified Games</h3>
          <div className="ranking__box mt-3 h-[90px] w-[180px] text-center text-[32px] font-medium leading-[90px] xs:w-auto">
            {verified?.total}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium leading-5">Your Ranking</h3>
          <div className="ranking__box mt-3 h-[90px] xs:h-[150px]">
            <div
              className={classNames(
                'absolute -left-[18px] top-1/2 z-10 -translate-y-1/2 select-none',
                !developerRankData?.games.length && 'hidden',
              )}
              onClick={() => paginate(-1)}
            >
              <LeftCircle />
            </div>
            <div
              className={classNames(
                'absolute -right-[18px] top-1/2 z-10 -translate-y-1/2 select-none',
                !developerRankData?.games.length && 'hidden',
              )}
              onClick={() => paginate(1)}
            >
              <LeftCircle className="rotate-180" />
            </div>
            <div className="relative h-full w-full overflow-hidden">
              <AnimatePresence initial={false} custom={swipeDirection}>
                <motion.div
                  className="absolute flex h-full w-full gap-2 py-2 px-4 xs:flex-wrap xs:gap-0 xs:px-2"
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
                  <div className="h-[72px] flex-1 xs:basis-full">
                    <div className="relative float-left mr-3 h-[72px] w-[112px] flex-none overflow-hidden rounded-2xl bg-[#CEDCFF]/10">
                      {item ? (
                        <img alt="header_image" loading="lazy" className="h-full w-full object-cover" src={item.header_image} />
                      ) : (
                        <p className="text-center text-xs leading-[72px] text-p12-bg">No Game</p>
                      )}
                    </div>
                    <div className="truncate">
                      {item ? (
                        <>
                          <h4 className="mt-2 truncate">{item?.name}</h4>
                          <div className="mt-1.5 text-xs">{item?.release_date}</div>
                        </>
                      ) : (
                        <p className="font-medium leading-[72px]">NO GAME YET</p>
                      )}
                    </div>
                  </div>
                  <div className="my-2 w-[1px] bg-[#949FA9] xs:hidden" />
                  <div
                    onClick={() => {
                      item && setTokenRankPage(Math.floor((item.tokenRank - 1) / 10) + 1);
                    }}
                    className="flex flex-1 cursor-pointer items-center justify-center rounded-2xl text-sm hover:bg-[#7980AF]/30"
                  >
                    Token Ranking <span className="pl-3 font-['D-DIN'] text-2xl font-bold">{item?.tokenRank || '--'}</span>
                  </div>
                  <div className="my-2 w-[1px] bg-[#949FA9] xs:hidden" />
                  <div
                    onClick={() => {
                      item && setTimeRankPage(Math.floor(((verified?.total || 0) - item.timeRank) / 10) + 1);
                    }}
                    className="flex flex-1 cursor-pointer items-center justify-center rounded-2xl text-sm hover:bg-[#7980AF]/30"
                  >
                    Time Ranking <span className="pl-3 font-['D-DIN'] text-2xl font-bold">{item?.timeRank || '--'}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 flex gap-8 md:flex-col">
        <div className="w-full">
          <h2 className="border-b border-p12-line pb-3 text-center text-xl font-medium">Latest Verify List</h2>
          <DevTimeRankingHeader />
          <div className="flex flex-col gap-4">
            {timeRankData?.rankList.map((item, index) => (
              <DevTimeRankingItem data={item} key={item.appid || index} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center">
            {verified && verified.total > 10 && (
              <Pagination simple current={timeRankPage} total={verified?.total} onChange={(page) => setTimeRankPage(page)} />
            )}
          </div>
        </div>
        <div className="w-full">
          <h2 className="border-b border-p12-line pb-3 text-center text-xl font-medium">Token RankList</h2>
          <DevTokenRankingHeader />
          <div className="flex flex-col gap-4">
            {tokenRankData?.rankList.map((item, index) => (
              <DevTokenRankingItem data={item} key={item.appid || index} />
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

export default DeveloperRanking;
