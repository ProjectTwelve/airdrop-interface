import { NFTLevel } from '../store/developer/state';

export const NFT_CONTRACT_ADDRESS = '0xb034d6bA0b6593Fa5107C6a55042b67746d44605';
export const GALAXY_LIST = 'https://galaxy.eco/mynfts/list';

const BADGE_ORANGE = process.env.NEXT_PUBLIC_BADGE_ORANGE || 'https://galaxy.eco/P12/campaign/GCt9JUUJCJ';
const BADGE_PURPLE = process.env.NEXT_PUBLIC_BADGE_PURPLE || 'https://galaxy.eco/P12/campaign/GCteJUUM7z';
const BADGE_BLUE = process.env.NEXT_PUBLIC_BADGE_BLUE || 'https://galaxy.eco/P12/campaign/GCi9CUUrni';
const BADGE_GREEN = process.env.NEXT_PUBLIC_BADGE_GREEN || 'https://galaxy.eco/P12/campaign/GCV4JUU7eR';

export const BADGES = {
  [NFTLevel.ORANGE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653656759076802901.gif',
    img: 'https://cdn1.p12.games/airdrop/img/badge_orange.png',
    claim: BADGE_ORANGE,
    title: 'P12 Genesis Badge [Orange Rarity]',
  },
  [NFTLevel.PURPLE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653654265642526889.gif',
    img: 'https://cdn1.p12.games/airdrop/img/badge_purple.png',
    claim: BADGE_PURPLE,
    title: 'P12 Genesis Badge [Purple Rarity]',
  },
  [NFTLevel.BLUE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653653761673395155.gif',
    img: 'https://cdn1.p12.games/airdrop/img/badge_blue.png',
    claim: BADGE_BLUE,
    title: 'P12 Genesis Badge [Blue Rarity]',
  },
  [NFTLevel.GREEN]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653653545770629768.gif',
    img: 'https://cdn1.p12.games/airdrop/img/badge_green.png',
    claim: BADGE_GREEN,
    title: 'P12 Genesis Badge [Green Rarity]',
  },
};
