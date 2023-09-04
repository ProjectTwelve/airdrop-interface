import React from 'react';
import { useRecoilValue } from 'recoil';
import { arcanaOmgInviteCountAtom } from '../../../store/arcana/state';
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
            <p className="mt-1 font-ddin text-xl font-bold leading-4 text-yellow">${reward.price}</p>
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

export default function OMGv1() {
  const omgCount = useRecoilValue(arcanaOmgInviteCountAtom);
  const prices: Reward[] = [
    { index: '1st', price: 3000 },
    { index: '2nd', price: 1600 },
    { index: '3rd', price: 1000 },
    { index: '4th', price: 800 },
    { index: '5th', price: 600 },
  ];
  const voteUserList: PredictionAnswerOMG2Item[] = [
    {
      walletAddress: '0x51208b42aAb220175ED2Cbfb37B94FdA48776A49',
      predictionCode: 'qcE8GZ1U0xBwg3Wd',
      personName: 'unknown',
      avatarFull: 'https://avatars.akamai.steamstatic.com/80adc4b39b1a9db2bd92b7f96ab146653001275b_full.jpg',
      omgInviteVotes: 1596,
      omgInviteCount: 1902,
    },
    {
      walletAddress: '0xF1626f3F7AfB766b3fe626ECdf388e969efB4F19',
      predictionCode: 'qcE8GZ1U0xBwg3Wd',
      personName: '♔ S a w w a ₁₃₃₇',
      avatarFull: 'https://avatars.akamai.steamstatic.com/4dbb32d42d73c1d0b9f7374886769378aac5d871_full.jpg',
      omgInviteVotes: 1544,
      omgInviteCount: 1847,
    },
    {
      walletAddress: '0xad7B89753a9e23aE68eF0f5ac01a04c383a6815f',
      predictionCode: 'qcE8GZ1U0xBwg3Wd',
      personName: 'Hikari',
      avatarFull: 'https://avatars.akamai.steamstatic.com/12b11a0a9f50b2783a1d7e61a8a927d89d9057d2_full.jpg',
      omgInviteVotes: 1514,
      omgInviteCount: 1663,
    },
    {
      walletAddress: '0x9A29967dB9bB57bC4D16271B4B4884c2BEcEfCeD',
      predictionCode: 'qcE8GZ1U0xBwg3Wd',
      personName: 'EnjoyMaloy / Паштет',
      avatarFull: 'https://avatars.akamai.steamstatic.com/3f1a1ca7804d794ac65e4bf5bc2ea94aadace96c_full.jpg',
      omgInviteVotes: 1512,
      omgInviteCount: 964,
    },
    {
      walletAddress: '0x2d23d93d7C81069ef6cBf9A28F9377aF6BfeE0c8',
      predictionCode: 'qcE8GZ1U0xBwg3Wd',
      personName: 'Smipi',
      avatarFull: 'https://avatars.akamai.steamstatic.com/8dfe278c7493b6984540e57ecd57b791df13841e_full.jpg',
      omgInviteVotes: 1226,
      omgInviteCount: 1830,
    },
  ];
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
    <div id="omg_v2" className="px-[30px] xs:px-4">
      <div className="mt-4">
        <p className="text-center text-[26px] font-medium leading-[30px]">Check Winners of OMG Round 2</p>
      </div>
      <div className="mt-6 flex items-stretch justify-between gap-4 md:flex-col md:items-center">
        <div className="relative w-full max-w-[412px]">
          <div className="grid grid-cols-1 gap-4">
            <div className="h-[136px] rounded-lg bg-omg-count bg-cover backdrop-blur-lg">
              <p className="mt-[28px] text-center text-sm font-medium">My OMG Invitees</p>
              <p className="mt-[20px] text-center font-ddin text-[36px] font-semibold text-yellow">{omgCount.inviteCount}</p>
            </div>
            <div className="h-[136px] rounded-lg bg-omg-count bg-cover backdrop-blur-lg">
              <p className="mt-[28px] text-center text-sm font-medium">Votes from Invitees</p>
              <p className="mt-[20px] text-center font-ddin text-[36px] font-semibold text-yellow">{omgCount.inviteVotes}</p>
            </div>
          </div>
        </div>
        <div
          className="flex w-full max-w-[412px] flex-col rounded-lg backdrop-blur-lg"
          style={{ background: 'linear-gradient(to bottom, #47505980 0%, #25293080 100%)' }}
        >
          <div
            className="flex w-full items-center justify-between rounded-t-lg border border-[#EB6A55] py-5 px-4"
            style={{ background: 'linear-gradient(to top, #98322D 0%, #C84435 51.95%, #C94435 51.96%, #E85136 100%)' }}
          >
            <p className="text-center font-semibold" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
              Top Votes Reward
            </p>
            <p className="dota__yellow text-center font-ddin text-[26px] leading-[28px]">$7000</p>
          </div>
          <div className="p-4 pb-[14px]">
            <div className="vertical-scroll flex flex-col gap-[10px] rounded-b-lg">
              {voteUserList.map((item, index) => (
                <TopVoteItem reward={prices[index]} data={item} key={item.walletAddress} />
              ))}
            </div>
          </div>
        </div>
        <div
          className="flex w-full max-w-[412px] flex-col rounded-lg backdrop-blur-lg"
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
      </div>
    </div>
  );
}
