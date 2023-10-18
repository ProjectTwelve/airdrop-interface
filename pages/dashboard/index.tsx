import ActivityTab from '@/components/dashboard/ActivityTab';
import Arcana from '@/components/dashboard/Arcana';
import Developer from '@/components/dashboard/Developer';
import Gamer from '@/components/dashboard/Gamer';
import SteamDeveloperSBT from '@/components/dashboard/sbt/SteamDeveloperSBT';
import SteamGamerSBT from '@/components/dashboard/sbt/SteamGamerSBT';
import { usePageTabSelected } from '@/hooks/dashboard/usePageTabSelected';
import { userPowerLevelAtom } from '@/store/dashboard/state';
import { digitalFormat } from '@/utils/format';
import { useRecoilValue } from 'recoil';

export default function Dashboard() {
  const { arcanaPL, steamGamerPL, steamDeveloperPL } = useRecoilValue(userPowerLevelAtom);
  const { index, onSelect } = usePageTabSelected();

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
            onClick={() => onSelect(0)}
            active={index === 0}
            title="P12 Arcana: Editorium"
            score={
              <>
                {digitalFormat.integer(arcanaPL)}
                {index === 0 && <img className="h-10 w-10" src="/img/pl/power_level.png" alt="PL" />}
              </>
            }
          />
          <ActivityTab
            onClick={() => onSelect(1)}
            active={index === 1}
            title="Genesis Steam Gamer"
            score={
              <>
                {digitalFormat.integer(steamGamerPL)}
                {index === 1 && <img className="h-10 w-10" src="/img/pl/power_level.png" alt="PL" />}
              </>
            }
          />
          <ActivityTab
            onClick={() => onSelect(2)}
            active={index === 2}
            title="Genesis Steam Developer"
            score={
              <>
                {digitalFormat.integer(steamDeveloperPL)}
                {index === 2 && <img className="h-10 w-10" src="/img/pl/power_level.png" alt="PL" />}
              </>
            }
          />
        </div>
      </div>
      <div>{index === 0 && <Arcana />}</div>
      <div>{index === 1 && <Gamer />}</div>
      <div>{index === 2 && <Developer />}</div>
    </div>
  );
}
