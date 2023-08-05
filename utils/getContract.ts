import { Address, erc20ABI } from 'wagmi';
import { Abi, PublicClient, WalletClient, getContract as viemGetContract } from 'viem';

export const getContract = <TAbi extends Abi | unknown[]>({
  abi,
  address,
  publicClient,
  walletClient,
}: {
  abi: TAbi;
  address: Address;
  walletClient?: WalletClient;
  publicClient?: PublicClient;
}) => {
  const c = viemGetContract({
    abi,
    address,
    publicClient: publicClient,
    walletClient: walletClient,
  });
  return {
    ...c,
    account: walletClient?.account,
    chain: walletClient?.chain,
  };
};

export const getErc20Contract = (address: Address, walletClient?: WalletClient) => {
  return getContract({ abi: erc20ABI, address, walletClient });
};
