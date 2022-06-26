import { atom, selector } from 'recoil';
import { AccountInfo } from '../../lib/types';
import { NFT_CLAIM } from '../../constants';

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
    const filters: Record<NFT_CLAIM, AccountInfo[]> = {
      [NFT_CLAIM.UNCLAIMED]: [],
      [NFT_CLAIM.PENDING]: [],
      [NFT_CLAIM.CLAIMED]: [],
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
    return developerGame.some((item) => item.nft_claim !== NFT_CLAIM.UNCLAIMED);
  },
});
