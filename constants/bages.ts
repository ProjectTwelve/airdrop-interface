import { AMA_NFT_CAMPAIGN_ID, COMMUNITY_NFT_CAMPAIGN_ID, GenesisRarity } from '@/constants/enum';
import { Address } from 'wagmi';

export const DEV_BADGES = {
  [GenesisRarity.Legendary]: {
    asset: 'https://cdn.galxe.com/galaxy/assets/projecttwelve/1653656759076802901.gif',
    asset256: 'https://cdn1.p12.games/airdrop/badge/dev_orange_256.webp',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_orange.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/dev_badge_orange.png',
    claim: 'https://galxe.com/P12/campaign/GCt9JUUJCJ',
    title: 'P12 Genesis Badge [Orange Rarity]',
    rarity: 'Legendary',
    color: 'orange',
  },
  [GenesisRarity.Epic]: {
    asset: 'https://cdn.galxe.com/galaxy/assets/projecttwelve/1653654265642526889.gif',
    asset256: 'https://cdn1.p12.games/airdrop/badge/dev_purple_256.webp',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_purple.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/dev_badge_purple.png',
    claim: 'https://galxe.com/P12/campaign/GCteJUUM7z',
    title: 'P12 Genesis Badge [Purple Rarity]',
    rarity: 'Epic',
    color: 'purple',
  },
  [GenesisRarity.Rare]: {
    asset: 'https://cdn.galxe.com/galaxy/assets/projecttwelve/1653653761673395155.gif',
    asset256: 'https://cdn1.p12.games/airdrop/badge/dev_blue_256.webp',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_blue.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/dev_badge_blue.png',
    claim: 'https://galxe.com/P12/campaign/GCi9CUUrni',
    title: 'P12 Genesis Badge [Blue Rarity]',
    rarity: 'Rare',
    color: 'blue',
  },
  [GenesisRarity.Uncommon]: {
    asset: 'https://cdn.galxe.com/galaxy/assets/projecttwelve/1653653545770629768.gif',
    asset256: 'https://cdn1.p12.games/airdrop/badge/dev_green_256.webp',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_green.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/dev_badge_green.png',
    claim: 'https://galxe.com/P12/campaign/GCV4JUU7eR',
    title: 'P12 Genesis Badge [Green Rarity]',
    rarity: 'Uncommon',
    color: 'green',
  },
  [GenesisRarity.Common]: {
    asset: 'https://cdn.galxe.com/galaxy/p12/154badfe-3f5d-44b2-883f-457fdd70227a.gif',
    asset256: 'https://cdn1.p12.games/airdrop/badge/dev_white_256.webp',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_white.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/dev_badge_white.png',
    claim: 'https://galxe.com/P12/campaign/GCoj1UcDS8',
    title: 'P12 Genesis Badge [White Rarity]',
    rarity: 'Common',
    color: 'white',
  },
  [GenesisRarity.Rekt]: {
    asset: 'https://cdn.galxe.com/galaxy/p12/3412087f-201d-4acf-b38f-2bbf2986cf51.gif',
    asset256: 'https://cdn1.p12.games/airdrop/badge/dev_rekt_256.webp',
    img: 'https://cdn1.p12.games/airdrop/img/dev_badge_rekt.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/dev_badge_rekt.png',
    claim: 'https://galxe.com/P12/campaign/GCw9mUctpb',
    title: 'P12 Genesis Badge [Rekt Rarity]',
    rarity: 'Common',
    color: 'white',
  },
};

