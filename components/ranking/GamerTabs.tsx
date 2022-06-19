import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { motion } from 'framer-motion';
import TimeRankingItem, { TimeRankingHeader } from './TimeRankingItem';
import TokenRankingItem, { TokenRankingHeader } from './TokenRakingItem';
import { useDeveloperTimeRank, useDeveloperTokenRank, useTokenAnimation } from './hooks';
import Loading from '../loading';
import { useSetRecoilState } from 'recoil';
import { rankingLayoutIdAtom } from '../../store/ranking/state';
import { useRouter } from 'next/router';

export default function GamerTabs() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);
  const { data: timeRankData, isLoading: isTimeRankLoading } = useDeveloperTimeRank({ page: 1, size: 10 });
  const { data: tokenRankData, isLoading: isTokenRankLoading } = useDeveloperTokenRank(
    { page: 1, size: 50 },
    { enabled: selectedTab === 1, staleTime: Infinity },
  );
  const animateY = useTokenAnimation(tokenRankData?.rankList, selectedTab === 1);
  const setLayoutId = useSetRecoilState(rankingLayoutIdAtom);

  const handleGoToRanking = () => {
    setLayoutId('ranking_gamer');
    router.push('/ranking/gamer').then();
  };

  return (
    <Tabs onSelect={(index) => setSelectedTab(index)}>
      <TabList>
        <Tab style={{ padding: '14px 16px', fontSize: 18 }}>
          Latest Verify List
          <div className="react-tabs__tab--underline">{selectedTab === 0 && <motion.div layoutId="gamer_tab_underline" />}</div>
        </Tab>
        <Tab style={{ padding: '14px 16px', fontSize: 18 }}>
          Token Ranking
          <div className="react-tabs__tab--underline">{selectedTab === 1 && <motion.div layoutId="gamer_tab_underline" />}</div>
        </Tab>
      </TabList>
      <TabPanel onClick={handleGoToRanking}>
        <TimeRankingHeader />
        <div className="h-[350px] overflow-hidden">
          <div className="flex h-[460px] flex-col gap-4 overflow-hidden">
            {isTimeRankLoading && <Loading size={48} />}
            {timeRankData?.rankList.slice(0, 3).map((item, index) => (
              <TimeRankingItem steamStore={false} data={item} key={item.appid || index} />
            ))}
          </div>
        </div>
      </TabPanel>
      <TabPanel onClick={handleGoToRanking}>
        <TokenRankingHeader />
        <div className="h-[350px] overflow-hidden">
          <motion.div style={{ y: animateY }} className="flex flex-col gap-4">
            {isTokenRankLoading && <Loading size={48} />}
            {tokenRankData?.rankList.map((item, index) => (
              <TokenRankingItem steamStore={false} data={item} key={item.appid || index} />
            ))}
          </motion.div>
        </div>
      </TabPanel>
    </Tabs>
  );
}
