import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import Table from '@/components/table';
import { useRecoilValue } from 'recoil';
import Button from '@/components/button';
import Message from '@/components/message';
import { GAMER_BADGES } from '@/constants';
import { useCopyToClipboard } from 'react-use';
import { referralCodeAtom } from '@/store/invite/state';
import { useArcanaInviteesVotes } from '@/hooks/arcana';
import { shortenAddress, shortenSteamId } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { ArcanaInviteesVote, ArcanaUserVotes } from '@/lib/types';

type ReferralVoteDialogProps = {
  close: () => void;
  data?: ArcanaUserVotes;
};

const columnHelper = createColumnHelper<ArcanaInviteesVote>();

export default function ReferralVoteDialog({ close, data }: ReferralVoteDialogProps) {
  const { data: invitation, isLoading } = useArcanaInviteesVotes(data?.walletAddress);
  const referralCode = useRecoilValue(referralCodeAtom);
  const [, copyToClipboard] = useCopyToClipboard();
  const referralLink = useMemo(() => {
    return referralCode ? window.location.origin + '/?code=' + referralCode : 'Please connect your wallet first';
  }, [referralCode]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('walletAddress', {
        minSize: 120,
        header: 'Gamer address',
        cell: ({ getValue }) => <p className="flex h-full items-center">{shortenAddress(getValue())}</p>,
      }),
      columnHelper.accessor('createdAt', {
        size: 100,
        header: 'Verify time',
        cell: ({ getValue }) => <p className="flex h-full items-center">{dayjs(getValue()).format('YYYY/MM/DD')}</p>,
      }),
      columnHelper.display({
        id: 'info',
        size: 200,
        header: 'Gamer info',
        cell: ({ row: { original } }) => (
          <div className="flex items-center">
            <img width={52} height={52} className="mr-2 rounded" src={original.avatar} alt="avatar" />
            <div className="flex flex-col justify-around truncate">
              <p className="mb-1 truncate text-base font-semibold">{original.personName}</p>
              <p className="text-xs">Steam ID: {shortenSteamId(original.steamId)}</p>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('nftLevel', {
        size: 60,
        header: undefined,
        cell: ({ getValue }) => (
          <div className="flex h-full items-center">
            <img src={GAMER_BADGES[getValue()].img} alt="nft" width={36} height={36} />
          </div>
        ),
      }),
      columnHelper.accessor('votes', {
        header: 'Get',
        size: 120,
        cell: ({ getValue }) => (
          <div className="flex h-full items-center font-ddin text-2xl font-semibold">
            <span className="mr-2">{getValue()}</span> {getValue() > 1 ? 'Votes' : 'Vote'}
          </div>
        ),
      }),
    ],
    [],
  );
  return (
    <div className="max-w-[720px]">
      <h2 className="text-center font-medium">Get VOTES by Referral</h2>
      <p className="flex items-center justify-center text-[60px] font-medium text-green">
        <span className="mr-2 text-[45px] text-green">X</span> {data?.votesReferralCurrent || 0}
      </p>
      <div className="mt-[30px]">
        <p className="text-sm font-medium">Invite friends with Referral Link</p>
        <div className="mt-3 flex flex-1 items-center justify-between rounded-full bg-[#494E69]/40 p-1.5">
          <p className="ml-3 text-sm">{referralLink.replace(/https?:\/\//g, '')}</p>
          <Button
            type="gradient"
            size="small"
            onClick={() => {
              copyToClipboard(referralLink);
              toast.success(<Message message="Copied to clipboard" title="Mission Complete" />);
            }}
          >
            copy
          </Button>
        </div>
      </div>
      <div className="mt-[30px] flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium">My Referral List</p>
        <p className="text-xs">
          <span className="text-red-600">*</span> A valid invitee is required to claim P12 Genesis NFT after Sep 10th.
        </p>
      </div>
      <div className="max-h-[400px] min-h-[300px]">
        <Table
          loading={isLoading}
          className="mt-3 max-w-[95vw] overflow-x-auto"
          dataSource={invitation || []}
          columns={columns}
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
