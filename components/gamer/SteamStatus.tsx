import React, { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import Pagination from 'rc-pagination';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQueryClient } from 'react-query';
import Empty from '../empty';
import Button from '../button';
import Loading from '../loading';
import { getSteamProfileEdit, openLink, shortenSteamId } from '../../utils';
import { useGamerGames } from '../../hooks/gamer';
import { gamerGamesAtom, gamerInfoAtom, gamerInfoCodeAtom } from '../../store/gamer/state';
import GamerGameItem from './GamerGameItem';
import SteamProfileInfo from './SteamProfileInfo';
import { useSteamSignIn } from '../../hooks/useSteamSignIn';
import { isConnectPopoverOpen } from '../../store/web3/state';
import RoundOneEnd from './RoundOneEnd';

export default function SteamStatus() {
  const pageSize = 6;
  const { data: account } = useAccount();
  const queryClient = useQueryClient();
  const [steamSignIn] = useSteamSignIn();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const gamerInfo = useRecoilValue(gamerInfoAtom);
  const gamerInfoCode = useRecoilValue(gamerInfoCodeAtom);
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);
  const setGamerGames = useSetRecoilState(gamerGamesAtom);
  const { data: gamesRes, refetch, isFetching } = useGamerGames(account?.address, gamerInfo?.steam_id);
  const games = useMemo(() => {
    if (gamesRes?.code === 0) {
      return gamesRes.data.games;
    }
    return [];
  }, [gamesRes]);
  const useCurrentGames = useMemo(() => {
    return games.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [currentPage, games]);

  const isPaused = useMemo(() => {
    return gamerInfoCode === 4003 || gamesRes?.code === 4003;
  }, [gamerInfoCode, gamesRes?.code]);

  useEffect(() => {
    // refresh gamer info
    if (!account?.address) return;
    if (gamerInfo?.credential) return;
    if (gamesRes?.code === 0) {
      queryClient.refetchQueries(['gamer_info', account.address]).then();
    }
  }, [account?.address, gamesRes, gamerInfo?.credential, queryClient]);

  useEffect(() => {
    setGamerGames(gamesRes?.data);
  }, [gamesRes, setGamerGames]);

  if (isPaused) {
    return <RoundOneEnd />;
  }

  return (
    <div>
      {gamerInfo ? (
        <div>
          <div className="flex items-center justify-between md:flex-col md:items-start">
            <div className="flex md:mb-4">
              <img className="mr-6 h-[78px] w-[78px] rounded-lg" src={gamerInfo.avatar_full} alt="avatar" />
              <div className="flex flex-col justify-around">
                <p className="text-[26px] font-medium">{gamerInfo.person_name}</p>
                <p>Steam ID: {shortenSteamId(gamerInfo.steam_id)}</p>
              </div>
            </div>
            <SteamProfileInfo data={gamesRes?.data} createdTime={gamerInfo.time_created} />
          </div>
          <div className="py-8">
            <h3 className="mb-3 text-xl font-semibold">My Game List</h3>
            {gamesRes ? (
              games.length ? (
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 md:grid-cols-1">
                  {useCurrentGames.map((item) => (
                    <GamerGameItem key={item.appid} data={item} />
                  ))}
                </div>
              ) : (
                <div className="h-[248px] rounded-2xl bg-p12-black/80 p-6">
                  <Empty />
                </div>
              )
            ) : (
              <div className="rounded-2xl bg-p12-black/80 p-6 md:p-3">
                {isFetching ? (
                  <Loading size={58} className="mt-12 opacity-50" />
                ) : (
                  <>
                    <div className=" rounded-lg bg-p12-error/20 px-4 py-2 text-sm text-p12-error xs:p-2">
                      We cannot view your profile. Please go to Privacy Settings and set all profile items to &quot;Public&quot;
                      including secondary options. You can turn off after the airdrop!
                    </div>
                    <div className="mt-8 flex items-center justify-center md:mt-4 md:flex-col">
                      <div className="h-[234px] w-full max-w-[760px] overflow-x-scroll">
                        <div className="h-full w-[760px]">
                          <img
                            className="h-full w-full"
                            src="https://cdn1.p12.games/airdrop/img/steam_setting.jpg"
                            alt="setting"
                          />
                        </div>
                      </div>
                      <div className="ml-[40px] grid gap-6 md:mt-4 md:ml-0 md:w-full md:grid-cols-2 md:gap-2">
                        <Button
                          type="gradient"
                          className="w-[260px] md:w-full"
                          onClick={() => openLink(getSteamProfileEdit(gamerInfo.steam_id))}
                        >
                          <div className="flex items-center justify-center">
                            Open Steam
                            <img className="ml-2 w-6 rotate-180 xs:hidden" src="/svg/left.svg" alt="reload" />
                          </div>
                        </Button>
                        <Button type="bordered" className="w-[260px] md:w-full" onClick={refetch}>
                          <div className="flex items-center justify-center">
                            Reload Stats
                            <img className="ml-2 xs:hidden" src="/svg/reload.svg" alt="reload" />
                          </div>
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            {games.length > 6 && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs">
                  {currentPage * 6 - 5}-{currentPage * 6} of {games.length}
                </p>
                <Pagination
                  simple
                  current={currentPage}
                  pageSize={pageSize}
                  onChange={(page) => setCurrentPage(page)}
                  total={games.length}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 xs:py-4">
          {account?.address ? (
            <Button type="gradient" onClick={steamSignIn} className="w-[305px]">
              Sign in with Steam
            </Button>
          ) : (
            <Button type="gradient" onClick={() => setConnectOpen(true)} className="w-[305px]">
              Please connect wallet
            </Button>
          )}
          <p className="mt-5 text-sm text-p12-sub">
            {account?.address && 'We cannot access your profile. Please log in to your Steam account.'}
          </p>
        </div>
      )}
    </div>
  );
}
