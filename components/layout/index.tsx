import React from 'react';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import { createClient, WagmiConfig } from 'wagmi';
import ButterflyGL from '../butterflyGL';
import LayoutHeader from './LayoutHeader';
import LayoutFooter from './LayoutFooter';
import ToastIcon from '../svg/ToastIcon';
import InviteDialog from '../dialog/InviteDialog';
import RoadmapDialog from '../dialog/RoadmapDialog';
import GamerEmailDialog from '../dialog/GamerEmailDialog';
import { metamaskConnector, walletConnect, provider } from '../../connectors';

const client = createClient({
  autoConnect: true,
  connectors: [metamaskConnector, walletConnect],
  provider,
  persister: null,
});

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <WagmiConfig client={client}>
      <RecoilRoot>
        <div className="mx-auto min-h-screen pt-4 2xl:container">
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
