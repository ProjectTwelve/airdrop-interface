import React from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { useAccount, useNetwork } from 'wagmi';
import { AnimatePresence } from 'framer-motion';
import Button from '../button';
import Web3StatusInner from './Web3StatusInner';
import Popover from '../popover';
import WalletPopover from './WalletPopover';
import DeveloperStatus from './DeveloperStatus';
import GamerStatus from './GamerStatus';
import { isConnectPopoverOpen } from '../../store/web3/state';

function Web3Status() {
  const router = useRouter();
  const { data: account } = useAccount();
  const { activeChain, switchNetwork } = useNetwork();
  const [isOpen, setIsOpen] = useRecoilState(isConnectPopoverOpen);

  if (account?.address) {
    if (activeChain?.unsupported) {
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
          <AnimatePresence>{router.pathname === '/gamer' && <GamerStatus />}</AnimatePresence>
        </div>
        <Web3StatusInner />
      </div>
    );
  } else {
    return (
      <div>
        <Popover open={isOpen} onOpenChange={(op) => setIsOpen(op)} render={({ close }) => <WalletPopover close={close} />}>
          <Button type="gradient" className="w-[120px]">
            Connect
          </Button>
        </Popover>
      </div>
    );
  }
}

export default React.memo(Web3Status);
