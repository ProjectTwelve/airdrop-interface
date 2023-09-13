import { atom } from 'recoil';
import { SBT_LEVEL } from '@/constants';

export const posterBtnShowAtom = atom({
  key: 'poster_btn_show',
  default: false,
});

export const posterCaptureAtom = atom({
  key: 'poster_capture',
  default: '',
});

export const posterStylesAtom = atom<Record<SBT_LEVEL, { bg: string; border: string; shadow: string }>>({
  key: 'poster_styles',
  default: {
    [SBT_LEVEL.ORANGE]: {
      bg: 'bg-p12-poster-0',
      border: 'border border-orange',
      shadow: 'shadow-2xl shadow-[#FFAA2C]/80',
    },
    [SBT_LEVEL.PURPLE]: {
      bg: 'bg-p12-poster-1',
      border: 'border border-[#C859FF]',
      shadow: 'shadow-2xl shadow-[#C859FF]/80',
    },
    [SBT_LEVEL.BLUE]: {
      bg: 'bg-p12-poster-2',
      border: 'border border-[#43BBFF]',
      shadow: 'shadow-2xl shadow-[#43BBFF]/80',
    },
    [SBT_LEVEL.GREEN]: {
      bg: 'bg-p12-poster-3',
      border: 'border border-[#1EDB8C]',
      shadow: 'shadow-2xl shadow-[#1EDB8C]/80',
    },
    [SBT_LEVEL.WHITE]: {
      bg: 'bg-p12-poster-4',
      border: 'border border-[#99A7C3]',
      shadow: 'shadow-2xl shadow-[#99A7C3]/80',
    },
    [SBT_LEVEL.REKT]: {
      bg: 'bg-p12-poster-4',
      border: 'border border-[#99A7C3]',
      shadow: 'shadow-2xl shadow-[#99A7C3]/80',
    },
  },
});
