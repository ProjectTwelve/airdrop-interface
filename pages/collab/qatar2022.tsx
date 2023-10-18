import React from 'react';
import ReactGA from 'react-ga4';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { openLink } from '../../utils';
import { GAMER_BADGES } from '../../constants';
import Reward from '../../components/qatar/Reward';
import useExternal from '../../hooks/useExternal';
import { fetchWorldCupUserInfo } from '../../lib/api';
import { useIsMounted } from '../../hooks/useIsMounted';
import HolderItem from '../../components/qatar/HolderItem';
import Prediction from '../../components/qatar/Prediction';

export default function Qatar2022() {
  const { address } = useAccount();
  const isMounted = useIsMounted();
  useExternal('https://widget.gleamjs.io/e.js', { type: 'js', js: { async: true } });
  const { data } = useQuery(['invitation_count', address], () => fetchWorldCupUserInfo(address), {
    enabled: !!address,
    select: (data) => (data.code === 200 ? data.data : undefined),
  });
  const onMoreClick = () => {
    ReactGA.event({ action: 'qatar', category: 'Click', label: 'more' });
    openLink('https://dappbay.bnbchain.org/campaign/football-fiesta');
  };

  return (
    <>
      <div className="md:px-2">
        <div className="absolute left-0 top-0 -z-10 flex h-[420px] w-full flex-col items-center justify-center overflow-hidden">
          <img src="/img/mask.webp" alt="mask" className="absolute left-0 top-0 hidden h-[420px] w-full md:block" />
          <div className="h-[420px] w-[1920px]">
            <img width={1440} className="mx-auto" src="https://cdn1.p12.games/airdrop/collab/qatar_banner3.webp" alt="banner" />
          </div>
        </div>
        <div>
          <h1 className="mt-12 text-[36px] font-semibold leading-9">BNB Chain Football Fiesta @ P12</h1>
          <div className="mt-3 flex gap-3">
            <p className="rounded-full bg-[#494E69]/60 px-3 text-xs leading-5">Low-threshold</p>
            <p className="rounded-full bg-[#494E69]/60 px-3 text-xs leading-5">On-chain Quiz</p>
          </div>
          <div className="mt-6 max-w-[538px] text-xs leading-5">
            P12 x BNB Chain Football Fiesta Campaign is a pop-up quiz event featuring footballs and tournaments! Participates by
            taking part in interesting but yet simple quizzes and earn exclusive rewards sponsored by P12!
            &nbsp;&nbsp;&nbsp;&nbsp;
            <p className="inline cursor-pointer text-blue" onClick={onMoreClick}>
              More <img className="mb-[1px] inline" width={12} height={12} src="/svg/more.svg" alt="more" />
            </p>
          </div>
          <div className="flex items-center justify-between pb-14 pt-10 md:flex-col md:items-start md:py-6">
            <div className="font-semibold leading-9 text-green md:text-sm">
              Reward: &nbsp;&nbsp;P12 x BNB Chain Football Fiesta OAT
            </div>
            <div className="text-sm leading-5 text-[#A5A6AB] md:text-xs">Time: 2022.11.15 - 2022.12.20</div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-medium leading-6">How to Participate</h2>
          <div className="mt-4 grid grid-cols-2 gap-8 md:grid-cols-1">
            <HolderItem
              link="https://dappbay.bnbchain.org/topic/23-glory-pass-rewards-you-cant-miss"
              asset={<img src="https://cdn1.p12.games/airdrop/collab/glory_pass2.png" alt="glory_pass" />}
              type="glory-pass"
              title="BNB Chain Glory Pass Holder"
              subtitle="Pre-Requisite I"
              isHolder={data?.ownedNft && data.ownedNft.length > 0}
            />
            {isMounted && (
              <HolderItem
                link="https://assets.p12.games/dashboard#gamer"
                asset={
                  data?.genesisNftLevel ? (
                    <img src={GAMER_BADGES[data?.genesisNftLevel].imgBig} alt="glory_pass" />
                  ) : (
                    <img src={GAMER_BADGES[0].imgBig} className="grayscale" alt="glory_pass" />
                  )
                }
                type="genesis"
                title="P12 Genesis NFT Holder"
                subtitle="Pre-Requisite II"
                isHolder={!!data?.genesisNftHolder}
              />
            )}
          </div>
        </div>
        <div className="mt-12">
          <h2 className="mx-auto max-w-[840px] text-xl font-medium leading-6">Step I: Gleam Task</h2>
          <div className="qatar__box qatar__box--inner relative mx-auto mt-4 max-w-[840px]">
            <a
              className="e-widget no-button"
              href="https://gleam.io/iqYmU/p12-x-bnb-chain-football-fiesta-giveaway"
              rel="nofollow"
            >
              P12 x BNB Chain Football Fiesta Giveaway
            </a>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="mx-auto max-w-[840px] text-xl font-medium leading-6">Step II: Quick Quiz</h2>
          <Prediction signature={data?.answerSignature} deadline={data?.deadline} />
        </div>
        <div className="mt-12">
          <Reward />
        </div>
      </div>
    </>
  );
}
