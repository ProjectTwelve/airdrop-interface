import React, { useRef } from 'react';
import { polygon } from 'wagmi/chains';
import { Platform } from '@/constants';
import { useRouter } from 'next/router';
import Button from '@/components/button';
import Popover from '@/components/popover';
import { watchAccount } from '@wagmi/core';
import WalletPopover from './WalletPopover';
import Web3StatusInner from './Web3StatusInner';
import { useMutationLogin } from '@/hooks/user';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getAccessToken } from '@/utils/authorization';
import { posterCaptureAtom } from '@/store/poster/state';
import { isConnectPopoverOpen } from '@/store/web3/state';
import PosterButton from '@/components/poster/PosterButton';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { useSignInWithEthereum } from '@/hooks/useSignInWithEthereum';
import { AnimatePresence } from 'framer-motion';
import DeveloperStatus from '@/components/web3/DeveloperStatus';
import GamerStatus from '@/components/web3/GamerStatus';

function Web3Status() {
  const router = useRouter();
  const { chain } = useNetwork();
  const isMounted = useIsMounted();
  const { mutate } = useMutationLogin();
  const unwatchAccount = useRef<() => void>();
  const { signInWithEthereum } = useSignInWithEthereum({
    onSuccess: (args) => mutate({ ...args, platform: Platform.USER }),
  });
  const { isConnected } = useAccount({
    onConnect({ address, isReconnected }) {
      unwatchAccount.current = watchAccount(({ isConnected, address }) => {
        const accessToken = getAccessToken({ address });
        if (address && isConnected && !accessToken) {
          signInWithEthereum(address).then();
        }
      });
      if (isReconnected || !address) return;
      signInWithEthereum(address).then();
    },
    onDisconnect() {
      unwatchAccount.current?.();
    },
  });
  const { switchNetwork } = useSwitchNetwork({ chainId: polygon.id });

  const [isOpen, setIsOpen] = useRecoilState(isConnectPopoverOpen);
  const posterCapture = useRecoilValue(posterCaptureAtom);

  if (!isMounted) return null;

  if (router.pathname === '/gamer/[address]') {
    return posterCapture ? <PosterButton /> : null;
  }

  if (isConnected) {
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
