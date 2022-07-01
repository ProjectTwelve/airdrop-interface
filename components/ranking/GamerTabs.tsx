import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { motion } from 'framer-motion';
import { useGamerTimeRank, useGamerTokenRank } from '../../hooks/ranking';
import GamerTimeRankingItem, { GamerTimeRankingHeader } from './GamerTimeRankingItem';
import GamerTokenRankingItem, { GamerTokenRankingHeader } from './GamerTokenRankingItem';

export default function GamerTabs() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { data: timeRankData } = useGamerTimeRank({ page: 1, size: 20 });
  const { data: tokenRankData } = useGamerTokenRank({ page: 1, size: 20 }, { enabled: selectedTab === 1 });

  return (
    <Tabs onSelect={(index) => setSelectedTab(index)}>
      <TabList>
        <Tab style={{ padding: '14px 16px', fontSize: 18 }}>
          Latest
          <div className="react-tabs__tab--underline">{selectedTab === 0 && <motion.div layoutId="gamer_tab_underline" />}</div>
        </Tab>
        <Tab style={{ padding: '14px 16px', fontSize: 18 }}>
          Rankings
          <div className="react-tabs__tab--underline">{selectedTab === 1 && <motion.div layoutId="gamer_tab_underline" />}</div>
        </Tab>
      </TabList>
      <TabPanel>
        <GamerTimeRankingHeader />
        <div className="h-[350px] overflow-y-auto">
          <div className="grid gap-4">
            {timeRankData?.rankList.map((item, index) => (
              <GamerTimeRankingItem data={item} key={item.appid || index} />
            ))}
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <GamerTokenRankingHeader />
        <div className="h-[350px] overflow-y-auto">
          <motion.div className="grid gap-4">
            {tokenRankData?.rankList.map((item, index) => (
              <GamerTokenRankingItem data={item} key={item.appid || index} />
            ))}
          </motion.div>
        </div>
      </TabPanel>
    </Tabs>
  );
}
