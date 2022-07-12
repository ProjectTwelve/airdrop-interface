import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchBindSteam, fetchGamerGames, fetchGamerInfo, fetchGamerInvitation } from '../lib/api';
import { BinSteamParams, Response } from '../lib/types';
import { gamerInfoAtom, gamerInfoCodeAtom } from '../store/gamer/state';
import Message from '../components/message';

export const useGamerInfo = (addr?: string) => {
  const setGamerInfo = useSetRecoilState(gamerInfoAtom);
  const setGamerInfoCode = useSetRecoilState(gamerInfoCodeAtom);

  return useQuery(['gamer_info', addr], () => fetchGamerInfo({ addr }), {
    enabled: !!addr,
    onSuccess: (data) => {
      setGamerInfoCode(data.code);
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
        toast.error(<Message title="Ah shit, here we go again" message={data.msg} />);
      }
    },
  });
};

export const useGamerGames = (wallet_address?: string, steamId?: string) => {
  const router = useRouter();
  const { code } = router.query;

  return useQuery(
    ['gamer_games', { wallet_address, steamId }],
    () =>
      fetchGamerGames({
        wallet_address,
        referral_code: code as string,
      }),
    {
      enabled: !!steamId,
      // select: (data) => (data.code === 0 ? data.data : undefined),
      refetchOnWindowFocus: false,
    },
  );
};

export const useGamerInvitation = (addr?: string) => {
  return useQuery(['gamer_invitation', addr], () => fetchGamerInvitation({ addr }), {
    enabled: !!addr,
    refetchOnWindowFocus: false,
    select: (data) => {
      if (data.code !== 0) return [];
      return data.data.invitation_info;
    },
  });
};
