import { Address } from 'wagmi';
import { SiweMessage } from 'siwe';
import { Platform } from '@/constants';

export type LoginParams = {
  address: Address;
  message: Partial<SiweMessage>;
  signature: string;
  platform: Platform;
};

export type SocialMedia = {
  source: 'telegram' | 'aspecta';
  firstName: string;
  lastName?: string;
  username?: string;
  avatar?: string;
  // aspecta required
  sourceId?: string;
};

export type UserInfo = Partial<{
  accessToken: string;
  editorium?: boolean;
  walletAddress: string;
  showName: string | null;
  nickname: string | null;
  p12Name: string | null;
  ensName: string | null;
  spaceIdBnb: string | null;
  spaceIdArb: string | null;
  ccProfileHandle: string | null;
  avatar: string | null;
  createdAt: string; // '2023-08-21T03:18:39.744Z'
  twitter: string | null;
  discord: string | null;
  bio: string | null;
  mwAccountInfo: any[]; // TODO: 补全类型
  socialMedias: SocialMedia[]; // TODO: 补全类型
}>;

export type PowerLevelResult = {
  walletAddress: string;
  participant: boolean;
  power: number;
  votes: number;
  invite: number;
  beVotedVote: number;
};

export type CheckNameParams = {
  name: string;
  type: string; // p12Name | nickname
};

export enum CheckResult {
  NOT_EXIST = 0,
  EXIST = 1, // Or > 1 , cnt
}

export type ProfileParams = {
  bio?: string | null;
  discord?: string | null;
  nickname?: string | null;
  p12Name?: string | null;
  showName?: string | null;
  twitter?: string | null;
};

export type ChainNamesResult = {
  walletAddress: string;
  ccProfileHandle: string | null;
  ensName: string | null;
  spaceIdArb: string | null;
  spaceIdBnb: string | null;
};

export type GameInfo = {
  id: number;
  rank?: number; // 投票为0不进排行榜
  gameDescription: string | null;
  gameName: string;
  gameVotes: number;
  mainImage: string | null; // 主图
  showName: string | null;
  twitter: string | null; // 前面没有@
  twitterVerify: boolean;
  walletAddress: string;
};

export enum TaskCode {
  LoginEditor = 'LoginEditor',
  CreateGame = 'CreateGame',
  Invite = 'Invite',
  DoVote = 'Vote',
  BurnBadge = 'BurnBadge',
  LinkAspecta = 'LinkAspecta',
  ParticipateArcana = 'ParticipateArcana',
  LinkUneMeta = 'UneMeta',
  AttendedTiArcana = 'AttendedTiArcana',
  GenesisNFTGamer = 'GenesisNFTGamer',
  TwitterShareVerify = 'TwitterShareVerify',
}

export type TasksStatus = {
  [key in TaskCode]?: boolean;
};

export type InvitationInfo = {
  power?: number;
  showName?: null;
  walletAddress?: string;
};

export type PowerVoteResult = {
  /**
   * 用户邀请 PL  这里返回的是实际加了分的 PL
   */
  invite: number;
  /**
   * 是否参加arcana
   */
  participant: boolean;
  /**
   * 用户 PL 总分
   */
  power: number;
  /**
   * 用户排名, 没有不显示 rank
   */
  rank?: number;
  /**
   * 用户可用票数
   */
  votes: number;
  gamerPowerSyncNeeded: boolean;
  walletAddress: string;
  gamerNft: {
    nftLevel?: number;
    nftClaim?: number;
    power?: number;
  };
  developerNft: {
    nftLevel?: number;
    nftClaim?: number;
    power?: number;
  };
  beVotedVote?: number;
};
