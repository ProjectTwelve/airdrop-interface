import React from 'react';
import Button from '../button';
import { useWeb3React } from '@web3-react/core';
import Web3StatusInner from './Web3StatusInner';

function Web3Status() {
  const { account, error } = useWeb3React();

  if (account) {
    return <Web3StatusInner />;
  } else if (error) {
    return (
      <Button type="error" onClick={() => console.log(1)}>
        Wrong Network
      </Button>
    );
  } else {
    return (
      <Button type="gradient" className="w-[120px]" onClick={() => console.log(2)}>
        Connect
      </Button>
    );
  }
}

export default React.memo(Web3Status);
