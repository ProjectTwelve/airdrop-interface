import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { shortenAddress } from '../../utils';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

function Web3StatusInner() {
  const { account } = useWeb3React();

  if (account) {
    return (
      <div className="flex items-center justify-center gap-3 px-3">
        <p>{shortenAddress(account)}</p>
        <div className="h-8 w-8 overflow-hidden rounded-full border border-white bg-gradient">
          <Jazzicon diameter={32} seed={jsNumberForAddress(account ?? '')} />
        </div>
      </div>
    );
  }
  return null;
}

export default React.memo(Web3StatusInner);
