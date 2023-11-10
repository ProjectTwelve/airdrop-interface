import { fetchTasksStatus } from '@/lib/api-nest';
import { TaskCode } from '@/lib/types-nest';
import { arcanaTasksStatusAtom } from '@/store/arcana/state';
import { useMutation } from '@tanstack/react-query';
import { ReactNode, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';

export type TaskData = {
  id: TaskCode;
  title: string;
  subtitle?: string;
  PL: string | number;
  desc: string | ReactNode;
  inviteCount?: number;
};
export const useMutationTasksStatus = () => {
  const setTasksStatus = useSetRecoilState(arcanaTasksStatusAtom);

  return useMutation({
    mutationFn: () => fetchTasksStatus(),
    onSuccess: (res) => {
      const { code, data } = res ?? {};
      if (code === 200) {
        setTasksStatus(data);
        return data;
      }
    },
    onError: () => {
      setTasksStatus(undefined);
    },
  });
};

export const useTaskItems = () => {
  // const setEditorDownloadDialogOpen = useSetAtom(editorDownloadDialogOpen);

  return useMemo<TaskData[]>(
    () => [
      {
        id: TaskCode.LoginEditor,
        title: 'Register P12 Editor',
        subtitle: 'One-time Task',
        PL: 24,
        desc: 'The P12 Editor is now publicly available. Download, install, and register with your wallet to become a certified P12 developer and gain Power Level.',
      },
      {
        id: TaskCode.CreateGame,
        title: 'Publish your Creation',
        subtitle: 'One-time Task',
        PL: 696,
        desc: "Create your own metaverse assets using P12 Editor, then publish them via 'Project-Publish'. Manage your creations, including renaming and uploading images in the 'Creation' tab on the landing page.",
      },
      {
        id: TaskCode.ParticipateArcana,
        title: 'Become a Voter',
        subtitle: 'One-time Task',
        PL: 12,
        desc: "Activate your votes by completing a transaction in either the 'Gallery Tab' or Task Panel.",
      },
      {
        id: TaskCode.DoVote,
        title: 'Vote Vote Vote',
        subtitle: 'Daily Task',
        PL: 3,
        PLExpand: 'per day',
        desc: "Your POWER LEVEL is your vote count, and it resets daily. Don't forget to vote everyday!",
      },
      {
        id: TaskCode.BurnBadge,
        title: 'P12 Community Badge',
        PL: '12-600',
        desc: "Acquire P12 Community Badge NFT through community or NFT marketplace.Click 'GO' above to access P12 BRIDGE (Beta), complete the required steps to verify your ownership, and receive rewards.",
      },
      {
        id: TaskCode.LinkAspecta,
        title: 'Linked with Aspecta',
        subtitle: 'One-time Task',
        PL: 12,
        desc: 'Click "Go" and link GitHub when registering your Aspecta ID. Your developer skills will be automatically verified and receive PL.',
      },
      {
        id: TaskCode.LinkUneMeta,
        title: 'Linked with UneMeta',
        subtitle: 'One-time Task',
        PL: 12,
        desc: 'Visit the P12 portal on the UneMeta official website to complete the task. Task verification may require a delay of up to 1 day. Please be patient and wait.',
      },
      {
        id: TaskCode.GenesisNFTGamer,
        title: 'Claim P12 Genesis NFT(Gamer)',
        subtitle: 'One-time Task',
        PL: '1-30000',
        desc: 'P12 Genesis NFT is a tribute to Steam gamers, and a Soul-bound token that captures web2 gaming credentials.',
      },
      {
        id: TaskCode.AttendedTiArcana,
        title: 'Bonus for P12 Arcana: TI11',
        subtitle: 'One-time Task',
        PL: '12-300',
        desc: 'The Arcana TI event was held in November 2022. Participated users can get extra Power Level based on their involvement. P12 Arcana is an ongoing series event, offering long-term value to followers.',
      },
    ],
    [],
  );
};
