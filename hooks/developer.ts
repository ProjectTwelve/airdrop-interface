import { Address } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { fetchDeveloperInfo, fetchDeveloperInvitation } from '@/lib/api';
import { useSetRecoilState } from 'recoil';
import { developerGameAtom } from '@/store/developer/state';

export const useDevInvitation = (addr?: string) => {
  return useQuery(['dev_invitation', addr], () => fetchDeveloperInvitation({ addr }), {
    enabled: !!addr,
    select: (data) => {
      if (data.code !== 0) return [];
      return data.data.invitation_info;
    },
  });
};

export function useDeveloperInfo(address?: Address) {
  const setGames = useSetRecoilState(developerGameAtom);
  useQuery(['developer_info', address], () => fetchDeveloperInfo({ addr: address }), {
    enabled: !!address,
    onSuccess: (data) => {
      if (data.code !== 0) return;
      setGames(data.data.account_info || []);
    },
  });
}
