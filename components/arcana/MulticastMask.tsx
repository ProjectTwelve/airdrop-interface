import React, { SyntheticEvent } from 'react';
import { isMobile } from 'react-device-detect';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { useAccount, useNetwork, useSignMessage, useSwitchNetwork } from 'wagmi';
import GoldMulticastSVG from './StatusBar/GoldMulticastSVG';
import {
  arcanaMulticastCardAtom,
  arcanaMulticastVideoAtom,
  arcanaObserverAtom,
  arcanaSignBindAtom,
  arcanaVoteCountAtom,
} from '../../store/arcana/state';
import SilverMulticastSVG from './StatusBar/SilverMulticastSVG';
import { useArcanaAgent } from '../../hooks/arcana';
import { ARCANA_CHAIN_ID } from '../../constants';
import { useIsMounted } from '../../hooks/useIsMounted';

const multicastURL = 'https://cdn1.p12.games/airdrop/arcana/multicast.webm';
const tiURL = 'https://cdn1.p12.games/airdrop/arcana/international.webm';
const tiURLPoster = 'https://cdn1.p12.games/airdrop/arcana/international.webp';

export default function MulticastMask() {
  const { mutateAsync } = useArcanaAgent();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const isMounted = useIsMounted();
  const { switchNetworkAsync } = useSwitchNetwork({ chainId: ARCANA_CHAIN_ID });
  const { signMessageAsync } = useSignMessage({
    message: 'Sign to bind your wallet with specific agent wallet to finish gas free mint.',
  });
  const [signBind, setSignBind] = useRecoilState(arcanaSignBindAtom);
  const isObserver = useRecoilValue(arcanaObserverAtom);
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
    if (!signBind && !isObserver) setMulticastCard(true);
  };

  const onSignBindClick = async () => {
    try {
      if (!address || !chain) return;
      if (chain.id !== ARCANA_CHAIN_ID) {
        await switchNetworkAsync?.();
      }
      const signature = await signMessageAsync();
      const res = await mutateAsync({ walletAddress: address, signature });
      if (res.data) {
        setMulticastCard(false);
        setSignBind(true);
      }
    } catch (e) {
      console.log('error: ', e);
    }
  };

  if (!isMounted) return null;

  if (!multicastVideo && !multicastCard) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg">
      <AnimatePresence>
        {multicastVideo && (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.65 }}
            className="fixed inset-0 z-10 flex items-center justify-center"
          >
            <div className="-ml-[140px]">
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
            <div className="flex items-center justify-center gap-[60px] md:flex-col md:gap-4">
              {isMobile ? (
                <div>{voteCount >= 15 ? <GoldMulticastSVG votes={voteCount} /> : <SilverMulticastSVG votes={voteCount} />}</div>
              ) : (
                <div>
                  {voteCount >= 15 ? (
                    <GoldMulticastSVG votes={voteCount} width={320} height={454} />
                  ) : (
                    <SilverMulticastSVG votes={voteCount} width={320} height={454} />
                  )}
                </div>
              )}
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }}
                  className="text-xl leading-[36px] text-p12-gold xs:text-base"
                >
                  01. This is your Multicast Votes need Activate.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 1 } }}
                  className="text-xl leading-[36px] text-p12-gold xs:text-base"
                >
                  02. Invite friends to get more Votes!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 1.5 } }}
                  className="text-xl leading-[36px] text-p12-gold xs:text-base"
                >
                  03. More Votes, more bounties.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 2 } }}
                  className="dota__button dota__gold mt-12 h-[50px] w-[320px] text-center text-xl leading-[50px] md:mt-4 xs:mx-auto"
                  onClick={onSignBindClick}
                >
                  Click to Activate
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
