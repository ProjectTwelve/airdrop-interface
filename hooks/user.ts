import { fetchLogin, fetchPowerVote, fetchUserInfo } from '@/lib/api-nest';
import instance from '@/lib/request-nest';
import { LoginParams } from '@/lib/types-nest';
import {
  arcanaInvitationInfoAtom,
  arcanaNotSubmittedListAtom,
  arcanaPowerVoteAtom,
  arcanaSubmittedListAtom,
  arcanaTasksStatusAtom,
} from '@/store/arcana/state';
import { userPowerLevelAtom } from '@/store/dashboard/state';
import { accessTokenAtom, userInfoAtom } from '@/store/user/state';
import { removeAccessToken, setAccessToken } from '@/utils/authorization';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useAccount, useDisconnect } from 'wagmi';
import { useFetchUserNotSubmittedList, useMutationUserSubmittedList } from './dashboard/creation';
import { useFetchArcanaInvitationInfo } from './dashboard/referral';
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
  const { refetch: refetchArcanaInviteInfo } = useFetchArcanaInvitationInfo();

  const accessToken = useRecoilValue(accessTokenAtom);

  return useCallback(() => {
    if (!accessToken) return;
    fetchProfile();
    fetchTasksStatus();
    fetchPowerVoteI();
    fetchUserSubmittedList();
    fetchUserNotSubmittedList();
    refetchArcanaInviteInfo();
  }, [
    accessToken,
    fetchProfile,
    fetchTasksStatus,
    fetchPowerVoteI,
    fetchUserSubmittedList,
    fetchUserNotSubmittedList,
    refetchArcanaInviteInfo,
  ]);
};

export const useRemoveGlobalState = () => {
  const resetUserInfo = useResetRecoilState(userInfoAtom);
  const resetTasksStatus = useResetRecoilState(arcanaTasksStatusAtom);
  const resetPowerVote = useResetRecoilState(arcanaPowerVoteAtom);
  const resetArcanaSubmittedList = useResetRecoilState(arcanaSubmittedListAtom);
  const resetArcanaNotSubmittedListAtom = useResetRecoilState(arcanaNotSubmittedListAtom);
  const resetAccessToken = useResetRecoilState(accessTokenAtom);
  const resetUserPowerLevel = useResetRecoilState(userPowerLevelAtom);
  const resetInviteInfo = useResetRecoilState(arcanaInvitationInfoAtom);

  return useCallback(() => {
    removeAccessToken();
    resetUserInfo();
    resetTasksStatus();
    resetPowerVote();
    resetArcanaSubmittedList();
    resetArcanaNotSubmittedListAtom();
    resetAccessToken();
    resetUserPowerLevel();
    resetInviteInfo();
  }, [
    resetAccessToken,
    resetArcanaNotSubmittedListAtom,
    resetArcanaSubmittedList,
    resetInviteInfo,
    resetPowerVote,
    resetTasksStatus,
    resetUserInfo,
    resetUserPowerLevel,
  ]);
};

export const useLogoutCallback = () => {
  const removeGlobalState = useRemoveGlobalState();
  const { disconnect } = useDisconnect();

  return useCallback(() => {
    removeGlobalState();
    disconnect?.();
  }, [disconnect, removeGlobalState]);
};
