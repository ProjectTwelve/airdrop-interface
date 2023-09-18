import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { digitalFormat } from '@/utils/format';
import Gamer from '@/components/dashboard/Gamer';
import Arcana from '@/components/dashboard/Arcana';
import Developer from '@/components/dashboard/Developer';
import { userPowerLevelAtom } from '@/store/dashboard/state';
import ActivityTab from '@/components/dashboard/ActivityTab';
import SteamGamerSBT from '@/components/dashboard/SteamGamerSBT';
import SteamDeveloperSBT from '@/components/dashboard/SteamDeveloperSBT';

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { arcanaPL, steamGamerPL, steamDeveloperPL } = useRecoilValue(userPowerLevelAtom);

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
            score={digitalFormat.integer(arcanaPL)}
          />
          <ActivityTab
            onClick={() => setSelectedTab(1)}
            active={selectedTab === 1}
            title="Genesis Steam Gamer"
            score={digitalFormat.integer(steamGamerPL)}
          />
          <ActivityTab
            onClick={() => setSelectedTab(2)}
            active={selectedTab === 2}
            title="Genesis Steam Developer"
            score={digitalFormat.integer(steamDeveloperPL)}
          />
        </div>
      </div>
      <div>{selectedTab === 0 && <Arcana />}</div>
      <div>{selectedTab === 1 && <Gamer />}</div>
      <div>{selectedTab === 2 && <Developer />}</div>
    </div>
  );
}
