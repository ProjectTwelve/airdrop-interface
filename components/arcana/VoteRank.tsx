import React, { useMemo, useState } from 'react';
import ReactGA from 'react-ga4';
import { wrap } from 'popmotion';
import { isMobile } from 'react-device-detect';
import { AnimatePresence, motion } from 'framer-motion';
import { LeftCircle } from '../svg/LeftCircle';
import { useArcanaVotesRank } from '../../hooks/arcana';
import { VoteRankItem } from '../../lib/types';
import { openLink } from '../../utils';

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

function VoteRankItem({ index, data }: { index?: number; data?: VoteRankItem }) {
  const rankImage = useMemo(() => {
    if (!index) return '/img/arcana/divine.webp';
    if (index === 1) return '/img/arcana/immortal_1.webp';
    if (index === 2) return '/img/arcana/immortal_2.webp';
    if (index === 3) return '/img/arcana/immortal_3.webp';
    return '/img/arcana/divine.webp';
  }, [index]);

  const onOpenPage = () => {
    ReactGA.event({ category: 'Arcana-Rank', action: 'Click', label: index?.toString() });
    const url = window.location.origin + `/arcana/${data?.walletAddress}`;
    openLink(url);
  };

  return (
    <div
      className="omg__box h-[120px] min-w-[195px] cursor-pointer rounded-xl border border-[#6F7784]/50 backdrop-blur-lg"
      onClick={onOpenPage}
    >
      <div className="flex items-center p-4 md:justify-center">
        <div className="relative ml-1 flex h-[46px] w-[46px] items-center justify-center">
          <img className="absolute top-0 left-0" width={46} src={rankImage} alt="" />
          <p className="z-10">{index && index > 3 ? index : null}</p>
        </div>
        <div className="ml-3 flex items-center justify-center">
          <div className="h-[36px] w-[36px] overflow-hidden rounded bg-black/50">
            {data && <img width={36} height={36} src={data.avatarFull} alt="avatar" />}
          </div>
          <p className="ml-2 max-w-[90px] truncate font-medium xs:max-w-[120px]">{data?.personName}</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <p className="flex-1 text-center text-sm text-p12-gold">
          {data?.referralCount} {data && data.referralCount > 1 ? 'Invites' : 'Invite'}
        </p>
        <p className="h-[16px] w-[2px] bg-[#6F7784]/50"></p>
        <p className="flex-1 text-center text-sm text-p12-gold">
          {data?.votesTotalCurrent} {data && data.votesTotalCurrent > 1 ? 'Votes' : 'Vote'}
        </p>
      </div>
    </div>
  );
}

export default function VoteRank() {
  const count = isMobile ? 1 : 3;
  const { data } = useArcanaVotesRank();
  const voteRankList = useMemo<VoteRankItem[]>(() => data ?? [], [data]);
  const [[swipePage, swipeDirection], setSwipePage] = useState([0, 0]);
  const index = wrap(0, voteRankList.length / count, swipePage);
  const paginate = (newDirection: number) => {
    setSwipePage([swipePage + newDirection, newDirection]);
  };

  return (
    <div className="relative flex-1">
      <div
        onClick={() => paginate(-1)}
        className="absolute -left-[18px] top-1/2 z-10 -translate-y-1/2 select-none rounded-full backdrop-blur-lg md:left-0"
      >
        <LeftCircle color="#00000000" />
      </div>
      <div
        onClick={() => paginate(1)}
        className="absolute -right-[18px] top-1/2 z-10 -translate-y-1/2 select-none rounded-full backdrop-blur-lg md:right-0"
      >
        <LeftCircle className="rotate-180" color="#00000000" />
      </div>
      <div className="relative h-[120px] overflow-hidden">
        <AnimatePresence initial={false} custom={swipeDirection}>
          <motion.div
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
            className="absolute grid h-full w-full grid-cols-3 gap-5 md:grid-cols-1"
          >
            <VoteRankItem data={voteRankList[index * count]} index={index * count + 1} />
            <VoteRankItem data={voteRankList[index * count + 1]} index={index * count + 2} />
            <VoteRankItem data={voteRankList[index * count + 2]} index={index * count + 3} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
