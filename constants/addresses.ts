import { CHAIN_ID } from './index';
import { Address } from 'wagmi';

type AddressMap = { [chainId: number]: Address };

export const BABT_ADDRESSES: AddressMap = {
  [CHAIN_ID.BSC_MAINNET]: '0x2B09d47D550061f995A3b5C6F0Fd58005215D7c8',
  [CHAIN_ID.BSC_TESTNET]: '0x571db18fff31378E772192352aD207b731827672',
};

export const COLLAB_ADDRESS = '0x15719A5A6CB3794342d86912280cb8EB3BA54360';

export const BADGE_BRIDGE_ADDRESS = '0x1e93e00143065e0CCFD4eA042b8278882b721017';
