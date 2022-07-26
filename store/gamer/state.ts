import { atom } from 'recoil';
import { GamerGamesData, GamerInfoData } from '../../lib/types';

export const gamerInfoAtom = atom<(GamerInfoData & { addr: string }) | undefined>({
  key: 'gamer_info',
  default: undefined,
});

export const gamerGamesAtom = atom<GamerGamesData | undefined>({
  key: 'gamer_games',
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

export const gamerClaimedPosterAtom = atom<boolean>({
  key: 'gamer_claimed_Poster',
  default: false,
});

export const gamerPermissionSettingAtom = atom<boolean>({
  key: 'gamer_permission_setting',
  default: false,
});
