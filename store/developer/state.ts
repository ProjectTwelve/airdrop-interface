import { atom, selector } from 'recoil';
import { AccountInfo } from '../../lib/types';

export enum DEV_NFT_CLAIM {
  UNCLAIMED = 0,
  PENDING,
  CLAIMED,
}

export enum DEV_NFT_LEVEL {
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
    const filters: Record<DEV_NFT_CLAIM, AccountInfo[]> = {
      [DEV_NFT_CLAIM.UNCLAIMED]: [],
      [DEV_NFT_CLAIM.PENDING]: [],
      [DEV_NFT_CLAIM.CLAIMED]: [],
    };
    developerGame.forEach((item) => {
      filters[item.nft_claim].push(item);
    });
    return filters;
  },
});

export const hasClaimedGameSelector = selector({
  key: 'has_claimed_game',
  get: ({ get }) => {
    const developerGame = get(developerGameAtom);
    return developerGame.some((item) => item.nft_claim !== DEV_NFT_CLAIM.UNCLAIMED);
  },
});