export const GAMER_BADGES = {
  [GenesisRarity.Legendary]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_orange.webp',
    asset256: 'https://cdn1.p12.games/airdrop/badge/gamer_orange_256.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_orange.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_orange_2.png',
    claim: 'https://galxe.com/P12/campaign/GCZ74Utyqp',
    title: 'P12 XII-PLORER Badge [Orange Rarity]',
    rarity: 'Legendary',
    color: 'orange',
  },
  [GenesisRarity.Epic]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_purple.webp',
    asset256: 'https://cdn1.p12.games/airdrop/badge/gamer_purple_256.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_purple.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_purple_2.png',
    claim: 'https://galxe.com/P12/campaign/GCZm4UtEeE',
    title: 'P12 XII-PLORER Badge [Purple Rarity]',
    rarity: 'Epic',
    color: 'purple',
  },
  [GenesisRarity.Rare]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_blue.webp',
    asset256: 'https://cdn1.p12.games/airdrop/badge/gamer_blue_256.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_blue.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_blue_2.png',
    claim: 'https://galxe.com/P12/campaign/GCuBwUtL6P',
    title: 'P12 XII-PLORER Badge [Blue Rarity]',
    rarity: 'Rare',
    color: 'blue',
  },
  [GenesisRarity.Uncommon]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_green.webp',
    asset256: 'https://cdn1.p12.games/airdrop/badge/gamer_green_256.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_green.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_green_2.png',
    claim: 'https://galxe.com/P12/campaign/GCrkwUtqiz',
    title: 'P12 XII-PLORER Badge [Green Rarity]',
    rarity: 'Uncommon',
    color: 'green',
  },
  [GenesisRarity.Common]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_white.webp',
    asset256: 'https://cdn1.p12.games/airdrop/badge/gamer_white_256.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_common.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_common_2.webp',
    claim: 'https://galxe.com/P12/campaign/GCirwUtCCS',
    title: 'P12 XII-PLORER Badge [White Rarity]',
    rarity: 'Common',
    color: 'white',
  },
  [GenesisRarity.Rekt]: {
    asset: 'https://cdn1.p12.games/airdrop/badge/gamer_rekt.webp',
    asset256: 'https://cdn1.p12.games/airdrop/badge/gamer_rekt_256.webp',
    img: 'https://cdn1.p12.games/airdrop/img/gamer_badge_rekt.png',
    imgBig: 'https://cdn1.p12.games/airdrop/img/gamer_badge_rekt_2.webp',
    claim: 'https://galxe.com/P12/campaign/GCuagUtMfG',
    title: 'P12 XII-PLORER Badge [Rekt Rarity]',
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
  contractAddress: Address;
  tokenId: number;
  count?: number;
  tokenIds?: number[];
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
    polygonImage: 'https://cdn1.p12.games/airdrop/badge/cbadges/GC6YGUUpaT.png',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCj44UtwmA]: {
    campaign: 'GCj44UtwmA',
    rarity: 'Common',
    polygonName: 'Landing Site',
    BNBChainName: 'Landing Site',
    polygonImage: 'https://cdn1.p12.games/airdrop/badge/cbadges/GCj44UtwmA.png',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GC8tsUUnhC]: {
    campaign: 'GC8tsUUnhC',
    rarity: 'Common',
    polygonName: 'P12 Best Supporter [White Rarity]',
    BNBChainName: 'P12 Best Supporter [White Rarity]',
    polygonImage: 'https://cdn1.p12.games/airdrop/badge/cbadges/GC8tsUUnhC.png',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCBmbUUvgc]: {
    campaign: 'GCBmbUUvgc',
    rarity: 'Common',
    polygonName: 'P12 Best Supporter [White Rarity]',
    BNBChainName: 'P12 Best Supporter [White Rarity]',
    polygonImage: 'https://cdn1.p12.games/airdrop/badge/cbadges/GCBmbUUvgc.png',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCB7bUUkWH]: {
    campaign: 'GCB7bUUkWH',
    rarity: 'Common',
    polygonName: 'P12 Best Supporter [White Rarity]',
    BNBChainName: 'P12 Best Supporter [White Rarity]',
    polygonImage: 'https://cdn1.p12.games/airdrop/badge/cbadges/GCB7bUUkWH.png',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCohBUjYYY]: {
    campaign: 'GCohBUjYYY',
    rarity: 'Uncommon',
    polygonName: 'P12 Best Supporter [Uncommon]',
    BNBChainName: 'P12 Best Supporter [Uncommon]',
    polygonImage: 'https://cdn1.p12.games/airdrop/badge/cbadges/GCohBUjYYY.png',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCypPUUFQR]: {
    campaign: 'GCypPUUFQR',
    rarity: 'Uncommon',
    polygonName: 'P12 Best Supporter [Green Rarity]',
    BNBChainName: 'P12 Best Supporter [Green Rarity]',
    polygonImage: 'https://cdn1.p12.games/airdrop/badge/cbadges/GCypPUUFQR.png',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCALHUUGt5]: {
    campaign: 'GCALHUUGt5',
    rarity: 'Uncommon',
    polygonName: 'P12 Giveaway Badge',
    BNBChainName: 'P12 Giveaway Badge',
    polygonImage: 'https://cdn1.p12.games/airdrop/badge/cbadges/GCALHUUGt5.png',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCDqcUUudB]: {
    campaign: 'GCDqcUUudB',
    rarity: 'Uncommon',
    polygonName: 'P12 Nebula',
    BNBChainName: 'P12 Nebula',
    polygonImage: 'https://cdn1.p12.games/airdrop/badge/cbadges/GCDqcUUudB.png',
  },

  [COMMUNITY_NFT_CAMPAIGN_ID.GCXBcUUM56]: {
    campaign: 'GCXBcUUM56',
    rarity: 'Rare',
    polygonName: 'P12 Dream Weaver',
    BNBChainName: 'P12 Dream Weaver',
    polygonImage: 'https://cdn1.p12.games/airdrop/badge/cbadges/GCXBcUUM56.png',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCdRtUtc3W]: {
    campaign: 'GCdRtUtc3W',
    rarity: 'Rare',
    polygonName: 'P12 Best Supporter [Blue Rarity]',
    BNBChainName: 'P12 Best Supporter [Blue Rarity]',
    polygonImage: 'https://cdn1.p12.games/airdrop/badge/cbadges/GCdRtUtc3W.png',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GCbVwUt9SD]: {
    campaign: 'GCbVwUt9SD',
    rarity: 'Epic',
    polygonName: 'P12 StarMaker',
    BNBChainName: 'P12 StarMaker',
    polygonImage: 'https://cdn1.p12.games/airdrop/badge/cbadges/GCbVwUt9SD.png',
  },
  [COMMUNITY_NFT_CAMPAIGN_ID.GC8NPUUqJC]: {
    campaign: 'GC8NPUUqJC',
    rarity: 'Epic',
    polygonName: 'P12 Best Supporter [Purple Rarity]',
    BNBChainName: 'P12 Best Supporter [Purple Rarity]',
    polygonImage: 'https://cdn1.p12.games/airdrop/badge/cbadges/GC8NPUUqJC.png',
  },
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
