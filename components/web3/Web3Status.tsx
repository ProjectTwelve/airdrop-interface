import React, { useCallback } from 'react';
import Button from '../button';
import { useWeb3React } from '@web3-react/core';
import Web3StatusInner from './Web3StatusInner';
import Popover from '../popover';
import WalletPopover from './WalletPopover';
import { CHAIN_ID } from '../../constants';
import DeveloperStatus from './DeveloperStatus';
import { useRouter } from 'next/router';

function Web3Status() {
  const router = useRouter();
  const { account, error } = useWeb3React();

  const walletSwitchEthereumChain = useCallback(async () => {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x' + CHAIN_ID.toString(16) }],
    });
  }, []);

  if (account) {
    return (
      <div className="flex rounded-full bg-[#313752] py-2 text-sm">
        {router.pathname === '/developer' && <DeveloperStatus />}
        <Web3StatusInner />
      </div>
    );
  } else if (error) {
    return (
      <Button type="error" onClick={walletSwitchEthereumChain}>
        Wrong Network
      </Button>
    );
  } else {
    return (
      <div>
        <Popover render={({ close }) => <WalletPopover close={close} />}>
          <Button type="gradient" className="w-[120px]">
            Connect
          </Button>
        </Popover>
      </div>
    );
  }
}

export default React.memo(Web3Status);
