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
  CollabInfoType,
  CollabShortInfo,
  CollabUserInfo,
  CollabUserParams,
  CollabTweetVerifyParams,
  ArcanaVotes,
  ArcanaMemeEvaluateParams,
  ArcanaInviteesVote,
  PredictionItemData,
  PredictionAnswerParams,
  PredictionAnswerOMGItem,
  VoteRankItem,
  RecentInvitationItem,
  PredictionAnswerOMG2Item,
  RewardRankItem,
  GamerEmailInfo,
  WorldCapInfo,
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
  request.get<any, Response<GamerInfoData>>('/api/gamer/info', { params, timeout: 30000 });

/**
 * bind steam account and wallet
 */
export const fetchBindSteam = (data: BinSteamParams) => request.post<any, Response<any>>('/api/gamer/bind', data);

/**
 * get gamer Steam games
 * @param data
 */
export const fetchGamerGames = (data: { wallet_address?: string; referral_code?: string }) =>
  request.post<any, Response<GamerGamesData>>('/api/gamer/games', data, { timeout: 30000 });

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

export const fetchGamerReload = (data: { wallet_address?: string }) =>
  request.post<any, Response<null>>('/api/gamer/reload', data, {
    timeout: 30000,
  });

export const fetchInvitationCount = (addr?: string) =>
  request.get<any, Response<number[]>>('/api/invitation/count', { params: { addr } });

export const fetchCollabList = () => request.get<any, Response<CollabShortInfo[]>>('/v2/collab/list');

export const fetchCollabItem = (id: string) => request.get<any, Response<CollabInfoType>>('/v2/collab/list/' + id);

export const fetchCollabUserInfo = (data: CollabUserParams) =>
  request.post<any, Response<CollabUserInfo>>('/v2/collab/addr/info', data);

export const fetchCollabJoin = (data: CollabUserParams) => request.post<any, Response<CollabUserInfo>>('/v2/collab/join', data);

export const fetchCollabTweetVerify = (data: CollabTweetVerifyParams) =>
  request.post<any, Response<CollabUserInfo>>('/v2/collab/tweet/verify', data);

export const fetchArcanaVotes = (data: { walletAddress?: string }) =>
  request.post<any, Response<ArcanaVotes>>('/v2/ti/votes', data);

export const fetchArcanaMemeEvaluate = (data: ArcanaMemeEvaluateParams) =>
  request.post<any, Response<any>>('/v2/ti/meme/evaluate', data);

export const fetchArcanaInviteesVotes = (data: { walletAddress?: string }) =>
  request.post<any, Response<ArcanaInviteesVote[]>>('/v2/ti/invitees/votes', data);

export const fetchArcanaDistinctAddressCount = () => request.post<any, Response<number>>('/v2/ti/distinctAddress/count');

export const fetchArcanaPredictions = (data: { walletAddress?: string }) =>
  request.post<any, Response<PredictionItemData[]>>('/v2/ti/predictions', data);

export const fetchArcanaPredictionsOMG = (data: { walletAddress?: string }) =>
  request.post<any, Response<PredictionItemData[]>>('/v2/ti/predictions/omg', data);

export const fetchArcanaPredictionsAnswerCount = () =>
  request.post<any, Response<{ predictionCode: string; totalAnswers: number }[]>>('/v2/ti/predictions/answerCount');

export const fetchArcanaUnlock = (data: { walletAddress?: string; predictionCode?: string }) =>
  request.post<any, Response<boolean>>('/v2/ti/unlock', data);

export const fetchArcanaAnswer = (data: PredictionAnswerParams) => request.post<any, Response<any>>('/v2/ti/answer', data);

export const fetchArcanaAgent = (data: { signature: string; walletAddress: string }) =>
  request.post<any, Response<boolean>>('/v2/ti/agent', data);

export const fetchArcanaAnswerOMG = () =>
  request.post<any, Response<Record<string, PredictionAnswerOMGItem[]>>>('/v2/ti/answer/omg', { size: 3 });

export const fetchArcanaAnswerOMG2 = () =>
  request.post<any, Response<PredictionAnswerOMG2Item[]>>('/v2/ti/omg2Rank', { rankSize: 20 });

export const fetchArcanaRewardRank = () => request.post<any, Response<RewardRankItem[]>>('/v2/ti/rewardRank', { rankSize: 50 });

export const fetchArcanaVotesRank = () => request.post<any, Response<VoteRankItem[]>>('/v2/ti/votesRank', { size: 42 });

export const fetchArcanaRecentInvitation = () =>
  request.post<any, Response<RecentInvitationItem[]>>('/v2/ti/recentInvitation', { rankSize: 20 });

export const fetchGamerEmailInfo = (wallet_address?: string) =>
  request.post<any, Response<GamerEmailInfo>>('/api/gamer/emailInfo', { wallet_address });

export const fetchGamerVerifyEmailCode = (params: { wallet_address?: string; email_verify_code: string }) =>
  request.post<any, Response<any>>('/api/gamer/verifyEmailCode', params);

export const fetchWorldCupUserInfo = (walletAddress?: string) =>
  request.post<any, Response<WorldCapInfo>>('/v2/worldCup/userInfo', { walletAddress, collabCode: 'qatar2022' });
