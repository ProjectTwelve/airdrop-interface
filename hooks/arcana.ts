import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchArcanaMemeEvaluate, fetchArcanaVotes } from '../lib/api';
import { ArcanaMemeEvaluateParams } from '../lib/types';

export const useArcanaVotes = (walletAddress?: string) => {
  return useQuery(['arcana_votes', walletAddress], () => fetchArcanaVotes({ walletAddress }), {
    enabled: !!walletAddress,
    select: (data) => (data.code === 200 ? data.data : undefined),
    refetchOnWindowFocus: false,
  });
};

export const useArcanaMemeEvaluate = () => {
  return useMutation<any, any, ArcanaMemeEvaluateParams, any>((params) => fetchArcanaMemeEvaluate(params));
};
