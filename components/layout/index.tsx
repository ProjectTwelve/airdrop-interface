import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Web3ReactManage from '../web3/Web3ReactManage';
import LayoutHeader from './LayoutHeader';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <Web3ReactProvider getLibrary={(provider) => new Web3Provider(provider)}>
      <Web3ReactManage>
        <div className="container mx-auto pt-14">
          <LayoutHeader />
          <main className="mt-10">{children}</main>
        </div>
      </Web3ReactManage>
    </Web3ReactProvider>
  );
}
