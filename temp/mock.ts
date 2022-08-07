import { CollabInfoType, CollabShortInfo } from '../lib/types';

export const mockCollabList: CollabShortInfo[] = [
  {
    collabCode: '1',
    projectName: 'Highstreet Market',
    projectLogo: 'https://www.highstreet.market/_next/static/media/logo.2e884906.svg',
    projectInfoBrief: 'Yeeha Games is an incubation and publishing platform for GameFi‌ projects.',
    projectInfo:
      'Highstreet bridges the physical and digital worlds with a brand new MMORPG. Built natively with Unity and Blockchain technology, Highstreet provides real products with additional utilities by turning them into in-game items',
    projectChain: [
      {
        url: 'https://raw.githubusercontent.com/projecttwelve/icons/main/chain/bsc.png',
        chainid: 56,
        name: 'BSC',
      },
    ],
    projectWhitepaper: 'https://highstreet.gitbook.io/highstreet-whitepaper/welcome-to-highstreet/preface',
    timeWarmup: 1659369620,
    timeClose: 1659369690,
  },
  {
    collabCode: 'RfXSgUPyhSBopk2S',
    projectName: 'Highstreet Market',
    projectLogo: 'https://www.highstreet.market/_next/static/media/logo.2e884906.svg',
    projectInfo:
      'Highstreet bridges the physical and digital worlds with a brand new MMORPG. Built natively with Unity and Blockchain technology, Highstreet provides real products with additional utilities by turning them into in-game items',
    projectChain: [
      {
        url: 'https://raw.githubusercontent.com/projecttwelve/icons/main/chain/avalanche.png',
        chainid: 43114,
        name: 'Avalanche',
      },
    ],
    projectWhitepaper: 'https://highstreet.gitbook.io/highstreet-whitepaper/welcome-to-highstreet/preface',
    timeWarmup: 1659369600,
    timeClose: 1659369690,
  },
  {
    collabCode: 'qXq7U37faU3WsO1E',
    projectName: 'Highstreet Market-1',
    projectLogo: 'https://www.highstreet.market/_next/static/media/logo.2e884906.svg',
    projectInfo:
      'Highstreet bridges the physical and digital worlds with a brand new MMORPG. Built natively with Unity and Blockchain technology, Highstreet provides real products with additional utilities by turning them into in-game items',
    projectChain: [
      {
        url: 'https://raw.githubusercontent.com/projecttwelve/icons/main/chain/bsc.png',
        chainid: 10,
        name: 'Optimism',
      },
    ],
    projectWhitepaper: 'https://highstreet.gitbook.io/highstreet-whitepaper/welcome-to-highstreet/preface',
    timeWarmup: 1659369600,
    timeClose: 1659369690,
  },
  {
    collabCode: '2',
    projectName: 'Yeeha Games',
    projectLogo: 'https://yeehagames.com/static/media/logo-bright.d3386283.svg',
    projectInfoBrief: 'You will encounter tons of strange and exotic monsters',
    projectInfo: 'Oath of Peak is a mobile MMORPG with an oriental fantasy theme',
    projectChain: [
      {
        url: 'https://raw.githubusercontent.com/projecttwelve/icons/main/chain/polygon.png',
        chainid: 56,
        name: 'Polygon',
      },
    ],
    timeWarmup: 1659628800,
    timeClose: 1659668800,
  },
  {
    collabCode: '3',
    projectName: 'Space ID',
    projectLogo: 'https://pbs.twimg.com/profile_images/1506159381397884934/KzMw6tsS_400x400.jpg',
    projectInfoBrief: 'SID: Your Universal Identifier',
    projectInfo: 'Oath of Peak is a mobile MMORPG with an oriental fantasy theme',
    projectChain: [
      {
        url: 'https://raw.githubusercontent.com/projecttwelve/icons/main/chain/eth.png',
        chainid: 1,
        name: 'Ethereum',
      },
    ],
    projectWhitepaper: 'https://twitter.com/SpaceIDProtocol',
    timeWarmup: 1759628800,
    timeClose: 1759668800,
  },
];

export const mockCollabInfoList: CollabInfoType[] = [
  {
    collabCode: '1',
    projectName: 'Storm Gain',
    projectInfo: `The ORFEUS NETWORK is a decentralized self-developing tourist ecosystem. The ORFEUS network is NOT an online travel agency (OTA) where customers pay a certain commission rate, which can range from 10% to 35%.
  ORFEUS NETWORK is a Blockchain-based travel community of digital nomads around the world. As its base will serve sites in Bulgaria – Hissarya, Plovdiv, Levochevo, and Tryavna, which will gradually expand.`,
    projectLogo: '/img/temp/collab/logo_1.png',
    projectWhitepaper: 'https://github.com/ProjectTwelve/whitepaper/blob/main/P12-Whitepaper-v0.1.pdf',
    projectChain: [
      {
        chainid: 43114,
        url: 'https://raw.githubusercontent.com/sushiswap/icons/master/network/avalanche.jpg',
        name: 'Avalanche',
      },
    ],
    projectWebsite: 'https://p12.network/',
    projectTwitter: 'https://twitter.com/_p12_',
    projectDiscord: 'https://discord.com/invite/EMrbsZPbxs',

    tokenAmount: 14543,
    nftTotalAmount: 22,

    timeWarmup: 1654617600,
    timeJoin: 1654963200,
    timeAllocation: 1655654400,
    timeClaim: 1656086400,
    timeClose: 1657209600,

    taskGleam: 'https://github.com/ProjectTwelve/whitepaper/blob/main/P12-Whitepaper-v0.1.pdf',
    taskTweetContent:
      'Join @_p12_ P12 Genesis Airdrop Steam gamers and get Soul-Bound NFT which captures your unique gaming credentials for free!',
  },
];
