import { AMA_NFT_CAMPAIGN_ID, COMMUNITY_NFT_CAMPAIGN_ID, DEV_NFT_LEVEL, GAMER_NFT_LEVEL } from '@/constants/enum';

export const DEV_BADGES = {
  [DEV_NFT_LEVEL.ORANGE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653656759076802901.gif',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_orange.png',
    claim: 'https://galxe.com/P12/campaign/GCt9JUUJCJ',
    title: 'P12 Genesis Badge [Orange Rarity]',
    rarity: 'Legendary',
    color: 'orange',
  },
  [DEV_NFT_LEVEL.PURPLE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653654265642526889.gif',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_purple.png',
    claim: 'https://galxe.com/P12/campaign/GCteJUUM7z',
    title: 'P12 Genesis Badge [Purple Rarity]',
    rarity: 'Epic',
    color: 'purple',
  },
  [DEV_NFT_LEVEL.BLUE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653653761673395155.gif',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_blue.png',
    claim: 'https://galxe.com/P12/campaign/GCi9CUUrni',
    title: 'P12 Genesis Badge [Blue Rarity]',
    rarity: 'Rare',
    color: 'blue',
  },
  [DEV_NFT_LEVEL.GREEN]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653653545770629768.gif',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_green.png',
    claim: 'https://galxe.com/P12/campaign/GCV4JUU7eR',
    title: 'P12 Genesis Badge [Green Rarity]',
    rarity: 'Uncommon',
    color: 'green',
  },
};

export const GAMER_BADGES = {
  [GAMER_NFT_LEVEL.ORANGE]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_orange.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_orange.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_orange_2.png',
    claim: 'https://galxe.com/P12/campaign/GCZ74Utyqp',
    title: 'P12 XII-PLORER Badge [Orange Rarity]',
    rarity: 'Legendary',
    color: 'orange',
  },
  [GAMER_NFT_LEVEL.PURPLE]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_purple.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_purple.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_purple_2.png',
    claim: 'https://galxe.com/P12/campaign/GCZm4UtEeE',
    title: 'P12 XII-PLORER Badge [Purple Rarity]',
    rarity: 'Epic',
    color: 'purple',
  },
  [GAMER_NFT_LEVEL.BLUE]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_blue.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_blue.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_blue_2.png',
    claim: 'https://galxe.com/P12/campaign/GCuBwUtL6P',
    title: 'P12 XII-PLORER Badge [Blue Rarity]',
    rarity: 'Rare',
    color: 'blue',
  },
  [GAMER_NFT_LEVEL.GREEN]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_green.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_green.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_green_2.png',
    claim: 'https://galxe.com/P12/campaign/GCrkwUtqiz',
    title: 'P12 XII-PLORER Badge [Green Rarity]',
    rarity: 'Uncommon',
    color: 'green',
  },
  [GAMER_NFT_LEVEL.WHITE]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_white.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_common.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_common_2.webp',
    claim: 'https://galxe.com/P12/campaign/GCirwUtCCS',
    title: 'P12 XII-PLORER Badge [WHITE Rarity]',
    rarity: 'Common',
    color: 'white',
  },
  [GAMER_NFT_LEVEL.REKT]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_rekt.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_rekt.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_rekt_2.webp',
    claim: 'https://galxe.com/P12/campaign/GCuagUtMfG',
    title: 'P12 XII-PLORER Badge [REKT Rarity]',
    rarity: 'Common',
    color: 'white',
  },
};

export interface NFTQueryResult {
  address: string;
  galxeBadges: GalxeBadge[];
  communityBadges: any;
}

export interface GalxeBadge {
  chainId: number;
  image: string;
  galxeCampaign?: GalxeCampaign;
  contractAddress: string;
  tokenId: number;
  count?: number;
}

export interface GalxeCampaign {
  cid: number;
  stringId: string;
  name: string;
  rarity: string;
  campaignType: 'AMA' | 'Community';
}

