import React from 'react';
import { useConnect } from 'wagmi';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import Button from '@/components/button';
import { WalletType } from './WalletPopover';
import { isMobile } from 'react-device-detect';
import { downloadClickAtom } from '@/store/web3/state';
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
    <div className="flex-center-y p-6">
      <h4 className="text-xl font-medium">Connect wallet</h4>
      <div className="mt-6 grid grid-cols-2 gap-3 px-4">
        <Button type="bordered" className="flex-center col-span-2 gap-2" onClick={() => connectWallet(connectors[0])}>
          <img className="h-7.5 w-7.5" src="/img/metamask@2x.png" alt="meta_mask" />
          <span className="text-sm">MetaMask</span>
        </Button>
        <Button type="bordered" className="flex-center gap-2" onClick={() => connectWallet(connectors[1])}>
          <img className="h-7.5 w-7.5" src="/img/tokenPocket.png" alt="TokenPocket" />
          <span className="text-sm">TokenPocket</span>
        </Button>
        <Button type="bordered" className="flex-center gap-2" onClick={() => connectWallet(connectors[2])}>
          <img className="h-7.5 w-7.5" src="/img/bitgetWallet.png" alt="BitgetWallet" />
          <span className="text-sm">Bitget Wallet</span>
        </Button>
        <Button type="bordered" className="flex-center gap-2 px-6" onClick={() => connectWallet(connectors[3])}>
          <img className="h-7.5 w-7.5" src="/img/particleNetwork.png" alt="ParticleNetwork" />
          <span className="whitespace-nowrap text-sm">Particle Network</span>
        </Button>
        <Button type="bordered" className="flex-center gap-2" onClick={() => connectWallet(connectors[4])}>
          <img className="h-7.5 w-7.5" src="/img/walletconnet.png" alt="wallet_connet" />
          <span className="text-sm">WalletConnect</span>
        </Button>
      </div>
      <div className="mt-4 px-4 text-xs text-gray">
        {downloadClick ? 'Please refresh page after installation. Re-install ' : "Don't have one? "}
        <span
          className="cursor-pointer text-blue"
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
