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
  address: Address;
  accessToken: string;
};
