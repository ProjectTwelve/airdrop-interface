import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { useIntersection } from 'react-use';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { openLink } from '../../utils';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useArcanaVotes } from '../../hooks/arcana';
import StatusBar from '../../components/arcana/StatusBar';
import ArcanaNotConnect from '../../components/arcana/ArcanaNotConnect';
import ArcanaJoinButton from '../../components/arcana/ArcanaJoinButton';
import ArcanaNotNFTHolder from '../../components/arcana/ArcanaNotNFTHolder';
import Participant from '../../components/arcana/Participant';
import ArcanaProgress from '../../components/arcana/ArcanaProgress';
import Prediction from '../../components/arcana/Prediction';
import { arcanaObserverAtom, arcanaOriginAddressAtom } from '../../store/arcana/state';
import MulticastMask from '../../components/arcana/MulticastMask';

export default function Arcana() {
  const { address } = useAccount();
  const isMounted = useIsMounted();
  const { query } = useRouter();
  const [originAddress, setOriginAddress] = useRecoilState(arcanaOriginAddressAtom);
  const setObserver = useSetRecoilState(arcanaObserverAtom);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, { threshold: 0.8 });
  const { data, isLoading } = useArcanaVotes(originAddress ?? address);

  useEffect(() => {
    if (!intersection) return;
    const target = intersection.target as HTMLVideoElement;
    if (intersection.intersectionRatio > 0.8) {
      target.play().then();
      intersectionRef.current = null;
    }
  }, [intersection]);

  useEffect(() => {
    if (query.address) {
      setOriginAddress(query.address as string);
      setObserver(true);
    }
  }, [query, setObserver, setOriginAddress]);

  return (
    <>
      <Head>
        <meta property="og:image" content="https://cdn1.p12.games/airdrop/poster/arcana.jpeg" />
      </Head>
      <div className="pb-[110px] md:pb-0">
        <div className="absolute left-0 top-0 -z-10 flex h-[430px] w-full flex-col items-center justify-end overflow-hidden">
          <img src="/img/mask.webp" alt="mask" className="absolute top-0 left-0 hidden h-[430px] w-full md:block" />
          <div className="h-[430px] w-[1920px]">
            <video autoPlay muted loop poster="https://cdn1.p12.games/airdrop/arcana/banner.png">
              <source src="https://cdn1.p12.games/airdrop/arcana/banner_3.webm" type="video/webm" />
            </video>
          </div>
        </div>
        <div className="mt-6 flex justify-between md:flex-col">
          <div className="flex flex-col justify-between md:ml-2">
            <h1 className="mt-4 font-['Henny_Penny'] text-[36px]">P12 Arcana @ TI11</h1>
            <div className="py-2">
              <ArcanaJoinButton />
            </div>
          </div>
          <div className="flex max-w-[500px] flex-col items-center justify-items-start rounded-lg border-2 border-white/10 bg-[#474747]/20 py-2 px-8 backdrop-blur-2xl md:mt-12 xs:p-2">
            <video autoPlay muted loop poster="https://cdn1.p12.games/airdrop/arcana/text_2.webp">
              <source src="https://cdn1.p12.games/airdrop/arcana/text_2.webm" type="video/webm" />
            </video>
            <img className="py-6" src="https://cdn1.p12.games/airdrop/arcana/sponsor_logo.webp" alt="sponsor" />
          </div>
        </div>
        <div className="mt-16 md:mt-8">
          <Participant />
        </div>
        <div className="mt-16 md:mt-8">
          <ArcanaProgress />
        </div>
        <div className="mt-14 xs:mt-8">
          <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center md:relative">
            {!data && (
              <div className="absolute z-30 flex h-full w-[1000px] items-center justify-center bg-black/50 backdrop-blur md:w-full">
                {isMounted && address ? (
                  isLoading ? (
                    <img className="animate-spin" src="/svg/loading.svg" width={48} height={48} alt="loading" />
                  ) : (
                    <ArcanaNotNFTHolder />
                  )
                ) : (
                  <ArcanaNotConnect />
                )}
              </div>
            )}
            <StatusBar data={data} />
          </div>
        </div>
        <div className="mt-16 md:mt-8">
          <Prediction />
        </div>
        <div className="relative mt-[60px] flex w-full items-end justify-center xs:mt-8">
          <h3 className="absolute top-[60px] text-[30px] font-medium">Engage in community</h3>
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
        <MulticastMask />
      </div>
    </>
  );
}
