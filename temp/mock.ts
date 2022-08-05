import { CollabInfoType, CollabShortInfo } from '../lib/types';

export const mockCollabList: CollabShortInfo[] = [
  {
    id: 'item1',
    name: 'StormGain',
    desc: 'The ORFEUS NETWORK is a one decentralized self-developin...',
    logo: '/img/temp/collab/logo_1.png',
    startTime: '2022.06.08',
    endTime: '2022.07.08',
    whitePaperUrl: 'https://github.com/ProjectTwelve/whitepaper/blob/main/P12-Whitepaper-v0.1.pdf',
    badgeChainKey: 'chain1',
  },
  {
    id: 'item2',
    name: 'Rebus',
    desc: 'The ORFEUS NETWORK is a one decentralized self-developin...',
    logo: '/img/temp/collab/logo_2.png',
    startTime: '2022.06.08',
    endTime: '2022.07.08',
    whitePaperUrl: 'https://github.com/ProjectTwelve/whitepaper/blob/main/P12-Whitepaper-v0.1.pdf',
    badgeChainKey: 'chain2',
  },
  {
    id: 'item3',
    name: 'PunkPanda',
    desc: 'The ORFEUS NETWORK is a one decentralized self-developin... long description test long description test long description test long description test',
    logo: '/img/temp/collab/logo_3.png',
    startTime: '2022.06.08',
    endTime: '2022.07.08',
    whitePaperUrl: 'https://github.com/ProjectTwelve/whitepaper/blob/main/P12-Whitepaper-v0.1.pdf',
  },
  {
    id: 'item4',
    name: 'Velodrome',
    desc: 'The ORFEUS NETWORK is a one decentralized self-developin... long description test long description test long description test long description test',
    logo: '/img/temp/collab/logo_4.png',
    startTime: '2022.06.08',
    endTime: '2022.07.08',
    whitePaperUrl: 'https://github.com/ProjectTwelve/whitepaper/blob/main/P12-Whitepaper-v0.1.pdf',
    badgeChainKey: 'chain4',
  },
  {
    id: 'item5',
    name: 'WYND',
    desc: 'The ORFEUS NETWORK is a one decentralized self-developin... long description test long description test long description test long description test',
    logo: '/img/temp/collab/logo_5.png',
    startTime: '2022.06.08',
    endTime: '2022.07.08',
  },
  {
    id: 'item6',
    name: 'Lend Flare',
    desc: 'The ORFEUS NETWORK is a one decentralized self-developin... long description test long description test long description test long description test',
    logo: '/img/temp/collab/logo_6.png',
    startTime: '2022.06.08',
    endTime: '2022.07.08',
  },
  {
    id: 'item7',
    name: 'Lend Flare',
    desc: 'The ORFEUS NETWORK is a one decentralized self-developin... long description test long description test long description test long description test',
    logo: '/img/temp/collab/logo_6.png',
    startTime: '2022.06.08',
    endTime: '2022.07.08',
  },
  {
    id: 'item8',
    name: 'Lend Flare',
    desc: 'The ORFEUS NETWORK is a one decentralized self-developin... long description test long description test long description test long description test',
    logo: '/img/temp/collab/logo_6.png',
    startTime: '2022.06.08',
    endTime: '2022.07.08',
  },
];

export const mockCollabInfoList: CollabInfoType[] = [
  {
    id: 'item1',
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
    timeWarmup: '2022.06.08', // TODO: 改为timeCommingsoon
    timeJoin: '2022.06.12',
    timeAllocation: '2022.06.20',
    timeClaim: '2022.06.25',
    timeClose: '2022.07.08',
  },
];
