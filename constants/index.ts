export const BADGE_CONTRACT_ADDRESS = '0xb034d6bA0b6593Fa5107C6a55042b67746d44605';
export const GALXE_LIST = 'https://galxe.com/mynfts/list';
export const GALXE_P12_SPACE = 'https://galxe.com/P12/';

export const STORAGE_KEY = {
  INVITE_CODE: 'invite_code',
  INVITE_TIPS_CLICK: 'invite_tips_click',
  INVITE_BTN_CLICK: 'invite_btn_click',
  SECRET_TOKEN: 'secret_token',
  SOCIAL_MEDIA_CLICK: 'social_media_click',
  GAMER_CLAIMED_MAP: 'gamer_claimed_map_01',
  DEV_EMAIL_SUBMIT: 'dev_email_submit',
  DEV_EMAIL_DAILY: 'dev_email_daily',
  COLLAB_FIRST_CLAIM_MAP: 'collab_first_claim_map',
};

export enum NFT_CLAIM {
  UNCLAIMED = 0,
  PENDING,
  CLAIMED,
}

export enum DEV_NFT_LEVEL {
  ORANGE = 0,
  PURPLE,
  BLUE,
  GREEN,
}

export enum GAMER_NFT_LEVEL {
  ORANGE = 0,
  PURPLE,
  BLUE,
  GREEN,
  WHITE,
  REKT,
}

export const NFT_CLAIM_TYPE = {
  [NFT_CLAIM.UNCLAIMED]: 'Eligible',
  [NFT_CLAIM.PENDING]: 'Pending',
  [NFT_CLAIM.CLAIMED]: 'Obtained',
};

export const DEV_BADGES = {
  [DEV_NFT_LEVEL.ORANGE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653656759076802901.gif',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_orange.png',
    claim: 'https://galxe.com/P12/campaign/GCt9JUUJCJ',
    title: 'P12 Genesis Badge [Orange Rarity]',
  },
  [DEV_NFT_LEVEL.PURPLE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653654265642526889.gif',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_purple.png',
    claim: 'https://galxe.com/P12/campaign/GCteJUUM7z',
    title: 'P12 Genesis Badge [Purple Rarity]',
  },
  [DEV_NFT_LEVEL.BLUE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653653761673395155.gif',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_blue.png',
    claim: 'https://galxe.com/P12/campaign/GCi9CUUrni',
    title: 'P12 Genesis Badge [Blue Rarity]',
  },
  [DEV_NFT_LEVEL.GREEN]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653653545770629768.gif',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_green.png',
    claim: 'https://galxe.com/P12/campaign/GCV4JUU7eR',
    title: 'P12 Genesis Badge [Green Rarity]',
  },
};

export const GAMER_BADGES = {
  [GAMER_NFT_LEVEL.ORANGE]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_orange.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_orange.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_orange_2.png',
    claim: 'https://galxe.com/P12/campaign/GCZ74Utyqp',
    title: 'P12 XII-PLORER Badge [Orange Rarity]',
  },
  [GAMER_NFT_LEVEL.PURPLE]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_purple.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_purple.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_purple_2.png',
    claim: 'https://galxe.com/P12/campaign/GCZm4UtEeE',
    title: 'P12 XII-PLORER Badge [Purple Rarity]',
  },
  [GAMER_NFT_LEVEL.BLUE]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_blue.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_blue.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_blue_2.png',
    claim: 'https://galxe.com/P12/campaign/GCuBwUtL6P',
    title: 'P12 XII-PLORER Badge [Blue Rarity]',
  },
  [GAMER_NFT_LEVEL.GREEN]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_green.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_green.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_green_2.png',
    claim: 'https://galxe.com/P12/campaign/GCrkwUtqiz',
    title: 'P12 XII-PLORER Badge [Green Rarity]',
  },
  [GAMER_NFT_LEVEL.WHITE]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_white.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_common.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_common_2.webp',
    claim: 'https://galxe.com/P12/campaign/GCirwUtCCS',
    title: 'P12 XII-PLORER Badge [WHITE Rarity]',
  },
  [GAMER_NFT_LEVEL.REKT]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_rekt.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_rekt.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_rekt_2.webp',
    claim: 'https://galxe.com/P12/campaign/GCuagUtMfG',
    title: 'P12 XII-PLORER Badge [REKT Rarity]',
  },
};

export enum COLLAB_TIME_STATUS {
  UPCOMING = 'Upcoming',
  JOIN = 'Join',
  ALLOCATE = 'Allocate',
  CLAIM = 'Claim',
  CLOSED = 'Closed',
}

export enum COLLAB_NFT_STATUS {
  UN_CONNECT = 0,
  IS_HOLDER,
  NOT_HOLDER,
}

export enum CHAIN_ID {
  MAINNET = 1,
  BSC_MAINNET = 56,
  BSC_TESTNET = 97,
}

export const ARCANA_CHAIN_ID: CHAIN_ID = 56;
export const COLLAB_CHAIN_ID: CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_COLLAB_CHAIN_ID || '56');
