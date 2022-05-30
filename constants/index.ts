import { NFTLevel } from '../store/developer/state';

export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID ?? '1');
export const NFT_CONTRACT_ADDRESS = '0x900b8215FA5231C24f30C694850481e25300845c';
export const GALAXY_LIST = 'https://galaxy.eco/mynfts/list';

export const BADGES = {
  [NFTLevel.ORANGE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653648412040155648.gif',
    claim: 'https://galaxy.eco/P12/campaign/GCMXMUUTBT',
  },
  [NFTLevel.PURPLE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653648305835037699.gif',
    claim: 'https://galaxy.eco/P12/campaign/GCnKMUUwa5',
  },
  [NFTLevel.BLUE]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653648610530074458.gif',
    claim: 'https://galaxy.eco/P12/campaign/GCnJMUUwZb',
  },
  [NFTLevel.GREEN]: {
    asset: 'https://cdn.galaxy.eco/galaxy/assets/projecttwelve/1653648206887517339.gif',
    claim: 'https://galaxy.eco/P12/campaign/GCJyMUUdVA',
  },
};
