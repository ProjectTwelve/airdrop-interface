import React, { useMemo } from 'react';
import Button from '../../button';
import { ArcanaUserVotes, P12CommunityNft } from '../../../lib/types';
import classNames from 'classnames';

type TaskVoteDialogProps = {
  close: () => void;
  data?: ArcanaUserVotes;
};

export default function TaskVoteDialog({ data, close }: TaskVoteDialogProps) {
  const p12CommunityNft = useMemo<P12CommunityNft>(() => data?.p12CommunityNft || {}, [data]);
  const communityBadgeList = useMemo<{ key: keyof P12CommunityNft; asset: string; title: string }[]>(
    () => [
      {
        key: 'votesP12BestSupporterPurple',
        asset: '/img/arcana/statusbar/bs_epic.webp',
        title: 'B.S EPIC',
      },
      {
        key: 'votesP12DreamWeaver',
        asset: '/img/arcana/statusbar/bs_dream_weaver.webp',
        title: 'DREAM WEAVER',
      },
      {
        key: 'votesP12BestSupporterBlue',
        asset: '/img/arcana/statusbar/bs_rare.webp',
        title: 'B.S RARE',
      },
      {
        key: 'votesP12BestSupporterGreen',
        asset: '/img/arcana/statusbar/bs_uncommon.webp',
        title: 'B.S UNCOMMON',
      },
      {
        key: 'votesWhiteBadge',
        asset: '/img/arcana/statusbar/bs_common.webp',
        title: 'B.S COMMON',
      },
    ],
    [],
  );

  return (
    <div className="max-w-[540px]">
      <h2 className="text-center font-medium">MULTICAST VOTES</h2>
      <p className="flex items-center justify-center text-[60px] font-medium text-p12-success">
        <span className="mr-2 text-[45px] text-p12-success">X</span> {data?.votesCommunityNftCurrent || 0}
      </p>
      <p className="mt-[30px] text-sm font-medium">P12 Community Badge</p>
      <div className="mt-3 flex flex-wrap">
        {communityBadgeList.map((item) => (
          <div
            className={classNames('flex w-[108px] flex-col items-center', !p12CommunityNft[item.key] && 'opacity-30')}
            key={item.key}
          >
            <img width={90} src={item.asset} alt="badge" />
            <p className="mt-3 text-xs font-medium">{item.title}</p>
            <div className="mt-1 flex justify-center text-2xl font-medium">
              <span className="mr-1 text-lg">x</span> {p12CommunityNft[item.key] || 0}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <p className="text-sm font-medium">Binance Account Bound (BAB) Token</p>
        <div className={classNames('mt-3 flex flex-col items-center', !data?.votesBabCurrent && 'opacity-30')}>
          <img width={90} src="/img/arcana/statusbar/bab_vote.webp" alt="badge" />
          <p className="mt-3 text-xs font-medium">BAB</p>
          <div className="mt-1 flex justify-center text-2xl font-medium">
            <span className="mr-1 text-lg">x</span> {data?.votesBabCurrent || 0}
          </div>
        </div>
      </div>
      <div className="mt-[30px] flex w-full justify-end">
        <Button type="bordered" onClick={close}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
