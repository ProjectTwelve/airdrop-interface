import { getNetwork } from '@wagmi/core';

import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';
import { getAddress } from 'viem';
import Message from '../components/message';

export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function shortenSteamId(steamId?: string): string {
  return steamId ? steamId.substring(0, 2) + '...' + steamId.substring(steamId.length - 2) : '';
}

export function shortenAddress(address?: string, chars = 4): string {
  if (!address) return '';
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function shortenHash(hash?: string): string {
  return hash ? hash.substring(0, 6) + '...' + hash.substring(hash.length - 4) : '';
}

export function shortenArcanaStr(
  str?: string,
  option?: {
    startTruncateLength?: number; // 开始省略的长度
    pre?: number;
    post?: number;
  },
): string {
  const { pre = 3, post = 5, startTruncateLength = 20 } = option ?? {};
  const len = str?.length;
  if (!len) return '';
  if (len < startTruncateLength) return str;
  return `${str.substring(0, pre)}...${str.substring(len - post)}`;
}

export function shortenArcanaShowName(showName?: string, startTruncateLength = 20): string {
  if (!showName) return '';
  const parsed = isAddress(showName);
  // TODO: shorten Rule
  if (parsed) return shortenAddress(showName);
  else if (showName.includes('.p12.dev')) return shortenArcanaStr(showName, { post: 3, startTruncateLength });
  else return shortenArcanaStr(showName, { startTruncateLength });
}

export const isBrowser = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

export const openLink = (url: string) => {
  if (isMobile) {
    window.location.href = url;
  } else {
    const winRef = window.open(url, '_blank');
    if (!winRef) {
      toast.error(<Message message="Please allow popups for this website." title="Ah shit, here we go again" />);
    }
  }
};

export const formatMinutes = (min?: number) => {
  if (min === undefined || min === null) return '--';
  const h = min / 60;
  const floor = Math.floor(min / 60);
  if (floor >= 100) return floor + ' h';
  return (h > floor && h > 0.1 ? h.toFixed(1) : floor) + ' h';
};

export function getSteamGameImage(appid: number) {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${appid}/capsule_184x69.jpg`;
}

export function getSteamProfileEdit(steamId: string) {
  return `https://steamcommunity.com/profiles/${steamId}/edit/settings`;
}

export const getVerifySignData = (account?: string) => ({
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
    ],
    Permit: [{ name: 'account', type: 'address' }],
  },
  domain: { name: 'P12 Verifier', version: '1' },
  primaryType: 'Permit',
  message: {
    account: account || '',
  },
});

export const getEmailSignData = ({ account, email }: { account: string; email: string }) => ({
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
    ],
    Permit: [
      { name: 'account', type: 'address' },
      { name: 'email', type: 'string' },
    ],
  },
  domain: { name: 'P12 Email Verifier', version: '1' },
  primaryType: 'Permit',
  message: { account, email },
});

export const getCountMemo = (count?: number) => {
  return count === 3 ? '1+2' : count;
};

export const downloadImage = (data: string) => {
  const downloadLink = document.createElement('a');
  downloadLink.href = data;
  downloadLink.download = 'poster.jpg';
  downloadLink.click();
};

export const objectSortByKey = (obj: any): any => {
  const newKey = Object.keys(obj).sort();
  const newObj: any = {};
  newKey.forEach((key) => {
    newObj[key] = obj[key];
  });
  return newObj;
};

export function getEtherscanLink(data: string, type: 'transaction' | 'token' | 'address'): string {
  const { chain } = getNetwork();
  const prefix = chain?.blockExplorers?.default.url || '';

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}
