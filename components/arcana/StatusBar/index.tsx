import React, { useCallback, useEffect, useState } from 'react';
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
  const { switchNetworkAsync } = useSwitchNetwork({ chainId: ARCANA_CHAIN_ID });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isObserver = useRecoilValue(arcanaObserverAtom);
  const arcanaContract = useArcanaContract();
  const forwarderContract = useForwarderContract();
  const { signTypedDataAsync } = useSignTypedData();
  const predictionAnswer = useRecoilValue(arcanaPredictionAnswerAtom);
  const [unSubmit, setUnSubmit] = useRecoilState(arcanaUnSubmitAtom);
  const [easterEggShow, setEasterEggShow] = useState<boolean>(false);
  const { mutateAsync } = useArcanaAnswer();

  const onLevelClick = () => {
    if (level === 30) return;
    setEasterEggShow(true);
  };

  const onSignAnswer = useCallback(async () => {
    if (!address) return;
    try {
      const answers: PredictionAnswer[] = [];
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
        toast.success(<Message message="Submitted !" title="Mission Complete" />);
      });
      setIsLoading(false);
    } catch (e: any) {
      if (e.code === 4001) setIsLoading(false);
    }
  }, [
    address,
    arcanaContract.populateTransaction,
    forwarderContract,
    mutateAsync,
    predictionAnswer,
    setUnSubmit,
    signTypedDataAsync,
  ]);

  useEffect(() => {
    const random = Math.random();
    if (random < 0.3) return setLevel(1);
    if (random < 0.6) return setLevel(25);
    setLevel(30);
  }, []);

  useEffect(() => {
    if (!chain || !isLoading) return;
    if (chain.id !== ARCANA_CHAIN_ID) {
      switchNetworkAsync?.().catch((e) => e.code === 4001 && setIsLoading(false));
      return;
    }
    onSignAnswer().then();
  }, [chain, isLoading, onSignAnswer, switchNetworkAsync]);

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
            <button className="dota__button dota__gold ml-4 h-[34px] px-4 text-xs xs:px-1.5" onClick={() => setIsLoading(true)}>
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
