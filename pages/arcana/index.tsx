import React from 'react';
import { useAccount } from 'wagmi';
import ArcanaNotConnect from '../../components/arcana/ArcanaNotConnect';
import ArcanaNotNFTHolder from '../../components/arcana/ArcanaNotNFTHolder';
import CardVotingEntry from '../../components/arcana/CardVotingEntry';
import CardReferral from '../../components/arcana/CardReferral';
import CardGuide from '../../components/arcana/CardGuide';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useArcanaGamerInfo } from '../../hooks/arcana';
import PredictionItem from '../../components/arcana/PredictionItem';
import Dialog from '../../components/dialog';
import Button from '../../components/button';
import ArcanaJoinButton from '../../components/arcana/ArcanaJoinButton';

export default function Arcana() {
  const { address } = useAccount();
  const isMounted = useIsMounted();
  const { data, isLoading } = useArcanaGamerInfo(address);

  return (
    <div>
      <div className="absolute left-0 top-0 -z-10 flex h-[430px] w-full flex-col items-center justify-end overflow-hidden">
        <div className="h-[430px] w-[1920px]">
          <video autoPlay muted loop>
            <source src="https://cdn1.p12.games/airdrop/arcana/banner.webm" type="video/webm" />
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
        <div className="flex max-w-[500px] flex-col items-center justify-items-start rounded-2xl border-2 border-white/10 bg-[#474747]/20 p-4 backdrop-blur-lg">
          <video autoPlay muted loop>
            <source src="https://cdn1.p12.games/airdrop/arcana/text.webm" type="video/webm" />
          </video>
          <img className="mb-4" src="/img/present.png" alt="present" />
        </div>
      </div>
      <div className="mt-12 xs:mt-8">
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
      <div className="mt-[60px] mb-8 xs:mt-8">
        <h2 className="text-center text-[30px] font-medium">Arcana</h2>
        <div className="relative mt-7 flex justify-center">
          <div className="z-[4] w-[580px]">
            <PredictionItem selected />
          </div>
          <div className="absolute z-[3] w-[580px] -translate-x-[140px] scale-[90%] blur-sm">
            <PredictionItem />
          </div>
          <div className="absolute z-[2] w-[580px] -translate-x-[280px] scale-[80%] blur">
            <PredictionItem />
          </div>
          <div className="absolute w-[580px] -translate-x-[420px] scale-[70%] blur-lg">
            <PredictionItem />
          </div>
          <div className="absolute z-[3] w-[580px] translate-x-[140px] scale-[90%] blur-sm">
            <PredictionItem />
          </div>
          <div className="absolute z-[2] w-[580px] translate-x-[280px] scale-[80%] blur">
            <PredictionItem />
          </div>
          <div className="absolute w-[580px] translate-x-[420px] scale-[70%] blur-lg">
            <PredictionItem />
          </div>
        </div>
      </div>
    </div>
  );
}
