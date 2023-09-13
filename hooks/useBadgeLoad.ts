import { useEffect, useRef, useState } from 'react';
import { DEV_BADGES, SBT_LEVEL, GAMER_BADGES, NFT_CLAIM } from '@/constants';
import { AccountInfo, GamerInfoData } from '@/lib/types';

export const useDevBadgeLoad = (game: AccountInfo) => {
  const [state, setState] = useState<{ src: string; isLoading: boolean }>({ src: '', isLoading: false });
  const badgesRef = useRef(
    new Map<SBT_LEVEL, boolean>([
      [SBT_LEVEL.ORANGE, false],
      [SBT_LEVEL.PURPLE, false],
      [SBT_LEVEL.BLUE, false],
      [SBT_LEVEL.GREEN, false],
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
    new Map<SBT_LEVEL, boolean>([
      [SBT_LEVEL.ORANGE, false],
      [SBT_LEVEL.PURPLE, false],
      [SBT_LEVEL.BLUE, false],
      [SBT_LEVEL.GREEN, false],
      [SBT_LEVEL.WHITE, false],
      [SBT_LEVEL.REKT, false],
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
