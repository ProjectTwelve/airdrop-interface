import React, { useMemo } from 'react';
import Button from '../button';
import Web3StatusInner from './Web3StatusInner';
import Popover from '../popover';
import WalletPopover from './WalletPopover';
import DeveloperStatus from './DeveloperStatus';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { useAccount, useNetwork } from 'wagmi';

function Web3Status() {
  const router = useRouter();
  const { data: account } = useAccount();
  const { activeChain, chains, switchNetwork } = useNetwork();
  const networkError = useMemo(() => !chains.find((chain) => chain.id === activeChain?.id), [activeChain, chains]);

  if (account?.address) {
    if (networkError) {
      return (
        <Button type="error" onClick={() => switchNetwork?.(1)}>
          Wrong Network
        </Button>
      );
    }
    return (
      <div className="flex rounded-full bg-[#44465F]/60  py-2 text-sm backdrop-blur">
        <div className="md:hidden">
          <AnimatePresence>{router.pathname === '/developer' && <DeveloperStatus />}</AnimatePresence>
        </div>
        <Web3StatusInner />
      </div>
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
