import React from 'react';
import { useRecoilValue } from 'recoil';
import { arcanaOmgInviteCountAtom } from '../../../store/arcana/state';
import { useArcanaAnswerOMG2 } from '../../../hooks/arcana';
import Empty from '../../empty';
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

function LuckyDrawItem({ data }: { data: PredictionAnswerOMG2Item }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center">
        <div className="flex h-[30px] w-[70px] flex-col justify-center xs:w-[65px]">
          <p className="mt-1 font-ddin text-xl font-bold leading-4 text-p12-gold">$600</p>
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

export default function OMGv1() {
  const omgCount = useRecoilValue(arcanaOmgInviteCountAtom);
  const { data } = useArcanaAnswerOMG2();
  const prices: Reward[] = [
    { index: '1st', price: 3000 },
    { index: '2nd', price: 1600 },
    { index: '3rd', price: 1000 },
    { index: '4th', price: 800 },
    { index: '5th', price: 600 },
  ];

  return (
    <div id="omg_v2" className="px-[30px] xs:px-4">
      <div className="mt-4">
        <p className="text-center text-[26px] font-medium leading-[30px]">Check Winners of OMG Round 2</p>
      </div>
      <div className="mt-6 flex items-stretch justify-between gap-4 md:flex-col md:items-center">
        <div className="relative w-full max-w-[412px]">
          <div className="grid grid-cols-1 gap-4">
            <div className="h-[136px] rounded-lg bg-omg-count bg-cover">
              <p className="mt-[28px] text-center text-sm font-medium">My OMG Invitees</p>
              <p className="mt-[20px] text-center font-ddin text-[36px] font-semibold text-p12-gold">{omgCount.inviteCount}</p>
            </div>
            <div className="h-[136px] rounded-lg bg-omg-count bg-cover">
              <p className="mt-[28px] text-center text-sm font-medium">Votes from Invitees</p>
              <p className="mt-[20px] text-center font-ddin text-[36px] font-semibold text-p12-gold">{omgCount.inviteVotes}</p>
            </div>
          </div>
        </div>
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
                  .map((item, index) => (
                    <TopVoteItem reward={prices[index] || index + 1} data={item} key={item.walletAddress} />
                  ))
              ) : (
                <Empty color="#474C55" />
              )}
            </div>
          </div>
        </div>
        <div
          className="flex w-full max-w-[412px] flex-col rounded-lg"
          style={{ background: 'linear-gradient(to bottom, #47505980 0%, #25293080 100%)' }}
        >
          <div
            className="flex w-full items-center justify-between rounded-t-lg border border-[#EB9D55] py-5 px-4"
            style={{ background: 'linear-gradient(to top, #934F1F 1.49%, #CB7729 51.25%, #FAB44B 100%)' }}
          >
            <p className="text-center font-semibold" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
              Lucky Draw
            </p>
            <p className="dota__gold text-center font-ddin text-[26px] leading-[28px]">$600 x 5</p>
          </div>
          <div className="p-4 pb-[14px]">
            <div className="vertical-scroll flex flex-col gap-[10px] rounded-b-lg">
              {data ? (
                data.slice(0, 5).map((item) => <LuckyDrawItem data={item} key={item.walletAddress} />)
              ) : (
                <Empty color="#474C55" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
