import React from 'react';
import { openLink } from '../../../utils';
import { PredictionAnswerOMGItem } from '../../../lib/types';

type Reward = {
  index: string;
  price: number;
};

function TopVoteItem({ reward, data }: { reward: Reward; data: PredictionAnswerOMGItem }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center">
        <div className="w-[80px] 2xl:w-[105px] xs:w-[65px]">
          <p className="text-[10px] leading-[10px]">{reward.index}</p>
          <p className="mt-1 font-ddin text-xl font-bold leading-4 text-p12-gold">${reward.price}</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="h-[30px] w-[30px] overflow-hidden rounded-lg bg-black xs:h-10 xs:w-10">
            <img loading="lazy" className="h-full w-full object-cover" src={data.avatarFull} alt="avatar" />
          </div>
          <p className="ml-2 text-sm font-medium xs:text-xs">{data.personName}</p>
        </div>
      </div>
      <div className="font-ddin font-bold">{data.votesTotalCurrent} Votes</div>
    </div>
  );
}

function LuckyDrawItem({ data }: { data: PredictionAnswerOMGItem }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center">
        <div className="h-[30px] w-[30px] overflow-hidden rounded-lg bg-black">
          <img loading="lazy" className="h-full w-full object-cover" src={data.avatarFull} alt="avatar" />
        </div>
        <p className="ml-2 text-sm font-medium">{data.personName}</p>
      </div>
      <div className="font-ddin font-bold">{data.votesTotalCurrent} Votes</div>
    </div>
  );
}

export default function OMGv1() {
  const voteUserList: PredictionAnswerOMGItem[] = [
    {
      walletAddress: '0x51208b42aAb220175ED2Cbfb37B94FdA48776A49',
      predictionCode: 'XgwpwGu1yYerVY2L',
      personName: 'unknown',
      avatarFull: 'https://avatars.akamai.steamstatic.com/80adc4b39b1a9db2bd92b7f96ab146653001275b_full.jpg',
      votesTotalCurrent: 970,
    },
    {
      walletAddress: '0xF3894D78b7b667663b0AEEd7E0bc468b2278eEC3',
      predictionCode: 'XgwpwGu1yYerVY2L',
      personName: 'Mr.BallsJohnson',
      avatarFull: 'https://avatars.akamai.steamstatic.com/919ac3b08da2dfd88492dcf3fec1e4a96a1c8e67_full.jpg',
      votesTotalCurrent: 920,
    },
    {
      walletAddress: '0x9A29967dB9bB57bC4D16271B4B4884c2BEcEfCeD',
      predictionCode: 'XgwpwGu1yYerVY2L',
      personName: 'EnjoyMaloy / Паштет',
      avatarFull: 'https://avatars.akamai.steamstatic.com/3f1a1ca7804d794ac65e4bf5bc2ea94aadace96c_full.jpg',
      votesTotalCurrent: 650,
    },
  ];
  const luckyUserList: PredictionAnswerOMGItem[] = [
    {
      walletAddress: '0x1E0EB92BdD060c9386D5b43943cf5f2b083f90dB',
      predictionCode: 'XgwpwGu1yYerVY2L',
      personName: 'СЫЩИК',
      avatarFull: 'https://avatars.akamai.steamstatic.com/cc2b4a0481380d9c17ac83e429fc6888ef7efc01_full.jpg',
      votesTotalCurrent: 260,
    },
    {
      walletAddress: '0x9748cb023bEE34eCCBFFE3f99f9bd5FeCAFFe4fE',
      predictionCode: 'XgwpwGu1yYerVY2L',
      personName: 'Нервозный',
      avatarFull: 'https://avatars.akamai.steamstatic.com/dd0fcc7e6b9ad5be2ede13a025a4f940facdaad6_full.jpg',
      votesTotalCurrent: 190,
    },
    {
      walletAddress: '0x9f7b105D999799f1cb2bde45371F99e37Ec53710',
      predictionCode: 'XgwpwGu1yYerVY2L',
      personName: 'Tokyo -_-',
      avatarFull: 'https://avatars.akamai.steamstatic.com/04735bc833728284cbce58fb8cb9400e9aac742c_full.jpg',
      votesTotalCurrent: 427,
    },
  ];
  const prices: Reward[] = [
    { index: '1st', price: 1200 },
    { index: '2nd', price: 800 },
    { index: '3rd', price: 600 },
  ];
  return (
    <div id="omg_v1" className="px-[30px] xs:px-4">
      <div className="mt-4">
        <p className="text-center text-[26px] font-medium leading-[30px] text-p12-success">
          Congratulations to the following Winners
        </p>
        <p className="text-center text-xs font-medium leading-5">
          Please claim your reward through our&nbsp;
          <span onClick={() => openLink('https://discord.gg/p12')} className="cursor-pointer text-p12-link">
            Discord
          </span>
        </p>
      </div>
      <div className="mt-6 flex items-stretch justify-between gap-4 md:flex-col md:items-center">
        <div className="relative w-full max-w-[412px] rounded-lg backdrop-blur-lg md:order-1">
          <div className="rounded-lg" style={{ background: 'linear-gradient(to bottom, #47505980 0%, #25293080 100%)' }}>
            <div className="w-full">
              <div className="rounded-t-lg bg-gradient-prediction p-4">
                <p className="text-xl font-medium leading-5">Venue</p>
                <p className="text-xs leading-3">Where is the TI11 Main Event held?</p>
              </div>
              <div className="h-0.5 bg-p12-gradient"></div>
              <div className="flex p-5 pr-0">
                <div className="h-[140px] w-[140px] overflow-hidden rounded-lg">
                  <img
                    loading="lazy"
                    className="h-full w-full object-cover"
                    src="https://cdn1.p12.games/airdrop/arcana/options/omg_icons/o1a4-singapore-square.webp"
                    alt="select"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between text-center">
                  <div className="text-xl font-medium leading-5">Singapore</div>
                  <div className="flex items-center justify-center">
                    <div className="flex flex-1 flex-col items-center justify-center">
                      <h3 className="text-xs font-medium">Total Tipsters</h3>
                      <p className="font-ddin text-[26px] font-bold">7819</p>
                    </div>
                    <div className="h-[46px] w-[2px] bg-[#474C55]/50"></div>
                    <div className="flex flex-1 flex-col items-center justify-center">
                      <h3 className="text-xs font-medium text-p12-gold">Prize</h3>
                      <p className="font-ddin text-[26px] font-bold text-p12-gold">$5000</p>
                    </div>
                  </div>
                </div>
              </div>
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
            <p className="dota__gold text-center font-ddin text-[26px] leading-[28px]">$2600</p>
          </div>
          <div className="flex flex-1 flex-col gap-2 rounded-b-lg px-4 py-5">
            <p className="mb-[10px] text-center text-xs text-[#A5A6AB]">Winners</p>
            {voteUserList.map((item, index) => (
              <TopVoteItem reward={prices[index]} data={item} key={item.walletAddress} />
            ))}
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
            <p className="dota__gold text-center font-ddin text-[26px] leading-[28px]">$800 x 3</p>
          </div>
          <div className="flex flex-1 flex-col gap-2 rounded-b-lg px-4 py-5">
            <p className="mb-[10px] text-center text-xs text-[#A5A6AB]">Winners</p>
            {luckyUserList.map((item) => (
              <LuckyDrawItem data={item} key={item.walletAddress} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
