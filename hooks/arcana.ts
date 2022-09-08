import { useQuery } from '@tanstack/react-query';
import { fetchGamerInfo } from '../lib/api';

export const useArcanaGamerInfo = (addr?: string) => {
  return useQuery(['arcana_gamer_info', addr], () => fetchGamerInfo({ addr }), {
    enabled: !!addr,
    select: (data) => (data.code === 0 ? data.data : undefined),
  });
};
