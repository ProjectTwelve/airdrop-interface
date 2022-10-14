import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { toast } from 'react-toastify';
import { BigNumber } from '@ethersproject/bignumber';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAccount, useNetwork, useSignTypedData, useSwitchNetwork } from 'wagmi';
import InfoCard from './InfoCard';
import MainCard from './MainCard';
import EasterEgg from './EasterEgg';
import Message from '../../message';
import SwiperCard from './SwiperCard';
import { ARCANA_CHAIN_ID } from '../../../constants';
import { useArcanaAnswer } from '../../../hooks/arcana';
import { objectSortByKey, openLink } from '../../../utils';
import { ArcanaVotes, PredictionAnswerParams } from '../../../lib/types';
import { useArcanaContract, useForwarderContract } from '../../../hooks/useContract';
import { getArcanaSignTypeData, getIpfsAnswer } from '../../../utils/arcana';
import {
  arcanaObserverAtom,
  arcanaPredictionAnswerAtom,
  arcanaPredictionOMGAnswerAtom,
  arcanaUnSubmitAtom,
  PredictionAnswer,
} from '../../../store/arcana/state';

type StatusBarProps = {
  data?: ArcanaVotes;
};

export default function StatusBar({ data }: StatusBarProps) {
  const GAS_LIMIT = 200000;
  const [level, setLevel] = useState<number>(30);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork, isLoading: isSwitchNetworkLoading } = useSwitchNetwork({ chainId: ARCANA_CHAIN_ID });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isObserver = useRecoilValue(arcanaObserverAtom);
  const arcanaContract = useArcanaContract();
  const forwarderContract = useForwarderContract();
  const { signTypedDataAsync } = useSignTypedData();
  const omgAnswer = useRecoilValue(arcanaPredictionOMGAnswerAtom);
  const predictionAnswer = useRecoilValue(arcanaPredictionAnswerAtom);
  const [unSubmit, setUnSubmit] = useRecoilState(arcanaUnSubmitAtom);
  const [easterEggShow, setEasterEggShow] = useState<boolean>(false);
  const { mutateAsync } = useArcanaAnswer();

  useEffect(() => {
    if (unSubmit) {
      window.onbeforeunload = (event) => {
        event.preventDefault();
        event.returnValue = 'Do you really want to leave?';
        return 'Do you really want to leave?';
      };
    } else {
      window.onbeforeunload = null;
    }
  }, [unSubmit]);

  const onLevelClick = () => {
    ReactGA.event({ category: 'Arcana-Info', action: 'Click', label: 'Easter-Egg' });
    if (level === 30) return;
    setEasterEggShow(true);
  };

  const onSignAnswer = async () => {
    if (!address || !chain) return;
    if (chain.id !== ARCANA_CHAIN_ID) {
      switchNetwork?.();
      return;
    }
    try {
      setIsLoading(true);
      const answers: PredictionAnswer[] = [];
      omgAnswer.forEach((item) => {
        if (item.answer && item.answer.length > 0) {
          answers.push({ predictionCode: item.predictionCode, answer: [objectSortByKey(item.answer[0])] });
        }
      });
      predictionAnswer.forEach((item) => {
        if (item.answer && item.answer.length > 0) {
          answers.push({ predictionCode: item.predictionCode, answer: [objectSortByKey(item.answer[0])] });
        }
      });
      const hash = await getIpfsAnswer({ answers });
      const ipfsURL = 'ipfs://' + hash;
      const tx = await arcanaContract.populateTransaction.updateAnswerUri(BigNumber.from(address), ipfsURL);
      const nonce = await forwarderContract.getNonce(address);
      tx.gasLimit = tx.gasLimit || GAS_LIMIT;
      const signature = await signTypedDataAsync(getArcanaSignTypeData(forwarderContract, tx, nonce));
      const params: PredictionAnswerParams = {
        walletAddress: address,
        ipfsUrl: ipfsURL,
        nonce: nonce.toString(),
        signature,
        txData: tx.data,
        gasLimit: tx.gasLimit,
        answers,
      };
      mutateAsync(params).then(({ code, msg }) => {
        if (code !== 200) {
          toast.error(<Message message={msg} title="Ah shit, here we go again" />);
          return;
        }
        setUnSubmit(false);
        toast.success(<Message message="Submitted" title="Mission Complete" />);
      });
      setIsLoading(false);
    } catch (e: any) {
      if (e.code === 4001) setIsLoading(false);
    }
  };

  useEffect(() => {
    const random = Math.random();
    if (random < 0.3) return setLevel(1);
    if (random < 0.6) return setLevel(25);
    setLevel(30);
  }, []);

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
        <div className="absolute -top-16 z-30 mx-auto flex text-sm md:fixed md:bottom-4 md:top-auto">
          <div className="dota__box px-4 py-3 xs:px-2 xs:py-1.5">
            You have <span className="font-medium text-p12-gold">unsubmitted</span> Votes
          </div>
          <button className="dota__button dota__gold px-4 xs:px-2" onClick={onSignAnswer}>
            {isLoading || isSwitchNetworkLoading ? (
              <img className="mx-auto animate-spin" src="/img/arcana/loading_gold.svg" alt="loading" />
            ) : chain?.id === ARCANA_CHAIN_ID ? (
              'Submit'
            ) : (
              'Switch Network'
            )}
          </button>
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
