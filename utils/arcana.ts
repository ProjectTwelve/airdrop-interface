import { ARCANA_CHAIN_ID } from '../constants';
import { PredictionAnswer } from '../store/arcana/state';
import Hash from 'ipfs-only-hash';
import { objectSortByKey } from './index';

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

export async function getIpfsAnswer(answer: PredictionAnswer[]): Promise<string> {
  const data: any[] = [];
  answer.forEach((item) => {
    if (item.answer && item.answer.length > 0) {
      data.push({ predictionCode: item.predictionCode, answer: [objectSortByKey(item.answer[0])] });
    }
  });
  return await Hash.of(JSON.stringify({ answers: data }));
}
