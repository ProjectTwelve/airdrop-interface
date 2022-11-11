import { useAccount, useContract, useContractRead, useNetwork, useProvider, useSigner } from 'wagmi';
import {
  ARCANA_ADDRESS,
  ARCANA_REWARD_ADDRESS,
  BABT_ADDRESSES,
  COLLAB_ADDRESS,
  FORWARDER_ADDRESS,
  ZERO_ADDRESS,
} from '../constants/addresses';
import BABT_ABI from '../abis/BABT.json';
import ARCANA_ABI from '../abis/ARCANA.json';
import FORWARDER_ABI from '../abis/FORWARDER.json';
import ARCANA_REWARD_ABI from '../abis/ARCANA_REWARD.json';
import COLLAB_ABI from '../abis/COLLAB.json';

export function useBABTBalanceOf({ address }: { address?: string }) {
  const { address: _address } = useAccount();
  const { chain } = useNetwork();
  const babtAddress = chain ? BABT_ADDRESSES[chain.id] : undefined;

  return useContractRead({
    address: babtAddress || ZERO_ADDRESS,
    abi: BABT_ABI,
    functionName: 'balanceOf',
    args: [address ?? _address],
  });
}

export function useArcanaContract() {
  const provider = useProvider();
  const { data: signer } = useSigner();

  return useContract({
    address: ARCANA_ADDRESS,
    abi: ARCANA_ABI,
    signerOrProvider: signer ?? provider,
  });
}

export function useForwarderContract() {
  const provider = useProvider();
  const { data: signer } = useSigner();

  return useContract({
    address: FORWARDER_ADDRESS,
    abi: FORWARDER_ABI,
    signerOrProvider: signer ?? provider,
  });
}

export function useArcanaRewardContract() {
  const provider = useProvider();
  const { data: signer } = useSigner();

  return useContract({
    address: ARCANA_REWARD_ADDRESS,
    abi: ARCANA_REWARD_ABI,
    signerOrProvider: signer ?? provider,
  });
}

export function useCollabContract() {
  const provider = useProvider();
  const { data: signer } = useSigner();

  return useContract({
    address: COLLAB_ADDRESS,
    abi: COLLAB_ABI,
    signerOrProvider: signer ?? provider,
  });
}
