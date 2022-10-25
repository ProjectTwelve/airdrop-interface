import React from 'react';
import Empty from '../../empty';
import { useArcanaAnswerOMG2 } from '../../../hooks/arcana';
import { PredictionAnswerOMG2Item } from '../../../lib/types';

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

export default function OMGLuckyDraw() {
  const { data } = useArcanaAnswerOMG2();
  return (
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
  );
}
