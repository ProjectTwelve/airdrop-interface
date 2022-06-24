import React, { useEffect, useState } from 'react';
import Button from '../components/button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { inviteModalAtom } from '../store/invite/state';
import { motion } from 'framer-motion';
import { getLocalStorage, setLocalStorage } from '../utils/storage';
import { RankingHomeCard } from '../components/ranking/RankingHomeCard';
import DeveloperTabs from '../components/ranking/DeveloperTabs';
import GamerTabs from '../components/ranking/GamerTabs';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const router = useRouter();
  const setOpen = useSetRecoilState(inviteModalAtom);
  const [btnClick, setBtnClick] = useState(false);
  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    const { code } = router.query;
    const currentStatus = getLocalStorage('invite_btn_click');
    setLocalStorage('invite_code', code);
    setBtnClick(currentStatus ?? false);
  }, [router.query]);

  return (
    <div className="flex flex-col items-center justify-center pt-6 md:pt-4">
      <div className="aspect-[2.19/1] w-full max-w-[300px] bg-[image:var(--logo)] bg-cover xs:hidden"></div>
      <div className="mt-4 text-center">
        <h2 className="text-[24px] font-medium">Tribute to Gamers</h2>
        <h2 className="text-[24px] font-medium">P12 Genesis Soul-Bound NFT Airdrop</h2>
      </div>
      <div className="mt-9 flex w-full flex-col items-center gap-6">
        <div className="w-full max-w-[470px]" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <Button
            className="w-full"
            size="large"
            type="bordered"
            onClick={() => {
              setBtnClick(true);
              setLocalStorage('invite_btn_click', true);
              setOpen(true);
            }}
          >
            <div className="flex items-center justify-center px-2">
              <motion.div
                initial={{ rotate: 180 }}
                animate={btnClick && !isHovered ? {} : { x: [0, 12, 4, 12, 0] }}
                transition={{ when: false, duration: 0.8, repeatDelay: 0.8, repeat: Infinity }}
                className="h-6 w-6"
              >
                <Image src="/svg/left.svg" width={24} height={24} alt="invite" />
              </motion.div>
              <div className="flex flex-1 items-center justify-center gap-2">
                <Image src="/svg/invite-2.svg" style={{ strokeWidth: 10 }} width={24} height={24} alt="invite" />
                My invitation link
              </div>
              <motion.div
                animate={btnClick && !isHovered ? {} : { x: [0, -12, 4, -12, 0] }}
                transition={{ duration: 0.8, repeatDelay: 0.8, repeat: Infinity }}
                className="h-6 w-6"
              >
                <Image src="/svg/left.svg" width={24} height={24} alt="invite" />
              </motion.div>
            </div>
          </Button>
        </div>
        <div className="flex w-full items-center justify-center gap-6 md:flex-col">
          <Button
            className="w-full max-w-[470px]"
            size="large"
            type="gradient"
            onClick={() => router.push({ pathname: '/developer', query: router.query })}
          >
            I am a Steam Game Dev
          </Button>
          <Button
            className="w-full max-w-[470px]"
            size="large"
            type="gradient"
            onClick={() => router.push({ pathname: '/gamer', query: router.query })}
          >
            I am a Steam Gamer
          </Button>
        </div>
      </div>
      <div className="mt-[60px] flex w-full items-start justify-center gap-8 md:flex-col">
        <RankingHomeCard routerId="developer" title="Developer" layoutId="ranking_developer">
          <DeveloperTabs />
        </RankingHomeCard>
        <RankingHomeCard routerId="gamer" title="Gamer" layoutId="ranking_gamer">
          <GamerTabs />
        </RankingHomeCard>
      </div>
    </div>
  );
};

export default Home;
