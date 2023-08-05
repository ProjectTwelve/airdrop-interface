import * as React from 'react';
import { providers } from 'ethers';
import { type PublicClient, usePublicClient } from 'wagmi';

export function publicClientToProvider(publicClient: PublicClient) {
  const { chain } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  return new providers.JsonRpcProvider(chain.rpcUrls.public.http[0], network);
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId });
  return React.useMemo(() => publicClientToProvider(publicClient), [publicClient]);
}
