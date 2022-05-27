import React, { RefObject, useEffect } from 'react';
import { usePrevious } from 'react-use';

export const useClickScroll = (ref: RefObject<HTMLElement>) => {
  const [count, setCount] = React.useState(0);
  const prevCount = usePrevious<number>(count);

  useEffect(() => {
    if (ref.current) {
      ref.current.scroll({ left: ref.current.scrollLeft + (count - (prevCount || 0)) * 1000, behavior: 'smooth' });
    }
  }, [count, prevCount, ref]);
  return {
    addCount: () => setCount((c) => c + 1),
    subCount: () => setCount((c) => c - 1),
  };
};
