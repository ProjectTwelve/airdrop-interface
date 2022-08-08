import { atom } from 'recoil';
import { CollabUserInfo } from '../../lib/types';

export const collabUserInfoAtom = atom<CollabUserInfo | null>({
  key: 'collab_user_info',
  default: null,
});
