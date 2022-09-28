import { useAccount, useContract, useContractRead, useNetwork, useProvider, useSigner } from 'wagmi';
import { ARCANA_ADDRESSES, BABT_ADDRESSES, FORWARDER_ADDRESSES, ZERO_ADDRESS } from '../constants/addresses';
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
  const { chain } = useNetwork();
  const { data: signer } = useSigner();

  return useContract({
    addressOrName: chain ? ARCANA_ADDRESSES[chain.id] : ZERO_ADDRESS,
    contractInterface: ARCANA_ABI,
    signerOrProvider: signer ?? provider,
  });
}

export function useForwarderContract() {
  const provider = useProvider();
  const { chain } = useNetwork();
  const { data: signer } = useSigner();

  return useContract({
    addressOrName: chain ? FORWARDER_ADDRESSES[chain.id] : ZERO_ADDRESS,
    contractInterface: FORWARDER_ABI,
    signerOrProvider: signer ?? provider,
  });
}
