import React, { useState } from 'react';
import Back from '@/components/back';
import { useRouter } from 'next/router';
import Arcana from '@/components/dashboard/Arcana';
import ActivityTab from '@/components/dashboard/ActivityTab';
import SteamGamerSBT from '@/components/dashboard/SteamGamerSBT';
import SteamDeveloperSBT from '@/components/dashboard/SteamDeveloperBadge';
import Gamer from '@/components/dashboard/Gamer';
import Developer from '@/components/dashboard/Developer';
import Operation from '@/components/dashboard/Operation';

export default function Dashboard() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  return (
    <div className="mt-8">
      <Back onClick={() => router.push({ pathname: '/', query: router.query })} />
      <div className="backdrop-box relative mt-5 rounded-2xl p-9">
        <div className="absolute -inset-x-px -left-px -top-px -z-10 h-[138px]  rounded-t-2xl bg-card-mask" />
        <div className="flex-center gap-6">
          <img width={104} src="/img/pl/power_level.png" alt="power_level" />
          <div>
            <p className="text-xl/5.5">Your P12 Power Level</p>
            <div className="text-gradient-yellow mt-3.5 text-[68px]/[68px] font-bold">1,024,25</div>
          </div>
        </div>
        <div className="mb-3 mt-12 grid grid-cols-2 gap-9">
          <SteamGamerSBT />
          <SteamDeveloperSBT />
        </div>
      </div>
      <div className="relative mt-15 h-[130px]">
        <div className="flex-center absolute left-0 w-screen gap-15  bg-gray-700/30 py-5 backdrop-blur-lg 2xl:left-[calc((1366px-100vw)/2)]">
          <ActivityTab
            onClick={() => setSelectedTab(0)}
            active={selectedTab === 0}
            title="Arcana - Linea Editorium"
            score="24,000"
          />
          <ActivityTab
            onClick={() => setSelectedTab(1)}
            active={selectedTab === 1}
            title="Genesis Steam Gamer"
            score="24,000"
          />
          <ActivityTab
            onClick={() => setSelectedTab(2)}
            active={selectedTab === 2}
            title="Genesis Steam Developer"
            score="24,000"
          />
          <ActivityTab onClick={() => setSelectedTab(3)} active={selectedTab === 3} title="P12 Operations" score="24,000" />
        </div>
      </div>
      <div>{selectedTab === 0 && <Arcana />}</div>
      <div>{selectedTab === 1 && <Gamer />}</div>
      <div>{selectedTab === 2 && <Developer />}</div>
      <div>{selectedTab === 3 && <Operation />}</div>
    </div>
  );
}
