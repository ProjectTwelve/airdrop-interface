import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { STORAGE_KEY } from '@/constants';
import { getLocalStorage } from '@/utils/storage';

export default function SteamAuth() {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query.secret_token && typeof query.secret_token === 'string') {
      const code = getLocalStorage(STORAGE_KEY.INVITE_CODE);
      if (isMobile) {
        router.push({ pathname: '/dashboard', query: code ? { ...query, code } : query }).then();
        return;
      }
      window.localStorage.removeItem(STORAGE_KEY.SECRET_TOKEN);
      window.localStorage.setItem(STORAGE_KEY.SECRET_TOKEN, query.secret_token);
      window.localStorage.removeItem(STORAGE_KEY.SECRET_TOKEN);
      window.close();
    }
  }, [query, router]);

  return null;
}
