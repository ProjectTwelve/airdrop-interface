import { atom } from 'recoil';
import { mockCollabList } from './mock';

export type CollabShortInfo = {
  id: string;
  name: string;
  desc: string;
  logo: string;
  startTime: string; // TODO: date format should be ISO
  endTime: string; // TODO: date format should be ISO
  whitePaperUrl?: string;
  badgeChainKey?: string;
};

export const collabListAtom = atom<CollabShortInfo[]>({
  key: 'collab_list_atom',
  default: mockCollabList,
});

export const collabLayoutIdAtom = atom<number>({
  key: 'collab_layout_id_atom',
  default: 0,
});
