import React from 'react';
import dayjs from 'dayjs';
import Button from '../button';
import Table from '../table';
import { useQueryClient } from 'react-query';
import { useWeb3React } from '@web3-react/core';
import { shortenAddress } from '../../utils';
import { DeveloperInvitationData, Response } from '../../lib/types';

export function InviteRecordDialog({ close }: { close?: () => void }) {
  const { account } = useWeb3React();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Response<DeveloperInvitationData>>(['invitation_info', account]);

  const columns = [
    {
      width: 150,
      Header: 'Dev address',
      accessor: 'wallet_address',
      Cell: ({ value }: any) => shortenAddress(value),
    },
    {
      width: 150,
      Header: 'Game name',
      accessor: 'name',
      Cell: ({ value }: any) => <p className="max-w-[200px] truncate">{value}</p>,
    },
    {
      width: 150,
      Header: 'Game id',
      accessor: 'appid',
    },
    {
      width: 150,
      Header: 'Verify time',
      accessor: 'createAt',
      Cell: ({ value }: any) => dayjs(value).format('YYYY/MM/DD'),
    },
  ];

  return (
    <div>
      <h2 className="text-center text-xl">My P12 Airdrop Referral List</h2>
      <div className="mt-8">
        <Table className="max-w-[80vw] overflow-x-auto" dataSource={data?.data.invitation_info || []} columns={columns} />
      </div>
      <div className="mt-14 flex justify-end border-t border-p12-line pt-7">
        <Button type="bordered" onClick={close}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
