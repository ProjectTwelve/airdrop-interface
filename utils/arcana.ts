import Hash from 'ipfs-only-hash';
import { ARCANA_CHAIN_ID } from '../constants';

export function getArcanaSignTypeData(contract: any, tx: any, nonce: any) {
  return {
    domain: {
      name: 'MinimalForwarder',
      version: '0.0.1',
      chainId: ARCANA_CHAIN_ID,
      verifyingContract: contract.address,
    },
    types: {
      ForwardRequest: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'gas', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'data', type: 'bytes' },
      ],
    },
    value: {
      from: tx.from,
      to: tx.to,
      value: 0,
      gas: tx.gasLimit,
      nonce: nonce.toNumber(),
      data: tx.data,
    },
  };
}

export async function getIpfsAnswer(data: any): Promise<string> {
  return await Hash.of(JSON.stringify(data));
}
