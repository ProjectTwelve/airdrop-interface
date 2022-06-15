import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { rankingLayoutIdAtom } from '../../store/ranking/state';
import Back from '../../components/back';
import SocialMedia from '../../components/socialMedia';
import DeveloperRanking from '../../components/ranking/developer';

export default function Ranking() {
  const router = useRouter();
  const layoutId = useRecoilValue(rankingLayoutIdAtom);

  return (
    <div className="mt-8">
      <Back onClick={() => router.back()} />
      <motion.div
        className="my-4"
        layoutId={layoutId}
        transition={{ type: 'spring', stiffness: 300, damping: 35 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="backdrop-box rounded-2xl">
          <Tabs>
            <TabList>
              <Tab>
                Developer Ranking
                <div className="react-tabs__tab--underline">
                  <motion.div layoutId="dev_underline" />
                </div>
              </Tab>
              <Tab disabled>Gamer Ranking</Tab>
              <div className="absolute right-8 md:-top-10">
                <SocialMedia />
              </div>
            </TabList>
            <TabPanel>
              <DeveloperRanking />
            </TabPanel>
            <TabPanel>Gamer Ranking</TabPanel>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}
