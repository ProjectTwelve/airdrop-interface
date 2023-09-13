import { atom } from 'recoil';
import { GamerGamesData, GamerInfoData } from '@/lib/types';

export const gamerInfoAtom = atom<GamerInfoData | undefined>({
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

export const gamerEmailDialogTypeAtom = atom<'type1' | 'type2'>({
  key: 'gamer_email_dialog_type',
  default: 'type1',
});

export const gamerEmailInfoAtom = atom<{
  wallet_address?: string;
  email?: string;
  is_email_verified: boolean;
  is_new_user: boolean;
}>({
  key: 'gamer_email_info',
  default: {
    wallet_address: undefined,
    email: undefined,
    is_email_verified: false,
    is_new_user: true,
  },
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
