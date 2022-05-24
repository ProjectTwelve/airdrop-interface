import { getAddress } from '@ethersproject/address';

export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export const isBrowser = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

export const getSignData = (account: string) => ({
  types: {
    EIP712Domain: [
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'version',
        type: 'string',
      },
    ],
    Permit: [
      {
        name: 'account',
        type: 'address',
      },
    ],
  },
  domain: {
    name: 'P12 Verifier',
    version: '1',
  },
  primaryType: 'Permit',
  message: {
    account: account,
  },
});
