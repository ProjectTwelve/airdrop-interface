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
import BlueButton from '../button/BlueButton';

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
      <BlueButton
        type="blue"
        className="flex-center gap-1 rounded-full px-3 py-2.5 text-base/5 font-medium lg:hidden"
        onClick={() => openLink(landingSite)}
      >
        <LandingSiteSvg className="h-5 w-5 stroke-blue" />
        &nbsp;P12 Landingsite
      </BlueButton>
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
              <BlueButton
                type="blue"
                className="flex-center mr-3 gap-1 rounded-full px-3 py-2.5 text-base/5 font-medium lg:hidden xl:hidden"
                onClick={() => router.push('/bridge')}
              >
                <BridgeSvg className="h-5 w-5" />
                &nbsp;Bridge
              </BlueButton>

              {router.pathname !== '/gamer/[address]' && (
                <BlueButton
                  type="blue"
                  className="flex-center h-10 gap-1 rounded-full text-base/5 font-medium lg:hidden xl:hidden"
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
                </BlueButton>
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
