import { STORAGE_KEY } from '@/constants';
import { invitationCountSelector, inviteModalAtom } from '@/store/invite/state';
import { openLink } from '@/utils';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { twMerge } from 'tailwind-merge';
import { BridgeSvg } from '../svg/BridgeSvg';
import { InviteSvg } from '../svg/InviteSvg';
import { LandingSiteSvg } from '../svg/LandingSiteSvg';

function LayoutHeaderExtra({ className }: { className?: string }) {
  const router = useRouter();
  const [tipsClick, setTipsClick] = useState(true);
  const setInviteOpen = useSetRecoilState(inviteModalAtom);
  const invitationCount = useRecoilValue(invitationCountSelector);
  const landingSite = 'https://p12.network';
  const hideRoute = ['/', '/arcana/[[...address]]', '/collab/qatar2022', '/bridge'];

  useEffect(() => {
    const currentStatus = getLocalStorage(STORAGE_KEY.INVITE_TIPS_CLICK);
    setTipsClick(currentStatus ?? false);
  }, []);

  return (
    <div className={twMerge('flex items-center gap-3', className)}>
      <div
        className="flex-center cursor-pointer gap-1 rounded-full bg-blue/20 px-3 py-2.5 text-base/5 font-medium text-blue hover:bg-blue/30 lg:hidden"
        onClick={() => openLink(landingSite)}
      >
        <LandingSiteSvg className="h-5 w-5 stroke-blue" />
        &nbsp;P12 Landingsite
      </div>
      <AnimatePresence>
        {!hideRoute.includes(router.pathname) && (
          <motion.div className="relative">
            <motion.div
              initial={{ opacity: 0.45 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              className="relative flex items-center"
            >
              <div
                className="flex-center cursor-pointer gap-1 rounded-full bg-blue/20 px-3 py-2.5 text-base/5 font-medium text-blue hover:bg-blue/30 lg:hidden xl:hidden"
                onClick={() => router.push('/bridge')}
              >
                <BridgeSvg className="h-5 w-5" />
                &nbsp;Bridge
              </div>
              {router.pathname !== '/gamer/[address]' && (
                <div
                  className="flex-center ml-3 h-10 cursor-pointer gap-1 rounded-full bg-blue/20 px-3 hover:bg-blue/30"
                  onClick={() => {
                    ReactGA.event({ action: 'Invite', category: 'Click', label: 'Header' });
                    setInviteOpen(true);
                  }}
                >
                  <div className="flex items-center justify-center text-base/5 font-medium text-blue">
                    <InviteSvg className="h-5 w-5 stroke-blue" />
                    &nbsp;My referral link
                    <p className="ml-3 border-l-2 border-blue/50 pl-3 font-ddin text-xl/6.5 font-bold text-green lg:hidden">
                      {invitationCount}
                    </p>
                  </div>
                </div>
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
