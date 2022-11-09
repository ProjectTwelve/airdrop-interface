import {useAccount} from 'wagmi';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {STORAGE_KEY} from '../constants';
import Message from '../components/message';
import {getLocalStorage} from '../utils/storage';
import {BinSteamParams, Response} from '../lib/types';
import {gamerGamesAtom, gamerInfoAtom, gamerInfoCodeAtom, gamerPermissionSettingAtom} from '../store/gamer/state';
import {
  fetchBindSteam,
  fetchGamerGames,
  fetchGamerInfo,
  fetchGamerInvitation,
  fetchGamerReload,
  fetchGamerVerifyEmailCode,
} from '../lib/api';

export const useGamerInfo = (addr?: string) => {
  const setGamerInfo = useSetRecoilState(gamerInfoAtom);
  const setGamerInfoCode = useSetRecoilState(gamerInfoCodeAtom);
  const [gamerGames, setGamerGames] = useRecoilState(gamerGamesAtom);
  const {refetch} = useGamerGames(addr);

  return useQuery(['gamer_info', addr], () => fetchGamerInfo({addr}), {
    enabled: !!addr,
    refetchOnWindowFocus: true,
    onSuccess: (data) => {
      setGamerInfoCode(data.code);
      if (data.code === 0 && data.data) {
        if (data.data.steam_id && gamerGames?.wallet_address !== addr) {
          setGamerGames(undefined);
          refetch().then();
        }
        setGamerInfo({...data.data});
      } else {
        setGamerInfo(undefined);
      }
    },
  });
};

export const useBindSteamAccount = () => {
  const {address} = useAccount();
  const queryClient = useQueryClient();

  return useMutation<Response<any>, any, BinSteamParams, any>((data) => fetchBindSteam(data), {
    onSuccess: (data) => {
      if (data.code === 0) {
        queryClient.refetchQueries(['gamer_info', address]).then();
      } else {
        toast.error(<Message title="Ah shit, here we go again" message={data.msg}/>);
      }
    },
  });
};

export const useGamerGames = (wallet_address?: string) => {
  const router = useRouter();
  const setGamerGames = useSetRecoilState(gamerGamesAtom);
  const {code} = router.query;

  return useQuery(
    ['gamer_games', {wallet_address}],
    () => {
      const localCode = getLocalStorage(STORAGE_KEY.INVITE_CODE);
      return fetchGamerGames({
        wallet_address,
        referral_code: code || localCode,
      });
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setGamerGames(data.code === 0 ? {...data.data, wallet_address} : undefined);
      },
    },
  );
};

export const useGamerInvitation = (addr?: string) => {
  return useQuery(['gamer_invitation', addr], () => fetchGamerInvitation({addr}), {
    enabled: !!addr,
    select: (data) => {
      if (data.code !== 0) return [];
      return data.data.invitation_info;
    },
  });
};

export const useFetchReload = () => {
  const {address} = useAccount();
  const queryClient = useQueryClient();
  const setOpen = useSetRecoilState(gamerPermissionSettingAtom);

  return useMutation<any, any, { wallet_address?: string }>((data) => fetchGamerReload(data), {
    onSuccess: (data) => {
      if (data.code === 0) {
        queryClient.refetchQueries(['gamer_info', address]).then();
        setOpen(false);
      } else {
        toast.error(<Message title="Ah shit, here we go again" message={data.msg}/>);
      }
    },
  });
};

export const useGamerVerifyEmailCode = () => {
  return useMutation<Response<any>, any, { wallet_address?: string; email_verify_code: string }>((data) =>
    fetchGamerVerifyEmailCode(data),
  );
};
