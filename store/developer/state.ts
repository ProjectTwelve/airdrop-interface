import { atom, selector } from 'recoil';
import { AccountInfo } from '../../lib/types';

export enum NFTClaim {
  UNCLAIMED = 0,
  PENDING,
  CLAIMED,
}

export enum NFTLevel {
  ORANGE = 0,
  PURPLE,
  BLUE,
  GREEN,
}

export const tabSelectAtom = atom({
  key: 'tab_select',
  default: 0,
});

export const verifiedSteamAppAtom = atom<number[]>({
  key: 'verified_steam_app',
  default: [],
});

export const developerGameAtom = atom<AccountInfo[]>({
  key: 'developer_game',
  default: [],
});

export const claimGroupSelector = selector({
  key: 'claim_group',
  get: ({ get }) => {
    const developerGame = get(developerGameAtom);
    const filters: Record<NFTClaim, AccountInfo[]> = {
      [NFTClaim.UNCLAIMED]: [],
      [NFTClaim.PENDING]: [],
      [NFTClaim.CLAIMED]: [],
    };
    developerGame.forEach((item) => {
      filters[item.nft_claim].push(item);
    });
    return filters;
  },
});

export const claimingGameAtom = atom<AccountInfo | undefined>({
  key: 'claiming_game',
  default: undefined,
});
