import React from 'react';
import { shortenAddress } from '../../utils';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useAccount } from 'wagmi';
import { Tooltip } from '../tooltip';
import { useRecoilValue } from 'recoil';
import { gamerInfoAtom } from '../../store/gamer/state';

function Web3StatusInner() {
  const { data: account } = useAccount();
  const gamerInfo = useRecoilValue(gamerInfoAtom);

  if (account?.address) {
    return (
      <div className="flex items-center justify-center px-3">
        {gamerInfo?.email ? (
          <Tooltip placement="bottom" label={gamerInfo?.email}>
            <p className="cursor-pointer">{shortenAddress(account.address)}</p>
          </Tooltip>
        ) : (
          <p className="cursor-pointer">{shortenAddress(account.address)}</p>
        )}
        <div className="ml-3 h-8 w-8 overflow-hidden rounded-full border border-white bg-[image:var(--gradient)]">
          <Jazzicon diameter={32} seed={jsNumberForAddress(account.address ?? '')} />
        </div>
      </div>
    );
  }
  return null;
}

export default React.memo(Web3StatusInner);
