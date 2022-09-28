import React from 'react';
import dayjs from 'dayjs';
import Table from '../../table';
import Button from '../../button';
import { ArcanaUserVotes } from '../../../lib/types';
import { shortenAddress, shortenSteamId } from '../../../utils';
import { GAMER_BADGES, GAMER_NFT_LEVEL } from '../../../constants';
import { useArcanaInviteesVotes } from '../../../hooks/arcana';

type ReferralVoteDialogProps = {
  close: () => void;
  data?: ArcanaUserVotes;
};

export default function ReferralVoteDialog({ close, data }: ReferralVoteDialogProps) {
  const { data: invitation, isLoading } = useArcanaInviteesVotes(data?.walletAddress);

  const referralColumns = [
    {
      width: 120,
      Header: 'Gamer address',
      accessor: 'walletAddress',
      Cell: ({ value }: any) => <p className="flex h-full items-center">{shortenAddress(value)}</p>,
    },
    {
      width: 100,
      Header: 'Verify time',
      accessor: 'createdAt',
      Cell: ({ value }: any) => <p className="flex h-full items-center">{dayjs(value).format('YYYY/MM/DD')}</p>,
    },
    {
      width: 200,
      Header: 'Gamer info',
      accessor: (row: any) => (
        <div className="flex items-center">
          <img width={52} height={52} className="mr-2 rounded" src={row.avatar} alt="avatar" />
          <div className="flex flex-col justify-around truncate">
            <p className="mb-1 truncate text-base font-semibold">{row.personName}</p>
            <p className="text-xs">Steam ID: {shortenSteamId(row.steamId)}</p>
          </div>
        </div>
      ),
    },
    {
      width: 60,
      accessor: 'nftLevel',
      Cell: ({ value }: { value: GAMER_NFT_LEVEL }) => (
        <div className="flex h-full items-center">
          <img src={GAMER_BADGES[value].img} alt="nft" width={36} height={36} />
        </div>
      ),
    },
    {
      width: 120,
      Header: 'Get',
      accessor: 'votes',
      Cell: ({ value }: any) => (
        <div className="flex h-full items-center font-ddin text-2xl font-semibold">
          <span className="mr-2">{value}</span> Votes
        </div>
      ),
    },
  ];
  return (
    <div className="max-w-[720px]">
      <h2 className="text-center font-medium">MULTICAST VOTES</h2>
      <p className="flex items-center justify-center text-[60px] font-medium text-p12-success">
        <span className="mr-2 text-[45px] text-p12-success">X</span> {data?.votesReferralCurrent || 0}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium">My Referral List</p>
        <p className="text-xs">
          <span className="text-red-600">*</span> A valid invitee is required to claim P12 Genesis NFT
        </p>
      </div>
      <div className="h-[400px]">
        <Table
          loading={isLoading}
          className="mt-3 max-w-[95vw] overflow-x-auto"
          dataSource={invitation || []}
          columns={referralColumns}
        />
      </div>
      <div className="mt-[30px] flex w-full justify-end">
        <Button type="bordered" onClick={close}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
