import { NFT_CLAIM, DEV_NFT_LEVEL, GAMER_NFT_LEVEL } from '../constants';

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
export type DevGameInfo = {
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
  nft_claim: NFT_CLAIM;
  nft_id: number | null;
  appid: number;
  nft_level: DEV_NFT_LEVEL;
  credential: number;
  updatedAt: string;
};
export type DevInvitationInfo = {
  wallet_address: string;
  createdAt: string;
  header_image: string;
  release_date?: { data: string };
  nft_level: DEV_NFT_LEVEL;
};
export type GamerInvitationInfo = {
  avatar: string;
  createdAt: string;
  nft_level: GAMER_NFT_LEVEL;
  person_name: string;
  steam_id: string;
  wallet_address: string;
};
export type DevRankInfo = {
  header_image: string;
  name: string;
  release_date: string;
  developers: string[];
  genres: string[];
  appid: number;
  nft_level: DEV_NFT_LEVEL;
  index: number;
  createdAt: string;
};
export type GamerRankInfo = {
  person_name: string;
  time_created: number;
  steam_id: string;
  ss_game_count: number;
  avatar_full: string;
  ss_game_playtime: number;
  nft_level: GAMER_NFT_LEVEL;
  createdAt: string;
  index: number;
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
export type GamerGameInfo = {
  appid: number;
  genres?: string[];
  img_icon_url: string;
  name: string;
  playtime_forever: number;
  ss_game: number;
};

export type ReferralCodeParams = { wallet_address?: string | null };
export type ReferralCodeData = { referral_code?: string };

export type DeveloperGameParams = {
  appid: string | number;
};
export type DeveloperGameData = {
  game_info: DevGameInfo;
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
  invitation_info: DevInvitationInfo[];
};

export type DeveloperRankList = {
  rankLength: number;
  page: number;
  size: number;
  rankList: Partial<DevRankInfo>[];
};

export type DeveloperRank = {
  games: GameRank[];
};

export type DeveloperEmailParams = {
  wallet_address?: string;
  email: string;
  signature: string;
};

export type GamerInfoData = {
  wallet_address?: string;
  avatar_full: string;
  person_name: string;
  steam_id: string;
  time_created?: number;
  display?: number;
  birthday?: number;
  credential?: number;
  email?: string;
  value?: number;
  nft_claim?: NFT_CLAIM;
  nft_level?: GAMER_NFT_LEVEL;
  nft_id?: number;
  level?: number;
  tokens?: number;
  friends_count?: number;
  badges_count?: number;
  csgo_value?: number;
  dota2_value?: number;
  tf2_value?: number;
  inventory_switch: boolean;
  invitedBy?: {
    avatar_full: string;
    name: string;
  };
};

export type BinSteamParams = {
  wallet_address?: string;
  secret_token?: string;
  referral_code?: string;
};

export type GamerGamesData = {
  wallet_address?: string;
  games: GamerGameInfo[];
  ss_game_count?: number;
  ss_game_playtime?: number;
  total_game_count?: number;
  total_playtime?: number;
};

export type GamerEmailParams = {
  wallet_address?: string;
  email: string;
  signature: string;
};

export type GamerRankList = {
  rankLength: number;
  page: number;
  size: number;
  rankList: Partial<GamerRankInfo>[];
};

export type GamerRank = {
  avatar_full?: string;
  person_name?: string;
  steam_id?: string;
  timeRank?: number;
  tokenRank?: number;
};

export type GamerInvitationParams = {
  addr?: string | null;
};
export type GamerInvitationData = {
  invitation_info: GamerInvitationInfo[];
};

export type CollabChainItem = Partial<{
  chainid: number;
  url: string;
  name: string;
}>;

export type CollabShortInfo = {
  collabCode: string;
  projectName: string;
  projectInfoBrief?: string;
  projectInfo: string;
  projectLogo: string;
  projectChain: CollabChainItem[];
  timeWarmup: number;
  timeClose: number;
  projectWhitepaper?: string;
};
export type CollabItemParam = {
  collabCode: string;
};
export type CollabInfoType = {
  collabCode: string;
  projectName: string;
  projectLogo: string;
  projectInfo: string;
  projectChain: CollabChainItem[];
  projectDiscord: string;
  projectTwitter: string;
  projectWebsite: string;
  projectWhitepaper: string;

  timeWarmup: number;
  timeJoin: number;
  timeAllocation: number;
  timeClaim: number;
  timeClose: number;

  tokenAmount: number;
  nftTotalAmount: number;

  taskGleam: string; // gleam链接
  taskTweetContent: string; // 分享tweet的模版内容
};
