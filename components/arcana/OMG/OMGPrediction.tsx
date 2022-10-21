import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { BigNumber } from '@ethersproject/bignumber';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useAccount, useNetwork, useSignTypedData, useSwitchNetwork } from 'wagmi';
import Message from '../../message';
import { objectSortByKey } from '../../../utils';
import { ARCANA_CHAIN_ID } from '../../../constants';
import { useArcanaAnswer } from '../../../hooks/arcana';
import OMGPredictionDialog from './OMGPredictionDialog';
import {
  arcanaGenesisNFTHolderAtom,
  arcanaInviteDialogAtom,
  arcanaObserverAtom,
  arcanaOmgInviteCountAtom,
  arcanaPredictionAnswerAtom,
  arcanaPredictionOMGAnswerAtom,
  arcanaPredictionOMGSubmitAtom,
  PredictionAnswer,
} from '../../../store/arcana/state';
import { getArcanaSignTypeData, getIpfsAnswer } from '../../../utils/arcana';
import { PredictionAnswerParams, PredictionItemData } from '../../../lib/types';
import { useArcanaContract, useForwarderContract } from '../../../hooks/useContract';

type OMGPredictionProps = {
  isEnd?: boolean;
  item?: PredictionItemData;
  answer?: PredictionAnswer;
  votes?: number;
};

export default function OMGPrediction({ item, isEnd, votes, answer }: OMGPredictionProps) {
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
  const omgCount = useRecoilValue(arcanaOmgInviteCountAtom);
  const setInviteDialog = useSetRecoilState(arcanaInviteDialogAtom);
  const predictionAnswer = useRecoilValue(arcanaPredictionAnswerAtom);
  const isGenesisNFTHolder = useRecoilValue(arcanaGenesisNFTHolderAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { switchNetwork, isLoading: isSwitchNetworkLoading } = useSwitchNetwork({ chainId: ARCANA_CHAIN_ID });
  const answerSelect = useMemo(() => {
    if (answer && answer.answer && answer.answer[0]) return answer.answer[0];
  }, [answer]);

  const onDialogClick = () => {
    if (isObserver || !address || !isGenesisNFTHolder || isEnd) return;
    setOpenDialog(true);
  };

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
        toast.success(<Message message="Congratulations! Invite friends for more bounties!" title="Mission Complete" />);
        setIsSubmit(true);
      });
      setIsLoading(false);
    } catch (e: any) {
      if (e.code === 4001) setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-[412px]">
      {isSubmit || isEnd ? (
        <div className="h-full rounded-lg" style={{ background: 'linear-gradient(to bottom, #00000000 0%, #25293080 100%)' }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-[136px] bg-omg-count bg-cover">
              <p className="mt-[28px] text-center text-sm font-medium">My OMG Invitees</p>
              <p className="mt-[20px] text-center font-ddin text-[36px] font-semibold text-p12-gold">{omgCount.inviteCount}</p>
            </div>
            <div className="h-[136px] bg-omg-count bg-cover">
              <p className="mt-[28px] text-center text-sm font-medium">Votes from invitees</p>
              <p className="mt-[20px] text-center font-ddin text-[36px] font-semibold text-p12-gold">{omgCount.inviteVotes}</p>
            </div>
          </div>
          <div className="mt-5 text-center text-sm text-p12-gold">Increase probability of winning by</div>
          <div className="px-4 pt-3 xs:p-3">
            <div
              onClick={() => setInviteDialog(true)}
              className="dota__button dota__gold flex h-[44px] items-center justify-center "
            >
              + OMG Invites
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full rounded-lg" style={{ background: 'linear-gradient(to bottom, #47505980 0%, #25293080 100%)' }}>
          <div className="flex pl-4 pt-6 xs:pl-3 xs:pt-3">
            <div className="relative h-[140px] w-[140px] cursor-pointer overflow-hidden rounded-lg" onClick={onDialogClick}>
              {answerSelect ? (
                <>
                  <div className="absolute inset-0 left-0 top-0 z-20 hover:bg-[#FFFFFF]/10"></div>
                  <div className="absolute bottom-0 z-10 flex h-[34px] w-full items-end bg-gradient-to-b from-black/0 to-black">
                    <p className="mb-2.5 w-full text-center text-xs font-medium">{answerSelect.name}</p>
                  </div>
                  <div className="flex h-full w-full items-center justify-center text-[82px] font-medium hover:bg-white/10">
                    <img loading="lazy" className="h-full w-full object-cover" src={answerSelect.img2} alt="select" />
                  </div>
                </>
              ) : (
                <div className="flex h-full w-full animate-omg flex-col items-center justify-center bg-black/60 font-medium hover:bg-white/10">
                  <p className="text-[70px] leading-[72px]">?</p>
                  <p className="text-xs">Click to Answer</p>
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="text-center font-medium">{item?.predictionTitle}</div>
                <div className="text-center text-xs leading-4">{item?.predictionFull}</div>
              </div>
              <div className="flex w-full items-center justify-center">
                <div className="flex flex-1 flex-col items-center justify-center">
                  <h3 className="text-xs font-medium">Total Tipsters</h3>
                  <p className="font-ddin text-[26px] font-bold">{votes ?? 0}</p>
                </div>
                <div className="h-[46px] w-[2px] bg-[#474C55]/50"></div>
                <div className="flex flex-1 flex-col items-center justify-center">
                  <h3 className="text-xs font-medium text-p12-gold">Prize</h3>
                  <p className="flex items-center justify-center font-ddin text-[26px] font-bold text-p12-gold">$10000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 pt-6 xs:p-3">
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
