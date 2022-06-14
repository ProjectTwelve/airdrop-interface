import React from 'react';
import Button from '../button';
import { WalletType } from './WalletPopover';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { injected, walletConnect } from '../../connectors';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useRecoilState } from 'recoil';
import { downloadClickAtom } from '../../store/download/state';
import { isMobile } from 'react-device-detect';
import { InjectedConnector } from '@web3-react/injected-connector';

type WalletConnectProps = {
  setWalletType?: (type: WalletType) => void;
};

function WalletConnect({ setWalletType }: WalletConnectProps) {
  const { activate } = useWeb3React();
  const [downloadClick, setDownloadClick] = useRecoilState(downloadClickAtom);
  const wallets = {
    metaMask: injected,
    walletConnect: walletConnect,
  };

  /**
   * connectWallet
   * @param connector
   */
  const connectWallet = (connector: AbstractConnector | undefined) => {
    if (isMobile && connector instanceof InjectedConnector && !window.ethereum) {
      window.open('https://metamask.app.link/dapp/' + window.location.hostname);
      return;
    }
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
      <div className="mt-6 flex w-full items-center justify-center gap-3 px-4 md:flex-col">
        <Button
          type="bordered"
          className="flex w-full min-w-[170px] items-center justify-center gap-2"
          onClick={() => connectWallet(wallets.metaMask)}
        >
          <img className="h-[30px] w-[30px]" src="/img/metamask@2x.png" alt="meta_mask" />
          <span className="text-sm">MetaMask</span>
        </Button>
        <Button
          type="bordered"
          className="flex w-full min-w-[170px] items-center justify-center gap-2"
          onClick={() => connectWallet(wallets.walletConnect)}
        >
          <img className="h-[30px] w-[30px]" src="/img/walletconnet@2x.png" alt="wallet_connet" />
          <span className="text-sm">WalletConnect</span>
        </Button>
      </div>
      <div className="mt-[50px] px-4 text-xs text-p12-sub">
        {downloadClick ? 'Please refresh page after installation. Re-install ' : "Don't have one? "}
        <span
          className="cursor-pointer text-p12-link"
          onClick={() => {
            setDownloadClick(true);
            setWalletType?.(WalletType.DOWNLOAD);
          }}
        >
          click here
        </span>
      </div>
    </div>
  );
}

export default React.memo(WalletConnect);
