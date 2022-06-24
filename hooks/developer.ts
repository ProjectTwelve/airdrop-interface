import { useQuery } from 'react-query';
import { fetchDeveloperInvitation } from '../lib/api';

export const useDevInvitation = (addr?: string) => {
  return useQuery(['dev_invitation', addr], () => fetchDeveloperInvitation({ addr }), {
    enabled: !!addr,
    refetchOnWindowFocus: false,
    select: (data) => {
      if (data.code !== 0) return [];
      return data.data.invitation_info;
    },
  });
};
