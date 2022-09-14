import React, { useEffect, useRef } from 'react';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { useIntersection } from 'react-use';
import Dialog from '../../components/dialog';
import Button from '../../components/button';
import { openLink } from '../../utils';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useArcanaGamerInfo } from '../../hooks/arcana';
import CardGuide from '../../components/arcana/CardGuide';
import CardReferral from '../../components/arcana/CardReferral';
import PredictionItem from '../../components/arcana/PredictionItem';
import CardVotingEntry from '../../components/arcana/CardVotingEntry';
import ArcanaNotConnect from '../../components/arcana/ArcanaNotConnect';
import ArcanaJoinButton from '../../components/arcana/ArcanaJoinButton';
import ArcanaNotNFTHolder from '../../components/arcana/ArcanaNotNFTHolder';

export default function Arcana() {
  const { address } = useAccount();
  const isMounted = useIsMounted();
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, { threshold: 0.8 });
  const { data, isLoading } = useArcanaGamerInfo(address);

  useEffect(() => {
    if (!intersection) return;
    const target = intersection.target as HTMLVideoElement;
    if (intersection.intersectionRatio > 0.8) {
      target.play().then();
      intersectionRef.current = null;
    }
  }, [intersection]);

  return (
    <div>
      <div className="fixed left-0 top-0 z-50 flex h-[30px] w-full flex-col items-center">
        <motion.div
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full min-w-[1920px] bg-[url('/img/arcana/top_loading_bg.png')] bg-cover md:min-w-[1152px]"
        >
          <video autoPlay muted loop poster="/img/arcana/top_loading.jpg">
            <source src="/img/arcana/top_loading.webm" type="video/webm" />
          </video>
        </motion.div>
      </div>
      <div className="absolute left-0 top-0 -z-10 flex h-[430px] w-full flex-col items-center justify-end overflow-hidden">
        <img src="/img/mask.webp" alt="mask" className="absolute top-0 left-0 hidden h-[430px] w-full md:block" />
        <div className="h-[430px] w-[1920px]">
          <video autoPlay muted loop poster="https://cdn1.p12.games/airdrop/arcana/banner.png">
            <source src="https://cdn1.p12.games/airdrop/arcana/banner_3.webm" type="video/webm" />
          </video>
        </div>
      </div>
      <div className="mt-6 flex justify-between md:flex-col">
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="mt-2">
              <img width={315} src="/img/arcana/p12_arcana.png" alt="p12_arcana" />
            </h1>
            <Dialog
              render={({ close }) => (
                <div className="w-[480px]">
                  <h2 className="border-b border-p12-line pb-8 text-center text-xl">Treasure Chest</h2>
                  <p className="py-8 text-sm leading-6">
                    Unlock the splendid Treasure Chest prepared by P12 and sponsors! Super-duper rare drop list for every DotA
                    Fans! Join the Vote To Earn Campaign to support your favourite team, heroes in TI 11 and many more!
                  </p>
                  <div className="flex justify-end">
                    <Button onClick={close} type="bordered">
                      Confirm
                    </Button>
                  </div>
                </div>
              )}
            >
              <p className="mt-2 cursor-pointer text-sm text-p12-link">Learn More</p>
            </Dialog>
          </div>
          <div className="py-2">
            <ArcanaJoinButton />
          </div>
        </div>
        <div className="flex max-w-[500px] flex-col items-center justify-items-start rounded-lg border-2 border-white/10 bg-[#474747]/20 py-2 px-8 backdrop-blur-2xl md:mt-12 xs:p-2">
          <video autoPlay muted loop poster="https://cdn1.p12.games/airdrop/arcana/text_2.webp">
            <source src="https://cdn1.p12.games/airdrop/arcana/text_2.webm" type="video/webm" />
          </video>
          <img src="/img/present.webp" alt="present" />
        </div>
      </div>
      <div className="mt-14 xs:mt-8">
        {isMounted && address ? (
          isLoading ? (
            <div className="flex h-[255px] flex-col items-center justify-center rounded-2xl bg-p12-black/80 backdrop-blur">
              <img className="animate-spin" src="/svg/loading.svg" width={48} height={48} alt="loading" />
            </div>
          ) : data ? (
            <div className="grid grid-cols-3 gap-7 md:grid-cols-1 md:gap-4">
              <CardVotingEntry data={data} />
              <CardReferral />
              <CardGuide />
            </div>
          ) : (
            <ArcanaNotNFTHolder />
          )
        ) : (
          <ArcanaNotConnect />
        )}
      </div>
      <div className="mt-[60px] xs:mt-8">
        <h2 className="text-center text-[30px] font-medium">Arcana</h2>
        <div className="relative mt-7 flex justify-center overflow-hidden">
          <div className="z-[4] w-[580px]">
            <PredictionItem selected />
          </div>
          <div className="absolute z-[3] w-[580px] -translate-x-[140px] scale-[90%] opacity-[90%] blur-sm">
            <PredictionItem />
          </div>
          <div className="absolute z-[2] w-[580px] -translate-x-[280px] scale-[80%] opacity-[85%] blur">
            <PredictionItem />
          </div>
          <div className="absolute w-[580px] -translate-x-[420px] scale-[70%] opacity-[80%] blur-lg">
            <PredictionItem />
          </div>
          <div className="absolute z-[3] w-[580px] translate-x-[140px] scale-[90%] opacity-[90%] blur-sm">
            <PredictionItem />
          </div>
          <div className="absolute z-[2] w-[580px] translate-x-[280px] scale-[80%] opacity-[85%] blur">
            <PredictionItem />
          </div>
          <div className="absolute w-[580px] translate-x-[420px] scale-[70%] opacity-[80%] blur-lg">
            <PredictionItem />
          </div>
        </div>
      </div>
      <div className="relative mt-[60px] flex w-full items-end justify-center xs:mt-8">
        <h3 className="absolute top-[60px] text-[30px] font-medium">Join P12 Community</h3>
        <div className="-ml-8 max-w-[340px] cursor-pointer">
          <video
            muted
            poster="https://cdn1.p12.games/airdrop/arcana/abaddon.png"
            ref={intersectionRef}
            onClick={(event) => (event.target as HTMLVideoElement).play()}
          >
            <source src="https://cdn1.p12.games/airdrop/arcana/abaddon.webm" type="video/webm" />
          </video>
        </div>
        <div className="mb-8">
          <div
            className="mb-5 flex w-[126px] cursor-pointer items-center justify-center rounded-lg bg-p12-black/80 py-4 backdrop-blur hover:bg-p12-black"
            onClick={() => openLink('https://discord.gg/p12')}
          >
            <img className="mr-2" src="/img/discord.png" width={24} height={24} alt="" />
            Discord
          </div>
          <div
            className="mb-5 flex w-[126px] cursor-pointer items-center justify-center rounded-lg bg-p12-black/80 py-4 backdrop-blur hover:bg-p12-black"
            onClick={() => openLink('https://twitter.com/_p12_')}
          >
            <img className="mr-2" src="/img/twitter.png" width={24} height={24} alt="" />
            Twitter
          </div>
          <div
            className="flex w-[126px] cursor-pointer items-center justify-center rounded-lg bg-p12-black/80 py-4 backdrop-blur hover:bg-p12-black"
            onClick={() => openLink('https://mirror.xyz/p12.eth')}
          >
            <img className="mr-2" src="/img/mirror.png" width={24} height={24} alt="" />
            Mirror
          </div>
        </div>
      </div>
    </div>
  );
}
