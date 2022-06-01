import { useEffect, useRef, useState } from 'react';
import { NFTLevel } from '../store/developer/state';
import { BADGES } from '../constants';

export const useBadgeLoad = (badgeLevel?: NFTLevel) => {
  const [state, setState] = useState<{ src: string; isLoading: boolean }>({ src: '', isLoading: false });
  const badgesRef = useRef(
    new Map<NFTLevel, boolean>([
      [NFTLevel.ORANGE, false],
      [NFTLevel.PURPLE, false],
      [NFTLevel.BLUE, false],
      [NFTLevel.GREEN, false],
    ]),
  );

  useEffect(() => {
    if (badgeLevel === undefined) return;
    const item = BADGES[badgeLevel];
    if (badgesRef.current.get(badgeLevel)) {
      setState({ src: item.asset, isLoading: false });
      return;
    }
    setState({ src: item.asset, isLoading: true });
    const img = new Image();
    img.src = item.asset;
    img.onload = () => {
      badgesRef.current.set(badgeLevel, true);
      setState({ src: item.asset, isLoading: false });
    };
  }, [badgeLevel]);

  return state;
};
