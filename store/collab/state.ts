import { atom } from 'recoil';
import { CollabShortInfo } from '../../lib/types';

export const collabShortListAtom = atom<CollabShortInfo[] | undefined>({
  key: 'collab_short_list',
  default: undefined,
});
