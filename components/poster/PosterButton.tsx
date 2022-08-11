import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLocalStorage } from '../../utils/storage';
import { useAccount } from 'wagmi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gamerClaimedPosterAtom } from '../../store/gamer/state';
import { posterBtnShowAtom, posterCaptureAtom } from '../../store/poster/state';
import { STORAGE_KEY } from '../../constants';

export default function PosterButton() {
  const { address } = useAccount();
  const [gamerClaimedPoster, setGamerClaimedPoster] = useRecoilState(gamerClaimedPosterAtom);
  const [show, setShow] = useRecoilState<boolean>(posterBtnShowAtom);
  const posterCapture = useRecoilValue(posterCaptureAtom);

  const onClick = () => {
    setGamerClaimedPoster(true);
    setShow(false);
  };

  useEffect(() => {
    const claimedMap = getLocalStorage(STORAGE_KEY.GAMER_CLAIMED_MAP) || {};
    if (address && claimedMap[address] && !gamerClaimedPoster) {
      setShow(true);
      return;
    }
    setShow(false);
  }, [address, gamerClaimedPoster, setShow]);

  return (
    <div className="relative">
      <div onClick={onClick} className="poster__button mr-3 h-[40px] cursor-pointer">
        <div className="flex h-full w-full items-center justify-center bg-p12-gradient-30 px-[18px] text-sm hover:bg-p12-gradient-45">
          <img src="/svg/picture.svg" width="24" height="24" className="mr-1 xs:hidden" alt="picture" /> My Poster
        </div>
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            className="absolute top-1/2 left-1/2 -z-[1] h-1/2 w-1/2"
            layoutId="sharing_poster"
          >
            <img className="h-full w-full" src={posterCapture} alt="poster" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
