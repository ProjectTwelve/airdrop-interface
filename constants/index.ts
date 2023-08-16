import { CHAIN_ID, NFT_CLAIM } from '@/constants/enum';

export const BADGE_CONTRACT_ADDRESS = '0xb034d6bA0b6593Fa5107C6a55042b67746d44605';
export const GALXE_LIST = 'https://galxe.com/mynfts/list';
export const GALXE_P12_SPACE = 'https://galxe.com/P12/';

export const NFT_CLAIM_TYPE = {
  [NFT_CLAIM.UNCLAIMED]: 'Eligible',
  [NFT_CLAIM.PENDING]: 'Pending',
  [NFT_CLAIM.CLAIMED]: 'Obtained',
};

export const ARCANA_CHAIN_ID: CHAIN_ID = 56;
export const COLLAB_CHAIN_ID: CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_COLLAB_CHAIN_ID || '56');

export * from './enum';
export * from './bages';
export * from './storage';
