import React from 'react';
import { RecoilRoot } from 'recoil';
import ButterflyGL from '../butterflyGL';
import LayoutHeader from './LayoutHeader';
import LayoutFooter from './LayoutFooter';
import ToastIcon from '../svg/ToastIcon';
import { Poppins } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import InviteDialog from '../dialog/InviteDialog';
import { createConfig, WagmiConfig } from 'wagmi';
import RoadmapDialog from '../dialog/RoadmapDialog';
import GamerEmailDialog from '../dialog/GamerEmailDialog';
import {
  bitKeepConnector,
  metaMaskConnector,
  particleAuthConnector,
  publicClient,
  tokenPocketConnector,
  walletConnectConnector,
  webSocketPublicClient,
} from '@/connectors';
import classNames from 'classnames';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const config = createConfig({
  autoConnect: true,
  connectors: [metaMaskConnector, tokenPocketConnector, bitKeepConnector, particleAuthConnector, walletConnectConnector],
  publicClient,
  webSocketPublicClient,
});

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <WagmiConfig config={config}>
      <RecoilRoot>
        <div className={classNames('mx-auto min-h-screen pt-4 2xl:container', poppins.className)}>
          <LayoutHeader />
          <main>{children}</main>
          <LayoutFooter />
        </div>
        <InviteDialog />
        <RoadmapDialog />
        <GamerEmailDialog />
        <ToastContainer theme="dark" toastClassName="toast-container" icon={<ToastIcon />} autoClose={3000} hideProgressBar />
        {process.env.NODE_ENV === 'production' && <ButterflyGL />}
      </RecoilRoot>
    </WagmiConfig>
  );
}
