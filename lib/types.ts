import { NFTClaim, NFTLevel } from '../store/developer/state';

export type Response<T> = {
  status: string;
  code: number;
  data: T;
  msg: string;
};

export type ReleaseDate = {
  coming_soon: boolean;
  date: string;
};
export type GameInfo = {
  index: number;
  proxy_country: string;
  steam_appid: number;
  header_image: string;
  type: string;
  name: string;
  is_free: boolean;
  review_score: number;
  review_score_desc: string;
  total_positive: number;
  total_negative: number;
  total_reviews: number;
  recommendations: {
    total: number;
  };
  release_date: ReleaseDate;
};
export type FailedGameMessage = {
  appid: number;
  msg: string;
};
export type AccountInfo = {
  name: string;
  total_reviews: number;
  header_image: string;
  release_date?: ReleaseDate;
  nft_claim: NFTClaim;
  nft_id: number | null;
  appid: number;
  nft_level: NFTLevel;
  credential: number;
  updatedAt: string;
};
export type InvitationInfo = {
  wallet_address: string;
  appid: string;
  name: string;
  time: string;
};
export type RankInfo = {
  header_image: string;
  name: string;
  release_date: string;
  developers: string[];
  genres: string[];
  appid: number;
  nft_level: NFTLevel;
  index: number;
  createdAt: string;
};
export type GameRank = {
  appid: number;
  name: string;
  developers?: string[];
  header_image: string;
  release_date: string;
  timeRank: number;
  tokenRank: number;
};

export type ReferralCodeParams = { wallet_address?: string | null };
export type ReferralCodeData = { referral_code?: string };

export type DeveloperGameParams = {
  appid: string | number;
};
export type DeveloperGameData = {
  game_info: GameInfo;
};

export type DeveloperVerifyParams = {
  steam_appids: (string | number)[];
  wallet_address: string;
  referral_code?: string;
};
export type DeveloperVerifyData = {
  account: string;
  failedGames: FailedGameMessage[];
};

export type DeveloperInfoParams = {
  addr?: string | null;
};
export type DeveloperInfoData = {
  account_info: AccountInfo[];
};

export type DeveloperInvitationParams = {
  addr?: string | null;
};
export type DeveloperInvitationData = {
  invitation_info: InvitationInfo[];
};

export type DeveloperRankList = {
  rankLength: number;
  page: number;
  size: number;
  rankList: Partial<RankInfo>[];
};

export type DeveloperRank = {
  games: GameRank[];
};
