import React, { useRef } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { FloatingPortal, FloatingOverlay } from '@floating-ui/react-dom-interactions';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { gamerClaimedPosterAtom, gamerInfoAtom } from '../../store/gamer/state';
import { posterBtnShowAtom, posterCaptureAtom, posterStylesAtom } from '../../store/poster/state';
import { downloadImage } from '../../utils';
import Button from '../button';

export default function Card() {
  const ref = useRef(null);
  const [open, setOpen] = useRecoilState(gamerClaimedPosterAtom);
  const setPosterBtnShow = useSetRecoilState(posterBtnShowAtom);
  const posterCapture = useRecoilValue(posterCaptureAtom);
  const posterStyles = useRecoilValue(posterStylesAtom);
  const gamerInfo = useRecoilValue(gamerInfoAtom);

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
                gamerInfo?.nft_level && posterStyles[gamerInfo.nft_level].border,
                gamerInfo?.nft_level && posterStyles[gamerInfo.nft_level].shadow,
              )}
            >
              <div>
                <img src={posterCapture} alt="poster" className="w-full" />
              </div>
            </motion.div>
            <img
              className="absolute -right-12 top-0 cursor-pointer xs:fixed xs:right-0"
              src="/svg/close_circle.svg"
              onClick={() => {
                setPosterBtnShow(true);
                setOpen(false);
              }}
              alt="close"
            />
            <div className="absolute top-1/3 -right-[300px] flex flex-col items-center justify-center xs:fixed xs:top-[85vh] xs:left-0 xs:right-0">
              <Button type="gradient" style={{ width: 278 }} onClick={() => downloadImage(posterCapture)}>
                <div className="flex justify-center text-[18px] font-medium">
                  Save Image <img src="/svg/picture-2.svg" width="20" height="20" className="ml-2" alt="picture" />
                </div>
              </Button>
              <div className="mt-5 flex flex-col items-center xs:hidden">
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
          </div>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
}
