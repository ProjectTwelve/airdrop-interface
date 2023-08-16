export enum NFT_CLAIM {
  UNCLAIMED = 0,
  PENDING,
  CLAIMED,
}

export enum DEV_NFT_LEVEL {
  ORANGE = 0,
  PURPLE,
  BLUE,
  GREEN,
}

export enum GAMER_NFT_LEVEL {
  ORANGE = 0,
  PURPLE,
  BLUE,
  GREEN,
  WHITE,
  REKT,
}

export enum COLLAB_TIME_STATUS {
  UPCOMING = 'Upcoming',
  JOIN = 'Join',
  ALLOCATE = 'Allocate',
  CLAIM = 'Claim',
  CLOSED = 'Closed',
}

export enum COLLAB_NFT_STATUS {
  UN_CONNECT = 0,
  IS_HOLDER,
  NOT_HOLDER,
}

export enum CHAIN_ID {
  MAINNET = 1,
  BSC_MAINNET = 56,
  BSC_TESTNET = 97,
}

export enum Platform {
  USER,
  DEVELOPER,
}
