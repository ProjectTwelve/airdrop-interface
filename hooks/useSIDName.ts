import { useEffect, useMemo, useState } from 'react';
import { useNetwork, useProvider } from 'wagmi';
// @ts-ignore
import SID, { getSidAddress } from '@siddomains/sidjs';

export const useSIDName = ({ address }: { address?: string }) => {
  const [SIDName, setSIDName] = useState<string | null>(null);
  const provider = useProvider();
  const { chain } = useNetwork();

  useEffect(() => {
    if (!chain || !provider) return;
    const sid = new SID({ provider, sidAddress: getSidAddress(chain?.id) });
    sid.getName(address).then((res: { name: string | null }) => {
      setSIDName(res.name);
    });
  }, [address, chain, provider]);

  return useMemo(() => ({ SIDName }), [SIDName]);
};
