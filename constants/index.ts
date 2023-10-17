import { CHAIN_ID, GenesisClaim } from '@/constants/enum';

export const BADGE_CONTRACT_ADDRESS = '0xb034d6bA0b6593Fa5107C6a55042b67746d44605';
export const GALXE_LIST = 'https://galxe.com/mynfts/list';
export const GALXE_P12_SPACE = 'https://galxe.com/P12/';

export const GenesisClaim_TYPE = {
  [GenesisClaim.Unclaimed]: 'Eligible',
  [GenesisClaim.Pending]: 'Pending',
  [GenesisClaim.Claimed]: 'Obtained',
};

export const ARCANA_CHAIN_ID: CHAIN_ID = 56;
export const COLLAB_CHAIN_ID: CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_COLLAB_CHAIN_ID || '56');

export * from './enum';
export * from './bages';
export * from './storage';

export const inputRegex = /^\d*(?:\\[.])?\d*$/;

// Particle Network config
export const PARTICLE_PROJECT_ID = process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID ?? '';
export const PARTICLE_CLIENT_KEY = process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY ?? '';
export const PARTICLE_SERVER_KEY = process.env.NEXT_PUBLIC_PARTICLE_SERVER_KEY ?? '';
export const PARTICLE_APP_ID = process.env.NEXT_PUBLIC_PARTICLE_APP_ID ?? '';

export const ARCANA_SOCIAL_LINKS = {
  twitter: 'https://twitter.com/_p12_',
  discord: 'https://discord.gg/p12',
  telegram: 'https://t.me/project_twelve',
  discordFAQ: 'https://discord.com/channels/838128624459972678/1138348481254264832',
  youtube: 'https://www.youtube.com/@_p12_',
  landingSite: 'https://p12.network/',
};
