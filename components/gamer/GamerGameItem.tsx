import React, { useMemo } from 'react';
import { formatMinutes, getSteamGameImage } from '../../utils';
import { GamerGameInfo } from '../../lib/types';
import classNames from 'classnames';

export default function GamerGameItem({ data }: { data: GamerGameInfo }) {
  const gameIcon = useMemo(() => getSteamGameImage(data.appid), [data.appid]);
  const isSSGame = !!data.ss_game;

  return (
    <div
      className={classNames(
        'relative overflow-hidden rounded-2xl bg-p12-black/80 bg-right bg-no-repeat',
        isSSGame && 'bg-ss-game',
      )}
    >
      <div className="relative z-10">
        <div
          className="relative float-left mr-4 flex h-[72px] w-full items-center justify-start bg-[#CEDCFF]/10 bg-cover"
          style={{ maxWidth: 'min(33%, 168px)' }}
        >
          <p className="absolute -z-10 w-full text-center text-center text-xs leading-[72px] text-p12-bg">Damedane</p>
          <img
            src={gameIcon}
            onError={(error) => ((error.target as any).style = 'display: none')}
            loading="lazy"
            className="h-full w-full md:h-auto"
            alt="header_image"
          />
        </div>
        <div className="float-right h-[72px] pr-6 xs:hidden">
          <div className="flex h-full items-center justify-center">
            <p className="mr-3 text-sm">Playtime</p>
            <p className="font-din text-2xl">{formatMinutes(data.playtime_forever)}</p>
          </div>
        </div>
        <div className="truncate pt-3">
          <p className="truncate font-medium">
            {isSSGame && (
              <span className="mr-1.5 rounded bg-[#C859FF]/20 px-2 py-[1.5px] align-middle text-xs text-[#FC59FF]">
                SS Game
              </span>
            )}
            {data.name}
          </p>
          <div className="relative mt-1.5 flex h-[20px] flex-wrap">
            {data.genres?.map((genre, index) => (
              <span key={index} className="mr-1.5 h-full rounded bg-p12-link/20 px-2 py-[1.5px] text-xs text-p12-link">
                {genre}
              </span>
            ))}
          </div>
        </div>
        <div className="clear-both" />
      </div>
    </div>
  );
}