export type BadgeInfo = {
  campaign: string;
  rarity: string;
  polygonName: string;
  BNBChainName: string;
  polygonImage: string;
  BNBChainImage?: string;
  // equal P2 amount
};

export const P12_COMMUNITY_BADGE: Record<COMMUNITY_NFT_CAMPAIGN_ID, BadgeInfo> = {
  [COMMUNITY_NFT_CAMPAIGN_ID.GC6YGUUpaT]: {
    campaign: 'GC6YGUUpaT',
    rarity: 'Common',
    polygonName: 'P12 Discord Game',
    BNBChainName: 'P12 Discord Game',
    polygonImage: 'https://cdn.galxe.com/galaxy/assets/projecttwelve/1651069585718037346.png',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCj44UtwmA]: {
    campaign: 'GCj44UtwmA',
    rarity: 'Common',
    polygonName: 'P12 x MW GameJam 2022 Badge',
    BNBChainName: 'P12 x MW GameJam 2022 Badge',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/avatar/0x47872c824dcb2b3a4d23f06077242ca5a614f1ed-1655800961.gif',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCWbWUtGMv]: {
    campaign: 'GCWbWUtGMv',
    rarity: 'Common',
    polygonName: 'P12 Best Supporter [White Rarity]',
    BNBChainName: 'P12 Best Supporter [White Rarity]',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/p12/1661915813729798311.png?optimizer=image&width=800&quality=100',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GC8tsUUnhC]: {
    campaign: 'GC8tsUUnhC',
    rarity: 'Common',
    polygonName: 'P12 Best Supporter [White Rarity]',
    BNBChainName: 'P12 Best Supporter [White Rarity]',
    polygonImage:
      'https://cdn-2.galxe.com/galaxy/images/projecttwelve/1650617344202809443.png?optimizer=image&width=800&quality=100',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCBmbUUvgc]: {
    campaign: 'GCBmbUUvgc',
    rarity: 'Common',
    polygonName: 'P12 Best Supporter [White Rarity]',
    BNBChainName: 'P12 Best Supporter [White Rarity]',
    polygonImage:
      'https://cdn.galxe.com/galaxy/assets/projecttwelve/1651069585718037346.png?optimizer=image&width=800&quality=100',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCB7bUUkWH]: {
    campaign: 'GCB7bUUkWH',
    rarity: 'Common',
    polygonName: 'P12 Best Supporter [White Rarity]',
    BNBChainName: 'P12 Best Supporter [White Rarity]',
    polygonImage: 'https://cdn.galxe.com/galaxy/assets/projecttwelve/1653364450325322173.gif',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GC1pbUUMCi]: {
    campaign: 'GC1pbUUMCi',
    rarity: 'Uncommon',
    polygonName: 'P12 Best Supporter [Green Rarity]',
    BNBChainName: 'P12 Best Supporter [Green Rarity]',
    polygonImage: 'https://cdn.galxe.com/galaxy/p12/3c4afc9b-57a6-4b83-ae3a-397b5f24c085.gif',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCypPUUFQR]: {
    campaign: 'GCypPUUFQR',
    rarity: 'Uncommon',
    polygonName: 'P12 Best Supporter [Green Rarity]',
    BNBChainName: 'P12 Best Supporter [Green Rarity]',
    polygonImage:
      'https://cdn-2.galxe.com/galaxy/images/projecttwelve/1650618474676411164.png?optimizer=image&width=800&quality=100',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCXBcUUM56]: {
    campaign: 'GCXBcUUM56',
    rarity: 'Rare',
    polygonName: 'P12 Dream Weaver',
    BNBChainName: 'P12 Dream Weaver',
    polygonImage: 'https://cdn.galxe.com/galaxy/assets/projecttwelve/1652598796917895727.gif',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCdRtUtc3W]: {
    campaign: 'GCdRtUtc3W',
    rarity: 'Rare',
    polygonName: 'P12 Best Supporter [Blue Rarity]',
    BNBChainName: 'P12 Best Supporter [Blue Rarity]',
    polygonImage:
      'https://cdn.galxe.com/galaxy/assets/projecttwelve/1654670997542549058.png?optimizer=image&width=800&quality=100',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCbVwUt9SD]: {
    campaign: 'GCbVwUt9SD',
    rarity: 'Epic',
    polygonName: 'P12 StarMaker',
    BNBChainName: 'P12 StarMaker',
    polygonImage: 'https://cdn.galxe.com/galaxy/assets/projecttwelve/1655003642820587877.gif',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GC8NPUUqJC]: {
    campaign: 'GC8NPUUqJC',
    rarity: 'Epic',
    polygonName: 'P12 Best Supporter [Purple Rarity]',
    BNBChainName: 'P12 Best Supporter [Purple Rarity]',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/projecttwelve/1650619688807604651.gif',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GC1abUUnxU]: {
    campaign: 'GC1abUUnxU',
    rarity: 'Epic',
    polygonName: 'P12 Best Supporter [Purple Rarity]',
    BNBChainName: 'P12 Best Supporter [Purple Rarity]',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/projecttwelve/1650619688807604651.gif',
  },
  // GCu9bUUxXo: {
  //   campaign: 'GCu9bUUxXo',
  //   rarity: 'Epic',
  //   polygonName: 'P12 First Gleam Event [Purple Rarity]',
  //   BNBChainName: 'P12 First Gleam Event [Purple Rarity]',
  //   polygonImage: 'https://cdn-2.galxe.com/galaxy/images/p12/1649574994798648575.jpg?optimizer=image&width=800&quality=100',
  // },
  // test
  // GC7QrU4ijW: {
  //   campaign: 'GC7QrU4ijW',
  //   rarity: 'Common',
  //   polygonName: 'Bridge test',
  //   BNBChainName: 'Bridge test',
  //   polygonImage: 'https://cdn.galxe.com/galaxy/p12/72697b78-0512-454e-b5b1-7c25cf099356.png',
  // },
};

