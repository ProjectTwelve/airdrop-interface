import { useCallback, useEffect, useState } from 'react';
import { useEvent } from 'react-use';
import { useBindSteamAccount } from './gamer';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export const useSteamSignIn = (): [signInCallback: () => void] => {
  const { data: account } = useAccount();
  const [steamSecretToken, setSteamSecretToken] = useState<string>();
  const mutation = useBindSteamAccount();
  const router = useRouter();

  const steamSignInCallback = useCallback(() => {
    const prefixURL = process.env.NEXT_PUBLIC_API_PREFIX;

    window.open(
      prefixURL + '/api/steam/auth',
      '_blank',
      'scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=750,height=650',
    );
  }, []);

  useEvent('storage', (event: StorageEvent) => {
    if (!event.newValue) return;
    if (event.key === 'secret_token') {
      const secretToken = event.newValue;
      setSteamSecretToken(secretToken);
      Cookies.set('secret_token', secretToken);
    }
  });

  useEffect(() => {
    if (!account?.address || !steamSecretToken) return;
    const { code } = router.query;
    mutation.mutate({
      wallet_address: account.address,
      secret_token: steamSecretToken,
      referral_code: code as string,
    });
    setSteamSecretToken(undefined);
  }, [account, mutation, router.query, steamSecretToken]);

  return [steamSignInCallback];
};
