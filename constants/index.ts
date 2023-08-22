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

export type BadgeInfo = {
  campaign: string;
  rarity?: string;
  type: string;
  polygonName: string;
  BNBChainName: string;
  polygonImage: string;
  BNBChainImage?: string;
  // equal P2 amount
};

export const P12_COMMUNITY_BADGE: Record<string, BadgeInfo> = {
  GC6YGUUpaT: {
    campaign: 'GC6YGUUpaT',
    type: 'Common',
    polygonName: 'P12 Discord Game',
    BNBChainName: 'P12 Discord Game',
    polygonImage: 'https://cdn.galxe.com/galaxy/assets/projecttwelve/1651069585718037346.png',
  },
  GCj44UtwmA: {
    campaign: 'GCj44UtwmA',
    type: 'Common',
    polygonName: 'P12 x MW GameJam 2022 Badge',
    BNBChainName: 'P12 x MW GameJam 2022 Badge',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/avatar/0x47872c824dcb2b3a4d23f06077242ca5a614f1ed-1655800961.gif',
  },
  GCWbWUtGMv: {
    campaign: 'GCWbWUtGMv',
    type: 'Common',
    polygonName: 'P12 Best Supporter [White Rarity]',
    BNBChainName: 'P12 Best Supporter [White Rarity]',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/p12/1661915813729798311.png?optimizer=image&width=800&quality=100',
  },
  GC8tsUUnhC: {
    campaign: 'GC8tsUUnhC',
    type: 'Common',
    polygonName: 'P12 Best Supporter [White Rarity]',
    BNBChainName: 'P12 Best Supporter [White Rarity]',
    polygonImage:
      'https://cdn-2.galxe.com/galaxy/images/projecttwelve/1650617344202809443.png?optimizer=image&width=800&quality=100',
  },
  GCBmbUUvgc: {
    campaign: 'GCBmbUUvgc',
    type: 'Common',
    polygonName: 'P12 Best Supporter [White Rarity]',
    BNBChainName: 'P12 Best Supporter [White Rarity]',
    polygonImage:
      'https://cdn.galxe.com/galaxy/assets/projecttwelve/1651069585718037346.png?optimizer=image&width=800&quality=100',
  },
  GCB7bUUkWH: {
    campaign: 'GCB7bUUkWH',
    type: 'Common',
    polygonName: 'P12 Best Supporter [White Rarity]',
    BNBChainName: 'P12 Best Supporter [White Rarity]',
    polygonImage: 'https://cdn.galxe.com/galaxy/assets/projecttwelve/1653364450325322173.gif',
  },
  GC1pbUUMCi: {
    campaign: 'GC1pbUUMCi',
    type: 'Uncommon',
    polygonName: 'P12 Best Supporter [Green Rarity]',
    BNBChainName: 'P12 Best Supporter [Green Rarity]',
    polygonImage: 'https://cdn.galxe.com/galaxy/p12/3c4afc9b-57a6-4b83-ae3a-397b5f24c085.gif',
  },
  GCypPUUFQR: {
    campaign: 'GCypPUUFQR',
    type: 'Uncommon',
    polygonName: 'P12 Best Supporter [Green Rarity]',
    BNBChainName: 'P12 Best Supporter [Green Rarity]',
    polygonImage:
      'https://cdn-2.galxe.com/galaxy/images/projecttwelve/1650618474676411164.png?optimizer=image&width=800&quality=100',
  },
  GCXBcUUM56: {
    campaign: 'GCXBcUUM56',
    type: 'Rare',
    polygonName: 'P12 Dream Weaver',
    BNBChainName: 'P12 Dream Weaver',
    polygonImage: 'https://cdn.galxe.com/galaxy/assets/projecttwelve/1652598796917895727.gif',
  },
  GCdRtUtc3W: {
    campaign: 'GCdRtUtc3W',
    type: 'Rare',
    polygonName: 'P12 Best Supporter [Blue Rarity]',
    BNBChainName: 'P12 Best Supporter [Blue Rarity]',
    polygonImage:
      'https://cdn.galxe.com/galaxy/assets/projecttwelve/1654670997542549058.png?optimizer=image&width=800&quality=100',
  },
  GCbVwUt9SD: {
    campaign: 'GCbVwUt9SD',
    type: 'Epic',
    polygonName: 'P12 StarMaker',
    BNBChainName: 'P12 StarMaker',
    polygonImage: 'https://cdn.galxe.com/galaxy/assets/projecttwelve/1655003642820587877.gif',
  },
  GC8NPUUqJC: {
    campaign: 'GC8NPUUqJC',
    type: 'Epic',
    polygonName: 'P12 Best Supporter [Purple Rarity]',
    BNBChainName: 'P12 Best Supporter [Purple Rarity]',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/projecttwelve/1650619688807604651.gif',
  },
  GC1abUUnxU: {
    campaign: 'GC1abUUnxU',
    type: 'Epic',
    polygonName: 'P12 Best Supporter [Purple Rarity]',
    BNBChainName: 'P12 Best Supporter [Purple Rarity]',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/projecttwelve/1650619688807604651.gif',
  },
  // GCu9bUUxXo: {
  //   campaign: 'GCu9bUUxXo',
  //   type: 'Epic',
  //   polygonName: 'P12 First Gleam Event [Purple Rarity]',
  //   BNBChainName: 'P12 First Gleam Event [Purple Rarity]',
  //   polygonImage: 'https://cdn-2.galxe.com/galaxy/images/p12/1649574994798648575.jpg?optimizer=image&width=800&quality=100',
  // },
  // test
  // GC7QrU4ijW: {
  //   campaign: 'GC7QrU4ijW',
  //   type: 'Common',
  //   polygonName: 'Bridge test',
  //   BNBChainName: 'Bridge test',
  //   polygonImage: 'https://cdn.galxe.com/galaxy/p12/72697b78-0512-454e-b5b1-7c25cf099356.png',
  // },
};

export const P12_AMA_OAT_BADGE: Record<string, BadgeInfo> = {
  GC9ErUtrZN: {
    campaign: 'GC9ErUtrZN',
    type: 'Common',
    polygonName: 'Galxe Passport x P12',
    BNBChainName: 'Galxe Passport x P12',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/p12/1663159642435340771.gif',
  },
  GCPkMUt6uC: {
    campaign: 'GCPkMUt6uC',
    type: 'Common',
    polygonName: 'P12 x BNB Chain AMA Session',
    BNBChainName: 'P12 x BNB Chain AMA Session',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/p12/1665891973072684256.gif',
  },
  GCdFZUtN2T: {
    campaign: 'GCdFZUtN2T',
    type: 'Common',
    polygonName: 'P12 x Ambrus AMA Campaign',
    BNBChainName: 'P12 x Ambrus AMA Campaign',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/p12/1660194559480326424.gif',
  },
  GCmP7UtXdx: {
    campaign: 'GCmP7UtXdx',
    type: 'Common',
    polygonName: 'P12 x Revoland AMA Campaign',
    BNBChainName: 'P12 x Revoland AMA Campaign',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/p12/1662255786798438539.gif',
  },
  GCsJQUt6Xc: {
    campaign: 'GCsJQUt6Xc',
    type: 'Common',
    polygonName: 'P12 x Space ID Integration OAT',
    BNBChainName: 'P12 x Space ID Integration OAT',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/p12/1661315771979438039.gif',
  },
};

export const inputRegex = /^\d*(?:\\[.])?\d*$/;
