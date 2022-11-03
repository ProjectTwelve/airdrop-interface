import { PredictionAnswer } from '../store/arcana/state';
import { PREDICTION_TYPE } from '../components/arcana/PredictionItem';
import { MEME_ICON } from '../components/arcana/StatusBar/SwiperCard';
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
  wallet_address: string;
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
  nft_level?: number;
};

export type GamerInvitationParams = {
  addr?: string | null;
};
export type GamerInvitationData = {
  invitation_info: GamerInvitationInfo[];
};

export type CollabChainItem = Partial<{
  chainId: number;
  url: string;
  name: string;
  contractAddress?: string;
}>;

export type CollabTimes = {
  // unix time stamp
  timeComingSoon: number;
  timeJoin: number;
  timeAllocation: number;
  timeClaim: number;
  timeClose: number;
  [key: string]: number;
};

export type CollabShortInfo = {
  collabCode: string;
  projectName: string;
  projectInfoBrief?: string;
  projectInfo: string;
  projectLogo: string;
  projectChain: CollabChainItem[];
  timeComingSoon: number;
  timeJoin: number;
  timeAllocation: number;
  timeClaim: number;
  timeClose: number;
  projectWebsite?: string;
  projectWhitepaper?: string;
};

export type CollabInfoType = {
  collabCode: string;
  collabStatus?: number;
  collabName?: string;
  collabPoster?: string;

  projectName?: string;
  projectLogo?: string;
  projectInfoBrief?: string;
  projectInfo: string;
  projectChain?: CollabChainItem[];
  projectDiscord?: string;
  projectTwitter?: string;
  projectWebsite?: string;
  projectWhitepaper?: string;
  projectOpensea?: string;

  tokenAmount?: number;
  tokenIcon?: string;
  tokenName?: string;
  tokenNameAbbre?: string;
  tokenAddress?: string;
  tokenClaimLink?: string;

  nftTotalAmount?: number;
  nftName?: string;
  nftImage?: string;
  nftClaimLink?: string;

  taskGleam: string;
  taskGalxe: string;
  taskTweetContent: string;

  claimNote: string;
} & CollabTimes;

export enum CollabStatus {
  NO = 0,
  YES,
}

export type CollabUserParams = { collabCode: string; walletAddress: string };

export type CollabTweetVerifyParams = { collabCode: string; walletAddress: string; taskTweetUrl: string };

export type CollabUserInfo = {
  id: number | null;
  walletAddress: string;
  collabCode: string;
  joinStatus: CollabStatus; // 1 joined
  taskGleamStatus: CollabStatus;
  taskTweetUrl: string;
  taskTweetStatus: CollabStatus;
  projectWhitelist: CollabStatus; // is the address of the whitelist
  resultStatus: CollabStatus; // whether is win
  tokenClaim: CollabStatus;
  nftClaim: CollabStatus;
  tokenResult: number;
  nftResult: number;
  p12NftHolder: CollabStatus;
};

// Arcana

export type MemeEvaluateItem = {
  memeCode: string;
  memeTitle: string;
  memeType: string;
  memeUrl: string;
  evaluate?: MEME_ICON;
};

export type ArcanaUserInfo = {
  avatarFull: string;
  badgesCount: number;
  friendsCount: number;
  level: number;
  nftLevel: number;
  personName: string;
  timeCreated: number;
  createdAt: number;
  nftId: number;
};

export type P12CommunityNft = {
  votesP12DreamWeaver?: number;
  votesP12BestSupporterPurple?: number;
  votesP12BestSupporterBlue?: number;
  votesP12BestSupporterGreen?: number;
  votesWhiteBadge?: number;
};

export type ArcanaUserVotes = {
  createdAt: number;
  omgInviteCount?: number;
  omgInviteVotes?: number;
  updatedAt: number;
  votesBabCurrent: number;
  votesBabLast: number;
  votesCommunityNftCurrent: number;
  votesCommunityNftLast: number;
  votesGenesisNftCurrent: number;
  votesGenesisNftLast: number;
  votesReferralCurrent: number;
  votesReferralLast: number;
  votesTotalCurrent: number;
  votesTotalLast: number;
  walletAddress: string;
  p12CommunityNft: P12CommunityNft;
};

export type ArcanaVotes = {
  bound: boolean;
  userInfo: ArcanaUserInfo;
  userVotes: ArcanaUserVotes;
  memeEvaluate: MemeEvaluateItem[];
};

export type ArcanaMemeEvaluateParams = {
  evaluate: MEME_ICON; // 1，2，3
  memeCode: string;
  walletAddress: string;
};

export type ArcanaInviteesVote = {
  _id: string;
  createdAt: number;
  steamId: string;
  walletAddress: string;
  nftLevel: number;
  nftClaim: number;
  personName: string;
  avatar: string;
  votes: number;
};

export enum HERO_ATTRIBUTE {
  STRENGTH,
  AGILITY,
  INTELLIGENCE,
}

export type PredictionOption = {
  id: number;
  team?: string;
  name?: string;
  img1: string;
  img2: string;
  attr?: HERO_ATTRIBUTE;
};

export type PredictionItemData = {
  predictionCode: string;
  releaseDate: number;
  endDate: number;
  optionType: PREDICTION_TYPE;
  answer?: PredictionOption[];
  predictionTitle: string;
  predictionFull: string;
  sponsorName: string;
  sponsorLogo: string;
  meme: string;
  currentPrice: number;
  maxPrice: number;
  taskRequired: string;
  taskUrl: string;
  ifLock: boolean;
  optionList: PredictionOption[];
};

export type PredictionAnswerParams = {
  walletAddress: string;
  ipfsUrl: string;
  nonce: number;
  txData?: string;
  signature: string;
  gasLimit: any;
  answers: PredictionAnswer[];
};

export type PredictionAnswerOMGItem = {
  avatarFull: string;
  personName: string;
  predictionCode: string;
  votesTotalCurrent: number;
  walletAddress: string;
};

export type PredictionAnswerOMG2Item = {
  walletAddress: string;
  predictionCode: string;
  personName: string;
  avatarFull: string;
  omgInviteVotes: number;
  omgInviteCount: number;
};

export type VoteRankItem = {
  walletAddress: string;
  votesTotalCurrent: number;
  referralCount: number;
  avatarFull: string;
  personName: string;
};

export type RecentInvitationItem = {
  invitorAddress: string;
  invitorName: string;
  invitorAvatar: string;
  inviteeAddress: string;
  inviteeName: string;
  inviteeAvatar: string;
  votes: number;
};
