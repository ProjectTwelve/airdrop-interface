import { useEffect, useMemo, useState } from 'react';
import { useNetwork } from 'wagmi';
import { useRouter } from 'next/router';
import { useEthersProvider } from '../utils/ethers';
// @ts-ignorez
import SID, { getSidAddress } from '@siddomains/sidjs';

export const useSIDName = ({ address }: { address?: string }) => {
  const router = useRouter();
  const [SIDName, setSIDName] = useState<string | null>(null);
  const provider = useEthersProvider();
  const { chain } = useNetwork();
  const isAuthPage = useMemo(() => router.pathname === '/auth/steam', [router.pathname]);

  useEffect(() => {
    if (isAuthPage) return;
    if (!chain || !provider) return;
    try {
      const sid = new SID({ provider, sidAddress: getSidAddress(chain?.id) });
      sid
        .getName(address)
        .then((res: { name: string | null }) => {
          setSIDName(res.name);
        })
        .catch((error: Error) => console.log('Error: ', error));
    } catch (e) {
      console.log('Error', e);
    }
  }, [address, chain, provider, isAuthPage]);

  return useMemo(() => ({ SIDName }), [SIDName]);
};
