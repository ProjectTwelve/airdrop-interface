import ReportLayout from '../../components/layout/ReportLayout';
import type { ReactElement } from 'react';
import React from 'react';

export default function Report() {
  return (
    <div className="relative z-10">
      <div className="mt-[120px] border-b border-[#676F8B] py-4 text-center text-[30px] font-medium leading-[36px]">
        Developer
      </div>
      <div className="flex justify-between py-6">
        <div>
          <p className="font-['D-DIN'] text-[80px] font-medium leading-[80px]">152</p>
          <p className="text-[30px] font-semibold leading-[30px]">Total Games</p>
        </div>
        <div>
          <p className="font-['D-DIN'] text-[80px] font-medium leading-[80px]">+3</p>
          <p className="text-[30px] font-semibold leading-[30px]">Today</p>
        </div>
      </div>
      <div className="flex flex-col gap-[30px] py-6">
        <div className="relative flex rounded-2xl bg-[#7980AF]/20 p-[30px]">
          <div className="mr-[30px] h-[128px] w-[160px] rounded-lg border border-[#FFAA2C] bg-[#F36E22]/20 p-3">
            <p className="text-center font-['D-DIN'] text-[60px] font-bold leading-[60px] text-[#FFAA2C]">7</p>
            <p className="my-3 h-[1px] bg-[#FFAA2C]/30"></p>
            <p className="text-center text-xl leading-5 text-[#FFAA2C]">Current Rank</p>
          </div>
          <div className="mr-5 h-[128px] w-[200px] overflow-hidden rounded-2xl">
            <img
              src="https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg?t=1650611880"
              alt="steam_game"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="w-[360px]">
              <p className="mb-1.5 text-[26px] font-semibold leading-[40px]">DOTA 2</p>
              <p className="mb-2 text-[24px] leading-[36px]">
                <span>14 Jul, 2014</span>&nbsp;&nbsp;&nbsp;
                <span>9FingerGames</span>
              </p>
              <div className="flex h-8 flex-wrap gap-3 overflow-hidden">
                <p className="rounded bg-[#4383FF]/20 px-3 py-1.5 text-xl leading-5 text-[#43BBFF]">Multi-player</p>
                <p className="rounded bg-[#4383FF]/20 px-3 py-1.5 text-xl leading-5 text-[#43BBFF]">Multi-player</p>
                <p className="rounded bg-[#4383FF]/20 px-3 py-1.5 text-xl leading-5 text-[#43BBFF]">Multi-player</p>
              </div>
            </div>
          </div>
          <div className="h-[128px] w-[128px]">
            <img className="h-full w-full" src="/report/badge_blue.png" alt="badge" />
          </div>
          <div className="absolute -right-3 -top-3">
            <img src="/report/referral.png" alt="referral" />
          </div>
        </div>
        <div className="relative flex rounded-2xl bg-[#7980AF]/20 p-[30px]">
          <div className="mr-[30px] h-[128px] w-[160px] rounded-lg border border-[#FFAA2C] bg-[#F36E22]/20 p-3">
            <p className="text-center font-['D-DIN'] text-[60px] font-bold leading-[60px] text-[#FFAA2C]">7</p>
            <p className="my-3 h-[1px] bg-[#FFAA2C]/30"></p>
            <p className="text-center text-xl leading-5 text-[#FFAA2C]">Current Rank</p>
          </div>
          <div className="mr-5 h-[128px] w-[200px] overflow-hidden rounded-2xl">
            <img
              src="https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg?t=1650611880"
              alt="steam_game"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="w-[360px]">
              <p className="mb-1.5 text-[26px] font-semibold leading-[40px]">DOTA 2</p>
              <p className="mb-2 text-[24px] leading-[36px]">
                <span>14 Jul, 2014</span>&nbsp;&nbsp;&nbsp;
                <span>9FingerGames</span>
              </p>
              <div className="flex h-8 flex-wrap gap-3 overflow-hidden">
                <p className="rounded bg-[#4383FF]/20 px-3 py-1.5 text-xl leading-5 text-[#43BBFF]">Multi-player</p>
                <p className="rounded bg-[#4383FF]/20 px-3 py-1.5 text-xl leading-5 text-[#43BBFF]">Multi-player</p>
                <p className="rounded bg-[#4383FF]/20 px-3 py-1.5 text-xl leading-5 text-[#43BBFF]">Multi-player</p>
              </div>
            </div>
          </div>
          <div className="h-[128px] w-[128px]">
            <img className="h-full w-full" src="/report/badge_blue.png" alt="badge" />
          </div>
          <div className="absolute -right-3 -top-3">
            <img src="/report/referral.png" alt="referral" />
          </div>
        </div>
      </div>
    </div>
  );
}

Report.getLayout = function getLayout(page: ReactElement) {
  return <ReportLayout>{page}</ReportLayout>;
};
