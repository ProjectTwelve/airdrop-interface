import React from 'react';

export default function SteamProfileInfo() {
  return (
    <div className="flex w-full max-w-[420px] items-center justify-around">
      <div className="bg-gradient-item flex h-[80px] w-[80px] flex-col items-center justify-center overflow-hidden rounded-full text-center">
        <p className="text-sm">Level</p>
        <p className="text-2xl font-medium">6</p>
      </div>
      <div className="bg-gradient-item flex h-[80px] w-[80px] flex-col items-center justify-center overflow-hidden rounded-full text-center">
        <p className="text-sm">Years</p>
        <p className="text-2xl font-medium">2015</p>
      </div>
      <div className="bg-gradient-item flex h-[80px] w-[80px] flex-col items-center justify-center overflow-hidden rounded-full text-center">
        <p className="text-sm">Friends</p>
        <p className="text-2xl font-medium">321</p>
      </div>
      <div className="bg-gradient-item flex h-[80px] w-[80px] flex-col items-center justify-center overflow-hidden rounded-full text-center">
        <p className="text-sm">Badges</p>
        <p className="text-2xl font-medium">300</p>
      </div>
    </div>
  );
}
