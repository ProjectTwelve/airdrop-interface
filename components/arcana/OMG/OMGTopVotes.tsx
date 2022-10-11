import React, { useMemo } from 'react';
import { useArcanaAnswerOMG } from '../../../hooks/arcana';
import { PredictionAnswerOMGItem } from '../../../lib/types';

type Reward = {
  index: string;
  price: number;
};

function TopVoteItem({ reward, data }: { reward: Reward; data: PredictionAnswerOMGItem }) {
  return (
    <div className="flex items-center justify-between rounded border border-[#6F7784]/50 bg-gradient-prediction p-3.5">
      <div>
        <p className="text-xs">{reward.index}</p>
        <p className="font-ddin text-2xl font-bold leading-6 text-p12-gold">${reward.price}</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="h-[44px] w-[44px] overflow-hidden rounded-lg bg-black">
          <img loading="lazy" className="h-full w-full object-cover" src={data.avatarFull} alt="avatar" />
        </div>
        <p className="ml-2 max-w-[120px] truncate text-sm">{data.personName}</p>
      </div>
      <div className="font-ddin text-2xl font-bold">{data.votesTotalCurrent} Votes</div>
    </div>
  );
}

export default function OMGTopVotes({ code }: { code?: string }) {
  const { data } = useArcanaAnswerOMG();
  const voteUserList = useMemo(() => (data && code ? data[code] : undefined), [code, data]);
  const prices: Reward[] = [
    { index: '1st', price: 1200 },
    { index: '2nd', price: 800 },
    { index: '3rd', price: 600 },
  ];
  return (
    <div className="flex w-full max-w-[450px] flex-col rounded-lg">
      <div
        className="w-full rounded-t-lg border border-[#EB6A55] py-[30px]"
        style={{ background: 'linear-gradient(to top, #98322D 0%, #C84435 51.95%, #C94435 51.96%, #E85136 100%)' }}
      >
        <p className="text-center text-xl font-semibold" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
          Top Votes Reward
        </p>
        <p className="dota__gold mt-3 text-center font-ddin text-[42px] leading-[42px]">$2600</p>
      </div>
      <div className="dota__box flex flex-1 flex-col gap-3 rounded-b-lg px-5 py-12">
        <p className="text-center text-sm leading-6">Current Winner</p>
        {voteUserList &&
          voteUserList.map((item, index) => <TopVoteItem reward={prices[index]} data={item} key={item.walletAddress} />)}
      </div>
    </div>
  );
}
