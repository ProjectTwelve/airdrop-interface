import React from 'react';
import Button from '../button';
import Image from 'next/image';
import { WalletType } from './WalletPopover';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { injected, walletConnect } from '../../connectors';
import { AbstractConnector } from '@web3-react/abstract-connector';

type WalletConnectProps = {
  setWalletType?: (type: WalletType) => void;
};

function WalletConnect({ setWalletType }: WalletConnectProps) {
  const { activate } = useWeb3React();
  const wallets = {
    metaMask: injected,
    walletConnect: walletConnect,
  };

  /**
   * connectWallet
   * @param connector
   */
  const connectWallet = (connector: AbstractConnector | undefined) => {
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
      <div className="mt-6 flex w-full items-center justify-center gap-3 px-4">
        <Button
          type="bordered"
          className="flex w-full items-center justify-center gap-2"
          onClick={() => connectWallet(wallets.metaMask)}
        >
          <Image src="/img/metamask@2x.png" width={30} height={30} alt="metamask" />
          <span className="text-sm">MetaMask</span>
        </Button>
        <Button
          type="bordered"
          className="flex w-full items-center justify-center gap-2"
          onClick={() => connectWallet(wallets.walletConnect)}
        >
          <Image src="/img/walletconnet@2x.png" width={30} height={30} alt="metamask" />
          <span className="text-sm">WalletConnect</span>
        </Button>
      </div>
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
