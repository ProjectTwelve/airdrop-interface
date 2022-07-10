import { atom } from 'recoil';
import { GamerInfoData } from '../../lib/types';

export const gamerInfoAtom = atom<GamerInfoData | undefined>({
  key: 'gamer_info',
  default: undefined,
});

export const gamerEmailShowAtom = atom<boolean>({
  key: 'gamer_email_show',
  default: false,
});

export const gamerInfoCodeAtom = atom<number>({
  key: 'gamer_info_code',
  default: 0,
});
