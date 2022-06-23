import { useEffect, useRef, useState } from 'react';
import { DEV_BADGES, DEV_NFT_LEVEL, GAMER_BADGES, GAMER_NFT_LEVEL, NFT_CLAIM } from '../constants';
import { AccountInfo, GamerInfoData } from '../lib/types';

export const useDevBadgeLoad = (game: AccountInfo) => {
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

export const useGamerBadgeLoad = (gamer?: GamerInfoData) => {
  const [state, setState] = useState<{ src: string; isLoading: boolean }>({ src: '', isLoading: false });
  const badgesRef = useRef(
    new Map<GAMER_NFT_LEVEL, boolean>([
      [GAMER_NFT_LEVEL.ORANGE, false],
      [GAMER_NFT_LEVEL.PURPLE, false],
      [GAMER_NFT_LEVEL.BLUE, false],
      [GAMER_NFT_LEVEL.GREEN, false],
      [GAMER_NFT_LEVEL.WHITE, false],
    ]),
  );

  useEffect(() => {
    if (!gamer?.credential || gamer?.nft_claim !== NFT_CLAIM.CLAIMED) return;
    const item = GAMER_BADGES[gamer?.nft_level!];
    if (badgesRef.current.get(gamer?.nft_level!)) {
      setState({ src: item.asset, isLoading: false });
      return;
    }
    setState({ src: item.asset, isLoading: true });
    const img = new Image();
    img.src = item.asset;
    img.onload = () => {
      badgesRef.current.set(gamer.nft_level!, true);
      setState({ src: item.asset, isLoading: false });
    };
  }, [gamer]);

  return state;
};
