import React, { useEffect, useState } from 'react';
import Button from '../components/button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { inviteModalAtom } from '../store/invite/state';
import { motion } from 'framer-motion';
import { getLocalStorage, setLocalStorage } from '../utils/storage';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const setOpen = useSetRecoilState(inviteModalAtom);
  const router = useRouter();
  const [btnClick, setBtnClick] = useState(false);
  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    const currentStatus = getLocalStorage('invite_btn_click');
    setBtnClick(currentStatus ?? false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center md:pt-4" style={{ minHeight: 'calc(100vh - 160px)' }}>
      <div className="aspect-[2.19/1] w-full max-w-[394px] bg-[image:var(--logo)] bg-cover"></div>
      <div className="mt-16 text-center">
        <h2 className="text-[34px] font-medium">Tribute to Gamers</h2>
        <h2 className="text-[34px] font-medium">P12 Genesis Soul-Bound NFT Airdrop</h2>
      </div>
      <div className="mt-24 flex w-full flex-col items-center gap-6">
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
        <Button
          className="w-full max-w-[470px]"
          size="large"
          type="gradient"
          onClick={() => router.push({ pathname: '/developer', query: router.query })}
        >
          I am a Steam Game Dev
        </Button>
        <Button disabled className="w-full max-w-[470px]" size="large">
          I am a Steam Gamer
        </Button>
      </div>
      <p className="mt-3 text-xs text-[#A3A6B3]">Airdrop to gamers coming in stage 2</p>
      <motion.div
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className="my-4 cursor-pointer"
        layoutId="ranking"
        onClick={() => router.push('/ranking')}
      >
        <div className="backdrop-box w-[400px] rounded-2xl">
          <div className="h-[400px]">Ranking</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
