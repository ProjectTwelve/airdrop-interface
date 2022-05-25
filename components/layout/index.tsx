import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Web3ReactManage from '../web3/Web3ReactManage';
import LayoutHeader from './LayoutHeader';
import { RecoilRoot } from 'recoil';
import InviteDialog from '../dialog/InviteDialog';
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <Web3ReactProvider getLibrary={(provider) => new Web3Provider(provider)}>
      <Web3ReactManage>
        <RecoilRoot>
          <div className="mx-auto px-4 pt-14 xl:container xl:px-0">
            <LayoutHeader />
            <main>{children}</main>
          </div>
          <div className="container-bg"></div>
          <InviteDialog />
          <ToastContainer theme="dark" toastClassName="toast-container" autoClose={3000} hideProgressBar />
        </RecoilRoot>
      </Web3ReactManage>
    </Web3ReactProvider>
  );
}
