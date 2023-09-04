import React from 'react';
import { PredictionAnswerOMG2Item } from '../../../lib/types';

function LuckyDrawItem({ data }: { data: PredictionAnswerOMG2Item }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center">
        <div className="flex h-[30px] w-[70px] flex-col justify-center xs:w-[65px]">
          <p className="mt-1 font-ddin text-xl font-bold leading-4 text-yellow">$600</p>
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
  const luckyUserList: PredictionAnswerOMG2Item[] = [
    {
      walletAddress: '0x90BE737242A0a9bA618080A84717c1D8Eb9eD843',
      predictionCode: 'qcE8GZ1U0xBwg3Wd',
      personName: 'Panda Boy',
      avatarFull: 'https://avatars.akamai.steamstatic.com/bf2c65bd752b663d6dd809f38cbe144bbe9e6078_full.jpg',
      omgInviteVotes: 107.0,
      omgInviteCount: 92,
    },
    {
      walletAddress: '0x24430ae18740eEA33f2c605Fac08847e787CB21a',
      predictionCode: 'qcE8GZ1U0xBwg3Wd',
      personName: 'megabars1k',
      avatarFull: 'https://avatars.akamai.steamstatic.com/f9dfe97633894249960f078772761ea3c2a68864_full.jpg',
      omgInviteVotes: 911.7,
      omgInviteCount: 873,
    },
    {
      walletAddress: '0xCB4Bab321EEab59926091a21C096fAE99f33baDC',
      predictionCode: 'qcE8GZ1U0xBwg3Wd',
      personName: '<3 Amoramor',
      avatarFull: 'https://avatars.akamai.steamstatic.com/82a3660485b2f5e12eecefcf59f09d94dd505427_full.jpg',
      omgInviteVotes: 480.1,
      omgInviteCount: 670,
    },
    {
      walletAddress: '0x9f7b105D999799f1cb2bde45371F99e37Ec53710',
      predictionCode: 'qcE8GZ1U0xBwg3Wd',
      personName: 'Tokyo -_-',
      avatarFull: 'https://avatars.akamai.steamstatic.com/04735bc833728284cbce58fb8cb9400e9aac742c_full.jpg',
      omgInviteVotes: 137.5,
      omgInviteCount: 125,
    },
    {
      walletAddress: '0x3988dFf5d29499038c5d5124a770C6557C2C146a',
      predictionCode: 'qcE8GZ1U0xBwg3Wd',
      personName: 'Clown',
      avatarFull: 'https://avatars.akamai.steamstatic.com/79a8119bd2a027755f93872d0d09b959909a0405_full.jpg',
      omgInviteVotes: 159.6,
      omgInviteCount: 191,
    },
  ];
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
        <p className="dota__yellow text-center font-ddin text-[26px] leading-[28px]">$600 x 5</p>
      </div>
      <div className="p-4 pb-[14px]">
        <div className="vertical-scroll flex flex-col gap-[10px] rounded-b-lg">
          {luckyUserList.map((item) => (
            <LuckyDrawItem data={item} key={item.walletAddress} />
          ))}
        </div>
      </div>
    </div>
  );
}
