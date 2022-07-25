import React, { useMemo } from 'react';
import { Tooltip } from '../tooltip';
import QuestionSVG from '../svg/Question';
import { GamerGamesData } from '../../lib/types';
import { formatMinutes, getCountMemo } from '../../utils';

type SteamGamesInfoProps = {
  data?: GamerGamesData;
};
export default function SteamGamesInfo({ data }: SteamGamesInfoProps) {
  const list = useMemo(
    () => [
      { label: 'Total games', value: getCountMemo(data?.total_game_count) ?? '--' },
      { label: 'Total playtime', value: data ? formatMinutes(data.total_playtime) : '--' },
      {
        label: (
          <div className="relative flex items-center justify-center text-p12-sub">
            SS games&nbsp;
            <Tooltip label="Super Saiyan Game: game playtime ≥ 1000 hours">
              <div>
                <QuestionSVG />
              </div>
            </Tooltip>
          </div>
        ),
        value: data ? formatMinutes(data.ss_game_count) : '--',
      },
      {
        label: (
          <div className="flex items-center justify-center text-p12-sub">
            SS playtime&nbsp;
            <Tooltip label="Total playtime of Super Saiyan games">
              <div>
                <QuestionSVG />
              </div>
            </Tooltip>
          </div>
        ),
        value: data ? formatMinutes(data.ss_game_playtime) : '--',
      },
    ],
    [data],
  );

  return (
    <div className="relative w-full rounded-xl border border-[#616985] bg-profile-info bg-cover p-5">
      <p className="absolute left-0 -bottom-[35px] w-full text-center text-xs text-p12-sub md:hidden">
        I&apos;ve covered wars, you know
      </p>
      {list.map((item, index) => (
        <div key={index} className="mb-[37px] flex flex-1 flex-row items-center justify-between last:mb-0">
          <div className="text-sm text-p12-sub">{item.label}</div>
          <div className="text-center font-medium">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
