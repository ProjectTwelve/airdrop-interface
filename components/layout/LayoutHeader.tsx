import Web3Status from '../web3/Web3Status';
import React from 'react';
import { useRouter } from 'next/router';
import LayoutHeaderExtra from './LayoutHeaderExtra';

function LayoutHeader() {
  const router = useRouter();

  return (
    <header className="relative z-10 flex justify-between">
      <div className="flex items-center justify-start">
        <div className="h-[36px] w-[80px] cursor-pointer bg-[image:var(--logo)] bg-cover" onClick={() => router.push('/')} />
        <div className="ml-8">
          <LayoutHeaderExtra />
        </div>
      </div>
      <Web3Status />
    </header>
  );
}

export default React.memo(LayoutHeader);
