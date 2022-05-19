import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { shortenAddress } from '../../utils';

function Web3StatusInner() {
  const { account } = useWeb3React();

  if (account) {
    return (
      <div className="rounded-full bg-[#313752] p-2 text-sm">
        <div className="flex items-center justify-center gap-3">
          <p>{shortenAddress(account)}</p>
          <div className="h-8 w-8 rounded-full border border-white bg-gradient"></div>
        </div>
      </div>
    );
  }
  return null;
}

export default React.memo(Web3StatusInner);
