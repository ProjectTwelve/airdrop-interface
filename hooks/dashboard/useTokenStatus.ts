import dayjs from 'dayjs';
import { useMemo } from 'react';
import { GenesisNFT } from '@/lib/types-nest';
import { TokenStatusData } from '@/components/dashboard/sbt/TokenStatus';

export function useGamerTokenStatus(data?: GenesisNFT) {
  return useMemo<TokenStatusData | undefined>(
    () =>
      data
        ? {
            id: data.nftId,
            rarity: data.nftLevel,
            role: data.credential ? 'Gamer' : undefined,
            birthday: data?.createdAt ? dayjs(data.createdAt).format('YY/MM/DD') : '--',
          }
        : undefined,
    [data],
  );
}

export function useDevTokenStatus(data?: GenesisNFT) {
  return useMemo<TokenStatusData | undefined>(
    () =>
      data
        ? {
            id: data.nftId,
            rarity: data.nftLevel,
            role: data.credential ? 'Developer' : undefined,
            birthday: data?.createdAt ? dayjs(data.createdAt).format('YY/MM/DD') : '--',
          }
        : undefined,
    [data],
  );
}
