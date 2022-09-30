import { useAccount, useContract, useContractRead, useNetwork, useProvider, useSigner } from 'wagmi';
import { ARCANA_ADDRESS, BABT_ADDRESSES, FORWARDER_ADDRESS, ZERO_ADDRESS } from '../constants/addresses';
import BABT_ABI from '../abis/BABT.json';
import ARCANA_ABI from '../abis/ARCANA.json';
import FORWARDER_ABI from '../abis/FORWARDER.json';

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

export function useArcanaContract() {
  const provider = useProvider();
  const { data: signer } = useSigner();

  return useContract({
    addressOrName: ARCANA_ADDRESS,
    contractInterface: ARCANA_ABI,
    signerOrProvider: signer ?? provider,
  });
}

export function useForwarderContract() {
  const provider = useProvider();
  const { data: signer } = useSigner();

  return useContract({
    addressOrName: FORWARDER_ADDRESS,
    contractInterface: FORWARDER_ABI,
    signerOrProvider: signer ?? provider,
  });
}
