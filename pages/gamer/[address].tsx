import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { GAMER_BADGES, NFT_CLAIM } from '../../constants';
import GamerTokenStatus from '../../components/gamer/GamerTokenStatus';
import { useGamerBadgeLoad } from '../../hooks/useBadgeLoad';
import Poster from '../../components/poster';
import PosterCanvas from '../../components/poster/PosterCanvas';
import { shortenSteamId } from '../../utils';
import SteamProfileInfo from '../../components/gamer/SteamProfileInfo';
import { useQuery } from '@tanstack/react-query';
import { fetchGamerGames, fetchGamerInfo } from '../../lib/api';
import Loading from '../../components/loading';
import SteamGamesInfo from '../../components/gamer/SteamGamesInfo';
import GamerGameItem from '../../components/gamer/GamerGameItem';
import Empty from '../../components/empty';
import Pagination from 'rc-pagination';
import SteamValue from '../../components/gamer/SteamValue';

export default function GamerProfile() {
  const pageSize = 6;
  const router = useRouter();
  const address = router.query.address as string | undefined;
  const { data: gamerInfoData, isLoading: isGamerInfoLoading } = useQuery(
    ['gamer_info', address],
    () => fetchGamerInfo({ addr: address }),
    {
      enabled: !!address,
      refetchOnWindowFocus: false,
    },
  );
  const { data: gamerGamesData, isLoading: isGamerGamesLoading } = useQuery(
    ['gamer_games', address],
    () => fetchGamerGames({ wallet_address: address }),
    {
      enabled: !!address,
      refetchOnWindowFocus: false,
    },
  );
  const gamerInfo = gamerInfoData?.data;
  const gamesData = gamerGamesData?.data;
  const badge = useGamerBadgeLoad(gamerInfo);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const useCurrentGames = useMemo(() => {
    if (!gamesData) return [];
    return gamesData.games.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [currentPage, gamesData]);

  return (
    <div className="mt-8">
      <div className="my-4" onClick={(event) => event.stopPropagation()}>
        <div className="backdrop-box rounded-2xl p-4 2xl:p-8">
          {isGamerInfoLoading && <Loading size={58} className="my-4 opacity-50" />}
          {gamerInfo && (
            <div className="flex items-center md:flex-col md:items-start">
              <div className="mr-5 max-w-full flex md:mb-4">
                <img className="mr-6 h-[78px] w-[78px] rounded-lg" src={gamerInfo.avatar_full} alt="avatar" />
                <div className="flex flex-col justify-around overflow-hidden">
                  <p className="truncate text-[26px] font-medium">{gamerInfo.person_name}</p>
                  <p>Steam ID: {shortenSteamId(gamerInfo.steam_id)}</p>
                </div>
              </div>
              <SteamProfileInfo data={gamerInfo} />
            </div>
          )}
          <div className="py-8">
            <h3 className="mb-3 text-xl font-semibold">Games</h3>
            {isGamerGamesLoading && (
              <div className="rounded-2xl bg-p12-black/80 p-6 md:p-3">
                <Loading size={58} className="my-[72px] opacity-50" />
              </div>
            )}
            {gamesData && (
              <>
                <div className="flex items-start justify-start md:flex-col">
                  <div className="flex-0 mr-5 w-[250px] md:mr-0 md:mb-4 md:w-full">
                    <SteamGamesInfo data={gamesData} />
                  </div>
                  <div className="flex-1 md:w-full ">
                    {gamesData.games.length ? (
                      <div className="grid grid-cols-2 gap-y-4 gap-x-5 md:grid-cols-1">
                        {useCurrentGames.map((item) => (
                          <GamerGameItem key={item.appid} data={item} />
                        ))}
                      </div>
                    ) : (
                      <div className="h-[248px] rounded-2xl bg-p12-black/80 p-6">
                        <Empty />
                      </div>
                    )}
                    {gamesData.games.length > 6 && (
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-xs">
                          {currentPage * 6 - 5}-{currentPage * 6} of {gamesData.games.length}
                        </p>
                        <Pagination
                          simple
                          current={currentPage}
                          pageSize={pageSize}
                          onChange={(page) => setCurrentPage(page)}
                          total={gamesData.games.length}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <SteamValue data={gamerInfo} />
              </>
            )}
          </div>
          <div>
            <h3 className="my-3 text-xl font-semibold">Airdrop NFT</h3>
            <div className="flex overflow-hidden rounded-b-2xl bg-p12-black/80 md:flex-col">
              <div className="relative max-w-[643px] basis-1/2 overflow-hidden bg-no-badge bg-cover bg-center md:max-w-full">
                <div className="absolute top-0 left-0 h-full w-full blur-3xl">
                  {gamerInfo && (
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
                <p className="absolute bottom-8 z-10 w-full text-center text-sm text-p12-sub sm:static sm:py-2">
                  The airdrop is in collaboration with and powered by&nbsp;
                  <a className="text-p12-link" href="https://galaxy.eco/P12" target="_blank">
                    Project Galaxy
                  </a>
                </p>
              </div>
              <div className="basis-1/2 p-4 md:basis-auto 2xl:p-8">
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
      <Poster gamerInfo={gamerInfo} />
      <PosterCanvas gamerInfo={gamerInfo} gamerGames={gamesData} />
    </div>
  );
}
