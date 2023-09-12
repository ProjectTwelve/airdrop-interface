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

export type UserInfo = {
  walletAddress: string;
  showName?: string;
  accessToken: string;

  editorium?: boolean;
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
};

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
