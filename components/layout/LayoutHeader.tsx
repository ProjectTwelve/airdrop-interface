import Image from 'next/image';
import Web3Status from '../web3/Web3Status';
import React from 'react';
import { useRouter } from 'next/router';
import LayoutHeaderExtra from './LayoutHeaderExtra';

function LayoutHeader() {
  const router = useRouter();

  return (
    <header className="flex justify-between">
      <div className="flex items-center justify-start">
        <Image
          width={80}
          height={36}
          onClick={() => router.push('/')}
          className="cursor-pointer"
          src="/svg/logo.svg"
          alt="logo"
        />
        <div className="ml-8">
          <LayoutHeaderExtra />
        </div>
      </div>
      <Web3Status />
    </header>
  );
}

export default React.memo(LayoutHeader);
