import { GamerGameInfo } from '../../lib/types';
import React, { useMemo } from 'react';
import { formatMinutes, getSteamGameImage } from '../../utils';

export default function PosterGameItem({ data }: { data?: GamerGameInfo }) {
  const gameIcon = useMemo(() => (data ? getSteamGameImage(data.appid) : ''), [data]);
  const isSSGame = !!data?.ss_game;

  if (!data) {
    return <div className="h-[112px] w-full" />;
  }

  return (
    <div className="relative h-[110px] w-full overflow-hidden rounded-2xl bg-[#7980AF]/20">
      {isSSGame && <img className="absolute right-0 top-0" src="/img/poster/bg_ss_game.webp" alt="ss_game" />}
      <div className="absolute left-0 right-0 flex h-full w-full">
        <div className="h-[110px] w-[237px]">
          <img className="h-full w-full object-cover" src={gameIcon} alt="game" />
        </div>
        <div className="flex flex-1 items-center justify-between px-6 py-4">
          <div>
            <div className="flex h-[32px] items-start justify-start">
              {isSSGame && <img className="mr-4" src="/img/poster/ss_game.webp" alt="ss_game" />}
              <p className="w-[330px] text-[24px] font-medium leading-[12px]">
                {data.name.length > 24 ? data.name.substring(0, 21) + '...' : data.name}
              </p>
            </div>
            <div className="mt-3 flex h-[32px] w-[400px] flex-wrap overflow-hidden">
              {data.genres?.map((genre, index) => (
                <span key={index} className="mr-4 h-full h-[32px] rounded bg-p12-link/20 px-2 leading-4 text-p12-link">
                  {genre}
                </span>
              ))}
            </div>
          </div>
          <div className="mr-3 flex items-center justify-center">
            <p className="mr-5 -mt-[24px] text-[24px]">Playtime</p>
            <p className="-mt-[36px] font-ddin text-[36px]">{formatMinutes(data.playtime_forever)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
