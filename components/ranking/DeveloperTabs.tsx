import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { motion } from 'framer-motion';
import DevTimeRankingItem, { DevTimeRankingHeader } from './DevTimeRankingItem';
import DevTokenRankingItem, { DevTokenRankingHeader } from './DevTokenRankingItem';
import { useDeveloperTimeRank, useDeveloperTokenRank } from '../../hooks/ranking';

export default function DeveloperTabs() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { data: timeRankData } = useDeveloperTimeRank({ page: 1, size: 20 });
  const { data: tokenRankData } = useDeveloperTokenRank({ page: 1, size: 20 }, { enabled: selectedTab === 1 });

  return (
    <Tabs onSelect={(index) => setSelectedTab(index)}>
      <TabList>
        <Tab style={{ padding: '14px 16px', fontSize: 18 }}>
          Latest
          <div className="react-tabs__tab--underline">{selectedTab === 0 && <motion.div layoutId="dev_tab_underline" />}</div>
        </Tab>
        <Tab style={{ padding: '14px 16px', fontSize: 18 }}>
          Rankings
          <div className="react-tabs__tab--underline">{selectedTab === 1 && <motion.div layoutId="dev_tab_underline" />}</div>
        </Tab>
      </TabList>
      <TabPanel>
        <DevTimeRankingHeader />
        <div className="h-[350px] overflow-y-auto">
          <div className="flex flex-col gap-4 ">
            {timeRankData?.rankList.map((item, index) => (
              <DevTimeRankingItem hover={false} steamStore={false} data={item} key={item.appid || index} />
            ))}
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <DevTokenRankingHeader />
        <div className="h-[350px] overflow-y-auto">
          <div className="flex flex-col gap-4">
            {tokenRankData?.rankList.map((item, index) => (
              <DevTokenRankingItem hover={false} steamStore={false} data={item} key={item.appid || index} />
            ))}
          </div>
        </div>
      </TabPanel>
    </Tabs>
  );
}
