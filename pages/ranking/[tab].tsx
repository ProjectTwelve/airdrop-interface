import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { rankingLayoutIdAtom } from '../../store/ranking/state';
import Back from '../../components/back';
import SocialMedia from '../../components/socialMedia';
import DeveloperRanking from '../../components/ranking/Developer';
import GamerRanking from '../../components/ranking/Gamer';

export default function Ranking(props: { tabIndex: number }) {
  const router = useRouter();
  const layoutId = useRecoilValue(rankingLayoutIdAtom);
  const [selectedTab, setSelectedTab] = useState(props.tabIndex);
  const tabs = ['developer', 'gamer'];

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
          <Tabs
            onSelect={(index) => {
              setSelectedTab(index);
              router.replace('/ranking/' + tabs[index]).then();
            }}
            selectedIndex={selectedTab}
          >
            <TabList>
              <Tab>
                Developer Ranking
                <div className="react-tabs__tab--underline">{selectedTab === 0 && <motion.div layoutId="dev_underline" />}</div>
              </Tab>
              <Tab>
                Gamer Ranking
                <div className="react-tabs__tab--underline">{selectedTab === 1 && <motion.div layoutId="dev_underline" />}</div>
              </Tab>
              <div className="absolute right-8 md:-top-10">
                <SocialMedia />
              </div>
            </TabList>
            <TabPanel>
              <DeveloperRanking />
            </TabPanel>
            <TabPanel>
              <GamerRanking />
            </TabPanel>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { tab: 'developer' } }, { params: { tab: 'gamer' } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { tab: 'developer' | 'gamer' } }) {
  const tabs = { developer: 0, gamer: 1 };
  return {
    props: { tabIndex: tabs[params.tab] || 0 },
    revalidate: 60 * 60 * 24,
  };
}
