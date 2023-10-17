import React, { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import Pagination from 'rc-pagination';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import Empty from '../empty';
import Button from '../button';
import Loading from '../loading';
import SteamGamesInfo from './SteamGamesInfo';
import SteamProfileInfo from './SteamProfileInfo';
import GamerGameItem from './GamerGameItem';
import { getSteamProfileEdit, openLink, shortenSteamId } from '@/utils';
import { useGamerGames } from '@/hooks/gamer';
import { gamerGamesAtom, gamerInfoAtom } from '@/store/gamer/state';
import { useSteamSignIn } from '@/hooks/useSteamSignIn';
import { isConnectPopoverOpen } from '@/store/web3/state';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useFetchGenesisNFT } from '@/hooks/dashboard/genesis';
import { GenesisRole } from '@/constants';
import SteamPowerLevel from '@/components/gamer/SteamPowerLevel';

export default function SteamStatus() {
  const pageSize = 6;
  const { address } = useAccount();
  const router = useRouter();
  const { query } = router;
  const queryClient = useQueryClient();
  const [steamSignIn] = useSteamSignIn();
  const isMounted = useIsMounted();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const gamerInfo = useRecoilValue(gamerInfoAtom);
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);
  const gamesData = useRecoilValue(gamerGamesAtom);
  const { refetch: refetchGamer } = useFetchGenesisNFT({ address, role: GenesisRole.Gamer });
  const { refetch, isFetching } = useGamerGames((query.address as string | undefined) ?? address);
  const useCurrentGames = useMemo(() => {
    if (!gamesData) return [];
    return gamesData.games.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [currentPage, gamesData]);

  useEffect(() => {
    // refresh gamer info
    if (!address) return;
    if (gamerInfo?.credential) return;
    if (gamesData) {
      queryClient.refetchQueries(['gamer_info', address]).then();
      refetchGamer().then();
    }
  }, [address, gamesData, gamerInfo?.credential, queryClient, refetchGamer]);

  return (
    <div>
      {gamerInfo ? (
        <div>
          <div className="flex items-center md:flex-col md:items-start">
            <div className="mr-4 flex max-w-full md:mb-4">
              <img className="mr-3 h-16 w-16 rounded-lg" src={gamerInfo.avatar_full} alt="avatar" />
              <div className="flex flex-col justify-around overflow-hidden">
                <p className="truncate text-xl/8 font-semibold">{gamerInfo.person_name}</p>
                <p className="text-sm/8">Steam ID: {shortenSteamId(gamerInfo.steam_id)}</p>
              </div>
            </div>
            <SteamProfileInfo data={gamerInfo} />
          </div>
          <div>
            <SteamPowerLevel data={gamerInfo} />
            <h3 className="mb-3 text-base/6 font-semibold">My Games</h3>
            {gamesData ? (
              <>
                <div className="flex items-start justify-start md:flex-col">
                  <div className="flex-0 mr-5 w-[214px] md:mb-4 md:mr-0 md:w-full">
                    <SteamGamesInfo data={gamesData} />
                  </div>
                  <div className="flex-1 md:w-full ">
                    {gamesData.games.length ? (
                      <div className="grid grid-cols-2 gap-x-5 gap-y-4 md:grid-cols-1">
                        {useCurrentGames.map((item) => (
                          <GamerGameItem key={item.appid} data={item} />
                        ))}
                      </div>
                    ) : (
                      <div className="h-[248px] rounded-2xl bg-gray-700/30 p-6">
                        <Empty />
                      </div>
                    )}
                    {gamesData.games.length > 6 && (
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-xs/5 font-medium">
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
              </>
            ) : (
              <div className="rounded-2xl bg-gray-700/30 p-6 md:p-3">
                {isFetching ? (
                  <Loading size={58} className="my-[72px] opacity-50" />
                ) : (
                  <>
                    <div className="rounded-lg bg-red/20 px-4 py-2 text-sm text-red sm:p-2">
                      We cannot view your profile. Please go to Privacy Settings and set all profile items to &quot;Public&quot;
                      including secondary options. You can turn off after the airdrop!
                    </div>
                    <div className="mt-7.5 flex items-center justify-center md:mt-4 md:flex-col">
                      <div className="h-[346px] w-full max-w-[760px] overflow-x-scroll">
                        <div className="h-full w-[760px]">
                          <img
                            className="h-full w-full"
                            src="https://cdn1.p12.games/airdrop/img/steam_setting_2.webp"
                            alt="setting"
                          />
                        </div>
                      </div>
                      <div className="ml-[40px] grid gap-6 md:ml-0 md:mt-4 md:w-full md:grid-cols-2 md:gap-2">
                        <Button
                          type="gradient"
                          className="w-[260px] md:w-full"
                          onClick={() => openLink(getSteamProfileEdit(gamerInfo.steam_id))}
                        >
                          <div className="flex items-center justify-center">
                            Open Steam
                            <img className="ml-2 w-6 rotate-180 sm:hidden" src="/svg/left.svg" alt="reload" />
                          </div>
                        </Button>
                        <Button type="bordered" className="w-[260px] md:w-full" onClick={refetch}>
                          <div className="flex items-center justify-center">
                            Reload Stats
                            <img className="ml-2 sm:hidden" src="/svg/reload.svg" alt="reload" />
                          </div>
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center sm:py-4">
          {isMounted && address ? (
            <Button type="gradient" onClick={steamSignIn} className="w-[278px]">
              Sign in with Steam
            </Button>
          ) : (
            <Button type="gradient" onClick={() => setConnectOpen(true)} className="w-[305px]">
              Please connect wallet
            </Button>
          )}
          <p className="mt-6.5 text-sm/6 text-gray">
            {isMounted && address && 'We cannot access your profile. Please log in to your Steam account.'}
          </p>
        </div>
      )}
    </div>
  );
}
