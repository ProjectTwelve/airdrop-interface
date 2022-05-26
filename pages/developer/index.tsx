import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Back from '../../components/back';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SocialMedia from '../../components/socialMedia';
import VerifyGames from '../../components/developer/VerifyGames';
import Tokens from '../../components/developer/Tokens';
import { useRecoilState, useRecoilValue } from 'recoil';
import { claimGroupSelector, NFTClaim, tabSelectAtom } from '../../store/developer/state';

export default function Developer() {
  const tabs = ['Verify my Steam games', 'My P12 tokens'];
  const claimGroup = useRecoilValue(claimGroupSelector);
  const allUnclaimed = useMemo(() => [...claimGroup[NFTClaim.PENDING], ...claimGroup[NFTClaim.UNCLAIMED]], [claimGroup]);
  const [selectedTab, setSelectedTab] = useRecoilState(tabSelectAtom);
  const router = useRouter();

  return (
    <div className="mt-8">
      <Back onClick={() => router.back()} />
      <div className="my-4">
        <div className="backdrop-box rounded-2xl">
          <Tabs forceRenderTabPanel onSelect={(index) => setSelectedTab(index)} selectedIndex={selectedTab}>
            <TabList className="relative flex items-center justify-center gap-4 border-b border-p12-line text-xl font-bold">
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  className={['relative cursor-pointer py-5 px-4', index === selectedTab ? 'text-white' : 'text-white/60']}
                >
                  {tab}
                  {index === selectedTab ? (
                    <motion.div className="absolute left-0 bottom-0 w-full" layoutId="underline">
                      <div className="mx-auto h-[3px] w-[60px] bg-gradient"></div>
                    </motion.div>
                  ) : null}
                  {index === 1 && allUnclaimed.length ? (
                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 rounded-full bg-p12-error px-2 text-sm leading-5">
                      {allUnclaimed.length} NFT
                    </div>
                  ) : null}
                </Tab>
              ))}
              <div className="absolute right-8">
                <SocialMedia />
              </div>
            </TabList>
            <TabPanel>
              <VerifyGames />
            </TabPanel>
            <TabPanel>
              <Tokens />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
