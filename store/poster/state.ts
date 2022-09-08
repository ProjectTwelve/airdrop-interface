import { atom } from 'recoil';
import { GAMER_NFT_LEVEL } from '../../constants';

export const posterBtnShowAtom = atom({
  key: 'poster_btn_show',
  default: false,
});

export const posterCaptureAtom = atom({
  key: 'poster_capture',
  default: '',
});

export const posterStylesAtom = atom<Record<GAMER_NFT_LEVEL, { bg: string; border: string; shadow: string }>>({
  key: 'poster_styles',
  default: {
    [GAMER_NFT_LEVEL.ORANGE]: {
      bg: 'bg-p12-poster-0',
      border: 'border border-p12-orange',
      shadow: 'shadow-2xl shadow-[#FFAA2C]/80',
    },
    [GAMER_NFT_LEVEL.PURPLE]: {
      bg: 'bg-p12-poster-1',
      border: 'border border-[#C859FF]',
      shadow: 'shadow-2xl shadow-[#C859FF]/80',
    },
    [GAMER_NFT_LEVEL.BLUE]: {
      bg: 'bg-p12-poster-2',
      border: 'border border-[#43BBFF]',
      shadow: 'shadow-2xl shadow-[#43BBFF]/80',
    },
    [GAMER_NFT_LEVEL.GREEN]: {
      bg: 'bg-p12-poster-3',
      border: 'border border-[#1EDB8C]',
      shadow: 'shadow-2xl shadow-[#1EDB8C]/80',
    },
    [GAMER_NFT_LEVEL.WHITE]: {
      bg: 'bg-p12-poster-4',
      border: 'border border-[#99A7C3]',
      shadow: 'shadow-2xl shadow-[#99A7C3]/80',
    },
    [GAMER_NFT_LEVEL.REKT]: {
      bg: 'bg-p12-poster-4',
      border: 'border border-[#99A7C3]',
      shadow: 'shadow-2xl shadow-[#99A7C3]/80',
    },
  },
});
