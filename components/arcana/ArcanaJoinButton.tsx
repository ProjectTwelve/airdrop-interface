import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import ReactGA from 'react-ga4';
import { useAccount } from 'wagmi';
import { useSetRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import Dialog from '../dialog';
import { openLink } from '../../utils';
import { CollabUserParams } from '../../lib/types';
import { fetchCollabJoin } from '../../lib/api';
import { isConnectPopoverOpen } from '../../store/web3/state';

enum TaskType {
  QUEST3,
  GLEAM,
}

export default function ArcanaJoinButton() {
  const { address } = useAccount();
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('P12 Arcana @ TI11');
  const [progress, setProgress] = useState<string>('10/1 - 10/19');
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);
  const [isTicketGiveaway, setIsTicketGiveaway] = useState<boolean>(false);
  const { mutate } = useMutation<any, any, CollabUserParams, any>((data) => fetchCollabJoin(data));

  const progressList = useMemo(
    () => [
      {
        title: 'TI11 Final Ticket Giveaway',
        startTime: 1663171200000,
        endTime: 1664553599000,
      },
      {
        title: 'P12 Arcana @ TI11',
        startTime: 1664553600000,
        endTime: 1666195199000,
      },
      {
        title: 'TI11 Main Event',
        startTime: 1666195200000,
        endTime: 1667231999000,
      },
      {
        title: 'Treasures Drop',
        startTime: 1667232000000,
        endTime: 1667836799000,
      },
    ],
    [],
  );

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

  useEffect(() => {
    const now = Date.now();
    if (now < 1664553599000) {
      setIsTicketGiveaway(true);
    }
    progressList.map((item) => {
      if (now > item.startTime && now < item.endTime) {
        setTitle(item.title);
        setProgress(`${dayjs(item.startTime).format('MM/DD')} - ${dayjs(item.endTime).format('MM/DD')}`);
      }
    });
  }, [progressList]);

  return (
    <div>
      <p className="text-lg font-medium text-p12-gold">{title}</p>
      {!isTicketGiveaway ? (
        <div className="mt-3 flex">
          <p
            className="h-[26px] bg-[#7A3E1A] px-2 text-center text-sm leading-6"
            style={{ boxShadow: 'inset 0 0 12px #220F04' }}
          >
            In progress
          </p>
          <p
            className="h-[26px] bg-[#952E2F] px-4 text-center font-ddin text-sm font-bold leading-6"
            style={{ textShadow: '0 0 4px rgba(0, 0, 0, 0.5)' }}
          >
            {progress}
          </p>
        </div>
      ) : (
        <div
          className="dota__button mt-3 flex h-[49px] max-w-[285px] items-center justify-center"
          onClick={() => {
            if (!address) return setConnectOpen(true);
            setOpen(true);
          }}
        >
          <p className="dota__gold text-xl">Join Now</p>
        </div>
      )}
      <Dialog
        onOpenChange={(op) => setOpen(op)}
        open={open}
        render={() => (
          <div className="w-screen max-w-[480px]">
            <h3 className="border-b border-p12-line pb-8 text-center text-xl font-medium">Join the Giveaway!</h3>
            <div className="mt-[40px] grid grid-cols-2 gap-x-[30px] gap-y-3">
              <div
                className="dota__button flex flex-col items-center justify-center py-[30px]"
                onClick={() => onTaskSelectClick(TaskType.QUEST3)}
              >
                <img src="/img/arcana/quest3.png" alt="quest3" />
                <p className="dota__gold mt-2 text-xl">Quest 3</p>
              </div>
              <div
                className="dota__o-button flex flex-col items-center justify-center py-[30px]"
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
