import React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useGamerInfo } from '../../hooks/gamer';
import SteamStatus from '../../components/gamer/SteamStatus';
import { GAMER_BADGES, NFT_CLAIM } from '../../constants';
import GamerTokenStatus from '../../components/gamer/GamerTokenStatus';
import { useRecoilValue } from 'recoil';
import { gamerInfoAtom } from '../../store/gamer/state';
import { useGamerBadgeLoad } from '../../hooks/useBadgeLoad';
import Poster from '../../components/poster';
import PosterCanvas from '../../components/poster/PosterCanvas';

export default function GamerProfile() {
  const router = useRouter();
  const { address } = router.query;
  const gamerInfo = useRecoilValue(gamerInfoAtom);
  const badge = useGamerBadgeLoad(gamerInfo);
  useGamerInfo(address as string);

  return (
    <div className="mt-8">
      <div className="my-4" onClick={(event) => event.stopPropagation()}>
        <div className="backdrop-box rounded-2xl p-8 xs:p-3">
          <SteamStatus />
          <div>
            <h3 className="my-3 text-xl font-semibold">My Airdrop NFT</h3>
            <div className="flex overflow-hidden rounded-b-2xl bg-p12-black/80 md:flex-col">
              <div className="relative max-w-[643px] basis-1/2 overflow-hidden bg-no-badge bg-cover bg-center md:max-w-full">
                <div className="absolute top-0 left-0 h-full w-full blur-3xl">
                  {gamerInfo?.nft_claim === NFT_CLAIM.CLAIMED && (
                    <div
                      className="h-full w-full bg-cover"
                      style={{ backgroundImage: `url(${GAMER_BADGES[gamerInfo.nft_level!].asset})` }}
                    />
                  )}
                </div>
                <div className="relative z-10">
                  <div className="w-full pb-[100%]"></div>
                  <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                    <div className="relative aspect-square w-full max-w-[420px]">
                      {badge.isLoading && (
                        <div className="absolute top-1/2 left-1/2 -z-10 h-[58px] w-[58px] -translate-x-1/2 -translate-x-1/2 opacity-60">
                          <Image className="animate-spin" src="/svg/loading.svg" width={58} height={58} alt="loading" />
                        </div>
                      )}
                      <div
                        className="aspect-square max-w-[420px] bg-cover"
                        style={{ backgroundImage: `url(${gamerInfo ? GAMER_BADGES[gamerInfo.nft_level!].asset : ''})` }}
                      />
                    </div>
                  </div>
                </div>
                <p className="absolute bottom-8 z-10 w-full text-center text-sm text-p12-sub xs:static xs:py-2">
                  The airdrop is in collaboration with and powered by&nbsp;
                  <a className="text-p12-link" href="https://galaxy.eco/P12" target="_blank">
                    Project Galaxy
                  </a>
                </p>
              </div>
              <div className="basis-1/2 p-9 md:basis-auto md:p-4">
                <h2 className="mt-8 text-[30px] font-medium md:mt-2">
                  {gamerInfo?.credential ? GAMER_BADGES[gamerInfo.nft_level!].title : 'P12 | Project Twelve | Genesis'}
                </h2>
                <h3 className="mt-9 text-xl font-medium md:mt-4">Genesis Soul-Bound NFT</h3>
                <p className="mt-2 text-sm text-p12-sub">
                  Birthday:&nbsp;{gamerInfo?.birthday ? dayjs(gamerInfo.birthday).format('YYYY/MM/DD') : '--'}
                </p>
                <div className="gradient__box mt-9 py-6 px-[30px] md:mt-4">
                  <p>Amount of tokens from this Steam account</p>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="cursor-pointer font-ddin text-[48px] font-bold">
                      {gamerInfo?.display || (gamerInfo?.nft_claim === NFT_CLAIM.CLAIMED ? '?,???' : '-,---')}
                    </p>
                    <Image src="/img/p12.png" width={48} height={48} alt="p12" />
                  </div>
                </div>
                <GamerTokenStatus data={gamerInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Poster />
      <PosterCanvas />
    </div>
  );
}
