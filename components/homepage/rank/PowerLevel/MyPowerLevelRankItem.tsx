import React from 'react';

export default function MyPowerLevelRankItem() {
  return (
    <div className="rank-item gap-4 xs:gap-2">
      <div className="w-7.5 flex-none text-center text-xs font-medium 2xl:w-10">
        <p>YOU</p>
        <p>100</p>
      </div>
      <div className="px-3 text-xl/7 font-semibold text-yellow xs:px-0">27368</div>
      <div className="mx-3 flex flex-1 justify-between py-1 xs:mx-1.5">
        {/* TODO: None */}
        {/*<div className="flex h-11 items-center bg-[url(/svg/pl/pl_none.svg)] bg-cover">*/}
        {/*  <div className="w-20 py-1 pl-2">*/}
        {/*    <p className="text-center text-xs/3.5 text-gray-400">Developer</p>*/}
        {/*    <p className="my-1 h-px w-full bg-gray-400/30" />*/}
        {/*    <p className="truncate text-xs/3.5 font-semibold text-gray-400">devName</p>*/}
        {/*  </div>*/}
        {/*  <p className="w-16 px-3 text-base/7 font-semibold text-gray-400">2000</p>*/}
        {/*  <img className="h-11 w-11" src="/img/unclaimed.webp" alt="unclaimed" />*/}
        {/*</div>*/}
        <div className="flex h-11 items-center bg-[url(/svg/pl/pl_gamer.svg)] bg-cover">
          <div className="w-20 py-1 pl-2 xs:hidden">
            <p className="text-center text-xs/3.5 text-purple">Gamer</p>
            <p className="my-1 h-px w-full bg-purple/30" />
            <p className="truncate text-xs/3.5 font-semibold text-purple">GamerName</p>
          </div>
          <p className="w-20 px-3 text-base/7 font-semibold text-yellow">2000</p>
          <img className="h-11 w-11" src="/img/unclaimed.webp" alt="unclaimed" />
        </div>
        <div className="flex h-11 items-center bg-[url(/svg/pl/pl_dev.svg)] bg-cover">
          <div className="w-20 py-1 pl-2 xs:hidden">
            <p className="text-center text-xs/3.5 text-blue">Developer</p>
            <p className="my-1 h-px w-full bg-blue/30" />
            <p className="truncate text-xs/3.5 font-semibold text-blue">devName</p>
          </div>
          <p className="w-16 px-3 text-base/7 font-semibold text-yellow">2000</p>
          <img className="h-11 w-11" src="/img/unclaimed.webp" alt="unclaimed" />
        </div>
      </div>
    </div>
  );
}
