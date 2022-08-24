import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useNetwork, useProvider } from 'wagmi';
// @ts-ignore
import SID, { getSidAddress } from '@siddomains/sidjs';

export const useSIDName = ({ address }: { address?: string }) => {
  const router = useRouter();
  const [SIDName, setSIDName] = useState<string | null>(null);
  const provider = useProvider();
  const { chain } = useNetwork();
  const isAuthPage = useMemo(() => router.pathname === '/auth/steam', [router.pathname]);

  useEffect(() => {
    if (isAuthPage) return;
    if (!chain || !provider) return;
    const sid = new SID({ provider, sidAddress: getSidAddress(chain?.id) });
    sid
      .getName(address)
      .then((res: { name: string | null }) => {
        setSIDName(res.name);
      })
      .catch((error: Error) => console.log('Error: ', error));
  }, [address, chain, provider, isAuthPage]);

  return useMemo(() => ({ SIDName }), [SIDName]);
};
