import React, { SyntheticEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import GoldMulticastSVG from './StatusBar/GoldMulticastSVG';
import {
  arcanaMulticastCardAtom,
  arcanaMulticastVideoAtom,
  arcanaSignBindAtom,
  arcanaVoteCountAtom,
} from '../../store/arcana/state';
import SilverMulticastSVG from './StatusBar/SilverMulticastSVG';

const multicastURL = 'https://cdn1.p12.games/airdrop/arcana/multicast.webm';
const tiURL = 'https://cdn1.p12.games/airdrop/arcana/international.webm';
const tiURLPoster = 'https://cdn1.p12.games/airdrop/arcana/international.webp';

export default function MulticastMask() {
  const [signBind, setSignBind] = useRecoilState(arcanaSignBindAtom);
  const voteCount = useRecoilValue(arcanaVoteCountAtom);
  const [multicastVideo, setMulticastVideo] = useRecoilState(arcanaMulticastVideoAtom);
  const [multicastCard, setMulticastCard] = useRecoilState(arcanaMulticastCardAtom);
  const controls = useAnimationControls();

  const onMulticastVideoTimeUpdate = (event: SyntheticEvent<HTMLVideoElement>) => {
    if (event.currentTarget.currentTime > 1) {
      controls.start({ scale: 1 }).then();
    }
  };

  const onMulticastVideoEnded = () => {
    setMulticastVideo(false);
    if (!signBind) setMulticastCard(true);
  };

  if (!multicastVideo && !multicastCard) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg">
      <AnimatePresence>
        {multicastVideo && (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.65 }}
            className="fixed inset-0 z-10 flex items-center justify-center"
          >
            <div className="-ml-[120px]">
              <video
                className="max-h-[500px]"
                onTimeUpdate={onMulticastVideoTimeUpdate}
                autoPlay
                muted
                src={multicastURL}
                onEnded={onMulticastVideoEnded}
              />
            </div>
            <div>
              <motion.p
                animate={controls}
                initial={{ scale: 0 }}
                className="jus mt-14 flex flex-none items-center justify-center font-['Permanent_Marker'] text-[136px] text-[#FDC36D] md:mt-[10vw] md:text-[14vw]"
              >
                <span className="text-[72px] text-[#FDC36D] md:text-[8vw]">x</span> {voteCount}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {multicastCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.65 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="fixed inset-0 z-20 flex flex-col items-center justify-center"
          >
            <div className="mb-8 md:mb-4">
              <video autoPlay muted loop src={tiURL} poster={tiURLPoster} />
            </div>
            {voteCount >= 15 ? (
              <GoldMulticastSVG votes={voteCount} width={320} height={454} />
            ) : (
              <SilverMulticastSVG votes={voteCount} width={320} height={454} />
            )}
            <div
              className="dota__button dota__gold mt-12 h-[50px] w-[320px] text-center text-xl leading-[50px] md:mt-4"
              onClick={() => {
                setMulticastCard(false);
                setSignBind(true);
              }}
            >
              Click to Activate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
