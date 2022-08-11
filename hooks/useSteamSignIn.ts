import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useEvent } from 'react-use';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import { useBindSteamAccount } from './gamer';
import { getLocalStorage } from '../utils/storage';
import { STORAGE_KEY } from '../constants';

export const useSteamSignIn = (): [signInCallback: () => void] => {
  const { address } = useAccount();
  const [steamSecretToken, setSteamSecretToken] = useState<string>();
  const mutation = useBindSteamAccount();
  const router = useRouter();

  const steamSignInCallback = useCallback(() => {
    const authURL = process.env.NEXT_PUBLIC_API_PREFIX + '/api/steam/auth';
    if (isMobile) {
      window.location.href = authURL;
      return;
    }
    window.open(authURL, '_blank', 'scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=750,height=650');
  }, []);

  useEvent('storage', (event: StorageEvent) => {
    if (!event.newValue) return;
    if (event.key === STORAGE_KEY.SECRET_TOKEN) {
      const secretToken = event.newValue;
      setSteamSecretToken(secretToken);
      Cookies.set(STORAGE_KEY.SECRET_TOKEN, secretToken);
    }
  });

  useEffect(() => {
    // listen to mobile token
    const { secret_token } = router.query;
    if (!secret_token) return;
    setSteamSecretToken(secret_token as string);
    Cookies.set(STORAGE_KEY.SECRET_TOKEN, secret_token);
    const queryParams = { ...router.query };
    delete queryParams.secret_token;
    router.replace({ pathname: router.pathname, query: queryParams }).then();
  }, [router, router.pathname, router.query]);

  useEffect(() => {
    if (!address || !steamSecretToken) return;
    const { code } = router.query;
    const localCode = getLocalStorage(STORAGE_KEY.INVITE_CODE);
    mutation.mutate({
      wallet_address: address,
      secret_token: steamSecretToken,
      referral_code: code || localCode,
    });
    setSteamSecretToken(undefined);
  }, [address, mutation, router.query, steamSecretToken]);

  return [steamSignInCallback];
};
