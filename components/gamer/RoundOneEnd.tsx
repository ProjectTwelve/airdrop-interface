import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGamerVerifiedCount } from '../../hooks/ranking';
import SocialMedia from '../socialMedia';

export default function RoundOneEnd() {
  const [swipePage, setSwipePage] = useState(0);
  const { data: verified } = useGamerVerifiedCount();

  useEffect(() => {
    setTimeout(() => setSwipePage((page) => page + 1), 2500);
  }, []);

  return (
    <div>
      <div className="rounded-lg bg-[#F36E22]/20 px-4 py-2 text-sm leading-5 text-[#FFAA2C]">
        P12 Airdrop for Gamer [Paused]
      </div>
      <div className="relative mt-5 md:mt-3">
        <div className="round-box round-box__one">
          <div className="mr-[100px] flex items-start justify-between md:mr-0 md:flex-row-reverse">
            <div className="basis-1/2">
              <p className="font-semibold md:text-right xs:text-sm">Total Verified Games</p>
              <p className="font-din text-[48px] font-bold text-[#FFAA2C] md:text-right xs:text-[32px]">
                {new Intl.NumberFormat().format(verified?.total ?? 0)}
              </p>
            </div>
            <div className="basis-1/2">
              <p className="text-[34px] font-semibold xs:text-[24px] xs:leading-6">Round One</p>
              <p className="mt-2 font-medium xs:mt-3 xs:text-sm">
                26 Jun - 12 Jul
                <span className="ml-2 rounded-full bg-[#F13361] px-3 py-[3px] xs:ml-1 xs:px-2 xs:py-0.5 xs:text-xs">END</span>
              </p>
            </div>
          </div>
        </div>
        <div className="round-box round-box__two">
          <div className="ml-[100px] flex items-center justify-between md:ml-0 md:items-start">
            <div>
              <p className="text-[34px] font-semibold xs:text-[24px] xs:leading-6">Round Two</p>
              <div className="mt-2 h-6 w-[155px] overflow-hidden rounded-full bg-[#99A7C3]/40 text-center font-medium xs:mt-3 xs:w-[140px]">
                <AnimatePresence initial={false} custom={1}>
                  <motion.div
                    key={swipePage}
                    custom={1}
                    variants={{ enter: { y: 48, zIndex: 1 }, center: { y: 0, zIndex: 1 }, exit: { y: -48, zIndex: 0 } }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <p>COMING SOON</p>
                    <p>COMING SOON</p>
                    <p>COMING SOON</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div>
              <p className="font-semibold xs:text-sm">Latest progress on</p>
              <div className="mt-2 flex xs:flex-col xs:items-end">
                <SocialMedia size="medium" />
                <p className="px-2 font-medium text-[#1EDB8C] xs:px-0">Join us !</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
