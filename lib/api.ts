import request from './request';
import {
  Response,
  ReferralCodeParams,
  ReferralCodeData,
  DeveloperVerifyParams,
  DeveloperVerifyData,
  DeveloperGameParams,
  DeveloperGameData,
  DeveloperInfoParams,
  DeveloperInfoData,
  DeveloperInvitationParams,
  DeveloperInvitationData,
} from './types';

/**
 * it takes a wallet address and returns a referral code
 * @param data - { wallet_address?: string | null }
 */
export const fetchReferralCode = (data: ReferralCodeParams) =>
  request.post<any, Response<ReferralCodeData>>('/api/developer/affiliates', data);

/**
 * get steam game info
 * @param params
 */
export const fetchDeveloperGame = (params: DeveloperGameParams) =>
  request.get<any, Response<DeveloperGameData>>('/api/developer/game', { params });

/**
 * verify the developer games
 * @param data
 */
export const fetchDeveloperVerify = (data: DeveloperVerifyParams) =>
  request.post<any, Response<DeveloperVerifyData>>('/api/developer/verify', data);

/**
 * get developer info
 * @param params
 */
export const fetchDeveloperInfo = (params: DeveloperInfoParams) =>
  request.get<any, Response<DeveloperInfoData>>('/api/developer/info', { params });

/**
 * get developer invitation
 * @param params
 */
export const fetchDeveloperInvitation = (params: DeveloperInvitationParams) =>
  request.get<any, Response<DeveloperInvitationData>>('/api/developer/invitation', { params });
