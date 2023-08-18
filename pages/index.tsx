import React from 'react';
import { openLink } from '@/utils';
import GamerRanking from '@/components/ranking/Gamer';
import CollabSwiper from '@/components/collab/CollabSwiper';
import PowerLevelBanner from '@/components/pl/PowerLevelBanner';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <div className="w-full">
        <PowerLevelBanner />
      </div>
      <div className="mt-6 grid w-full grid-cols-2 gap-6 md:grid-cols-1">
        <div
          className="cursor-pointer overflow-hidden rounded-2xl duration-200 ease-linear hover:-translate-y-1"
          onClick={() => openLink('https://degenreborn.xyz')}
        >
          <img
            className="h-[308px] object-cover object-center md:h-[128px]"
            src="https://cdn1.p12.games/collabs/degenreborn/banner.png"
            alt="degenreborn"
          />
        </div>
        <CollabSwiper />
      </div>
      <div className="backdrop-box mt-7.5 rounded-2xl">
        <GamerRanking />
      </div>
    </div>
  );
}
