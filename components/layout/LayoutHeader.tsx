import Link from 'next/link';
import Image from 'next/image';
import Web3Status from '../web3/Web3Status';
import React from 'react';

function LayoutHeader() {
  return (
    <header className="flex justify-between">
      <Link href="/" className="flex items-center">
        <Image
          width={80}
          height={36}
          className="inline h-[36px] w-[80px] cursor-pointer align-middle"
          src="/svg/logo.svg"
          alt="logo"
        />
      </Link>
      <Web3Status />
    </header>
  );
}

export default React.memo(LayoutHeader);
