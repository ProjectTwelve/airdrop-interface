import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchBindSteam, fetchGamerGames, fetchGamerInfo } from '../lib/api';
import { BinSteamParams, Response } from '../lib/types';
import { useAccount } from 'wagmi';
import { useSetRecoilState } from 'recoil';
import { gamerInfoAtom } from '../store/gamer/state';
import { toast } from 'react-toastify';
import Message from '../components/message';

export const useGamerInfo = (addr?: string) => {
  const setGamerInfo = useSetRecoilState(gamerInfoAtom);
  return useQuery(['gamer_info', addr], () => fetchGamerInfo({ addr }), {
    enabled: !!addr,
    onSuccess: (data) => {
      if (data.code === 0 && data.data) {
        setGamerInfo(data.data);
      } else {
        setGamerInfo(undefined);
      }
    },
  });
};

export const useBindSteamAccount = () => {
  const { data: account } = useAccount();
  const queryClient = useQueryClient();
  return useMutation<Response<any>, any, BinSteamParams, any>((data) => fetchBindSteam(data), {
    onSuccess: (data) => {
      if (data.code === 0) {
        queryClient.refetchQueries(['gamer_info', account?.address]).then();
      } else {
        toast.error(<Message title="Failed" message={data.msg} />);
      }
    },
  });
};

export const useGamerGames = (wallet_address?: string, steamId?: string) => {
  return useQuery(['gamer_games', { wallet_address, steamId }], () => fetchGamerGames({ wallet_address }), {
    enabled: !!steamId,
    select: (data) => (data.code === 0 ? data.data : undefined),
    refetchOnWindowFocus: false,
  });
};
