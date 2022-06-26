import { GamerGamesData } from '../../lib/types';
import React, { useMemo } from 'react';
import { Tooltip } from '../tooltip';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { formatMinutes } from '../../utils';
import QuestionSVG from '../svg/Question';

type SteamProfileInfoProps = {
  data?: GamerGamesData;
  createdTime?: number;
};
export default function SteamProfileInfo({ data, createdTime }: SteamProfileInfoProps) {
  const list = useMemo(
    () => [
      { label: 'Total games', value: data?.total_game_count ?? '--' },
      { label: 'Total playtime', value: data ? formatMinutes(data.total_playtime) : '--' },
      {
        label: (
          <div className="flex items-center justify-center gap-1 text-p12-sub">
            SS games
            <Tooltip label="Super Saiyan Game: game playtime ≥ 1000 hours">
              <div>
                <QuestionSVG />
              </div>
            </Tooltip>
          </div>
        ),
        value: data?.ss_game_count ?? '--',
      },
      {
        label: (
          <div className="flex items-center justify-center gap-1 text-p12-sub">
            SS playtime
            <Tooltip label="Total playtime of Super Saiyan games">
              <div>
                <QuestionSVG />
              </div>
            </Tooltip>
          </div>
        ),
        value: data ? formatMinutes(data.ss_game_playtime) : '--',
      },
      { label: 'Steam years', value: createdTime ? dayjs().diff(dayjs.unix(createdTime), 'year') : '--' },
    ],
    [createdTime, data],
  );

  return (
    <div className="relative flex w-full max-w-[888px] py-[22px] xs:flex-col xs:py-0">
      <div className="gradient__box absolute top-0 left-0 -z-10 h-full w-full" />
      {list.map((item, index) => (
        <div
          key={index}
          className={classNames(
            'flex flex-1 flex-col items-center justify-center border-r border-[#949FA9]',
            'xs:flex-row xs:gap-2 xs:border-r-0 xs:border-b xs:py-2',
            'last:border-none',
          )}
        >
          <div className="text-sm text-p12-sub">{item.label}</div>
          <div className="font-medium">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
