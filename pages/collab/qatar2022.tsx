import ReactGA from 'react-ga4';
import { openLink } from '../../utils';
import HolderItem from '../../components/qatar/HolderItem';
import Prediction from '../../components/qatar/Prediction';
import Reward from '../../components/qatar/Reward';
import Script from 'next/script';

export default function Qatar2022() {
  const onMoreClick = () => {
    ReactGA.event({ category: 'qatar', action: 'Click', label: 'more' });
    openLink('https://p12.network');
  };

  return (
    <>
      <Script id="gleamjs" async={true} src="https://widget.gleamjs.io/e.js" strategy="lazyOnload" />
      <div className="md:px-2">
        <div className="absolute left-0 top-0 -z-10 flex h-[420px] w-full flex-col items-center justify-center overflow-hidden">
          <div className="h-[420px] w-[1920px]">
            <img width={1440} className="mx-auto" src="https://cdn1.p12.games/airdrop/collab/qatar_banner.webp" alt="banner" />
          </div>
        </div>
        <div>
          <h1 className="mt-12 text-[36px] font-semibold leading-9">BNB Chain Football Fiesta @ P12</h1>
          <div className="mt-3 flex gap-3">
            <p className="rounded-full bg-[#494E69]/60 px-3 text-xs leading-5">Low-threshold</p>
            <p className="rounded-full bg-[#494E69]/60 px-3 text-xs leading-5">On-chain Quiz</p>
          </div>
          <div className="mt-6 max-w-[538px] text-xs leading-5">
            P12 x BNBChain Football Fiesta Campaign is a pop-up quiz event featuring footballs and tournaments! Participates by
            taking part in interesting but yet simple quizzes and earn exclusive rewards sponsored by P12!
            &nbsp;&nbsp;&nbsp;&nbsp;
            <p className="inline cursor-pointer text-p12-link" onClick={onMoreClick}>
              More <img className="mb-[1px] inline" width={12} height={12} src="/svg/more.svg" alt="more" />
            </p>
          </div>
          <div className="flex items-center justify-between pt-10 pb-14 md:flex-col md:items-start md:py-6">
            <div className="font-semibold leading-9 text-p12-success md:text-sm">
              Reward: &nbsp;&nbsp;P12 x BNB Chain Football Fiesta OAT
            </div>
            <div className="text-sm leading-5 text-[#A5A6AB] md:text-xs">Time：2022.11.15 - 2022.12.20</div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-medium leading-6">How to Participate</h2>
          <div className="mt-4 grid grid-cols-2 gap-8 md:grid-cols-1">
            <HolderItem />
            <HolderItem />
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
          <Prediction />
        </div>
        <div className="mt-12">
          <div className="mx-auto flex max-w-[840px] items-center justify-between md:flex-col md:items-start">
            <h2 className="text-xl font-medium leading-6">Reward</h2>
            <div className="flex items-center justify-center">
              <p className="text-sm font-medium leading-[14px]">Ready to Claim</p>
              <p
                className="ml-3 bg-clip-text font-ddin text-2xl font-bold leading-6 text-transparent"
                style={{ backgroundImage: 'linear-gradient(180deg, #FFFDD6 0%, #C8A16F 100%)' }}
              >
                5d 2h
              </p>
            </div>
          </div>
          <Reward />
        </div>
      </div>
    </>
  );
}
