import { GenesisRarity } from '@/constants';
import { useGamerRank, useGamerTimeRank, useGamerTokenRank, useGamerVerifiedCount } from '@/hooks/ranking';
import { dashboardSelectedTabAtom, userPowerLevelAtom } from '@/store/dashboard/state';
import { isConnectPopoverOpen } from '@/store/web3/state';
import { getCountMemo } from '@/utils';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Pagination from 'rc-pagination';
import { Fragment, useMemo, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useAccount } from 'wagmi';
import DevelopRankTable from './DevelopRankTable';
import GamerTimeRankingItem, { GamerTimeRankingHeader } from './GamerTimeRankingItem';
import GamerTokenRankingItem, { GamerTokenRankingHeader } from './GamerTokenRankingItem';

export default function GamerRanking() {
  const router = useRouter();
  const setDashboardSelectedTab = useSetRecoilState(dashboardSelectedTabAtom);
  const { data: verified } = useGamerVerifiedCount();
  const [timeRankPage, setTimeRankPage] = useState(1);
  const [tokenRankPage, setTokenRankPage] = useState(1);
  const { address } = useAccount();
  const { data: gamerRankData } = useGamerRank(address);
  const { data: timeRankData } = useGamerTimeRank({ page: timeRankPage, size: 10 });
  const { data: tokenRankData } = useGamerTokenRank({ page: tokenRankPage, size: 10 });
  const commonCount = useMemo(
    () => (verified ? (verified.verifiedCount[4] || 0) + (verified.verifiedCount[5] || 0) : 0),
    [verified],
  );
  const { activatedPL } = useRecoilValue(userPowerLevelAtom);
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);

  const levelCount = useMemo(
    () => [
      { color: 'text-[#FFAA2C]', num: verified?.verifiedCount[0] ?? 0 },
      { color: 'text-[#FC59FF]', num: verified?.verifiedCount[1] ?? 0 },
      { color: 'text-[#43BBFF]', num: verified?.verifiedCount[2] ?? 0 },
      { color: 'text-[#6EEB7A]', num: verified?.verifiedCount[3] ?? 0 },
      {
        color: 'text-[#BDC9E3]',
        num: commonCount,
      },
    ],
    [commonCount, verified?.verifiedCount],
  );
  const isInRanking = useMemo(() => !!gamerRankData?.tokenRank && gamerRankData.tokenRank <= 1000, [gamerRankData?.tokenRank]);

  const isLowLevelToken = (num?: number) => num === GenesisRarity.Common || num === GenesisRarity.Uncommon;
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-1 md:gap-2">
        <div>
          <h3 className="text-base/6 font-semibold">Verified Gamers</h3>
          <div className="gradient__box mt-3 grid grid-cols-3 py-[21px] leading-[90px] 2xl:flex 2xl:items-center">
            <div className="h-[40px] w-full 2xl:w-[130px]">
              <p className="h-[14px] text-center text-xs">Total</p>
              <p className="mt-1 text-center font-ddin text-xl leading-5">
                {new Intl.NumberFormat().format(verified?.total ?? 0)}
              </p>
            </div>

            {levelCount.map((item, index) => (
              <Fragment key={index}>
                <div className="mx-2 my-auto hidden h-4 w-px bg-[#949FA9]/50 2xl:block" />
                <p className={classNames('h-[40px] flex-1 text-center font-ddin text-lg leading-[40px]', item.color)}>
                  {new Intl.NumberFormat().format(item.num)}
                </p>
              </Fragment>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-base/6 font-semibold">Steam Ranking</h3>
          <div className="gradient__box mt-3 h-[124px] 2xl:h-[84px]">
            <div className="flex h-full w-full flex-wrap px-4 py-2">
              <div className="flex h-[68px] basis-full items-center justify-center truncate 2xl:flex-1">
                {gamerRankData?.avatar_full && (
                  <div className="mr-3 h-[44px] w-[44px] flex-none overflow-hidden rounded bg-[#CEDCFF]/10">
                    <img src={gamerRankData.avatar_full} alt="avatar" />
                  </div>
                )}
                <div className="truncate">
                  {gamerRankData?.person_name ? (
                    gamerRankData?.person_name
                  ) : activatedPL ? (
                    <p
                      className="cursor-pointer text-sm/4 font-semibold text-blue"
                      onClick={() => {
                        setDashboardSelectedTab(1);
                        router.push('/dashboard');
                      }}
                    >
                      Go to verify Steam
                    </p>
                  ) : (
                    <p
                      className="cursor-pointer text-sm/4 font-semibold text-blue"
                      onClick={() => {
                        setConnectOpen(true);
                      }}
                    >
                      Please login
                    </p>
                  )}
                </div>
              </div>
              <div className="mx-2 my-auto hidden h-4 w-px bg-[#949FA9]/50 2xl:block" />
              <div
                onClick={() => {
                  isInRanking && setTokenRankPage(Math.ceil(gamerRankData!.tokenRank! / 10));
                }}
                className={classNames(
                  'flex min-h-[38px] flex-1 items-center justify-center rounded-2xl text-xs',
                  isInRanking && 'cursor-pointer hover:bg-[#7980AF]/30',
                )}
              >
                By Token Rarity
                <span className="pl-3 font-ddin text-lg font-bold">
                  {getCountMemo(gamerRankData?.tokenRank) || '--'}
                  {isLowLevelToken(gamerRankData?.nft_level) ? '+' : null}
                </span>
              </div>
              <div className="mx-2 my-auto hidden h-4 w-px bg-[#949FA9]/50 2xl:block" />
              <div className="flex flex-1 items-center justify-center rounded-2xl text-xs">
                By Claim Time
                <span className="pl-3 font-ddin text-lg font-bold">{getCountMemo(gamerRankData?.timeRank) || '--'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="backdrop-box mt-5 grid grid-cols-2 gap-8 rounded-[15px] bg-gray-700/30 px-6 pb-8 pt-5 sm:p-4 md:grid-cols-1 lg:gap-4 xl:gap-4">
        <div className="w-full">
          <h2 className="border-b border-gray-650 pb-3 text-base/6 font-semibold">Latest</h2>
          <GamerTimeRankingHeader />
          <div className="grid">
            {timeRankData?.rankList.map((item, index) => (
              <GamerTimeRankingItem data={item} key={item.steam_id || index} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center">
            {timeRankData && timeRankData.rankLength > 10 && (
              <Pagination
                simple
                current={timeRankPage}
                total={timeRankData.rankLength}
                onChange={(page) => setTimeRankPage(page)}
              />
            )}
          </div>
        </div>
        <div className="w-full">
          <Tabs
            className="home-tabs"
            onSelect={(index) => {
              setSelectedTab(index);
            }}
            selectedIndex={selectedTab}
          >
            <TabList className="flex items-end justify-between border-b border-gray-650 text-base/6 font-semibold">
              <h2 className="flex-grow pb-3 text-base/6 font-semibold">Leaderboard</h2>
              <Tab>
                <div className="-mt-4">
                  Gamer
                  <div className="react-tabs__tab--underline">
                    {selectedTab === 0 && <motion.div layoutId="dev_underline" />}
                  </div>
                </div>
              </Tab>
              <Tab>
                Developer
                <div className="react-tabs__tab--underline">{selectedTab === 1 && <motion.div layoutId="dev_underline" />}</div>
              </Tab>
            </TabList>
            <TabPanel>
              <>
                <GamerTokenRankingHeader />
                <div className="grid">
                  {tokenRankData?.rankList.map((item, index) => (
                    <GamerTokenRankingItem data={item} key={item.steam_id || index} />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center">
                  {tokenRankData && tokenRankData.rankLength > 10 && (
                    <Pagination
                      simple
                      current={tokenRankPage}
                      total={tokenRankData.rankLength}
                      onChange={(page) => setTokenRankPage(page)}
                    />
                  )}
                </div>
              </>
            </TabPanel>
            <TabPanel>
              <DevelopRankTable />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
