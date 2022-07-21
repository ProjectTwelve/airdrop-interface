import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../button';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { inviteModalAtom } from '../../store/invite/state';
import { motion, AnimatePresence } from 'framer-motion';
import { getLocalStorage, setLocalStorage } from '../../utils/storage';
import { roadmapModalAtom } from '../../store/roadmap/state';
import { openLink } from '../../utils';
import ReactGA from 'react-ga4';

function LayoutHeaderExtra() {
  const router = useRouter();
  const [tipsClick, setTipsClick] = useState(true);
  const setInviteOpen = useSetRecoilState(inviteModalAtom);
  const setRoadmapOpen = useSetRecoilState(roadmapModalAtom);
  const readmeLink = 'https://github.com/ProjectTwelve/airdrop-interface#readme';

  useEffect(() => {
    const currentStatus = getLocalStorage('invite_tips_click');
    setTipsClick(currentStatus ?? false);
  }, []);

  return (
    <AnimatePresence>
      {router.pathname !== '/' && (
        <motion.div className="relative">
          <motion.div
            initial={{ opacity: 0.45 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            className="relative flex"
          >
            <Button type="bordered" className="mr-3" onClick={() => openLink(readmeLink)}>
              <div className="flex items-center justify-center text-sm">
                <Image src="/svg/whitepaper.svg" width={24} height={24} alt="whitepaper" />
                &nbsp;Readme
              </div>
            </Button>
            <Button type="bordered" className="mr-3" onClick={() => setRoadmapOpen(true)}>
              <div className="flex items-center justify-center text-sm">
                <Image src="/svg/roadmap.svg" width={24} height={24} alt="roadmap" />
                &nbsp;Airdrop roadmap
              </div>
            </Button>
            <Button
              type="bordered"
              onClick={() => {
                ReactGA.event({ category: 'Invite', action: 'Click', label: 'Header' });
                setInviteOpen(true);
              }}
            >
              <div className="flex items-center justify-center text-sm">
                <Image src="/svg/invite.svg" width={24} height={24} alt="invite" />
                &nbsp;My referral link
                <p className="ml-3 border-l-2 border-p12-line pl-3 font-ddin text-xl font-bold text-p12-success">32</p>
              </div>
            </Button>
            <AnimatePresence>
              {!tipsClick && (
                <motion.div
                  initial={{ right: 0, opacity: 0, scale: 0.85 }}
                  animate={{ right: -200, opacity: 1, scale: 1 }}
                  exit={{ right: 0, opacity: 0, scale: 0.85 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className="tooltip__container absolute -top-1/2 z-10 w-[190px] rounded-lg text-xs"
                >
                  <div className="p-4">
                    Share invite address get rewards, It&apos;s dangerous to go alone, take this
                    <div className="flex justify-end">
                      <div
                        className="cursor-pointer text-p12-link"
                        onClick={() => {
                          setTipsClick(true);
                          setLocalStorage('invite_tips_click', true);
                        }}
                      >
                        Okay
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default React.memo(LayoutHeaderExtra);
