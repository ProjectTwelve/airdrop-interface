import instance from '@/lib/request-nest';
import { fetchLogin } from '@/lib/api-nest';
import { LoginParams } from '@/lib/types-nest';
import { useMutation } from '@tanstack/react-query';
import { setAccessToken } from '@/utils/authorization';

export const useMutationLogin = () => {
  return useMutation({
    mutationFn: (params: LoginParams) => fetchLogin(params),
    onSuccess: ({ code, data }) => {
      if (code === 200) {
        setAccessToken(data.accessToken);
        // TODO: set user info
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
      }
    },
  });
};
