import React from 'react';
import { useRouter } from 'next/router';
import Button from '../button';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { inviteModalAtom } from '../../store/invite/state';
import Dialog from '../dialog';
import RoadmapDialog from './RoadmapDialog';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from 'react-use';

function LayoutHeaderExtra() {
  const router = useRouter();
  const [tipsClick, setTipsClick] = useLocalStorage<boolean>('invite_tips_click', false);
  const [, setOpen] = useRecoilState(inviteModalAtom);
  const whitepaperLink = 'https://github.com/ProjectTwelve/whitepaper/blob/main/P12-Whitepaper-v0.1.pdf';

  if (router.pathname === '/developer') {
    return (
      <div className="relative flex gap-3">
        <Button type="bordered" onClick={() => window.open(whitepaperLink)}>
          <div className="flex items-center justify-center gap-2 text-sm font-bold">
            <Image src="/svg/whitepaper.svg" width={24} height={24} alt="whitepaper" />
            Whitepaper
          </div>
        </Button>
        <Dialog render={({ close }) => <RoadmapDialog close={close} />}>
          <Button type="bordered">
            <div className="flex items-center justify-center gap-2 text-sm font-bold">
              <Image src="/svg/roadmap.svg" width={24} height={24} alt="roadmap" />
              Roadmap
            </div>
          </Button>
        </Dialog>
        <Button type="bordered" onClick={() => setOpen(true)}>
          <div className="flex items-center justify-center gap-2 text-sm font-bold">
            <Image src="/svg/invite.svg" width={24} height={24} alt="invite" />
            My invite address
          </div>
        </Button>
        <AnimatePresence>
          {!tipsClick && (
            <motion.div
              initial={{ right: 0, opacity: 0, scale: 0.85 }}
              animate={{ right: -200, opacity: 1, scale: 1 }}
              exit={{ right: 0, opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="backdrop-box absolute -top-1/2 w-[190px] rounded-lg text-xs"
            >
              <div className="p-4">
                Share your invite address and get rewards
                <div className="mt-2 flex justify-end">
                  <div className="cursor-pointer text-p12-link" onClick={() => setTipsClick(true)}>
                    I got it
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  return null;
}

export default React.memo(LayoutHeaderExtra);
