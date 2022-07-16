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

export const posterStylesAtom = atom<Record<GAMER_NFT_LEVEL, { bg: string; count: string; border: string; shadow: string }>>({
  key: 'poster_styles',
  default: {
    [GAMER_NFT_LEVEL.ORANGE]: {
      bg: 'bg-card-0',
      count: 'bg-gamer-count-0',
      border: 'border border-[#FFAA2C]',
      shadow: 'shadow-2xl shadow-[#FFAA2C]/80',
    },
    [GAMER_NFT_LEVEL.PURPLE]: {
      bg: 'bg-card-1',
      count: 'bg-gamer-count-1',
      border: 'border border-[#C859FF]',
      shadow: 'shadow-2xl shadow-[#C859FF]/80',
    },
    [GAMER_NFT_LEVEL.BLUE]: {
      bg: 'bg-card-2',
      count: 'bg-gamer-count-2',
      border: 'border border-[#43BBFF]',
      shadow: 'shadow-2xl shadow-[#43BBFF]/80',
    },
    [GAMER_NFT_LEVEL.GREEN]: {
      bg: 'bg-card-3',
      count: 'bg-gamer-count-3',
      border: 'border border-[#1EDB8C]',
      shadow: 'shadow-2xl shadow-[#1EDB8C]/80',
    },
    [GAMER_NFT_LEVEL.WHITE]: {
      bg: 'bg-card-4',
      count: 'bg-gamer-count-4',
      border: 'border border-[#99A7C3]',
      shadow: 'shadow-2xl shadow-[#99A7C3]/80',
    },
    [GAMER_NFT_LEVEL.REKT]: {
      bg: 'bg-card-4',
      count: 'bg-gamer-count-4',
      border: 'border border-[#99A7C3]',
      shadow: 'shadow-2xl shadow-[#99A7C3]/80',
    },
  },
});
