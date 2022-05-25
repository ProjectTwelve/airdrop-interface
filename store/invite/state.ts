import { atom } from 'recoil';

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
