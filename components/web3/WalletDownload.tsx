import React, { useState } from 'react';
import Back from '../back';
import Image from 'next/image';
import { WalletType } from './WalletPopover';
import { motion } from 'framer-motion';
import { openLink } from '@/utils';
import ReactGA from 'react-ga4';

type WalletDownloadProps = {
  setWalletType?: (type: WalletType) => void;
};

function WalletDownload({ setWalletType }: WalletDownloadProps) {
  const [isOpen, setIsOpen] = useState(true);

  const links = [
    {
      icon: '/img/chrome@2x.png',
      name: 'Chrome',
      url: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
    },
    { icon: '/img/firefox@2x.png', name: 'Firefox', url: 'https://addons.mozilla.org/firefox/addon/ether-metamask' },
    {
      icon: '/img/edge@2x.png',
      name: 'Edge',
      url: 'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm',
    },
  ];

  return (
    <div className="p-6">
      <Back onClick={() => setWalletType?.(WalletType.CONNECT)} />
      <h4 className="text-center text-xl font-medium">Download & Setup</h4>
      <div
        className="mt-6 flex cursor-pointer select-none items-center justify-between border-y border-gray px-4 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-center">
          <img className="mr-2 h-7.5 w-7.5 md:hidden" src="/img/metamask@2x.png" alt="metamask" />
          <span className="text-sm">METAMASK</span>
        </div>
        <div className="flex items-center justify-center">
          <span className="pr-3 text-xs">Download</span>
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
          className="overflow-hidden border-b border-gray"
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
                className="flex cursor-pointer items-center justify-center"
                key={item.name}
                onClick={() => {
                  ReactGA.event({ action: 'Download', category: 'Click', label: item.name });
                  openLink(item.url);
                }}
              >
                <Image src={item.icon} width={20} height={20} alt="icon" />
                <span className="pl-1 text-xs text-blue">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div>
        <p className="text-sm">What is a wallet for?</p>
        <p className="text-sm leading-6 text-gray">· Storing digital assets such as P12 NFTs, P12 tokens, ETH and more.</p>
        <p className="text-sm leading-6 text-gray">· Sending Blockchain transactions.</p>
      </div>
    </div>
  );
}

export default React.memo(WalletDownload);
