import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { digitalFormat } from '@/utils/format';
import Gamer from '@/components/dashboard/Gamer';
import Arcana from '@/components/dashboard/Arcana';
import Developer from '@/components/dashboard/Developer';
import { dashboardSelectedTabAtom, userPowerLevelAtom } from '@/store/dashboard/state';
import ActivityTab from '@/components/dashboard/ActivityTab';
import SteamGamerSBT from '@/components/dashboard/sbt/SteamGamerSBT';
import SteamDeveloperSBT from '@/components/dashboard/sbt/SteamDeveloperSBT';

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useRecoilState(dashboardSelectedTabAtom);
  const { arcanaPL, steamGamerPL, steamDeveloperPL } = useRecoilValue(userPowerLevelAtom);

  return (
    <div className="mt-4">
      <div className="backdrop-box relative rounded-2xl">
        <div className="grid grid-cols-2 gap-10 px-6 py-7.5 md:grid-cols-1">
          <SteamGamerSBT />
          <SteamDeveloperSBT />
        </div>
      </div>
      <div className="relative mt-7.5 h-[96px]">
        <div className="flex-center absolute left-0 w-screen gap-15  bg-gray-700/30 pb-3 pt-4 backdrop-blur-lg 2xl:left-[calc((1366px-100vw)/2)]">
          <ActivityTab
            onClick={() => setSelectedTab(0)}
            active={selectedTab === 0}
            title="P12 Arcana: Editorium"
            score={
              <>
                {digitalFormat.integer(arcanaPL)}
                {selectedTab === 0 && <img className="h-10 w-10" src="/img/pl/power_level.png" alt="PL" />}
              </>
            }
          />
          <ActivityTab
            onClick={() => setSelectedTab(1)}
            active={selectedTab === 1}
            title="Genesis Steam Gamer"
            score={
              <>
                {digitalFormat.integer(steamGamerPL)}
                {selectedTab === 1 && <img className="h-10 w-10" src="/img/pl/power_level.png" alt="PL" />}
              </>
            }
          />
          <ActivityTab
            onClick={() => setSelectedTab(2)}
            active={selectedTab === 2}
            title="Genesis Steam Developer"
            score={
              <>
                {digitalFormat.integer(steamDeveloperPL)}
                {selectedTab === 2 && <img className="h-10 w-10" src="/img/pl/power_level.png" alt="PL" />}
              </>
            }
          />
        </div>
      </div>
      <div>{selectedTab === 0 && <Arcana />}</div>
      <div>{selectedTab === 1 && <Gamer />}</div>
      <div>{selectedTab === 2 && <Developer />}</div>
    </div>
  );
}
