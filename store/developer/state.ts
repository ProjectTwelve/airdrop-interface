import { atom, selector } from 'recoil';
import { AccountInfo } from '../../lib/types';
import { GenesisClaim } from '../../constants';

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
    const filters: Record<GenesisClaim, AccountInfo[]> = {
      [GenesisClaim.Unclaimed]: [],
      [GenesisClaim.Pending]: [],
      [GenesisClaim.Claimed]: [],
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
    return developerGame.some((item) => item.nft_claim !== GenesisClaim.Unclaimed);
  },
});
