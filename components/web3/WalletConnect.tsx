import React from 'react';
import { WalletType } from './WalletPopover';
import Button from '../button';
import Image from 'next/image';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { injected } from '../../connectors';
import { AbstractConnector } from '@web3-react/abstract-connector';

type WalletConnectProps = {
  setWalletType?: (type: WalletType) => void;
};

function WalletConnect({ setWalletType }: WalletConnectProps) {
  const { activate } = useWeb3React();
  const metaMask = { connector: injected };

  /**
   * tryActivation
   * @param connector
   */
  const tryActivation = (connector: AbstractConnector | undefined) => {
    connector &&
      activate(connector, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector).then();
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <h4 className="text-xl font-medium">Connect wallet</h4>
      <Button
        type="bordered"
        className="mt-6 flex w-[170px] items-center justify-center gap-2"
        onClick={() => tryActivation(metaMask.connector)}
      >
        <Image src="/img/metamask@2x.png" width={30} height={30} alt="metamask" />
        <span className="text-sm">METAMASK</span>
      </Button>
      <div className="mt-[50px] text-xs text-p12-sub">
        Don&apos;t have one?&nbsp;
        <span className="cursor-pointer text-p12-link" onClick={() => setWalletType?.(WalletType.DOWNLOAD)}>
          click here
        </span>
      </div>
    </div>
  );
}

export default React.memo(WalletConnect);