export const P12_AMA_OAT_BADGE: Record<AMA_NFT_CAMPAIGN_ID, BadgeInfo> = {
  [AMA_NFT_CAMPAIGN_ID.GC9ErUtrZN]: {
    campaign: 'GC9ErUtrZN',
    rarity: 'Common',
    polygonName: 'Galxe Passport x P12',
    BNBChainName: 'Galxe Passport x P12',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/p12/1663159642435340771.gif',
  },
  [AMA_NFT_CAMPAIGN_ID.GCPkMUt6uC]: {
    campaign: 'GCPkMUt6uC',
    rarity: 'Common',
    polygonName: 'P12 x BNB Chain AMA Session',
    BNBChainName: 'P12 x BNB Chain AMA Session',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/p12/1665891973072684256.gif',
  },
  [AMA_NFT_CAMPAIGN_ID.GCdFZUtN2T]: {
    campaign: 'GCdFZUtN2T',
    rarity: 'Common',
    polygonName: 'P12 x Ambrus AMA Campaign',
    BNBChainName: 'P12 x Ambrus AMA Campaign',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/p12/1660194559480326424.gif',
  },
  [AMA_NFT_CAMPAIGN_ID.GCmP7UtXdx]: {
    campaign: 'GCmP7UtXdx',
    rarity: 'Common',
    polygonName: 'P12 x Revoland AMA Campaign',
    BNBChainName: 'P12 x Revoland AMA Campaign',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/p12/1662255786798438539.gif',
  },
  [AMA_NFT_CAMPAIGN_ID.GCsJQUt6Xc]: {
    campaign: 'GCsJQUt6Xc',
    rarity: 'Common',
    polygonName: 'P12 x Space ID Integration OAT',
    BNBChainName: 'P12 x Space ID Integration OAT',
    polygonImage: 'https://cdn-2.galxe.com/galaxy/images/p12/1661315771979438039.gif',
  },
};
