import { isIOS, isMobile } from 'react-device-detect';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArcanaMemeEvaluateParams, ArcanaVotes, PredictionAnswerParams, PredictionItemData, Response } from '../lib/types';
import {
  arcanaGenesisNFTHolderAtom,
  arcanaMulticastCardAtom,
  arcanaMulticastVideoAtom,
  arcanaObserverAtom,
  arcanaOmgInviteCountAtom,
  arcanaSignBindAtom,
  arcanaVoteCountAtom,
} from '../store/arcana/state';
import {
  fetchArcanaAgent,
  fetchArcanaAnswer,
  fetchArcanaAnswerOMG,
  fetchArcanaAnswerOMG2,
  fetchArcanaDistinctAddressCount,
  fetchArcanaInviteesVotes,
  fetchArcanaMemeEvaluate,
  fetchArcanaPredictions,
  fetchArcanaPredictionsAnswerCount,
  fetchArcanaPredictionsOMG,
  fetchArcanaRecentInvitation,
  fetchArcanaRewardRank,
  fetchArcanaUnlock,
  fetchArcanaVotes,
  fetchArcanaVotesRank,
} from '../lib/api';

export const useArcanaVotes = (walletAddress?: string) => {
  const setGenesisNFTHolder = useSetRecoilState(arcanaGenesisNFTHolderAtom);
  const setVoteCount = useSetRecoilState(arcanaVoteCountAtom);
  const setOmgInviteCount = useSetRecoilState(arcanaOmgInviteCountAtom);
  const setSignBind = useSetRecoilState(arcanaSignBindAtom);
  const setMulticastVideo = useSetRecoilState(arcanaMulticastVideoAtom);
  const setMulticastCard = useSetRecoilState(arcanaMulticastCardAtom);
  const isObserver = useRecoilValue(arcanaObserverAtom);

  return useQuery(['arcana_votes', walletAddress], () => fetchArcanaVotes({ walletAddress }), {
    enabled: !!walletAddress,
    select: (data) => (data.code === 200 ? data.data : undefined),
    onSuccess: (data: ArcanaVotes | undefined) => {
      setGenesisNFTHolder(!!data);
      if (!data) return;
      setSignBind(data.bound);
      setVoteCount(data.userVotes.votesTotalCurrent);
      setOmgInviteCount({
        inviteCount: data.userVotes.omgInviteCount ?? 0,
        inviteVotes: data.userVotes.omgInviteVotes ?? 0,
      });
      if (!data.bound && !isObserver) {
        if (isMobile && isIOS) {
          setMulticastCard(true);
          return;
        }
        setMulticastVideo(true);
      }
    },
  });
};

export const useArcanaMemeEvaluate = () => {
  return useMutation<any, any, ArcanaMemeEvaluateParams, any>((params) => fetchArcanaMemeEvaluate(params));
};

export const useArcanaInviteesVotes = (walletAddress?: string) => {
  return useQuery(['invitees_votes', walletAddress], () => fetchArcanaInviteesVotes({ walletAddress }), {
    enabled: !!walletAddress,
    select: (data) => (data.code === 200 ? data.data : undefined),
  });
};

export const useArcanaDistinctAddressCount = () => {
  return useQuery(['distinct_address_count'], () => fetchArcanaDistinctAddressCount(), {
    select: (data) => (data.code === 200 ? data.data + 6951 : undefined),
  });
};

export const useArcanaPredictions = (walletAddress?: string) => {
  return useQuery(['arcana_predictions', walletAddress], () => fetchArcanaPredictions({ walletAddress }), {
    enabled: !!walletAddress,
    select: (data) => {
      if (data.code === 200) {
        const correctList: PredictionItemData[] = [];
        const otherList: PredictionItemData[] = [];
        data.data.map((item) => {
          const answer = item.answer?.[0];
          const correctAnswer = item.correctAnswer;
          if (answer && correctAnswer.some((i) => i.id === answer.id)) {
            correctList.push(item);
          } else {
            otherList.push(item);
          }
        });
        return [...correctList, ...otherList];
      }
      return undefined;
    },
  });
};

export const useArcanaPredictionsOMG = (walletAddress?: string) => {
  return useQuery(['arcana_predictions_omg', walletAddress], () => fetchArcanaPredictionsOMG({ walletAddress }), {
    enabled: !!walletAddress,
    select: (data) => (data.code === 200 ? data.data : undefined),
  });
};

export const useArcanaPredictionsAnswerCount = (walletAddress?: string) => {
  return useQuery(['arcana_predictions_votes_count', walletAddress], () => fetchArcanaPredictionsAnswerCount(), {
    select: (data) => {
      if (data.code === 200) {
        const map: Record<string, number> = {};
        data.data.forEach((item) => {
          map[item.predictionCode] = item.totalAnswers || 0;
        });
        return map;
      }
      return undefined;
    },
  });
};

export const useArcanaUnlock = () => {
  return useMutation<any, any, { walletAddress?: string; predictionCode?: string }, Response<boolean>>((params) =>
    fetchArcanaUnlock(params),
  );
};

export const useArcanaAnswer = () => {
  return useMutation<any, any, PredictionAnswerParams, Response<any>>((params) => fetchArcanaAnswer(params));
};

export const useArcanaAgent = () => {
  return useMutation<any, any, { signature: string; walletAddress: string }, Response<boolean>>((params) =>
    fetchArcanaAgent(params),
  );
};

export const useArcanaAnswerOMG = () => {
  return useQuery(['arcana_answer_omg'], () => fetchArcanaAnswerOMG(), {
    select: (data) => (data.code === 200 ? data.data : undefined),
  });
};

export const useArcanaAnswerOMG2 = () => {
  return useQuery(['arcana_answer_omg2'], () => fetchArcanaAnswerOMG2(), {
    select: (data) => (data.code === 200 ? data.data : undefined),
  });
};

export const useArcanaRewardRank = () => {
  return useQuery(['arcana_reward_rank'], () => fetchArcanaRewardRank(), {
    select: (data) => (data.code === 200 ? data.data : undefined),
  });
};

export const useArcanaVotesRank = () => {
  return useQuery(['arcana_votes_rank'], () => fetchArcanaVotesRank(), {
    select: (data) => (data.code === 200 ? data.data : undefined),
  });
};

export const useArcanaRecentInvitation = () => {
  return useQuery(['arcana_recent_invitation'], () => fetchArcanaRecentInvitation(), {
    select: (data) => (data.code === 200 ? data.data : undefined),
  });
};
