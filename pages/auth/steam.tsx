import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { getLocalStorage } from '../../utils/storage';

export default function SteamAuth() {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query.secret_token && typeof query.secret_token === 'string') {
      const code = getLocalStorage('invite_code');
      if (isMobile) {
        router.push({ pathname: '/gamer', query: code ? { ...query, code } : query }).then();
        return;
      }
      window.localStorage.removeItem('secret_token');
      window.localStorage.setItem('secret_token', query.secret_token);
      window.localStorage.removeItem('secret_token');
      window.close();
    }
  }, [query, router]);

  return null;
}
