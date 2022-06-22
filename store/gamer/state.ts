import { atom } from 'recoil';
import { GamerInfoData } from '../../lib/types';

export const gamerInfoAtom = atom<GamerInfoData | undefined>({
  key: 'gamer_info_atom',
  default: undefined,
});
