import React from 'react';
import { useConnect } from 'wagmi';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { isMobile } from 'react-device-detect';
import Button from '../button';
import { WalletType } from './WalletPopover';
import { downloadClickAtom } from '../../store/web3/state';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

type WalletConnectProps = {
  setWalletType?: (type: WalletType) => void;
};

function WalletConnect({ setWalletType }: WalletConnectProps) {
  const router = useRouter();
  const { connect, connectors } = useConnect({
    onError: (error, { connector }) => {
      if (error.name === 'ConnectorNotFoundError' && connector.name === 'MetaMask') {
        window.open('https://metamask.io');
        return;
      }
      if (error.name === 'ConnectorNotFoundError' && connector.name === 'BitKeep') {
        window.open('https://bitkeep.com/en/download?type=2');
        return;
      }
    },
  });
  const [downloadClick, setDownloadClick] = useRecoilState(downloadClickAtom);

  /**
   * connectWallet
   * @param connector
   */
  const connectWallet = (connector: any | undefined) => {
    const { code } = router.query;
    if (isMobile && connector instanceof MetaMaskConnector && !window.ethereum) {
      const url = code ? window.location.hostname + `?code=${code}` : window.location.hostname;
      window.open('https://metamask.app.link/dapp/' + url);
      return;
    }
    connector && connect({ connector });
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <h4 className="text-xl font-medium">Connect wallet</h4>
      <div className="mt-6 grid grid-cols-1 gap-3 px-4 md:grid-cols-1">
        <Button
          type="bordered"
          className="flex w-full min-w-[210px] items-center justify-center"
          onClick={() => connectWallet(connectors[0])}
        >
          <img className="mr-2 h-[30px] w-[30px]" src="/img/metamask@2x.png" alt="meta_mask" />
          <span className="text-sm">MetaMask</span>
        </Button>
        <Button
          type="bordered"
          className="flex w-full min-w-[210px] items-center justify-center"
          onClick={() => connectWallet(connectors[1])}
        >
          <img className="mr-2 h-[30px] w-[30px]" src="/svg/bitkeep.svg" alt="bitkeep" />
          <span className="text-sm">BitKeep</span>
        </Button>
        <Button
          type="bordered"
          className="flex w-full min-w-[210px] items-center justify-center"
          onClick={() => connectWallet(connectors[2])}
        >
          <img className="mr-2 h-[30px] w-[30px]" src="/img/walletconnet@2x.png" alt="wallet_connet" />
          <span className="text-sm">WalletConnect</span>
        </Button>
      </div>
      <div className="mt-4 px-4 text-xs text-p12-sub">
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
