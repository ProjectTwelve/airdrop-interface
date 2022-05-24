import React, { useState } from 'react';
import Back from '../back';
import { WalletType } from './WalletPopover';
import { motion } from 'framer-motion';
import Image from 'next/image';

type WalletDownloadProps = {
  setWalletType?: (type: WalletType) => void;
};

function WalletDownload({ setWalletType }: WalletDownloadProps) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      icon: '/img/chrome.png',
      name: 'Chrome',
      url: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
    },
    { icon: '/img/firefox.png', name: 'Firefox', url: 'https://addons.mozilla.org/firefox/addon/ether-metamask' },
    {
      icon: '/img/edge.png',
      name: 'Edge',
      url: 'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm',
    },
  ];

  return (
    <div className="p-6">
      <Back onClick={() => setWalletType?.(WalletType.CONNECT)} />
      <h4 className="text-center text-xl font-bold">Download & Setup</h4>
      <div
        className="mt-6 flex cursor-pointer select-none items-center justify-between border-y border-p12-sub py-2 px-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-center gap-2">
          <Image src="/img/metamask.png" width={30} height={30} alt="metamask" />
          <span className="text-sm">METAMASK</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs">Download</span>
          <svg width="10" height="6">
            <motion.path
              animate={{ rotate: isOpen ? 180 : 0 }}
              d="M5.35355 4.97982C5.15829 5.17508 4.84171 5.17508 4.64645 4.97982L0.853555 1.18693C0.538573 0.871947 0.761655 0.333375 1.20711 0.333375L8.79289 0.333376C9.23835 0.333376 9.46143 0.871947 9.14645 1.18693L5.35355 4.97982Z"
              fill={isOpen ? '#fff' : '#949FA9'}
            />
          </svg>
        </div>
      </div>
      <div className="h-[80px]">
        <motion.div
          className="overflow-hidden border-b border-p12-sub"
          initial="close"
          animate={isOpen ? 'open' : 'close'}
          variants={{
            open: { height: 'auto', borderColor: '#A7A7B6' },
            close: { height: 0, borderColor: '#00000000' },
          }}
        >
          <div className="flex justify-around py-3">
            {links.map((item) => (
              <div
                className="flex cursor-pointer items-center justify-center gap-1"
                key={item.name}
                onClick={() => window.open(item.url)}
              >
                <Image src={item.icon} width={20} height={20} alt="icon" />
                <span className="text-xs text-p12-link">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div>
        <p className="text-sm">What is the Wallet for?</p>
        <p className="text-sm leading-6 text-p12-sub">· Storing digital assets such as $P12, ETH and NFTs.</p>
        <p className="text-sm leading-6 text-p12-sub">· Sending Blockchain transactions.</p>
      </div>
    </div>
  );
}

export default React.memo(WalletDownload);
