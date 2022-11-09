import React, { useEffect, useMemo } from 'react';
import ReactGA from 'react-ga4';
import { useAccount } from 'wagmi';
import classNames from 'classnames';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { Tooltip } from '../tooltip';
import { shortenAddress } from '../../utils';
import { useSIDName } from '../../hooks/useSIDName';
import { isBABTHolderAtom } from '../../store/web3/state';
import { useBABTBalanceOf } from '../../hooks/useContract';
import { gamerEmailDialogTypeAtom, gamerEmailInfoAtom, gamerEmailShowAtom } from '../../store/gamer/state';

function Web3StatusInner() {
  const { address } = useAccount();
  const { SIDName } = useSIDName({ address });
  const { data: balance } = useBABTBalanceOf({ address });
  const gamerEmailInfo = useRecoilValue(gamerEmailInfoAtom);
  const setIsBABTHolder = useSetRecoilState(isBABTHolderAtom);
  const setGamerEmailShow = useSetRecoilState(gamerEmailShowAtom);
  const setGamerEmailDialogType = useSetRecoilState(gamerEmailDialogTypeAtom);
  const isBABTHolder = useMemo(() => !!(balance && balance.toString() !== '0'), [balance]);

  useEffect(() => {
    if (!address) return;
    if (isBABTHolder) {
      ReactGA.event({ category: 'BABT', action: 'Show', label: address });
    }
    setIsBABTHolder(isBABTHolder);
  }, [isBABTHolder, setIsBABTHolder, address]);

  if (address) {
    return (
      <div
        className={classNames(
          'flex items-center justify-center px-3 py-2',
          isBABTHolder && 'overflow-hidden rounded-full bg-gradient-babt',
        )}
      >
        {gamerEmailInfo?.email ? (
          <Tooltip
            placement="bottom"
            label={
              gamerEmailInfo.is_email_verified ? (
                <p>{gamerEmailInfo.email}</p>
              ) : (
                <p
                  className="cursor-pointer text-[#FF2358]"
                  onClick={() => {
                    setGamerEmailShow(true);
                    setGamerEmailDialogType('type2');
                  }}
                >
                  {gamerEmailInfo.email}
                </p>
              )
            }
          >
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
