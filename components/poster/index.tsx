import React, { useRef } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
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
    <div>
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'grid',
            placeItems: 'center',
            background: 'rgba(12, 12, 12, 0.60)',
            backdropFilter: 'blur(20px)',
            zIndex: 30,
          }}
        >
          <div className="relative">
            <motion.div
              ref={ref}
              id="sharing-poster"
              layoutId="sharing_poster"
              className={classNames(
                'h-[800px] w-[375px] overflow-hidden rounded-2xl',
                gamerInfo?.nft_level && posterStyles[gamerInfo.nft_level].border,
                gamerInfo?.nft_level && posterStyles[gamerInfo.nft_level].shadow,
              )}
            >
              <img src={posterCapture} alt="poster" className="h-full w-full" />
            </motion.div>
            <img
              className="absolute -right-12 top-0 cursor-pointer"
              src="/svg/close_circle.svg"
              onClick={() => {
                setPosterBtnShow(true);
                setOpen(false);
              }}
              alt="close"
            />
            <div className="absolute top-1/3 -right-[300px]">
              <Button type="gradient" style={{ width: 278 }} onClick={() => downloadImage(posterCapture)}>
                <div className="flex justify-center text-[18px] font-medium">
                  Save Image <img src="/svg/picture-2.svg" width="20" height="20" className="ml-2" alt="picture" />
                </div>
              </Button>
              <div className="mt-5 flex flex-col items-center">
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
        </div>
      )}
    </div>
  );
}
