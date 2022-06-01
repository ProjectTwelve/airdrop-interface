import React from 'react';
import { RecoilRoot } from 'recoil';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ToastContainer } from 'react-toastify';
import Web3ReactManage from '../web3/Web3ReactManage';
import LayoutHeader from './LayoutHeader';
import InviteDialog from '../dialog/InviteDialog';
import RoadmapDialog from '../dialog/RoadmapDialog';
import ToastIcon from '../svg/ToastIcon';
import ButterflyGL from '../butterflyGL';
import LayoutFooter from './LayoutFooter';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <Web3ReactProvider getLibrary={(provider) => new Web3Provider(provider)}>
      <Web3ReactManage>
        <RecoilRoot>
          <div className="relative mx-auto min-h-screen px-4 pt-14 xl:container xl:px-0">
            <LayoutHeader />
            <main>{children}</main>
            <LayoutFooter />
          </div>
          <InviteDialog />
          <RoadmapDialog />
          <ToastContainer theme="dark" toastClassName="toast-container" icon={<ToastIcon />} autoClose={3000} hideProgressBar />
          <ButterflyGL />
        </RecoilRoot>
      </Web3ReactManage>
    </Web3ReactProvider>
  );
}
