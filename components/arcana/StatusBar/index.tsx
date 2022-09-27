import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import { isIOS, isMobile } from 'react-device-detect';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import InfoCard from './InfoCard';
import MainCard from './MainCard';
import EasterEgg from './EasterEgg';
import Message from '../../message';
import SwiperCard from './SwiperCard';
import { openLink } from '../../../utils';
import { useArcanaAnswer } from '../../../hooks/arcana';
import { ArcanaVotes, PredictionAnswerParams } from '../../../lib/types';
import {
  arcanaMulticastCardAtom,
  arcanaMulticastVideoAtom,
  arcanaObserverAtom,
  arcanaPredictionAnswerAtom,
  arcanaSignBindAtom,
  arcanaUnSubmitAtom,
  arcanaVoteCountAtom,
} from '../../../store/arcana/state';

type StatusBarProps = {
  data?: ArcanaVotes;
};

export default function StatusBar({ data }: StatusBarProps) {
  const [level, setLevel] = useState<number>(30);
  const { address } = useAccount();
  const isObserver = useRecoilValue(arcanaObserverAtom);
  const setVoteCount = useSetRecoilState(arcanaVoteCountAtom);
  const setMulticastVideo = useSetRecoilState(arcanaMulticastVideoAtom);
  const setMulticastCard = useSetRecoilState(arcanaMulticastCardAtom);
  const predictionAnswer = useRecoilValue(arcanaPredictionAnswerAtom);
  const signBind = useRecoilValue(arcanaSignBindAtom);
  const [unSubmit, setUnSubmit] = useRecoilState(arcanaUnSubmitAtom);
  const [easterEggShow, setEasterEggShow] = useState<boolean>(false);
  const { mutateAsync, isLoading } = useArcanaAnswer();

  const onLevelClick = () => {
    if (level === 30) return;
    setEasterEggShow(true);
  };

  const onSubmitPrediction = () => {
    if (!address || isLoading) return;
    const params: PredictionAnswerParams = [];
    predictionAnswer.forEach((item) => {
      if (item.answer && item.answer.length > 0) {
        params.push({
          walletAddress: address,
          predictionCode: item.predictionCode,
          answer: item.answer,
        });
      }
    });
    mutateAsync(params).then(({ code, msg }) => {
      if (code !== 200) {
        toast.error(<Message message={msg} title="Ah shit, here we go again" />);
        return;
      }
      setUnSubmit(false);
      toast.success(<Message message="Submitted !" title="Mission Complete" />);
    });
  };

  useEffect(() => {
    const random = Math.random();
    if (random < 0.3) return setLevel(1);
    if (random < 0.6) return setLevel(25);
    setLevel(30);
  }, []);

  useEffect(() => {
    if (!data) return;
    setVoteCount(data.userVotes.votesTotalCurrent);
    if (!signBind) {
      if (isMobile && isIOS) {
        setMulticastCard(true);
        return;
      }
      // TODO: add video
      // setMulticastVideo(true);
    }
  }, [data, setMulticastCard, setMulticastVideo, setVoteCount, signBind]);

  return (
    <>
      {isObserver && data && (
        <div className="absolute -top-16 z-20 mx-auto flex text-sm md:fixed md:bottom-4 md:top-auto">
          <div className="dota__box px-4 py-3 xs:px-2 xs:py-1.5">
            You are visiting <span className="text-p12-link">{data?.userInfo.personName}</span> &apos;s Voting page
          </div>
          <button className="dota__button dota__gold px-4 xs:px-2" onClick={() => openLink(window.location.origin + '/arcana')}>
            Back to my Votes
          </button>
        </div>
      )}
      {unSubmit && (
        <div className="absolute -top-16 z-20 mx-auto flex text-xs md:fixed md:bottom-4 md:top-auto">
          <div className="dota__box flex items-center justify-center p-1.5">
            <p className="pl-3">
              You have <span className="font-medium text-p12-gold">unsubmitted</span> Votes
            </p>
            <button className="dota__button dota__gold ml-4 h-[34px] px-4 text-xs xs:px-1.5" onClick={onSubmitPrediction}>
              {isLoading ? <img className="mx-auto animate-spin" src="/img/arcana/loading_gold.svg" alt="loading" /> : 'Submit'}
            </button>
          </div>
        </div>
      )}
      <EasterEgg level={level} show={easterEggShow} onMaskClick={() => setEasterEggShow(false)} />
      <div className="flex w-[1000px] md:hidden">
        <InfoCard onLevelClick={onLevelClick} level={level} data={data?.userInfo} />
        <MainCard data={data?.userVotes} userInfo={data?.userInfo} nftLevel={data?.userInfo.nftLevel} />
        <SwiperCard data={data?.memeEvaluate} />
      </div>
      <div className="hidden w-full overflow-x-scroll bg-[url('/img/arcana/statusbar/center.webp')] bg-cover bg-no-repeat md:block">
        <div>
          <div className="flex justify-between">
            <InfoCard onLevelClick={onLevelClick} level={level} data={data?.userInfo} />
            <SwiperCard data={data?.memeEvaluate} />
          </div>
          <MainCard data={data?.userVotes} userInfo={data?.userInfo} nftLevel={data?.userInfo.nftLevel} />
        </div>
      </div>
    </>
  );
}
