import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Button from '../button';
import { openLink } from '../../utils';
import { invitationCountSelector, inviteModalAtom } from '../../store/invite/state';
import { roadmapModalAtom } from '../../store/roadmap/state';
import { getLocalStorage, setLocalStorage } from '../../utils/storage';
import { STORAGE_KEY } from '../../constants';

function LayoutHeaderExtra() {
  const router = useRouter();
  const [tipsClick, setTipsClick] = useState(true);
  const setInviteOpen = useSetRecoilState(inviteModalAtom);
  const invitationCount = useRecoilValue(invitationCountSelector);
  const setRoadmapOpen = useSetRecoilState(roadmapModalAtom);
  const readmeLink = 'https://github.com/ProjectTwelve/airdrop-interface#readme';

  useEffect(() => {
    const currentStatus = getLocalStorage(STORAGE_KEY.INVITE_TIPS_CLICK);
    setTipsClick(currentStatus ?? false);
  }, []);

  return (
    <AnimatePresence>
      {router.pathname !== '/' && router.pathname !== '/arcana/[[...address]]' && (
        <motion.div className="relative">
          <motion.div
            initial={{ opacity: 0.45 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            className="relative flex"
          >
            <Button type="bordered" className="mr-3 lg:hidden xl:hidden" onClick={() => openLink(readmeLink)}>
              <div className="flex items-center justify-center text-sm">
                <img src="/svg/white_paper.svg" width={24} height={24} alt="white_paper" />
                &nbsp;Readme
              </div>
            </Button>
            <Button type="bordered" className="mr-3 lg:hidden" onClick={() => setRoadmapOpen(true)}>
              <div className="flex items-center justify-center text-sm">
                <img src="/svg/roadmap.svg" width={24} height={24} alt="roadmap" />
                &nbsp;Airdrop roadmap
              </div>
            </Button>
            {router.pathname !== '/gamer/[address]' && (
              <Button
                type="bordered"
                onClick={() => {
                  ReactGA.event({ category: 'Invite', action: 'Click', label: 'Header' });
                  setInviteOpen(true);
                }}
              >
                <div className="flex items-center justify-center text-sm">
                  <img src="/svg/invite.svg" width={24} height={24} alt="invite" />
                  &nbsp;My referral link
                  <p className="ml-3 border-l-2 border-p12-line pl-3 font-ddin text-xl font-bold text-p12-success lg:hidden">
                    {invitationCount}
                  </p>
                </div>
              </Button>
            )}
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
                          setLocalStorage(STORAGE_KEY.INVITE_TIPS_CLICK, true);
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
