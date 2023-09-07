import { atom } from 'recoil';
import { UserInfo } from '@/lib/types-nest';

export const userInfoAtom = atom<UserInfo | undefined>({
  key: 'user_info_atom',
  default: undefined,
});

export const accessTokenAtom = atom<string | undefined>({
  key: 'access_token_atom',
  default: undefined,
});
