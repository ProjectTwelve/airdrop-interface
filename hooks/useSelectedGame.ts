/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, useEffect, useState } from 'react';
import { AccountInfo } from '@/lib/types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { developerGameAtom, verifiedSteamAppAtom } from '@/store/developer/state';

export const initialGame = {
  name: '',
  total_reviews: 0,
  header_image: '',
  nft_claim: 0,
  nft_id: undefined,
  appid: 0,
  nft_level: 0,
  credential: 0,
  updatedAt: '',
};

export const useSelectedGame = (): [AccountInfo, Dispatch<AccountInfo>] => {
  const [selectedGame, setSelectedGame] = useState<AccountInfo>(initialGame);
  const games = useRecoilValue(developerGameAtom);
  const [verifiedSteamApp, setVerifiedSteamApp] = useRecoilState(verifiedSteamAppAtom);

  useEffect(() => {
    // Initialization selects the first game
    if (games.length) {
      // is verified app
      if (verifiedSteamApp.length) {
        const verifiedGame = games.find((game) => verifiedSteamApp.includes(game.appid));
        if (verifiedGame) {
          setSelectedGame(verifiedGame);
          setVerifiedSteamApp([]);
        }
        return;
      }
      if (!selectedGame.appid) {
        setSelectedGame(games[0]);
      } else {
        const game = games.find((g) => g.appid === selectedGame.appid);
        if (game) {
          setSelectedGame(game);
        }
      }
    } else {
      setSelectedGame(initialGame);
    }
  }, [games, selectedGame]);

  return [selectedGame, setSelectedGame];
};
