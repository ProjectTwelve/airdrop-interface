import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchBindSteam, fetchGamerGames, fetchGamerInfo, fetchGamerInvitation, fetchGamerReload } from '../lib/api';
import { BinSteamParams, Response } from '../lib/types';
import { gamerGamesAtom, gamerInfoAtom, gamerInfoCodeAtom, gamerPermissionSettingAtom } from '../store/gamer/state';
import Message from '../components/message';

export const useGamerInfo = (addr?: string) => {
  const setGamerInfo = useSetRecoilState(gamerInfoAtom);
  const setGamerInfoCode = useSetRecoilState(gamerInfoCodeAtom);
  const gamerGames = useRecoilValue(gamerGamesAtom);
  const { refetch } = useGamerGames(addr);

  return useQuery(['gamer_info', addr], () => fetchGamerInfo({ addr }), {
    enabled: !!addr,
    refetchOnWindowFocus: true,
    onSuccess: (data) => {
      setGamerInfoCode(data.code);
      if (data.code === 0 && data.data) {
        if (data.data.steam_id && !gamerGames) {
          refetch().then();
        }
        setGamerInfo({ ...data.data });
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

export const useGamerGames = (wallet_address?: string) => {
  const router = useRouter();
  const setGamerGames = useSetRecoilState(gamerGamesAtom);
  const { code } = router.query;

  return useQuery(
    ['gamer_games', { wallet_address }],
    () =>
      fetchGamerGames({
        wallet_address,
        referral_code: code as string,
      }),
    {
      enabled: false,
      onSuccess: (data) => {
        setGamerGames(data.code === 0 ? data.data : undefined);
      },
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

export const useFetchReload = () => {
  const { data: account } = useAccount();
  const queryClient = useQueryClient();
  const setOpen = useSetRecoilState(gamerPermissionSettingAtom);

  return useMutation<any, any, { wallet_address?: string }>((data) => fetchGamerReload(data), {
    onSuccess: (data) => {
      if (data.code === 0) {
        queryClient.refetchQueries(['gamer_info', account?.address]).then();
        setOpen(false);
      } else {
        toast.error(<Message title="Ah shit, here we go again" message={data.msg} />);
      }
    },
  });
};
