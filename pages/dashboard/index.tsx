import React, { useState } from 'react';
import Arcana from '@/components/dashboard/Arcana';
import ActivityTab from '@/components/dashboard/ActivityTab';
import SteamGamerSBT from '@/components/dashboard/SteamGamerSBT';
import SteamDeveloperSBT from '@/components/dashboard/SteamDeveloperBadge';
import Gamer from '@/components/dashboard/Gamer';
import Developer from '@/components/dashboard/Developer';
import Operation from '@/components/dashboard/Operation';

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <div className="mt-7">
      <div className="backdrop-box relative rounded-2xl">
        <div className="grid grid-cols-2 gap-8 px-6 pb-12 pt-7">
          <SteamGamerSBT />
          <SteamDeveloperSBT />
        </div>
      </div>
      <div className="relative mt-10 h-[130px]">
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
        </div>
      </div>
      <div>{selectedTab === 0 && <Arcana />}</div>
      <div>{selectedTab === 1 && <Gamer />}</div>
      <div>{selectedTab === 2 && <Developer />}</div>
      <div>{selectedTab === 3 && <Operation />}</div>
    </div>
  );
}
