import React from 'react';
import Button from '../button';
import { WalletType } from './WalletPopover';
import { useRecoilState } from 'recoil';
import { downloadClickAtom } from '../../store/web3/state';
import { isMobile } from 'react-device-detect';
import { useConnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

type WalletConnectProps = {
  setWalletType?: (type: WalletType) => void;
};

function WalletConnect({ setWalletType }: WalletConnectProps) {
  const { connect, connectors } = useConnect();
  const [downloadClick, setDownloadClick] = useRecoilState(downloadClickAtom);

  /**
   * connectWallet
   * @param connector
   */
  const connectWallet = (connector: any | undefined) => {
    if (isMobile && connector instanceof MetaMaskConnector && !window.ethereum) {
      window.open('https://metamask.app.link/dapp/' + window.location.hostname);
      return;
    }
    connector && connect({ connector });
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <h4 className="text-xl font-medium">Connect wallet</h4>
      <div className="mt-6 grid grid-cols-2 gap-3 px-4 md:grid-cols-1">
        <Button
          type="bordered"
          className="flex w-full min-w-[170px] items-center justify-center"
          onClick={() => connectWallet(connectors[0])}
        >
          <img className="mr-2 h-[30px] w-[30px]" src="/img/metamask@2x.png" alt="meta_mask" />
          <span className="text-sm">MetaMask</span>
        </Button>
        <Button
          type="bordered"
          className="flex w-full min-w-[170px] items-center justify-center"
          onClick={() => connectWallet(connectors[1])}
        >
          <img className="mr-2 h-[30px] w-[30px]" src="/img/walletconnet@2x.png" alt="wallet_connet" />
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
