import { isIOS, isMobile } from 'react-device-detect';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArcanaMemeEvaluateParams, ArcanaVotes, PredictionAnswerParams, Response } from '../lib/types';
import {
  arcanaGenesisNFTHolderAtom,
  arcanaMulticastCardAtom,
  arcanaMulticastVideoAtom,
  arcanaObserverAtom,
  arcanaSignBindAtom,
  arcanaVoteCountAtom,
} from '../store/arcana/state';
import {
  fetchArcanaAgent,
  fetchArcanaAnswer,
  fetchArcanaDistinctAddressCount,
  fetchArcanaInviteesVotes,
  fetchArcanaMemeEvaluate,
  fetchArcanaPredictions,
  fetchArcanaPredictionsAnswerCount,
  fetchArcanaUnlock,
  fetchArcanaVotes,
} from '../lib/api';

export const useArcanaVotes = (walletAddress?: string) => {
  const setGenesisNFTHolder = useSetRecoilState(arcanaGenesisNFTHolderAtom);
  const setVoteCount = useSetRecoilState(arcanaVoteCountAtom);
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
      if (!data.bound && !isObserver) {
        if (isMobile && isIOS) {
          setMulticastCard(true);
          return;
        }
        setMulticastVideo(true);
      }
    },
    refetchOnWindowFocus: false,
  });
};

export const useArcanaMemeEvaluate = () => {
  return useMutation<any, any, ArcanaMemeEvaluateParams, any>((params) => fetchArcanaMemeEvaluate(params));
};

export const useArcanaInviteesVotes = (walletAddress?: string) => {
  return useQuery(['invitees_votes', walletAddress], () => fetchArcanaInviteesVotes({ walletAddress }), {
    enabled: !!walletAddress,
    select: (data) => (data.code === 200 ? data.data : undefined),
    refetchOnWindowFocus: false,
  });
};

export const useArcanaDistinctAddressCount = () => {
  return useQuery(['distinct_address_count'], () => fetchArcanaDistinctAddressCount(), {
    select: (data) => (data.code === 200 ? data.data + 6951 : undefined),
    refetchOnWindowFocus: false,
  });
};

export const useArcanaPredictions = (walletAddress?: string) => {
  return useQuery(['arcana_predictions', walletAddress], () => fetchArcanaPredictions({ walletAddress }), {
    enabled: !!walletAddress,
    select: (data) => (data.code === 200 ? data.data : undefined),
    refetchOnWindowFocus: false,
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
    refetchOnWindowFocus: false,
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
