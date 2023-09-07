import instance from '@/lib/request-nest';
import { fetchLogin, fetchUserInfo } from '@/lib/api-nest';
import { LoginParams } from '@/lib/types-nest';
import { useMutation, useQuery } from '@tanstack/react-query';
import { setAccessToken } from '@/utils/authorization';
import { useAccount } from 'wagmi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenAtom, userInfoAtom } from '@/store/user/state';

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
