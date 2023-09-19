import { useQuery } from '@tanstack/react-query';
import { GenesisNFTType } from '@/constants';
import { fetchGenesisNFT } from '@/lib/api-nest';

export function useFetchGenesisNFT({ address, type }: { address?: string; type?: GenesisNFTType }) {
  return useQuery(['fetch_genesis_nft', address, type], () => fetchGenesisNFT({ address, type }), {
    enabled: !!address,
    select: (data) => (data.code === 200 ? data.data : undefined),
  });
}
