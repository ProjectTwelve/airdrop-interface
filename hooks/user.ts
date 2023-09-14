import { fetchLogin, fetchPowerVote, fetchUserInfo } from '@/lib/api-nest';
import instance from '@/lib/request-nest';
import { LoginParams } from '@/lib/types-nest';
import {
  arcanaNotSubmittedListAtom,
  arcanaPowerVoteAtom,
  arcanaSubmittedListAtom,
  arcanaTasksStatusAtom,
} from '@/store/arcana/state';
import { accessTokenAtom, userInfoAtom } from '@/store/user/state';
import { removeAccessToken, setAccessToken } from '@/utils/authorization';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useAccount, useDisconnect } from 'wagmi';
import { useFetchUserNotSubmittedList, useMutationUserSubmittedList } from './dashboard/creation';
import { useMutationTasksStatus } from './dashboard/task';

export const useMutationLogin = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setAccessTokenAtom = useSetRecoilState(accessTokenAtom);

  return useMutation({
    mutationFn: (params: LoginParams) => fetchLogin(params),
    onSuccess: ({ code, data }) => {
      if (code === 200) {
        setAccessToken(data?.accessToken ?? '');
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

export const useMutationPowerVoteInfo = () => {
  const setPowerVoteInfo = useSetRecoilState(arcanaPowerVoteAtom);
  return useMutation({
    mutationFn: () => fetchPowerVote(),
    onSuccess: (res) => {
      const { code, data } = res ?? {};
      if (code === 200) {
        setPowerVoteInfo(data);
        return data;
      }
    },
    onError: () => {
      setPowerVoteInfo(undefined);
    },
  });
};

export const useFetchGlobalData = () => {
  const { mutate: fetchProfile } = useMutationUserInfo();
  const { mutate: fetchTasksStatus } = useMutationTasksStatus();
  const { mutate: fetchPowerVoteI } = useMutationPowerVoteInfo();
  const { mutate: fetchUserSubmittedList } = useMutationUserSubmittedList();
  const { mutate: fetchUserNotSubmittedList } = useFetchUserNotSubmittedList();

  const accessToken = useRecoilValue(accessTokenAtom);

  return useCallback(() => {
    if (!accessToken) return;
    fetchProfile();
    fetchTasksStatus();
    fetchPowerVoteI();
    fetchUserSubmittedList();
    fetchUserNotSubmittedList();
  }, [accessToken, fetchProfile, fetchTasksStatus, fetchPowerVoteI, fetchUserSubmittedList, fetchUserNotSubmittedList]);
};

export const useRemoveGlobalState = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setTasksStatus = useSetRecoilState(arcanaTasksStatusAtom);
  const setPowerVote = useSetRecoilState(arcanaPowerVoteAtom);
  const setArcanaSubmittedList = useSetRecoilState(arcanaSubmittedListAtom);
  const setArcanaNotSubmittedListAtom = useSetRecoilState(arcanaNotSubmittedListAtom);
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  return useCallback(() => {
    removeAccessToken();
    setAccessToken(undefined);
    setUserInfo(undefined);
    setTasksStatus(undefined);
    setPowerVote(undefined);
    console.log('remove');
    setArcanaSubmittedList([]);
    setArcanaNotSubmittedListAtom([]);
  }, [setAccessToken, setUserInfo, setTasksStatus, setPowerVote, setArcanaSubmittedList, setArcanaNotSubmittedListAtom]);
};

export const useLogoutCallback = () => {
  const removeGlobalState = useRemoveGlobalState();
  const { disconnect } = useDisconnect();

  return useCallback(() => {
    removeGlobalState();
    disconnect?.();
  }, [disconnect, removeGlobalState]);
};
