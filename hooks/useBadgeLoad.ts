import { useEffect, useRef, useState } from 'react';
import { DEV_BADGES, GenesisRarity, GAMER_BADGES, GenesisClaim } from '@/constants';
import { AccountInfo, GamerInfoData } from '@/lib/types';

export const useDevBadgeLoad = (game: AccountInfo) => {
  const [state, setState] = useState<{ src: string; isLoading: boolean }>({ src: '', isLoading: false });
  const badgesRef = useRef(
    new Map<GenesisRarity, boolean>([
      [GenesisRarity.Legendary, false],
      [GenesisRarity.Epic, false],
      [GenesisRarity.Rekt, false],
      [GenesisRarity.Uncommon, false],
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
    new Map<GenesisRarity, boolean>([
      [GenesisRarity.Legendary, false],
      [GenesisRarity.Epic, false],
      [GenesisRarity.Rare, false],
      [GenesisRarity.Uncommon, false],
      [GenesisRarity.Common, false],
      [GenesisRarity.Rare, false],
    ]),
  );

  useEffect(() => {
    if (!gamer?.credential || gamer?.nft_claim !== GenesisClaim.Claimed) return;
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
