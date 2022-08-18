import React from 'react';
import { shortenAddress } from '../../utils';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useAccount } from 'wagmi';
import { Tooltip } from '../tooltip';
import { useRecoilValue } from 'recoil';
import { gamerInfoAtom } from '../../store/gamer/state';

function Web3StatusInner() {
  const { address } = useAccount();
  const gamerInfo = useRecoilValue(gamerInfoAtom);

  if (address) {
    return (
      <div className="flex items-center justify-center px-3 sm:h-6">
        {gamerInfo?.email ? (
          <Tooltip placement="bottom" label={gamerInfo?.email}>
            <p className="cursor-pointer">{shortenAddress(address)}</p>
          </Tooltip>
        ) : (
          <p className="cursor-pointer">{shortenAddress(address)}</p>
        )}
        <div className="ml-3 h-8 w-8 overflow-hidden rounded-full border border-white bg-p12-gradient sm:hidden">
          <Jazzicon diameter={32} seed={jsNumberForAddress(address ?? '')} />
        </div>
      </div>
    );
  }
  return null;
}

export default React.memo(Web3StatusInner);
