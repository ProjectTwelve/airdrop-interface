import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GamerRank from './Gamer/GamerRank';
import VerifiedGamer from './VerifiedGamer';
import VerifiedDeveloper from './VerifiedDeveloper';
import DeveloperRank from './Developer/DeveloperRank';
import PowerLevelRank from './PowerLevel/PowerLevelRank';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

export default function HomepageRank() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="p-8 sm:p-4">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-1 md:gap-2">
        <VerifiedGamer />
        <VerifiedDeveloper />
      </div>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-1 lg:gap-4 xl:gap-4">
        <div className="mt-8 w-full">
          <h2 className="border-b border-gray-600 pb-4 text-center text-xl font-medium">Power Level Leaderboard</h2>
          <PowerLevelRank />
        </div>
        <div className="w-full">
          <Tabs className="mt-4" onSelect={(index) => setSelectedTab(index)}>
            <TabList>
              <Tab>
                Gamer
                <div className="react-tabs__tab--underline">
                  {selectedTab === 0 && <motion.div layoutId="homepage_rank_underline" />}
                </div>
              </Tab>
              <Tab>
                Developer
                <div className="react-tabs__tab--underline">
                  {selectedTab === 1 && <motion.div layoutId="homepage_rank_underline" />}
                </div>
              </Tab>
            </TabList>
            <TabPanel>
              <GamerRank />
            </TabPanel>
            <TabPanel>
              <DeveloperRank />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
