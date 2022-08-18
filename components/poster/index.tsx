import React, { useEffect, useRef } from 'react';
import ReactGA from 'react-ga4';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { FloatingPortal, FloatingOverlay } from '@floating-ui/react-dom-interactions';
import { gamerClaimedPosterAtom } from '../../store/gamer/state';
import Button from '../button';
import { downloadImage } from '../../utils';
import { GamerInfoData } from '../../lib/types';
import { posterBtnShowAtom, posterCaptureAtom, posterStylesAtom } from '../../store/poster/state';

export default function Poster({ gamerInfo }: { gamerInfo?: GamerInfoData }) {
  const ref = useRef(null);
  const router = useRouter();
  const [open, setOpen] = useRecoilState(gamerClaimedPosterAtom);
  const setPosterBtnShow = useSetRecoilState(posterBtnShowAtom);
  const posterCapture = useRecoilValue(posterCaptureAtom);
  const posterStyles = useRecoilValue(posterStylesAtom);

  useEffect(() => {
    if (open) {
      ReactGA.event({ category: 'Poster', action: 'Click', label: 'show' });
    }
  }, [open]);

  return (
    <FloatingPortal>
      {open && (
        <FloatingOverlay lockScroll className="z-30 grid place-items-center bg-p12-dialog backdrop-blur-lg">
          <div className="relative">
            <motion.div
              ref={ref}
              id="sharing-poster"
              layoutId="sharing_poster"
              className={classNames(
                'max-h-[100vh] w-[375px] overflow-y-scroll rounded-2xl',
                posterStyles[gamerInfo?.nft_level || 0].border,
                posterStyles[gamerInfo?.nft_level || 0].shadow,
              )}
            >
              <div>
                <img src={posterCapture} alt="poster" className="w-full" />
              </div>
            </motion.div>
            <img
              className="absolute -right-12 top-0 cursor-pointer sm:fixed sm:right-0"
              src="/svg/close_circle.svg"
              onClick={() => {
                setPosterBtnShow(true);
                setOpen(false);
              }}
              alt="close"
            />
            {router.pathname !== '/gamer/[address]' && (
              <div className="absolute top-1/2 -right-[300px] flex -translate-y-1/2 flex-col items-center justify-center sm:fixed sm:top-[85vh] sm:left-0 sm:right-0 sm:translate-y-0">
                <Button
                  type="gradient"
                  style={{ width: 278 }}
                  onClick={() => {
                    ReactGA.event({ category: 'Poster', action: 'Click', label: 'save' });
                    downloadImage(posterCapture);
                  }}
                >
                  <div className="flex justify-center text-[18px] font-medium">
                    Save Image <img src="/svg/picture-2.svg" width="20" height="20" className="ml-2" alt="picture" />
                  </div>
                </Button>
                <div className="mt-5 flex flex-col items-center sm:hidden">
                  <p>Share with your friends</p>
                  <div className="mt-2 grid grid-cols-3 gap-3">
                    <a href="https://discord.gg/p12" target="_blank">
                      <img className="inline h-5 w-5" src="/img/discord.png" width={20} height={20} alt="discord" />
                    </a>
                    <a href="https://twitter.com/home" target="_blank">
                      <img className="inline h-5 w-5" src="/img/twitter.png" width={20} height={20} alt="twitter" />
                    </a>
                    <a href="https://www.facebook.com/" target="_blank">
                      <img className="inline h-5 w-5" src="/img/facebook.png" width={20} height={20} alt="facebook" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
}
