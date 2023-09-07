import { Address } from 'wagmi';
import { SiweMessage } from 'siwe';
import { Platform } from '@/constants';

export type LoginParams = {
  address: Address;
  message: Partial<SiweMessage>;
  signature: string;
  platform: Platform;
};

export type UserInfo = {
  walletAddress: Address;
  showName?: string;
  accessToken: string;
};

export type PowerLevelResult = {
  walletAddress: string;
  participant: boolean;
  power: number;
  votes: number;
  invite: number;
  beVotedVote: number;
};
