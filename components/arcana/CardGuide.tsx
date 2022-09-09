import React from 'react';

export default function CardGuide() {
  return (
    <div className="rounded-2xl bg-p12-black/80 p-4 backdrop-blur 2xl:p-6">
      <h3 className="text-xl font-medium">Guide</h3>
      <div className="mt-4 flex 2xl:mt-6">
        <div className="relative my-2 mr-4 flex flex-col justify-between">
          <p className="absolute top-0 left-[2px] h-full w-[1px] bg-[#74788B]/50"></p>
          <p className="h-[5px] w-[5px] rounded-full bg-p12-bg"></p>
          <p className="h-[5px] w-[5px] rounded-full bg-p12-bg"></p>
          <p className="h-[5px] w-[5px] rounded-full bg-p12-bg"></p>
          <p className="h-[5px] w-[5px] rounded-full bg-p12-bg"></p>
        </div>
        <div className="w-full">
          <p className="mr-2 truncate text-sm">Get P12 Genesis NFT to gain entry voting power</p>
          <p className="mt-3 mr-2 truncate text-sm">Multicast your votes to the arcana</p>
          <p className="mt-3 mr-2 truncate text-sm">Invite friends to gain more voting power</p>
          <p className="mt-3 mr-2 truncate text-sm">Win prizes with your pick</p>
        </div>
      </div>
    </div>
  );
}
