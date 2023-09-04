import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { useAccount, useNetwork } from 'wagmi';
import { useRouter } from 'next/router';
import { useIntersection } from 'react-use';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { openLink } from '../../utils';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useArcanaVotes } from '../../hooks/arcana';
import VoteRank from '../../components/arcana/VoteRank';
import StatusBar from '../../components/arcana/StatusBar';
import ArcanaNotConnect from '../../components/arcana/ArcanaNotConnect';
import Prediction from '../../components/arcana/Prediction';
import Participant from '../../components/arcana/Participant';
import Claim from '../../components/arcana/Claim';
import ArcanaRank from '../../components/arcana/ArcanaRank';
import OMGv1 from '../../components/arcana/OMG/OMGv1';
import OMGv2 from '../../components/arcana/OMG/OMGv2';
import { ARCANA_CHAIN_ID } from '../../constants';
import { arcanaObserverAtom, arcanaOriginAddressAtom } from '../../store/arcana/state';
import ArcanaSwitchNetwork from '../../components/arcana/ArcanaSwitchNetwork';
import SwiperInviteVote from '../../components/arcana/SwiperInviteVote';

import 'swiper/css';
import 'swiper/css/autoplay';

export default function Arcana() {
  const { address } = useAccount();
  const isMounted = useIsMounted();
  const { query } = useRouter();
  const { chain } = useNetwork();
  const isObserver = useRecoilValue(arcanaObserverAtom);
  const [originAddress, setOriginAddress] = useRecoilState(arcanaOriginAddressAtom);
  const setObserver = useSetRecoilState(arcanaObserverAtom);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, { threshold: 0.8 });
  const { data } = useArcanaVotes(originAddress ?? address);

  useEffect(() => {
    if (!intersection) return;
    const target = intersection.target as HTMLVideoElement;
    if (intersection.intersectionRatio > 0.8) {
      target.play().then();
      intersectionRef.current = null;
    }
  }, [intersection]);

  useEffect(() => {
    const { address } = query;
    if (typeof address === 'string') {
      setOriginAddress(address);
      setObserver(true);
    }
    if (typeof address === 'object') {
      setOriginAddress(address[0]);
      setObserver(true);
    }
  }, [query, setObserver, setOriginAddress]);

  return (
    <>
      <Head>
        <meta property="og:image" content="https://cdn1.p12.games/airdrop/poster/arcana_2.jpg" />
      </Head>
      <div className="pb-[110px] md:pb-0">
        <div className="absolute left-0 top-0 -z-10 flex h-[368px] w-full flex-col items-center justify-end overflow-hidden">
          <img src="/img/mask.webp" alt="mask" className="absolute top-0 left-0 hidden h-[430px] w-full md:block" />
          <div className="h-[368px] w-[1920px]">
            <video
              className="mx-auto h-[368px]"
              autoPlay
              muted
              loop
              poster="https://cdn1.p12.games/airdrop/arcana/banner_poster_4.webp"
            >
              <source src="https://cdn1.p12.games/airdrop/arcana/banner_4.webm" type="video/webm" />
            </video>
          </div>
        </div>
        <div className="mt-4 flex justify-between md:flex-col">
          <div className="flex flex-col justify-between gap-4 md:ml-2">
            <div>
              <h1 className="mt-4 font-['Henny_Penny'] text-[30px] leading-[40px]">P12 Arcana @ TI11</h1>
              <div className="mt-3 flex">
                <p
                  className="h-[22px] bg-[#7A3E1A] px-1.5 text-center text-xs leading-5"
                  style={{ boxShadow: 'inset 0 0 12px #220F04' }}
                >
                  Reward Claim
                </p>
                <p
                  className="h-[22px] bg-[#952E2F] px-4 text-center font-ddin text-xs font-bold leading-5"
                  style={{ textShadow: '0 0 4px rgba(0, 0, 0, 0.5)' }}
                >
                  11/4 - 11/30
                </p>
              </div>
            </div>
            <div>
              <SwiperInviteVote />
            </div>
          </div>
          <div className="flex max-w-[435px] flex-col items-center justify-items-start rounded-lg border-2 border-white/10 bg-[#474747]/20 px-8 backdrop-blur-2xl md:mt-12 xs:p-2">
            <h3 className="dota__yellow mt-5 text-xl leading-[44px]">Epic Prize Pool Sponsored by</h3>
            <img className="py-8 pt-5" src="https://cdn1.p12.games/airdrop/arcana/sponsor_logo_2.webp" alt="sponsor" />
          </div>
        </div>
        <div className="mt-5 flex gap-4 md:flex-col 2xl:gap-[30px]">
          <Participant />
          <VoteRank />
        </div>
        <div className="mt-5 flex gap-4 md:flex-col 2xl:gap-[30px]">
          <Claim data={data} />
          <ArcanaRank />
        </div>
        <div className="mt-6">
          {isMounted && (
            <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center md:relative">
              {address ? (
                <>
                  {data && !isObserver && chain?.id !== ARCANA_CHAIN_ID && <ArcanaSwitchNetwork />}
                  {data && <StatusBar data={data} />}
                </>
              ) : (
                <>
                  <div className="absolute z-30 flex h-full w-[750px] items-center justify-center bg-black/50 backdrop-blur md:w-full">
                    <ArcanaNotConnect />
                  </div>
                  <StatusBar />
                </>
              )}
            </div>
          )}
        </div>
        <div className="mt-6">
          <Prediction />
        </div>
        <div className="mt-12 md:mt-8">
          <OMGv1 />
        </div>
        <div className="mt-12 md:mt-8">
          <OMGv2 />
        </div>
        <div className="relative flex w-full items-end justify-center xs:mt-8">
          <h3 className="absolute top-12 text-[26px] font-medium">Engage in community</h3>
          <div className="-ml-8 max-w-[291px] cursor-pointer">
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
              className="mb-4 flex w-[108px] cursor-pointer items-center justify-center rounded-lg bg-gray-800/80 py-4 text-sm backdrop-blur hover:bg-gray-800"
              onClick={() => openLink('https://discord.gg/p12')}
            >
              <img className="mr-2" src="/img/discord.png" width={20} height={20} alt="" />
              Discord
            </div>
            <div
              className="mb-4 flex w-[108px] cursor-pointer items-center justify-center rounded-lg bg-gray-800/80 py-4 text-sm backdrop-blur hover:bg-gray-800"
              onClick={() => openLink('https://twitter.com/_p12_')}
            >
              <img className="mr-2" src="/img/twitter.png" width={20} height={20} alt="" />
              Twitter
            </div>
            <div
              className="flex w-[108px] cursor-pointer items-center justify-center rounded-lg bg-gray-800/80 py-4 text-sm backdrop-blur hover:bg-gray-800"
              onClick={() => openLink('https://mirror.xyz/p12.eth')}
            >
              <img className="mr-2" src="/img/mirror.png" width={20} height={20} alt="" />
              Mirror
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
