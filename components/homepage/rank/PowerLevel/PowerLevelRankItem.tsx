import React from 'react';

export function PowerLevelRankItemHeader() {
  return (
    <div className="flex px-4 pb-2.5 pt-5 text-xs font-medium sm:py-2">
      <p className="w-[60px]">Rank</p>
      <p>Power Level</p>
      <p className="flex-1 pl-12">Gamer ID</p>
      <p className="flex-1 pl-4">Developer ID</p>
    </div>
  );
}

type PowerLevelRankItemProps = {
  data: any;
};

export default function PowerLevelRankItem({ data }: PowerLevelRankItemProps) {
  return (
    <div className="rank-item gap-4 overflow-hidden xs:gap-2">
      <div className="w-7.5 flex-none text-center text-xs/11 font-medium 2xl:w-10">{data.index}</div>
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
