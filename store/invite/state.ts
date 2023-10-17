import { atom, selector } from 'recoil';

export const inviteModalAtom = atom({
  key: 'invite_modal',
  default: false,
});

export enum SocialMediaType {
  Twitter = 'twitter',
  Mirror = 'mirror',
  Discord = 'discord',
}

export const socialMediaClickAtom = atom({
  key: 'social_media_click',
  default: {
    [SocialMediaType.Twitter]: false,
    [SocialMediaType.Mirror]: false,
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

export const referralCodeAtom = atom<string>({
  key: 'referral_code',
  default: undefined,
});

export const invitationCountAtom = atom<[number, number]>({
  key: 'invitation_count',
  default: [0, 0],
});

// steam gamer & develop
export const invitationCountSelector = selector({
  key: 'invitation_count_selector',
  get: ({ get }) => {
    const counts = get(invitationCountAtom);
    return counts[0] + counts[1];
  },
});
