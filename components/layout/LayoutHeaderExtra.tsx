import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { openLink } from '@/utils';
import { useRouter } from 'next/router';
import Button from '@/components/button';
import { STORAGE_KEY } from '@/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';
import { invitationCountSelector, inviteModalAtom } from '@/store/invite/state';

function LayoutHeaderExtra() {
  const router = useRouter();
  const [tipsClick, setTipsClick] = useState(true);
  const setInviteOpen = useSetRecoilState(inviteModalAtom);
  const invitationCount = useRecoilValue(invitationCountSelector);
  const readmeLink = 'https://github.com/ProjectTwelve/airdrop-interface#readme';
  const landingSite = 'https://p12.network';
  const hideRoute = ['/', '/arcana/[[...address]]', '/collab/qatar2022', '/bridge'];

  useEffect(() => {
    const currentStatus = getLocalStorage(STORAGE_KEY.INVITE_TIPS_CLICK);
    setTipsClick(currentStatus ?? false);
  }, []);

  return (
    <div className="flex">
      <Button type="bordered" className="mr-3 lg:hidden" onClick={() => openLink(landingSite)}>
        <div className="flex items-center justify-center text-sm">
          <img src="/svg/landing.svg" width={24} height={24} alt="landing_site" />
          &nbsp;P12 Landingsite
        </div>
      </Button>
      <AnimatePresence>
        {!hideRoute.includes(router.pathname) && (
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
              {router.pathname !== '/gamer/[address]' && (
                <Button
                  type="bordered"
                  onClick={() => {
                    ReactGA.event({ action: 'Invite', category: 'Click', label: 'Header' });
                    setInviteOpen(true);
                  }}
                >
                  <div className="flex items-center justify-center text-sm">
                    <img src="/svg/invite.svg" width={24} height={24} alt="invite" />
                    &nbsp;My referral link
                    <p className="ml-3 border-l-2 border-gray-600 pl-3 font-ddin text-xl font-bold text-green lg:hidden">
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
                          className="cursor-pointer text-blue"
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
    </div>
  );
}

export default React.memo(LayoutHeaderExtra);
