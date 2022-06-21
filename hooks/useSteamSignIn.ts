import { useCallback, useState } from 'react';
import { useEvent } from 'react-use';
import Cookies from 'js-cookie';

export const useSteamSignIn = (): [secretToken: string | undefined, signInCallback: () => void] => {
  const [steamSecretToken, setSteamSecretToken] = useState<string>();

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

  return [steamSecretToken, steamSignInCallback];
};
