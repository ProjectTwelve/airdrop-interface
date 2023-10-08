import React from 'react';
import { openLink } from '@/utils';
import { useThemeAsset } from '@/hooks/theme';
import GamerRanking from '@/components/ranking/Gamer';
import PowerLevelBanner from '@/components/pl/PowerLevelBanner';

export default function Home() {
  const src = useThemeAsset('arcana_banner_2.webp');

  return (
    <div className="flex flex-col items-center justify-center px-8 pt-4 md:px-4 2xl:px-0">
      {/*<div className="mt-4 grid w-full grid-cols-2 gap-4 md:grid-cols-1">*/}
      <div className="mt-4 flex w-full gap-5 tablet:flex-col">
        <div
          className="relative cursor-pointer rounded-2xl duration-200 ease-linear hover:-translate-y-1 "
          onClick={() => openLink('https://arcana.p12.games/referral?code=Mkq4zW')}
        >
          <div className="absolute right-0 top-0 rounded-es-lg rounded-se-lg bg-gradient-green px-2 py-1.5 text-base/4.5 font-bold text-black backdrop-blur-lg">
            View all collabs
          </div>
          {src ? (
            <img
              className="-mt-[10px] h-[13.125rem] w-[28.5rem] rounded-xl object-cover object-center md:h-auto tablet:w-full"
              src={src}
              alt="p12Arcana"
            />
          ) : (
            // <img className="h-[300px] object-cover object-center md:h-[128px]" src={src} alt="p12Arcana" />
            // <div className="h-[300px] w-1/2 animate-pulse bg-white/10" />
            <div className="h-[300px] w-[684px] animate-pulse bg-white/10" />
          )}
        </div>
        <PowerLevelBanner className="flex-grow" />
        {/* <CollabSwiper /> */}
      </div>
      {/* <div className="mt-5 w-full">
        <PowerLevelBanner />
      </div> */}
      <div className="backdrop-box mt-7.5 rounded-2xl">
        <GamerRanking />
      </div>
    </div>
  );
}
