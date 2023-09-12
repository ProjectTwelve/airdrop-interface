import { fetchLogin, fetchUserInfo } from '@/lib/api-nest';
import instance from '@/lib/request-nest';
import { LoginParams } from '@/lib/types-nest';
import { accessTokenAtom, userInfoAtom } from '@/store/user/state';
import { setAccessToken } from '@/utils/authorization';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useAccount } from 'wagmi';

export const useMutationLogin = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setAccessTokenAtom = useSetRecoilState(accessTokenAtom);

  return useMutation({
    mutationFn: (params: LoginParams) => fetchLogin(params),
    onSuccess: ({ code, data }) => {
      if (code === 200) {
        setAccessToken(data.accessToken);
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
        setUserInfo(data);
        setAccessTokenAtom(data.accessToken);
      }
    },
  });
};

export const useFetchUserInfo = () => {
  const { address } = useAccount();
  const accessToken = useRecoilValue(accessTokenAtom);
  const setUserInfo = useSetRecoilState(userInfoAtom);

  return useQuery(['fetch_user_info', accessToken], () => fetchUserInfo(), {
    select: (data) => (data.code === 200 ? data.data : undefined),
    onSuccess: (data) => setUserInfo(data),
    enabled: !!address && !!accessToken,
  });
};

export const useIsLogged = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const { address } = useAccount();
  return useMemo(() => !!address && !!accessToken, [accessToken, address]);
};

export const useMutationUserInfo = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom);

  return useMutation(() => fetchUserInfo(), {
    onSuccess: (res) => {
      const { code, data } = res ?? {};
      if (code === 200) {
        setUserInfo(data);
        return data;
      }
    },
    onError: () => {
      setUserInfo(undefined);
    },
  });
};

export const useFetchGlobalData = () => {
  const { mutate: fetchProfile } = useMutationUserInfo();
  const accessToken = useRecoilValue(accessTokenAtom);

  return useCallback(() => {
    if (!accessToken) return;
    fetchProfile();
  }, [accessToken, fetchProfile]);
};

export const useRemoveGlobalState = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom);

  return useCallback(() => {
    setUserInfo(undefined);
  }, [setUserInfo]);
};
