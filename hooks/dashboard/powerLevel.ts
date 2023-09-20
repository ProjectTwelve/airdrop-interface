import { useQuery } from '@tanstack/react-query';
import { fetchGenesisNFTUpgrade, fetchUserPowerLevel } from '@/lib/api-nest';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { userPowerLevelAtom } from '@/store/dashboard/state';

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

export function useFetchGenesisNFTUpgrade() {
  return useQuery(['fetch_genesis_nft_upgrade'], () => fetchGenesisNFTUpgrade(), {
    select: (data) => (data.code === 200 ? data.data : []),
  });
}
