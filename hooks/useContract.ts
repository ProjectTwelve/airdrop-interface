import { useAccount, useContractRead, useNetwork } from 'wagmi';
import { BABT_ADDRESSES, ZERO_ADDRESS } from '../constants/addresses';
import BABT_ABI from '../abis/BABT.json';

export function useBABTBalanceOf({ address }: { address?: string }) {
  const { address: _address } = useAccount();
  const { chain } = useNetwork();
  const babtAddress = chain ? BABT_ADDRESSES[chain.id] : undefined;

  return useContractRead({
    addressOrName: babtAddress || ZERO_ADDRESS,
    contractInterface: BABT_ABI,
    functionName: 'balanceOf',
    args: address ?? _address,
  });
}
