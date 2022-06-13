import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Back from '../../components/back';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SocialMedia from '../../components/socialMedia';
import Verify from '../../components/developer/Verify';
import Tokens from '../../components/developer/Tokens';
import { useRecoilState, useRecoilValue } from 'recoil';
import { claimGroupSelector, NFTClaim, tabSelectAtom } from '../../store/developer/state';

export default function Developer() {
  const claimGroup = useRecoilValue(claimGroupSelector);
  const allUnclaimed = useMemo(() => [...claimGroup[NFTClaim.PENDING], ...claimGroup[NFTClaim.UNCLAIMED]], [claimGroup]);
  const [selectedTab, setSelectedTab] = useRecoilState(tabSelectAtom);
  const router = useRouter();

  return (
    <div className="mt-8">
      <Back onClick={() => router.back()} />
      <div className="my-4" onClick={(event) => event.stopPropagation()}>
        <div className="backdrop-box rounded-2xl">
          <Tabs forceRenderTabPanel onSelect={(index) => setSelectedTab(index)} selectedIndex={selectedTab}>
            <TabList>
              <Tab>
                Verify my Steam games
                <div className="react-tabs__tab--underline">{selectedTab === 0 && <motion.div layoutId="dev_underline" />}</div>
              </Tab>
              <Tab>
                My P12 tokens
                {allUnclaimed.length ? (
                  <div className="absolute -right-12 top-1/2 -translate-y-1/2 rounded-full bg-p12-error px-2 text-sm leading-5 md:hidden">
                    {allUnclaimed.length} NFT
                  </div>
                ) : null}
                <div className="react-tabs__tab--underline">{selectedTab === 1 && <motion.div layoutId="dev_underline" />}</div>
              </Tab>
              <div className="absolute right-8 md:-top-10">
                <SocialMedia />
              </div>
            </TabList>
            <TabPanel>
              <Verify />
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
