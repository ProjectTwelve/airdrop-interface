import { DefaultValue, atom, selector } from 'recoil';
import { UserInfo } from '@/lib/types-nest';

export const userInfoAtom = atom<UserInfo | undefined>({
  key: 'user_info_atom',
  default: undefined,
});

export const accessTokenAtom = atom<string | undefined>({
  key: 'access_token_atom',
  default: undefined,
});

export const userTelegramSelector = selector({
  key: 'user_telegram_selector',
  get: ({ get }) => {
    const userInfo = get(userInfoAtom);
    const { socialMedias } = userInfo ?? {};

    if (!socialMedias?.length) return undefined;
    const tgData = socialMedias.find(({ source }) => source === 'telegram');
    const { firstName, lastName, username, avatar } = tgData ?? {};
    if (firstName)
      return {
        first_name: firstName,
        last_name: lastName,
        username,
        photo_url: avatar,
      };
  },
});

export const aspectaIdSelector = selector({
  key: 'is_verify_user_selector',
  get: ({ get }) => {
    const userInfo = get(userInfoAtom);
    const { socialMedias } = userInfo ?? {};
    if (!socialMedias?.length) return undefined;
    const aspectaData = socialMedias.find(({ source }) => source === 'aspecta');
    if (aspectaData?.sourceId) return aspectaData?.sourceId;
  },
});

export const arcanaIsVerifySelector = selector({
  key: 'is_verify_user_selector',
  get: ({ get }) => {
    const userInfo = get(userInfoAtom);
    const { editorium } = userInfo ?? {};
    return editorium;
  },
  set: ({ get, set }, newValue) => {
    const userInfo = get(userInfoAtom);
    if (!userInfo || newValue instanceof DefaultValue) return;
    set(userInfoAtom, { ...userInfo, editorium: newValue });
  },
});
