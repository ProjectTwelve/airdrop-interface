import React from 'react';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import LayoutHeader from './LayoutHeader';
import InviteDialog from '../dialog/InviteDialog';
import RoadmapDialog from '../dialog/RoadmapDialog';
import ToastIcon from '../svg/ToastIcon';
import ButterflyGL from '../butterflyGL';
import LayoutFooter from './LayoutFooter';
import { createClient, WagmiConfig } from 'wagmi';
import { metamaskConnector, walletConnect } from '../../connectors';

const client = createClient({
  autoConnect: true,
  connectors: [metamaskConnector, walletConnect],
  persister: null!,
});

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <WagmiConfig client={client}>
      <RecoilRoot>
        <div className="relative mx-auto min-h-screen px-2 pt-14 md:pt-6 xl:container xl:px-0">
          <LayoutHeader />
          <main>{children}</main>
          <LayoutFooter />
        </div>
        <InviteDialog />
        <RoadmapDialog />
        <ToastContainer theme="dark" toastClassName="toast-container" icon={<ToastIcon />} autoClose={3000} hideProgressBar />
        {process.env.NODE_ENV === 'production' && <ButterflyGL />}
      </RecoilRoot>
    </WagmiConfig>
  );
}
