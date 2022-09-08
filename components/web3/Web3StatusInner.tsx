import React, { useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';
import classNames from 'classnames';
import { shortenAddress } from '../../utils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { Tooltip } from '../tooltip';
import { gamerInfoAtom } from '../../store/gamer/state';
import { useSIDName } from '../../hooks/useSIDName';
import { useBABTBalanceOf } from '../../hooks/useContract';
import { isBABTHolderAtom } from '../../store/web3/state';

function Web3StatusInner() {
  const { address } = useAccount();
  const gamerInfo = useRecoilValue(gamerInfoAtom);
  const { SIDName } = useSIDName({ address });
  const { data: balance } = useBABTBalanceOf({ address });
  const setIsBABTHolder = useSetRecoilState(isBABTHolderAtom);
  const isBABTHolder = useMemo(() => (balance && balance.toString() !== '0') || false, [balance]);

  useEffect(() => {
    setIsBABTHolder(isBABTHolder);
  }, [isBABTHolder, setIsBABTHolder]);

  if (address) {
    return (
      <div
        className={classNames(
          'flex items-center justify-center px-3 py-2',
          isBABTHolder && 'overflow-hidden rounded-full bg-gradient-babt',
        )}
      >
        {gamerInfo?.email ? (
          <Tooltip placement="bottom" label={gamerInfo?.email}>
            <p className={classNames('cursor-pointer', isBABTHolder && 'font-medium text-black')}>
              {SIDName ?? shortenAddress(address)}
            </p>
          </Tooltip>
        ) : (
          <p className={classNames('cursor-pointer', isBABTHolder && 'font-medium text-black')}>
            {SIDName ?? shortenAddress(address)}
          </p>
        )}
        <div className="ml-3 h-8 w-8 overflow-hidden rounded-full border border-white bg-p12-gradient sm:hidden">
          {isBABTHolder ? (
            <img
              width={32}
              height={32}
              src="https://raw.githubusercontent.com/projecttwelve/icons/main/token/bab.jpg"
              alt="bnb"
            />
          ) : (
            <Jazzicon diameter={32} seed={jsNumberForAddress(address ?? '')} />
          )}
        </div>
      </div>
    );
  }
  return null;
}

export default Web3StatusInner;
