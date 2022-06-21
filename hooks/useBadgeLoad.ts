import { useEffect, useRef, useState } from 'react';
import { DEV_NFT_LEVEL } from '../store/developer/state';
import { DEV_BADGES } from '../constants';
import { AccountInfo } from '../lib/types';

export const useBadgeLoad = (game: AccountInfo) => {
  const [state, setState] = useState<{ src: string; isLoading: boolean }>({ src: '', isLoading: false });
  const badgesRef = useRef(
    new Map<DEV_NFT_LEVEL, boolean>([
      [DEV_NFT_LEVEL.ORANGE, false],
      [DEV_NFT_LEVEL.PURPLE, false],
      [DEV_NFT_LEVEL.BLUE, false],
      [DEV_NFT_LEVEL.GREEN, false],
    ]),
  );

  useEffect(() => {
    if (!game.appid) return;
    const item = DEV_BADGES[game.nft_level];
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
