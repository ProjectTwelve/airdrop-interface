import { useQuery } from 'react-query';
import { fetchGamerInfo } from '../lib/api';

export const useGamerInfo = (addr?: string) => {
  return useQuery(['gamer_info', addr], () => fetchGamerInfo({ addr }), {
    enabled: !!addr,
  });
};
