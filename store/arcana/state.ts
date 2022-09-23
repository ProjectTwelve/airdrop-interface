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
