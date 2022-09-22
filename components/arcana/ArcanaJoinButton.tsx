import React, { useState } from 'react';
import ReactGA from 'react-ga4';
import { useAccount } from 'wagmi';
import { useSetRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import Dialog from '../dialog';
import { fetchCollabJoin } from '../../lib/api';
import { CollabUserParams } from '../../lib/types';
import { isConnectPopoverOpen } from '../../store/web3/state';
import { openLink } from '../../utils';

enum TaskType {
  QUEST3,
  GLEAM,
}

export default function ArcanaJoinButton() {
  const { address } = useAccount();
  const [open, setOpen] = useState<boolean>(false);
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);
  const { mutate } = useMutation<any, any, CollabUserParams, any>((data) => fetchCollabJoin(data));

  const onTaskSelectClick = (type: TaskType) => {
    if (!address) return;
    mutate({ collabCode: 'TOP12xARCANATi11', walletAddress: address });
    if (type === TaskType.QUEST3) {
      ReactGA.event({ category: 'Arcana-Join', action: 'Click', label: 'quest3' });
      openLink('https://app.quest3.xyz/quest/687223046918307997');
    }
    if (type === TaskType.GLEAM) {
      ReactGA.event({ category: 'Arcana-Join', action: 'Click', label: 'gleam' });
      openLink('https://gleam.io/MII0p/p12-arcana-ti11-stage-1-ti11-final-tickets-giveaway');
    }
  };

  return (
    <div>
      <p className="text-lg font-medium text-p12-gold">TI 11 Final Ticket Giveaway is on!</p>
      <div
        className="task__button mt-3 flex h-[49px] max-w-[285px] items-center justify-center"
        onClick={() => {
          if (!address) return setConnectOpen(true);
          setOpen(true);
        }}
      >
        <p className="task__gold text-xl">Join Now</p>
      </div>
      <Dialog
        onOpenChange={(op) => setOpen(op)}
        open={open}
        render={() => (
          <div className="w-screen max-w-[480px]">
            <h3 className="border-b border-p12-line pb-8 text-center text-xl font-medium">Join the Giveaway!</h3>
            <div className="mt-[40px] grid grid-cols-2 gap-x-[30px] gap-y-3">
              <div
                className="task__button flex flex-col items-center justify-center py-[30px]"
                onClick={() => onTaskSelectClick(TaskType.QUEST3)}
              >
                <img src="/img/arcana/quest3.png" alt="quest3" />
                <p className="task__gold mt-2 text-xl">Quest 3</p>
              </div>
              <div
                className="task__o-button flex flex-col items-center justify-center py-[30px]"
                onClick={() => onTaskSelectClick(TaskType.GLEAM)}
              >
                <img src="/img/arcana/gleam.png" alt="gleam" />
                <p className="mt-2 text-xl font-semibold">Gleam</p>
              </div>
              <p className="text-center font-medium text-p12-gold">50% Wining Buff</p>
            </div>
          </div>
        )}
      />
    </div>
  );
}
