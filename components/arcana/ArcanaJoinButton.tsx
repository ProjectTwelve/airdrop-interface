import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import dayjs, { Dayjs } from 'dayjs';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { fetchCollabJoin } from '../../lib/api';
import { CollabUserParams } from '../../lib/types';
import Message from '../message';
import { isConnectPopoverOpen } from '../../store/web3/state';
import { openLink } from '../../utils';

export default function ArcanaJoinButton() {
  const { address } = useAccount();
  const [date, setDate] = useState<Dayjs | null>(null);
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);
  const { mutate } = useMutation<any, any, CollabUserParams, any>((data) => fetchCollabJoin(data), {
    onSuccess: (data) => {
      if (data.code !== 200 || !data.data) {
        toast.error(<Message message={data.msg} title="Ah shit, here we go again" />);
        return;
      }
      openLink('https://gleam.io/MII0p/p12-arcana-ti11-stage-1-ti11-final-tickets-giveaway');
    },
  });

  const onJoinTicketClick = () => {
    if (!address) return setConnectOpen(true);
    mutate({ collabCode: 'TOP12xARCANATi11', walletAddress: address });
  };

  useEffect(() => {
    setDate(dayjs());
  }, []);

  if (!date) return null;

  if (date.isAfter('2022-09-15')) {
    return (
      <div>
        <p className="font-medium text-p12-orange">TI 11 Final Ticket Giveaway is on!</p>
        <div className="mt-3 cursor-pointer max-w-[300px]" onClick={onJoinTicketClick}>
          <img src="/img/arcana/join.jpg" alt="join" />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p className="font-medium text-p12-orange">TI 11 Final Ticket Giveaway Comes on</p>
        <p className="font-ddin text-[30px] font-medium text-p12-orange">September 15</p>
      </div>
    );
  }
}
