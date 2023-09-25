import { atom } from 'recoil';
import { PredictionOption } from '../../lib/types';
import { GameInfo, InvitationCodeResult, PowerVoteResult, TasksStatus } from '@/lib/types-nest';

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

export const arcanaPredictionOMGAnswerAtom = atom<PredictionAnswer[]>({
  key: 'arcana_prediction_omg_answer_atom',
  default: [],
});

export const arcanaPredictionOMGSubmitAtom = atom<boolean>({
  key: 'arcana_prediction_omg_submit_atom',
  default: false,
});

export const arcanaOmgInviteCountAtom = atom<{ inviteCount: number; inviteVotes: number }>({
  key: 'arcana_omg_invite_count_atom',
  default: {
    inviteCount: 0,
    inviteVotes: 0,
  },
});

export const arcanaEarnRewardAtom = atom<number>({
  key: 'arcana_earn_reward_atom',
  default: 0,
});

export const arcanaTasksStatusAtom = atom<TasksStatus | undefined>({
  key: 'arcana_tasks_status_atom',
  default: undefined,
});

export const arcanaPowerVoteAtom = atom<PowerVoteResult | undefined>({
  key: 'arcana_power_vote_atom',
  default: undefined,
});

export const arcanaSubmittedListAtom = atom<GameInfo[]>({
  key: 'arcana_submitted_list_atom',
  default: [],
});

export const arcanaNotSubmittedListAtom = atom<GameInfo[]>({
  key: 'arcana_not_submitted_list_atom',
  default: [],
});

export const arcanaInvitationInfoAtom = atom<InvitationCodeResult | null>({
  key: 'arcana_invitation_info_atom',
  default: null,
});

// Dialog
export const arcanaInviteDialogAtom = atom<boolean>({
  key: 'arcana_invite_modal_atom',
  default: false,
});

export const arcanaEditProfileDialogOpenAtom = atom<boolean>({
  key: 'arcana_edit_profile_dialog_open_atom',
  default: false,
});

export const arcanaEditorDownloadDialogOpen = atom<boolean>({
  key: 'arcana_editor_download_dialog_open',
  default: false,
});
