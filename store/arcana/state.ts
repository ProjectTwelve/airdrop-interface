import { atom } from 'recoil';
import { PredictionOption } from '../../lib/types';

export const arcanaGenesisNFTHolderAtom = atom<boolean>({
  key: 'arcana_genesis_nft_holder_atom',
  default: false,
});

export const arcanaObserverAtom = atom<boolean>({
  key: 'arcana_observer_atom',
  default: false,
});

export const arcanaUnSubmitAtom = atom<boolean>({
  key: 'arcana_unSubmit_atom',
  default: false,
});

export const arcanaOriginAddressAtom = atom<string | undefined>({
  key: 'arcana_origin_address_atom',
  default: undefined,
});

export type PredictionAnswer = {
  predictionCode: string;
  answer?: PredictionOption[];
};

export const arcanaPredictionAnswerAtom = atom<PredictionAnswer[]>({
  key: 'arcana_prediction_answer_atom',
  default: [],
});

export const arcanaPredictionCountAtom = atom<number>({
  key: 'arcana_prediction_count_atom',
  default: 20,
});

export const arcanaVoteCountAtom = atom<number>({
  key: 'arcana_vote_count_atom',
  default: 0,
});

export const arcanaSignBindAtom = atom<boolean>({
  key: 'arcana_sign_bind_atom',
  default: false,
});

export const arcanaMulticastVideoAtom = atom<boolean>({
  key: 'arcana_multicast_video_atom',
  default: false,
});

export const arcanaMulticastCardAtom = atom<boolean>({
  key: 'arcana_multicast_card_atom',
  default: false,
});

export const arcanaInviteDialogAtom = atom<boolean>({
  key: 'arcana_invite_modal_atom',
  default: false,
});

export const arcanaPredictionOMGAnswerAtom = atom<PredictionAnswer[]>({
  key: 'arcana_prediction_omg_answer_atom',
  default: [],
});

export const arcanaPredictionOMGSubmitAtom = atom<boolean>({
  key: 'arcana_prediction_omg_submit_atom',
  default: false,
});
