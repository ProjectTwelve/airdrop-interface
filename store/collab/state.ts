import { atom } from 'recoil';
import { CollabUserInfo } from '../../lib/types';

export const collabUserInfoAtom = atom<CollabUserInfo | null>({
  key: 'collab_user_info',
  default: null,
});

export const collabClaimModalAtom = atom<boolean>({
  key: 'collab_claim_modal',
  default: false,
});

export const collabListModalAtom = atom<boolean>({
  key: 'collab_list_modal_atom',
  default: false,
});
