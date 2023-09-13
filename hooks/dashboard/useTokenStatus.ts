import dayjs from 'dayjs';
import { useMemo } from 'react';
import { AccountInfo, GamerInfoData } from '@/lib/types';
import { TokenStatusData } from '@/components/dashboard/TokenStatus';

export function useGamerTokenStatus(data?: GamerInfoData) {
  return useMemo<TokenStatusData | undefined>(
    () =>
      data
        ? {
            id: data.nft_id,
            rarity: data.nft_level,
            role: data.credential ? 'Gamer' : undefined,
            birthday: data?.birthday ? dayjs(data.birthday).format('YY/MM/DD') : '--',
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
            rarity: data.nft_level,
            role: data.credential ? 'Developer' : undefined,
            birthday: data?.updatedAt ? dayjs(data.updatedAt).format('YY/MM/DD') : '--',
          }
        : undefined,
    [data],
  );
}
