import { DEV_NFT_LEVEL } from '../store/developer/state';
import { GAMER_NFT_LEVEL } from '../store/gamer/state';

export const DEV_NFT_CONTRACT_ADDRESS = '0xb034d6bA0b6593Fa5107C6a55042b67746d44605';
export const GAMER_NFT_CONTRACT_ADDRESS = '0xb034d6bA0b6593Fa5107C6a55042b67746d44605';
export const GALAXY_LIST = 'https://galaxy.eco/mynfts/list';

const DEV_BADGE_ORANGE = process.env.NEXT_PUBLIC_DEV_BADGE_ORANGE || 'https://galaxy.eco/P12/campaign/GCt9JUUJCJ';
const DEV_BADGE_PURPLE = process.env.NEXT_PUBLIC_DEV_BADGE_PURPLE || 'https://galaxy.eco/P12/campaign/GCteJUUM7z';
const DEV_BADGE_BLUE = process.env.NEXT_PUBLIC_DEV_BADGE_BLUE || 'https://galaxy.eco/P12/campaign/GCi9CUUrni';
const DEV_BADGE_GREEN = process.env.NEXT_PUBLIC_DEV_BADGE_GREEN || 'https://galaxy.eco/P12/campaign/GCV4JUU7eR';

const GAMER_BADGE_ORANGE = process.env.NEXT_PUBLIC_GAMER_BADGE_ORANGE || 'https://galaxy.eco/P12/campaign/GCt9JUUJCJ';
const GAMER_BADGE_PURPLE = process.env.NEXT_PUBLIC_GAMER_BADGE_PURPLE || 'https://galaxy.eco/P12/campaign/GCteJUUM7z';
const GAMER_BADGE_BLUE = process.env.NEXT_PUBLIC_GAMER_BADGE_BLUE || 'https://galaxy.eco/P12/campaign/GCi9CUUrni';
const GAMER_BADGE_GREEN = process.env.NEXT_PUBLIC_GAMER_BADGE_GREEN || 'https://galaxy.eco/P12/campaign/GCV4JUU7eR';
const GAMER_BADGE_WHITE = process.env.NEXT_PUBLIC_GAMER_BADGE_GREEN || 'https://galaxy.eco/P12/campaign/GCV4JUU7eR';

export const DEV_BADGES = {
  [DEV_NFT_LEVEL.ORANGE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653656759076802901.gif',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_orange.png',
    claim: DEV_BADGE_ORANGE,
    title: 'P12 Genesis Badge [Orange Rarity]',
  },
  [DEV_NFT_LEVEL.PURPLE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653654265642526889.gif',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_purple.png',
    claim: DEV_BADGE_PURPLE,
    title: 'P12 Genesis Badge [Purple Rarity]',
  },
  [DEV_NFT_LEVEL.BLUE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653653761673395155.gif',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_blue.png',
    claim: DEV_BADGE_BLUE,
    title: 'P12 Genesis Badge [Blue Rarity]',
  },
  [DEV_NFT_LEVEL.GREEN]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653653545770629768.gif',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_green.png',
    claim: DEV_BADGE_GREEN,
    title: 'P12 Genesis Badge [Green Rarity]',
  },
};

export const GAMER_BADGES = {
  [GAMER_NFT_LEVEL.ORANGE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653656759076802901.gif',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_orange.png',
    claim: GAMER_BADGE_ORANGE,
    title: 'P12 Genesis Badge [Orange Rarity]',
  },
  [GAMER_NFT_LEVEL.PURPLE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653654265642526889.gif',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_purple.png',
    claim: GAMER_BADGE_PURPLE,
    title: 'P12 Genesis Badge [Purple Rarity]',
  },
  [GAMER_NFT_LEVEL.BLUE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653653761673395155.gif',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_blue.png',
    claim: GAMER_BADGE_BLUE,
    title: 'P12 Genesis Badge [Blue Rarity]',
  },
  [GAMER_NFT_LEVEL.GREEN]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653653545770629768.gif',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_green.png',
    claim: GAMER_BADGE_GREEN,
    title: 'P12 Genesis Badge [Green Rarity]',
  },
  [GAMER_NFT_LEVEL.WHITE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653653545770629768.gif',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_green.png',
    claim: GAMER_BADGE_WHITE,
    title: 'P12 Genesis Badge [Green Rarity]',
  },
};
