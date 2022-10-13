import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BigNumber } from '@ethersproject/bignumber';
import { useAccount, useNetwork, useSignTypedData, useSwitchNetwork } from 'wagmi';
import OMGPredictionDialog from './OMGPredictionDialog';
import { PredictionAnswerParams, PredictionItemData } from '../../../lib/types';
import { objectSortByKey } from '../../../utils';
import { ARCANA_CHAIN_ID } from '../../../constants';
import {
  arcanaGenesisNFTHolderAtom,
  arcanaObserverAtom,
  arcanaPredictionAnswerAtom,
  arcanaPredictionOMGAnswerAtom,
  arcanaPredictionOMGSubmitAtom,
  PredictionAnswer,
} from '../../../store/arcana/state';
import { getArcanaSignTypeData, getIpfsAnswer } from '../../../utils/arcana';
import Message from '../../message';
import { useArcanaContract, useForwarderContract } from '../../../hooks/useContract';
import { useArcanaAnswer } from '../../../hooks/arcana';

type OMGPredictionProps = {
  item?: PredictionItemData;
  answer?: PredictionAnswer;
  votes?: number;
};

export default function OMGPrediction({ item, votes, answer }: OMGPredictionProps) {
  const [isSubmit, setIsSubmit] = useRecoilState(arcanaPredictionOMGSubmitAtom);
  const GAS_LIMIT = 200000;
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { mutateAsync } = useArcanaAnswer();
  const arcanaContract = useArcanaContract();
  const forwarderContract = useForwarderContract();
  const { signTypedDataAsync } = useSignTypedData();
  const isObserver = useRecoilValue(arcanaObserverAtom);
  const omgAnswer = useRecoilValue(arcanaPredictionOMGAnswerAtom);
  const predictionAnswer = useRecoilValue(arcanaPredictionAnswerAtom);
  const isGenesisNFTHolder = useRecoilValue(arcanaGenesisNFTHolderAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { switchNetwork, isLoading: isSwitchNetworkLoading } = useSwitchNetwork({ chainId: ARCANA_CHAIN_ID });
  const answerSelect = useMemo(() => {
    if (answer && answer.answer && answer.answer[0]) return answer.answer[0];
  }, [answer]);

  const onSignAnswer = async () => {
    if (!address || !chain) return;
    if (chain.id !== ARCANA_CHAIN_ID) {
      switchNetwork?.();
      return;
    }
    if (!answerSelect) return;
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
        setIsSubmit(true);
      });
      setIsLoading(false);
    } catch (e: any) {
      if (e.code === 4001) setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-[430px] rounded-lg">
      <div className="rounded-lg" style={{ background: 'linear-gradient(to bottom, #47505980 0%, #25293080 100%)' }}>
        {isSubmit ? (
          <div className="w-full">
            <div className="rounded-t-lg bg-gradient-prediction px-5 py-4">
              <p className="text-xl font-medium leading-6">{item?.predictionTitle}</p>
              <p className="text-sm">{item?.predictionFull}</p>
            </div>
            <div className="h-0.5 bg-p12-gradient"></div>
            <div className="mt-[60px] flex flex-col items-center justify-start">
              <div className="h-[200px] w-[200px] overflow-hidden rounded-lg">
                <img loading="lazy" className="h-full w-full object-cover" src={answerSelect?.img2} alt="select" />
              </div>
            </div>
            <div className="mt-3 flex h-[20px] flex-col items-center justify-around">
              <div className="text-lg font-medium leading-5">{answerSelect?.name}</div>
            </div>
            <div className="flex items-center justify-center pt-[60px] pb-[30px]">
              <div className="flex flex-1 flex-col items-center justify-center">
                <h3 className="text-sm font-medium">Total Tipsters</h3>
                <p className="font-ddin text-[30px] font-bold">{votes ?? 0}</p>
              </div>
              <div className="h-[46px] w-[2px] bg-[#474C55]/50"></div>
              <div className="flex flex-1 flex-col items-center justify-center">
                <h3 className="text-sm font-medium text-p12-gold">Prize</h3>
                <p className="flex items-center justify-center font-ddin text-[30px] font-bold text-p12-gold">$5000</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center px-7 py-[30px] pt-12">
            <p className="text-xl font-medium">{item?.predictionTitle}</p>
            <p className="text-sm">{item?.predictionFull}</p>
            <div
              className="relative mt-5 h-[200px] w-[200px] cursor-pointer overflow-hidden rounded-lg"
              onClick={() => {
                if (isObserver || !address || !isGenesisNFTHolder) return;
                setOpenDialog(true);
              }}
            >
              {answerSelect ? (
                <>
                  <div className="absolute top-0 left-0 z-10 h-full w-full hover:bg-white/10" />
                  <div className="flex h-full w-full items-center justify-center text-[82px] font-medium hover:bg-white/10">
                    <img loading="lazy" className="h-full w-full object-cover" src={answerSelect.img2} alt="select" />
                  </div>
                </>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-black/60 font-medium hover:bg-white/10">
                  <p className="text-[82px] leading-[82px]">?</p>
                  <p className="text-sm">Click to Answer</p>
                </div>
              )}
            </div>
            <div className="mt-3 flex h-[20px] flex-col items-center justify-around">
              <div className="text-lg font-medium leading-5">{answerSelect?.name}</div>
            </div>
            <div className="flex w-full items-center justify-center pt-[60px]">
              <div className="flex flex-1 flex-col items-center justify-center">
                <h3 className="text-sm font-medium">Total Tipsters</h3>
                <p className="font-ddin text-[30px] font-bold">{votes ?? 0}</p>
              </div>
              <div className="h-[46px] w-[2px] bg-[#474C55]/50"></div>
              <div className="flex flex-1 flex-col items-center justify-center">
                <h3 className="text-sm font-medium text-p12-gold">Prize</h3>
                <p className="flex items-center justify-center font-ddin text-[30px] font-bold text-p12-gold">$5000</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {!isSubmit && (
        <div className="mt-5">
          <div
            onClick={onSignAnswer}
            className={classNames(
              'dota__button dota__gold flex h-[50px] items-center justify-center text-xl',
              chain?.id === ARCANA_CHAIN_ID && !answerSelect ? 'dota__button--disable' : null,
            )}
          >
            {isSwitchNetworkLoading || isLoading ? (
              <img className="w-8 animate-spin" src="/img/arcana/loading_gold.svg" alt="loading" />
            ) : chain?.id === ARCANA_CHAIN_ID ? (
              'Submit'
            ) : (
              'Switch Network'
            )}
          </div>
        </div>
      )}
      <OMGPredictionDialog
        open={openDialog}
        options={item?.optionList}
        code={item?.predictionCode}
        title={item?.predictionTitle}
        subTitle={item?.predictionFull}
        onOpenChange={(op) => setOpenDialog(op)}
      />
    </div>
  );
}
