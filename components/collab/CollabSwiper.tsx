import CollabListItem from '@/components/collab/CollabListItem';
import { useFetchCollabList } from '@/hooks/collab';
import { CollabShortInfo } from '@/lib/types';
import { AnimatePresence, motion, wrap } from 'framer-motion';
import { useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';

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
        className="absolute -left-[27px] top-1/2 z-10 -translate-y-1/2 select-none rounded-full backdrop-blur-lg md:left-0"
      >
        <div className="flex-center h-13.5 w-13.5 cursor-pointer rounded-full border border-gray-550 bg-gray-700/40 backdrop-blur hover:border-white">
          <img className="h-5 w-5" src="/svg/left.svg" alt="<" />
        </div>
      </div>
      <div
        onClick={() => paginate(1)}
        className="absolute -right-[27px] top-1/2 z-10 -translate-y-1/2 select-none rounded-full backdrop-blur-lg md:right-0"
      >
        <div className="flex-center h-13.5 w-13.5 cursor-pointer rounded-full border border-gray-550 bg-gray-700/40 backdrop-blur hover:border-white">
          <img className="h-5 w-5 rotate-180" src="/svg/left.svg" alt="<" />
        </div>
      </div>
      <div className="relative h-[300px] overflow-hidden">
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
            className="absolute grid h-full w-full grid-cols-2 gap-4 md:grid-cols-1"
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
