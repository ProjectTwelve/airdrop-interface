import { motion } from 'framer-motion';
import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useDeveloperTokenRank, useGamerTokenRank } from '../../hooks/ranking';
import DevTokenRankingItem, { DevTokenRankingHeader } from './DevTokenRankingItem';
import GamerTokenRankingItem, { GamerTokenRankingHeader } from './GamerTokenRankingItem';

export default function LeaderboardTabs() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { data: gameTokenRankData } = useGamerTokenRank({ page: 1, size: 20 });
  const { data: devTokenRankData } = useDeveloperTokenRank({ page: 1, size: 20 }, { enabled: selectedTab === 1 });

  return (
    <Tabs onSelect={(index) => setSelectedTab(index)}>
      <TabList>
        <Tab style={{ padding: '14px 16px', fontSize: 18 }}>
          Gamer
          <div className="react-tabs__tab--underline">{selectedTab === 0 && <motion.div layoutId="gamer_tab_underline" />}</div>
        </Tab>
        <Tab style={{ padding: '14px 16px', fontSize: 18 }}>
          Developer
          <div className="react-tabs__tab--underline">{selectedTab === 1 && <motion.div layoutId="gamer_tab_underline" />}</div>
        </Tab>
      </TabList>
      <TabPanel>
        <GamerTokenRankingHeader />
        <div className="h-[350px] overflow-y-auto">
          <motion.div className="grid gap-4">
            {gameTokenRankData?.rankList.map((item, index) => (
              <GamerTokenRankingItem data={item} key={item.appid || index} />
            ))}
          </motion.div>
        </div>
      </TabPanel>
      <TabPanel>
        <DevTokenRankingHeader />
        <div className="h-[350px] overflow-y-auto">
          <div className="grid gap-4">
            {devTokenRankData?.rankList.map((item, index) => (
              <DevTokenRankingItem data={item} key={item.appid || index} />
            ))}
          </div>
        </div>
      </TabPanel>
    </Tabs>
  );
}
