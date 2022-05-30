import { atom, selector } from 'recoil';

export const inviteModalAtom = atom({
  key: 'invite_modal',
  default: false,
});

export enum SocialMediaType {
  Twitter = 'twitter',
  Telegram = 'telegram',
  Discord = 'discord',
}

export const socialMediaClickAtom = atom({
  key: 'social_media_click',
  default: {
    [SocialMediaType.Twitter]: false,
    [SocialMediaType.Telegram]: false,
    [SocialMediaType.Discord]: false,
  },
});

export const isSocialMediaClickSelector = selector({
  key: 'is_Social_media_click',
  get: ({ get }) => {
    const socialMediaClick = get(socialMediaClickAtom);
    return Object.values(socialMediaClick).some((v) => v);
  },
});
