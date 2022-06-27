import React, { useRef, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { rankingLayoutIdAtom } from '../../store/ranking/state';
import Back from '../../components/back';
import SocialMedia from '../../components/socialMedia';
import DeveloperRanking from '../../components/ranking/Developer';
import GamerRanking from '../../components/ranking/Gamer';

export default function Ranking(props: { tabIndex: number }) {
  const router = useRouter();
  const [layoutId, setLayoutId] = useRecoilState(rankingLayoutIdAtom);
  const [selectedTab, setSelectedTab] = useState(props.tabIndex);
  const LayoutIdRef = useRef(layoutId);
  const tabs = ['gamer', 'developer'];

  return (
    <div className="mt-8">
      <Back
        onClick={() => {
          setLayoutId(LayoutIdRef.current);
          router.back();
        }}
      />
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
              setLayoutId('');
              router.replace('/ranking/' + tabs[index]).then();
            }}
            selectedIndex={selectedTab}
          >
            <TabList>
              <Tab>
                Gamer Ranking
                <div className="react-tabs__tab--underline">{selectedTab === 0 && <motion.div layoutId="dev_underline" />}</div>
              </Tab>
              <Tab>
                Developer Ranking
                <div className="react-tabs__tab--underline">{selectedTab === 1 && <motion.div layoutId="dev_underline" />}</div>
              </Tab>
              <div className="absolute right-8 md:-top-10">
                <SocialMedia />
              </div>
            </TabList>
            <TabPanel>
              <GamerRanking />
            </TabPanel>
            <TabPanel>
              <DeveloperRanking />
            </TabPanel>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { tab: 'gamer' } }, { params: { tab: 'developer' } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { tab: 'gamer' | 'developer' } }) {
  const tabs = { gamer: 0, developer: 1 };
  return {
    props: { tabIndex: tabs[params.tab] || 0 },
    revalidate: 60 * 60 * 24,
  };
}
