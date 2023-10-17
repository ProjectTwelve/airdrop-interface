import { useQuery } from '@tanstack/react-query';
import { GenesisRole } from '@/constants';
import { fetchGenesisNFT } from '@/lib/api-nest';

export function useFetchGenesisNFT({ address, role }: { address?: string; role?: GenesisRole }) {
  return useQuery(['fetch_genesis_nft', address, role], () => fetchGenesisNFT({ address, role }), {
    refetchOnWindowFocus: true,
    enabled: !!address,
    select: (data) => (data.code === 200 ? data.data : undefined),
  });
}
