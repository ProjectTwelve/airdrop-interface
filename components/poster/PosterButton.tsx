import { EventCategory, EventName } from '@/constants/event';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAccount } from 'wagmi';
import { STORAGE_KEY } from '../../constants';
import { gamerClaimedPosterAtom } from '../../store/gamer/state';
import { posterBtnShowAtom, posterCaptureAtom } from '../../store/poster/state';
import { getLocalStorage } from '../../utils/storage';

export default function PosterButton() {
  const { address } = useAccount();
  const router = useRouter();
  const [gamerClaimedPoster, setGamerClaimedPoster] = useRecoilState(gamerClaimedPosterAtom);
  const [show, setShow] = useRecoilState<boolean>(posterBtnShowAtom);
  const posterCapture = useRecoilValue(posterCaptureAtom);

  const onClick = () => {
    ReactGA.event({ category: EventCategory.Assets, action: EventName.MyPoster });
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
          <img src="/svg/picture.svg" width="24" height="24" className="mr-1" alt="picture" />
          {router.pathname === '/gamer/[address]' ? 'Poster' : 'My Poster'}
        </div>
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            className="absolute left-1/2 top-1/2 -z-[1] h-1/2 w-1/2"
            layoutId="sharing_poster"
          >
            <img className="h-full w-full" src={posterCapture} alt="poster" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
