import React from 'react';
import Button from '../button';
import Table from '../table';

export function InviteRecordDialog({ close }: { close?: () => void }) {
  const columns = [
    {
      Header: 'Dev address',
      accessor: 'address',
    },
    {
      Header: 'Game name',
      accessor: 'name',
    },
    {
      Header: 'Game id',
      accessor: 'id',
    },
    {
      Header: 'Verify time',
      accessor: 'time',
    },
  ];

  return (
    <div className="w-[600px]">
      <h2 className="text-center text-xl">My P12 Airdrop Invite Address</h2>
      <div className="mt-8">
        <Table dataSource={[]} columns={columns} />
      </div>
      <div className="mt-14 flex justify-end border-t border-p12-line pt-7">
        <Button type="bordered" onClick={close}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
