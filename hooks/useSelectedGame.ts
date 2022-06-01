import { Dispatch, useEffect, useState } from 'react';
import { AccountInfo } from '../lib/types';
import { useRecoilValue } from 'recoil';
import { developerGameAtom } from '../store/developer/state';

const initialGame = {
  name: '',
  total_reviews: 0,
  header_image: '',
  nft_claim: 0,
  nft_id: null,
  appid: 0,
  nft_level: undefined,
  credential: 0,
  updatedAt: '',
};

export const useSelectedGame = (): [AccountInfo, Dispatch<AccountInfo>] => {
  const [selectedGame, setSelectedGame] = useState<AccountInfo>(initialGame);
  const games = useRecoilValue(developerGameAtom);

  useEffect(() => {
    // Initialization selects the first game
    if (games.length) {
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
