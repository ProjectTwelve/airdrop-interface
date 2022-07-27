import React, { useMemo } from 'react';
import { Tooltip } from '../tooltip';
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
          <div className="relative flex items-center justify-center">
            SS games&nbsp;
            <Tooltip label="Super Saiyan Game: game playtime ≥ 1000 hours">
              <img src="/svg/question.svg" className="cursor-pointer" width={14} height={14} alt="question" />
            </Tooltip>
          </div>
        ),
        value: data ? formatMinutes(data.ss_game_count) : '--',
      },
      {
        label: (
          <div className="flex items-center justify-center">
            SS playtime&nbsp;
            <Tooltip label="Total playtime of Super Saiyan games">
              <img src="/svg/question.svg" className="cursor-pointer" width={14} height={14} alt="question" />
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
        <div key={index} className="mb-8 flex flex-1 flex-row items-center justify-between last:mb-0">
          <div className="text-sm">{item.label}</div>
          <div className="text-center text-xl font-medium">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
