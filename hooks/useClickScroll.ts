import { RefObject, useEffect } from 'react';
import { usePrevious } from 'react-use';

export const useClickScroll = (ref: RefObject<HTMLElement>, count: number) => {
  const prevCount = usePrevious<number>(count);

  useEffect(() => {
    if (ref.current) {
      ref.current.scroll({ left: ref.current.scrollLeft + (count - (prevCount || 0)) * 1000, behavior: 'smooth' });
    }
  }, [count, prevCount, ref]);
};
