import React from 'react';
import { openLink } from '@/utils';
import { useThemeAsset } from '@/hooks/theme';
import HomepageRank from '@/components/homepage/rank';
import CollabSwiper from '@/components/collab/CollabSwiper';
import PowerLevelBanner from '@/components/pl/PowerLevelBanner';

export default function Home() {
  const src = useThemeAsset('arcana-banner.webp');

  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <div className="mt-4 grid w-full grid-cols-2 gap-4 md:grid-cols-1">
        <div
          className="cursor-pointer overflow-hidden rounded-2xl duration-200 ease-linear hover:-translate-y-1"
          onClick={() => openLink('https://arcana.p12.games/referral?code=Mkq4zW')}
        >
          {src ? (
            <img className="h-[300px] object-cover object-center md:h-[128px]" src={src} alt="p12Arcana" />
          ) : (
            <div className="h-[300px] w-full animate-pulse bg-white/10" />
          )}
        </div>
        <CollabSwiper />
      </div>
      <div className="mt-5 w-full">
        <PowerLevelBanner />
      </div>
      <div className="backdrop-box mt-5 w-full rounded-2xl">
        <HomepageRank />
      </div>
    </div>
  );
}
