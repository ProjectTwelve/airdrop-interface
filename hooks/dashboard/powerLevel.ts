import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchGenesisPL, fetchGenesisUpgrade, fetchUserPowerLevel } from '@/lib/api-nest';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { userPowerLevelAtom } from '@/store/dashboard/state';
import { GenesisRole } from '@/constants';

export function useFetchUserPowerLevel(address?: string) {
  const setUserPowerLevel = useSetRecoilState(userPowerLevelAtom);
  const resetUserPowerLevel = useResetRecoilState(userPowerLevelAtom);

  return useQuery(['fetch_user_power_level', address], () => fetchUserPowerLevel(address), {
    enabled: !!address,
    select: (data) => (data.code === 200 ? data.data : undefined),
    onSuccess: (data) => {
      if (data) {
        setUserPowerLevel(data);
      } else {
        resetUserPowerLevel();
      }
    },
    onError: () => {
      resetUserPowerLevel();
    },
  });
}

export function useFetchGenesisPL() {
  return useQuery(['fetch_genesis_pl'], () => fetchGenesisPL(), {
    select: (data) => (data.code === 200 ? data.data : []),
  });
}

export function useMutationGenesisUpgrade({ onSuccess }: { onSuccess?: () => void } = {}) {
  return useMutation({
    mutationFn: (data: { address: string; role: GenesisRole }) => fetchGenesisUpgrade(data),
    onSuccess,
  });
}
