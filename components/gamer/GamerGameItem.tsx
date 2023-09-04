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
        'relative overflow-hidden rounded-2xl bg-gray-800/80 bg-right bg-no-repeat',
        isSSGame && 'bg-ss-game',
      )}
    >
      <div className="relative z-10">
        <div
          className="relative float-left mr-4 flex h-[72px] w-full items-center justify-start bg-[#CEDCFF]/10 bg-cover lg:mr-2"
          style={{ maxWidth: 'min(45%, 168px)' }}
        >
          <p className="absolute -z-10 w-full text-center text-center text-xs leading-[72px] text-gray-500">Damedane</p>
          <img
            src={gameIcon}
            onError={(error) => ((error.target as any).style = 'display: none')}
            loading="lazy"
            className="h-auto w-full 2xl:h-full"
            alt="header_image"
          />
        </div>
        <div className="float-right h-[72px] pr-2 sm:hidden 2xl:pr-6">
          <div className="flex h-full items-center justify-center lg:hidden">
            <p className="mr-3 text-sm xl:hidden">Playtime</p>
            <p className="font-ddin text-2xl">{formatMinutes(data.playtime_forever)}</p>
          </div>
        </div>
        <div className="truncate pt-3 lg:pt-1.5">
          <p className="truncate font-medium lg:text-xs xl:text-sm">
            {isSSGame && (
              <span className="mr-1.5 rounded bg-[#C859FF]/20 px-2 py-[1.5px] align-middle text-xs text-[#FC59FF] lg:px-1">
                SS Game
              </span>
            )}
            <span className="truncate lg:mt-1 lg:block">{data.name}</span>
          </p>
          <div className="relative mt-1.5 flex h-[20px] flex-wrap lg:mt-1">
            {data.genres?.map((genre, index) => (
              <span
                key={index}
                className="mr-1.5 mb-0.5 h-full rounded bg-blue/20 px-2 py-[1.5px] text-xs text-blue lg:px-1"
              >
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
