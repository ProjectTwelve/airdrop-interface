import React from 'react';
import { GamerInfoData } from '@/lib/types';
import dayjs from 'dayjs';

export default function SteamProfileInfo({ data }: { data?: GamerInfoData }) {
  return (
    <div className="grid grid-cols-4 gap-5 md:w-full md:place-items-center md:gap-0">
      {data?.level ? (
        <div className="bg-gradient-item flex h-16 w-16 flex-col items-center justify-center gap-1 overflow-hidden rounded-full text-center">
          <p className="text-xs">Level</p>
          <p className="text-base/5 font-semibold">{data.level}</p>
        </div>
      ) : null}
      {data?.time_created ? (
        <div className="bg-gradient-item flex h-16 w-16 flex-col items-center justify-center gap-1 overflow-hidden rounded-full text-center">
          <p className="text-xs">Years</p>
          <p className="text-base/5 font-semibold">{dayjs.unix(data.time_created).format('YYYY')}</p>
        </div>
      ) : null}
      {data?.friends_count ? (
        <div className="bg-gradient-item flex h-16 w-16 flex-col items-center justify-center gap-1 overflow-hidden rounded-full text-center">
          <p className="text-xs">Friends</p>
          <p className="text-base/5 font-semibold">{data.friends_count}</p>
        </div>
      ) : null}
      {data?.badges_count ? (
        <div className="bg-gradient-item flex h-16 w-16 flex-col items-center justify-center gap-1 overflow-hidden rounded-full text-center">
          <p className="text-xs">Badges</p>
          <p className="text-base/5 font-semibold">{data.badges_count}</p>
        </div>
      ) : null}
    </div>
  );
}
