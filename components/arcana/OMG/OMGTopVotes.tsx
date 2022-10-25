import React from 'react';
import Empty from '../../empty';
import { useArcanaAnswerOMG2 } from '../../../hooks/arcana';
import { PredictionAnswerOMG2Item } from '../../../lib/types';

type Reward = {
  index: string;
  price: number;
};

function TopVoteItem({ reward, data }: { reward: Reward | number; data: PredictionAnswerOMG2Item }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center">
        <div className="flex h-[30px] w-[70px] flex-col justify-center xs:w-[65px]">
          <p className="text-[10px] leading-[10px]">{typeof reward === 'number' ? reward + 'th' : reward.index}</p>
          {typeof reward === 'number' ? null : (
            <p className="mt-1 font-ddin text-xl font-bold leading-4 text-p12-gold">${reward.price}</p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <div className="h-[30px] w-[30px] overflow-hidden rounded-lg bg-black xs:h-10 xs:w-10">
            <img loading="lazy" className="h-full w-full object-cover" src={data.avatarFull} alt="avatar" />
          </div>
          <p className="ml-2 w-[110px] truncate text-sm font-medium xs:w-[75px] xs:text-xs">{data.personName}</p>
        </div>
      </div>
      <div className="font-ddin font-bold">{data.omgInviteCount} Invites</div>
      <div className="font-ddin font-bold">{data.omgInviteVotes} Votes</div>
    </div>
  );
}

export default function OMGTopVotes() {
  const { data } = useArcanaAnswerOMG2();
  const prices: Reward[] = [
    { index: '1st', price: 3000 },
    { index: '2nd', price: 1600 },
    { index: '3rd', price: 1000 },
    { index: '4th', price: 800 },
    { index: '5th', price: 600 },
  ];
  return (
    <div
      className="flex w-full max-w-[412px] flex-col rounded-lg"
      style={{ background: 'linear-gradient(to bottom, #47505980 0%, #25293080 100%)' }}
    >
      <div
        className="flex w-full items-center justify-between rounded-t-lg border border-[#EB6A55] py-5 px-4"
        style={{ background: 'linear-gradient(to top, #98322D 0%, #C84435 51.95%, #C94435 51.96%, #E85136 100%)' }}
      >
        <p className="text-center font-semibold" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
          Top Votes Reward
        </p>
        <p className="dota__gold text-center font-ddin text-[26px] leading-[28px]">$7000</p>
      </div>
      <div className="p-4 pb-[14px]">
        <div className="vertical-scroll flex flex-col gap-[10px] rounded-b-lg">
          {data ? (
            data
              .slice(0, 5)
              .map((item, index) => <TopVoteItem reward={prices[index] || index + 1} data={item} key={item.walletAddress} />)
          ) : (
            <Empty color="#474C55" />
          )}
        </div>
      </div>
    </div>
  );
}
