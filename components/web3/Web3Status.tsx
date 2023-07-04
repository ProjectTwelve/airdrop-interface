import React from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import Button from '../button';
import Web3StatusInner from './Web3StatusInner';
import Popover from '../popover';
import WalletPopover from './WalletPopover';
import DeveloperStatus from './DeveloperStatus';
import GamerStatus from './GamerStatus';
import { isConnectPopoverOpen } from '../../store/web3/state';
import PosterButton from '../poster/PosterButton';
import { posterCaptureAtom } from '../../store/poster/state';
import { useIsMounted } from '../../hooks/useIsMounted';

function Web3Status() {
  const router = useRouter();
  const { chain } = useNetwork();
  const isMounted = useIsMounted();
  const { address } = useAccount();
  const { switchNetwork } = useSwitchNetwork({ chainId: mainnet.id });

  const [isOpen, setIsOpen] = useRecoilState(isConnectPopoverOpen);
  const posterCapture = useRecoilValue(posterCaptureAtom);

  if (!isMounted) return null;

  if (router.pathname === '/gamer/[address]') {
    return posterCapture ? <PosterButton /> : null;
  }

  if (address) {
    if (chain?.unsupported) {
      return (
        <Button type="error" onClick={() => switchNetwork?.()}>
          Wrong Network
        </Button>
      );
    }
    return (
      <div className="flex items-center">
        {router.pathname === '/gamer' && posterCapture && <PosterButton />}
        <div className="flex rounded-full bg-[#44465F]/60 text-sm backdrop-blur">
          <div className="py-2 md:hidden">
            <AnimatePresence>{router.pathname === '/developer' && <DeveloperStatus />}</AnimatePresence>
            <AnimatePresence>{router.pathname === '/gamer' && <GamerStatus />}</AnimatePresence>
          </div>
          <Web3StatusInner />
        </div>
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

export default Web3Status;
