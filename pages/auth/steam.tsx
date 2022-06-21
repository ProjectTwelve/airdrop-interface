import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { setLocalStorage } from '../../utils/storage';

export default function SteamAuth() {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query.secret_token) {
      setLocalStorage('secret_token', undefined);
      setLocalStorage('secret_token', query.secret_token);
      window.close();
    }
  }, [query]);

  return null;
}
