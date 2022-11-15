import React, { useEffect, useMemo, useState } from 'react';
import ReactGA from 'react-ga4';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import Message from '../message';
import { getEtherscanLink } from '../../utils';
import { ARCANA_CHAIN_ID } from '../../constants';
import PredictionDialog from './PredictionDialog';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useCollabContract } from '../../hooks/useContract';
import { PredictionItem, PredictionOption, predictions } from './predictions';

type PredictionProps = {
  deadline?: number;
  signature?: string;
};
export default function Prediction({ signature, deadline }: PredictionProps) {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const isMounted = useIsMounted();
  const collabContract = useCollabContract();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [answer, setAnswer] = useState<PredictionOption | undefined>(undefined);
  const [prediction, setPrediction] = useState<PredictionItem | undefined>(undefined);
  const { switchNetwork, isLoading: isSwitchNetworkLoading } = useSwitchNetwork({ chainId: ARCANA_CHAIN_ID });

  const submitStatus = useMemo(() => {
    return !!(address && signature);
  }, [address, signature]);

  const onDialogClick = () => {
    setOpenDialog(true);
  };

  const onSubmit = async () => {
    if (!prediction || !chain || !address || !signature || !collabContract || isLoading || isSubmitted) return;
    try {
      setIsLoading(true);
      ReactGA.event({ category: 'qatar', action: 'Click', label: 'quizsub' });
      const { wait } = await collabContract['saveStamp(string,string,uint256,bytes)'](
        'qatar2022',
        prediction.ipfs,
        deadline,
        signature,
      );
      const { transactionHash } = await wait();
      toast.success(
        <Message
          title="Mission Complete"
          message={
            <div>
              <p>Submitted</p>
              <p>
                <a className="text-p12-link" target="_blank" href={getEtherscanLink(transactionHash, 'transaction')}>
                  View on Etherscan
                </a>
              </p>
            </div>
          }
        />,
      );
      setIsLoading(false);
      setIsSubmitted(true);
    } catch (error: any) {
      if (error.error && error.error.data) {
        const sigHash = error.error.data.data;
        const name = collabContract.interface.getError(sigHash).name;
        toast.error(<Message title="Ah shit, here we go again" message={name} />);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!collabContract) return;
    collabContract
      .readStamp(address, 'qatar2022')
      .then((res: string | undefined) => {
        if (res) {
          const key = res.split('ipfs://')[1];
          const item = predictions[key];
          setPrediction(item);
          setAnswer(item.answer);
          setIsSubmitted(true);
        } else {
          const keys = Object.keys(predictions);
          setPrediction(predictions[keys[Math.floor(Math.random() * 4)]]);
          setAnswer(undefined);
          setIsSubmitted(false);
        }
      })
      .catch((error: any) => {
        console.error(error);
        const keys = Object.keys(predictions);
        setPrediction(predictions[keys[Math.floor(Math.random() * 4)]]);
        setAnswer(undefined);
        setIsSubmitted(false);
      });
  }, [collabContract, address]);

  if (!isMounted) return null;

  return (
    <div className="qatar__box mx-auto mt-4 flex max-w-[840px] gap-12 p-6 md:flex-col md:items-center md:gap-4 md:p-3">
      <div className="relative h-[230px] w-[230px] cursor-pointer overflow-hidden rounded-lg" onClick={onDialogClick}>
        {answer ? (
          <div
            className="h-full pt-11 text-center font-medium"
            style={{ background: 'linear-gradient(180deg, #3D444B80 0%, #23262C80 100%)' }}
          >
            <div className="mx-auto h-[123px] w-[185px] text-center">
              <img loading="lazy" width={185} className="rounded" src={answer?.img} alt="select" />
            </div>
            <p className="mt-7 text-center text-lg font-medium leading-5">{answer?.name}</p>
          </div>
        ) : (
          <div className="flex h-full w-full animate-omg flex-col items-center justify-center bg-black/60 font-medium hover:bg-white/10">
            <p className="text-[70px] leading-[84px]">?</p>
            <p className="text-sm">Click to Answer</p>
          </div>
        )}
      </div>
      <div className="relative w-full flex-1">
        <h3 className="text-center text-2xl leading-7">{prediction?.title}</h3>
        <p className="mt-2 text-center text-xs leading-4">{prediction?.subTitle}</p>
        {submitStatus ? (
          chain?.id !== ARCANA_CHAIN_ID ? (
            <button
              className="qatar__button absolute bottom-0 w-full py-3 md:relative md:mt-6"
              onClick={() => switchNetwork?.()}
            >
              {isSwitchNetworkLoading ? (
                <img className="mx-auto animate-spin" src="/svg/loading.svg" alt="loading" />
              ) : (
                'Switch Network'
              )}
            </button>
          ) : (
            <button
              className={classNames(
                'absolute bottom-0 w-full py-3 md:relative md:mt-6',
                !isSubmitted && answer ? 'qatar__button' : 'qatar__button--disable',
              )}
              onClick={onSubmit}
            >
              {isLoading ? (
                <img className="mx-auto animate-spin" src="/svg/loading.svg" alt="loading" />
              ) : isSubmitted ? (
                'Submitted'
              ) : (
                'Submit'
              )}
            </button>
          )
        ) : (
          <button className="qatar__button--disable absolute bottom-0 w-full py-3 md:relative md:mt-6">Submit</button>
        )}
      </div>
      <PredictionDialog
        onSelect={(item) => setAnswer(item)}
        title={prediction?.title}
        subTitle={prediction?.subTitle}
        options={prediction?.options}
        open={openDialog}
        onOpenChange={(op) => setOpenDialog(op)}
      />
    </div>
  );
}
