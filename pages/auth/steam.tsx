import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function SteamAuth() {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query.secret_token && typeof query.secret_token === 'string') {
      window.localStorage.removeItem('secret_token');
      window.localStorage.setItem('secret_token', query.secret_token);
      window.localStorage.removeItem('secret_token');
      window.close();
    }
  }, [query]);

  return null;
}
