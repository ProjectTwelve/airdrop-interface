import React from 'react';

function TopVoteItem() {
  return (
    <div className="flex items-center justify-between rounded border border-[#6F7784]/50 bg-gradient-prediction p-3.5">
      <div>
        <p className="text-xs">1st</p>
        <p className="font-ddin text-2xl font-bold leading-6 text-p12-gold">$300</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="h-[44px] w-[44px] rounded-lg bg-black"></div>
        <p className="ml-2 max-w-[120px] truncate text-sm">name</p>
      </div>
      <div className="font-ddin text-2xl font-bold">300 Votes</div>
    </div>
  );
}

export default function OMGTopVotes() {
  return (
    <div className="flex w-full max-w-[450px] flex-col rounded-lg">
      <div
        className="w-full rounded-t-lg border border-[#EB6A55] py-[30px]"
        style={{ background: 'linear-gradient(to top, #98322D 0%, #C84435 51.95%, #C94435 51.96%, #E85136 100%)' }}
      >
        <p className="text-center text-xl font-semibold" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
          Top Votes Reward
        </p>
        <p className="dota__gold mt-3 text-center text-[42px] leading-[42px]">$600</p>
      </div>
      <div className="dota__box flex flex-1 flex-col gap-3 rounded-b-lg px-5 py-12">
        <p className="text-center text-sm leading-6">Current Winner</p>
        <TopVoteItem />
        <TopVoteItem />
        <TopVoteItem />
      </div>
    </div>
  );
}
