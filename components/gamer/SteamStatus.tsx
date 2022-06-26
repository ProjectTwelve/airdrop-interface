import React, { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import Pagination from 'rc-pagination';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQueryClient } from 'react-query';
import Empty from '../empty';
import Button from '../button';
import Loading from '../loading';
import { getSteamProfileEdit, shortenSteamId } from '../../utils';
import { useGamerGames } from '../../hooks/gamer';
import { gamerInfoAtom } from '../../store/gamer/state';
import GamerGameItem from './GamerGameItem';
import SteamProfileInfo from './SteamProfileInfo';
import { useSteamSignIn } from '../../hooks/useSteamSignIn';
import { isConnectPopoverOpen } from '../../store/web3/state';

export default function SteamStatus() {
  const pageSize = 6;
  const { data: account } = useAccount();
  const queryClient = useQueryClient();
  const [steamSignIn] = useSteamSignIn();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const gamerInfo = useRecoilValue(gamerInfoAtom);
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);
  const { data: gamesData, refetch, isFetching } = useGamerGames(account?.address, gamerInfo?.steam_id);
  const useCurrentGames = useMemo(() => {
    if (!gamesData) return [];
    return gamesData.games.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [currentPage, gamesData]);

  useEffect(() => {
    // refresh gamer info
    if (!account?.address) return;
    if (gamerInfo?.credential) return;
    if (gamesData) {
      queryClient.refetchQueries(['gamer_info', account.address]).then();
    }
  }, [account?.address, gamesData, gamerInfo?.credential, queryClient]);

  return (
    <div>
      {gamerInfo ? (
        <div>
          <div className="flex items-center justify-between gap-4 md:flex-col md:items-start">
            <div className="flex gap-6">
              <img className="h-[78px] w-[78px] rounded-lg" src={gamerInfo.avatar_full} alt="avatar" />
              <div className="flex flex-col justify-around">
                <p className="text-[26px] font-medium">{gamerInfo.person_name}</p>
                <p>Steam ID: {shortenSteamId(gamerInfo.steam_id)}</p>
              </div>
            </div>
            <SteamProfileInfo data={gamesData} createdTime={gamerInfo.time_created} />
          </div>
          <div className="py-8">
            <h3 className="mb-3 text-xl font-semibold">My Game List</h3>
            {gamesData ? (
              gamesData.games.length ? (
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
              <div className="h-[248px] rounded-2xl bg-p12-black/80 p-6">
                {isFetching ? (
                  <Loading size={58} className="mt-12 opacity-50" />
                ) : (
                  <>
                    <div className=" rounded-lg bg-p12-error/20 px-4 py-2 text-sm text-p12-error xs:p-2">
                      We cannot view your profile. Please go to Privacy Settings and set profile to &apos;Public&apos;. You can
                      turn off after the airdrop&excl;&nbsp;&nbsp;
                      <a className="text-p12-link" target="_blank" href={getSteamProfileEdit(gamerInfo.steam_id)}>
                        Open on Steam &gt;
                      </a>
                    </div>
                    <div className="mt-[80px] flex items-center justify-center">
                      <Button type="bordered" className="w-[260px]" onClick={refetch}>
                        <div className="flex items-center justify-center gap-2">
                          <img src="/svg/reload.svg" alt="reload" />
                          Reload Stats
                        </div>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
            {gamesData && gamesData.games?.length > 6 && (
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
