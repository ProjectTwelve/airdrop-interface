import React, { useEffect, useMemo } from 'react';
import ReactGA from 'react-ga4';
import { useAccount } from 'wagmi';
import classNames from 'classnames';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { shortenAddress } from '../../utils';
import { isBABTHolderAtom } from '../../store/web3/state';
import { useBABTBalanceOf } from '../../hooks/useContract';
import { gamerEmailDialogTypeAtom, gamerEmailInfoAtom, gamerEmailShowAtom } from '../../store/gamer/state';
import Popover from '../popover';
import { useLogoutCallback } from '@/hooks/user';

function Web3StatusInner() {
  const { address, connector } = useAccount();
  const { data: balance } = useBABTBalanceOf({ address });
  const gamerEmailInfo = useRecoilValue(gamerEmailInfoAtom);
  const setIsBABTHolder = useSetRecoilState(isBABTHolderAtom);
  const setGamerEmailShow = useSetRecoilState(gamerEmailShowAtom);
  const setGamerEmailDialogType = useSetRecoilState(gamerEmailDialogTypeAtom);
  const isBABTHolder = useMemo(() => !!(balance && balance.toString() !== '0'), [balance]);
  const logout = useLogoutCallback();

  useEffect(() => {
    if (!address) return;
    if (isBABTHolder) {
      ReactGA.event({ action: 'BABT', category: 'Show', label: address });
    }
    setIsBABTHolder(isBABTHolder);
  }, [isBABTHolder, setIsBABTHolder, address]);

  if (address) {
    return (
      <Popover
        placement="bottom-end"
        className="z-40 border-none bg-transparent"
        render={() => (
          <div className="flex items-start gap-3">
            <div className="backdrop-box flex flex-col gap-3 rounded-2xl p-3">
              {gamerEmailInfo.is_email_verified ? (
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
              )}
              <div
                className="flex-center cursor-pointer rounded-lg p-2.5 hover:bg-white/[0.12] hover:backdrop-blur-lg"
                onClick={logout}
              >
                <img className="h-5 w-5" src="/svg/logout.svg" alt="" />
                Disconnect
              </div>
            </div>
            {connector?.id === 'particleAuth' && (
              <div className="backdrop-box rounded-2xl p-3">
                <iframe
                  className="z-40 h-[37.5rem] w-[min(370px,90vw)] rounded-xl"
                  src="https://wallet.particle.network/"
                  allow="camera"
                />
              </div>
            )}
          </div>
        )}
      >
        <div
          className={classNames(
            'flex cursor-pointer items-center justify-center px-3 py-2',
            isBABTHolder && 'overflow-hidden rounded-full bg-gradient-babt',
          )}
        >
          <p className={classNames(isBABTHolder && 'font-medium text-black')}>{shortenAddress(address)}</p>
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
      </Popover>
    );
  }
  return null;
}

export default Web3StatusInner;
