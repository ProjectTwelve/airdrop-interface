import React, { useState } from 'react';
import WalletDownload from './WalletDownload';
import WalletConnect from './WalletConnect';

type WalletPopoverProps = {
  close?: () => void;
};

export enum WalletType {
  CONNECT = 'connect',
  DOWNLOAD = 'download',
}

function WalletPopover({}: WalletPopoverProps) {
  const [type, setType] = useState<WalletType>(WalletType.CONNECT);
  const walletComponent = {
    [WalletType.CONNECT]: <WalletConnect setWalletType={(type) => setType(type)} />,
    [WalletType.DOWNLOAD]: <WalletDownload setWalletType={(type) => setType(type)} />,
  };

  return (
    <div className="backdrop-box rounded-2xl" style={{ width: 'min(400px,80vw)' }}>
      {walletComponent[type]}
    </div>
  );
}

export default WalletPopover;
