import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion, wrap } from 'framer-motion';
import { CollabShortInfo } from '@/lib/types';
import { isMobile } from 'react-device-detect';
import { useFetchCollabList } from '@/hooks/collab';
import { LeftCircle } from '@/components/svg/LeftCircle';
import CollabListItem from '@/components/collab/CollabListItem';

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

export default function CollabSwiper() {
  const count = useMemo(() => (isMobile ? 1 : 4), []);
  const { data, isLoading } = useFetchCollabList();
  const collabList = useMemo<CollabShortInfo[]>(() => data ?? [], [data]);
  const [[swipePage, swipeDirection], setSwipePage] = useState([0, 0]);
  const index = wrap(0, Math.ceil(collabList.length / count), swipePage);
  const paginate = (newDirection: number) => {
    setSwipePage([swipePage + newDirection, newDirection]);
  };

  const list = useMemo(() => [index * count, index * count + 1, index * count + 2, index * count + 3], [count, index]);

  return (
    <div className="relative flex-1">
      <div
        onClick={() => paginate(-1)}
        className="absolute -left-[15px] top-1/2 z-10 -translate-y-1/2 select-none rounded-full backdrop-blur-lg md:left-0"
      >
        <LeftCircle size={54} color="#00000000" />
      </div>
      <div
        onClick={() => paginate(1)}
        className="absolute -right-[15px] top-1/2 z-10 -translate-y-1/2 select-none rounded-full backdrop-blur-lg md:right-0"
      >
        <LeftCircle size={54} className="rotate-180" color="#00000000" />
      </div>
      <div className="relative h-[308px] overflow-hidden">
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
            className="absolute grid h-full w-full grid-cols-2 gap-5 md:grid-cols-1"
          >
            {isLoading ? (
              <>
                <CollabListItem loading={isLoading} />
                <CollabListItem loading={isLoading} />
                <CollabListItem loading={isLoading} />
                <CollabListItem loading={isLoading} />
              </>
            ) : (
              list.map((index) =>
                collabList[index] ? <CollabListItem key={collabList[index].collabCode} data={collabList[index]} /> : null,
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
