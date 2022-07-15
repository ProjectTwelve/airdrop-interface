import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLocalStorage } from '../../utils/storage';
import { useAccount } from 'wagmi';
import { useRecoilState } from 'recoil';
import { gamerClaimedPosterAtom } from '../../store/gamer/state';
import { posterBtnShowAtom } from '../../store/poster/state';

export default function PosterButton() {
  const { data: account } = useAccount();
  const [gamerClaimedPoster, setGamerClaimedPoster] = useRecoilState(gamerClaimedPosterAtom);
  const [show, setShow] = useRecoilState<boolean>(posterBtnShowAtom);

  const onClick = () => {
    setGamerClaimedPoster(true);
    setShow(false);
  };

  useEffect(() => {
    const claimedMap = getLocalStorage('gamer_claimed_map') || {};
    const address = account?.address;
    if (address && claimedMap[address] && !gamerClaimedPoster) {
      setShow(true);
      return;
    }
    setShow(false);
  }, [account?.address, gamerClaimedPoster, setShow]);

  return (
    <div className="relative">
      <div onClick={onClick} className="poster__button mr-3 h-[40px] cursor-pointer">
        <div className="flex h-full w-full items-center justify-center bg-p12-gradient-30 px-[18px] text-sm hover:bg-p12-gradient-45">
          <img src="/svg/picture.svg" width="24" height="24" className="mr-1" alt="picture" /> My Poster
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
            <div className="h-full w-full bg-card-0 bg-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
