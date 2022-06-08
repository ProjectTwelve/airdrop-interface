import { useEffect, useRef, useState } from 'react';
import { NFTLevel } from '../store/developer/state';
import { BADGES } from '../constants';
import { AccountInfo } from '../lib/types';

export const useBadgeLoad = (game: AccountInfo) => {
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
    if (!game.appid) return;
    const item = BADGES[game.nft_level];
    if (badgesRef.current.get(game.nft_level)) {
      setState({ src: item.asset, isLoading: false });
      return;
    }
    setState({ src: item.asset, isLoading: true });
    const img = new Image();
    img.src = item.asset;
    img.onload = () => {
      badgesRef.current.set(game.nft_level, true);
      setState({ src: item.asset, isLoading: false });
    };
  }, [game]);

  return state;
};
