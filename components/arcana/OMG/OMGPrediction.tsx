import React from 'react';
import { useRecoilValue } from 'recoil';
import { arcanaOmgInviteCountAtom } from '../../../store/arcana/state';

export default function OMGPrediction() {
  const omgCount = useRecoilValue(arcanaOmgInviteCountAtom);

  return (
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
  );
}
