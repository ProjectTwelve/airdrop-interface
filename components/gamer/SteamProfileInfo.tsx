import React from 'react';
import { GamerInfoData } from '../../lib/types';
import dayjs from 'dayjs';

export default function SteamProfileInfo({ data }: { data?: GamerInfoData }) {
  return (
    <div className="grid grid-cols-4 gap-5 md:w-full md:place-items-center md:gap-0">
      {data?.level ? (
        <div className="bg-gradient-item flex h-[80px] w-[80px] flex-col items-center justify-center overflow-hidden rounded-full text-center">
          <p className="text-sm">Level</p>
          <p className="text-xl font-medium">{data.level}</p>
        </div>
      ) : null}
      {data?.time_created ? (
        <div className="bg-gradient-item flex h-[80px] w-[80px] flex-col items-center justify-center overflow-hidden rounded-full text-center">
          <p className="text-sm">Years</p>
          <p className="text-xl font-medium">{dayjs.unix(data.time_created).format('YYYY')}</p>
        </div>
      ) : null}
      {data?.friends_count ? (
        <div className="bg-gradient-item flex h-[80px] w-[80px] flex-col items-center justify-center overflow-hidden rounded-full text-center">
          <p className="text-sm">Friends</p>
          <p className="text-xl font-medium">{data.friends_count}</p>
        </div>
      ) : null}
      {data?.badges_count ? (
        <div className="bg-gradient-item flex h-[80px] w-[80px] flex-col items-center justify-center overflow-hidden rounded-full text-center">
          <p className="text-sm">Badges</p>
          <p className="text-xl font-medium">{data.badges_count}</p>
        </div>
      ) : null}
    </div>
  );
}
