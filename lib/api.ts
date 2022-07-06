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
  DeveloperRank,
  DeveloperRankList,
  DeveloperEmailParams,
  BinSteamParams,
  GamerInfoData,
  GamerGamesData,
  GamerEmailParams,
  GamerRankList,
  GamerRank,
  GamerInvitationParams,
  GamerInvitationData,
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

/**
 * get developer token rank
 * @param params
 */
export const fetchDeveloperTokenRank = (params: { page: number; size: number }) =>
  request.get<any, Response<DeveloperRankList>>('/api/developer/token/rank', { params });

/**
 * get developer time rank
 * @param params
 */
export const fetchDeveloperTimeRank = (params: { page: number; size: number }) =>
  request.get<any, Response<DeveloperRankList>>('/api/developer/time/rank', { params });

/**
 * get developer rank
 * @param params
 */
export const fetchDeveloperRank = (params: { addr?: string }) =>
  request.get<any, Response<DeveloperRank>>('/api/developer/rank', { params });

/**
 * get developer verified count
 */
export const fetchDeveloperVerifiedCount = () => request.get<any, Response<{ total: number }>>('/api/developer/verified/count');

/**
 * setDeveloperEmail
 */
export const fetchDeveloperEmail = (data: DeveloperEmailParams) =>
  request.post<any, Response<any>>('/api/developer/email', data);

/**
 * get Steam Gamer Info
 */
export const fetchGamerInfo = (params: { addr?: string }) =>
  request.get<any, Response<GamerInfoData>>('/api/gamer/info', { params });

/**
 * bind steam account and wallet
 */
export const fetchBindSteam = (data: BinSteamParams) => request.post<any, Response<any>>('/api/gamer/bind', data);

/**
 * get gamer Steam games
 * @param data
 */
export const fetchGamerGames = (data: { wallet_address?: string; referral_code?: string }) =>
  request.post<any, Response<GamerGamesData>>('/api/gamer/games', data);

/**
 * bind gamer email
 */
export const fetchGamerEmail = (data: GamerEmailParams) => request.post<any, Response<any>>('/api/gamer/email', data);

/**
 * get gamer token rank
 * @param params
 */
export const fetchGamerTokenRank = (params: { page: number; size: number }) =>
  request.get<any, Response<GamerRankList>>('/api/gamer/token/rank', { params });

/**
 * get developer time rank
 * @param params
 */
export const fetchGamerTimeRank = (params: { page: number; size: number }) =>
  request.get<any, Response<GamerRankList>>('/api/gamer/time/rank', { params });

/**
 * get developer rank
 * @param params
 */
export const fetchGamerRank = (params: { addr?: string }) =>
  request.get<any, Response<GamerRank>>('/api/gamer/rank', { params });

/**
 * get developer verified count
 */
export const fetchGamerVerifiedCount = () =>
  request.get<any, Response<{ total: number; verifiedCount: number[] }>>('/api/gamer/count');

/**
 * get gamer invitation
 * @param params
 */
export const fetchGamerInvitation = (params: GamerInvitationParams) =>
  request.get<any, Response<GamerInvitationData>>('/api/gamer/invitation', { params });
