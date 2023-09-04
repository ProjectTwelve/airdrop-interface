import { useMemo } from 'react';
import { AccountInfo, GamerInfoData } from '@/lib/types';
import { BADGE_CONTRACT_ADDRESS } from '@/constants';
import { TokenStatusData } from '@/components/dashboard/TokenStatus';

export function useGamerTokenStatus(data?: GamerInfoData) {
  return useMemo<TokenStatusData | undefined>(
    () =>
      data
        ? {
            id: data.nft_id,
            claim: data.nft_claim,
            role: data.credential ? 'Gamer' : undefined,
            contract: data.credential ? BADGE_CONTRACT_ADDRESS : undefined,
          }
        : undefined,
    [data],
  );
}

export function useDevTokenStatus(data?: AccountInfo) {
  return useMemo<TokenStatusData | undefined>(
    () =>
      data
        ? {
            id: data.nft_id,
            claim: data.nft_claim,
            role: data.credential ? 'Developer' : undefined,
            contract: data.credential ? BADGE_CONTRACT_ADDRESS : undefined,
          }
        : undefined,
    [data],
  );
}
