import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useAccount } from 'wagmi';
import { useRecoilValue } from 'recoil';
import { openLink } from '../../utils';
import { PredictionItemData } from '../../lib/types';
import { useArcanaUnlock } from '../../hooks/arcana';
import PredictionItemDialog from './PredictionItemDialog';
import { arcanaGenesisNFTHolderAtom, arcanaObserverAtom, PredictionAnswer } from '../../store/arcana/state';

type PredictionItemProps = {
  data?: PredictionItemData;
  answer?: PredictionAnswer;
  votes?: number;
};

export enum PREDICTION_TYPE {
  TEAM = 'team',
  PLAYER = 'player',
  HERO = 'hero',
  CARD = 'card',
}

export default function PredictionItem({ data, votes, answer }: PredictionItemProps) {
  const isObserver = useRecoilValue(arcanaObserverAtom);
  const isGenesisNFTHolder = useRecoilValue(arcanaGenesisNFTHolderAtom);
  const { address } = useAccount();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isTimeLock, setIsTimeLock] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [durationTime, setDurationTime] = useState<string>('');
  const [item, setItem] = useState<PredictionItemData | undefined>(data);
  const { mutateAsync, isLoading } = useArcanaUnlock();
  const answerSelect = useMemo(() => {
    if (answer && answer.answer && answer.answer[0]) return answer.answer[0];
  }, [answer]);

  const onUnlock = () => {
    if (isObserver || !address || !item || isLoading) return;
    mutateAsync({ walletAddress: address, predictionCode: item.predictionCode }).then((res) => {
      if (res.data) {
        setItem((status) => {
          if (!status) return undefined;
          return { ...status, ifLock: false };
        });
      } else {
        openLink(item.taskUrl);
      }
    });
  };

  const onSelect = () => {
    if (isObserver || !address || !item || isEnd || !isGenesisNFTHolder) return;
    setOpenDialog(true);
  };

  useEffect(() => {
    if (!item?.releaseDate) return;
    const releaseDate = dayjs.unix(item.releaseDate);
    const endDate = dayjs.unix(item.endDate);
    const currentDate = dayjs();
    if (currentDate < releaseDate) {
      setIsTimeLock(true);
      const diffHours = releaseDate.diff(currentDate, 'hour');
      if (diffHours > 48) return setDurationTime(`${Math.floor(diffHours / 60)} Days`);
      if (diffHours > 24) return setDurationTime(`1 Day`);
      if (diffHours > 1) return setDurationTime(`${diffHours} Hrs`);
      return setDurationTime(`<1 Hour`);
    }
    if (currentDate > endDate) {
      setIsEnd(true);
    }
  }, [item?.endDate, item?.releaseDate]);

  return (
    <div className="relative">
      {!item && (
        <div className="absolute inset-0 top-0 left-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-black/40 backdrop-blur-lg" />
      )}
      {isTimeLock && (
        <div className="absolute inset-0 top-0 left-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-black/40 backdrop-blur-lg">
          <p className="text-xl text-p12-gold">Prize of this Tip</p>
          <p className="flex items-center justify-center font-ddin text-[52px] font-bold text-p12-gold">
            <img className="mr-1 w-10" src="/img/arcana/usdc.svg" alt="usdc" />
            {item?.currentPrice}
          </p>
          <div className="text-xl text-p12-success"> {durationTime} to Unlock</div>
        </div>
      )}
      <div
        className="flex h-full flex-col rounded-2xl backdrop-blur-lg"
        style={{ background: 'linear-gradient(to bottom, #3D444B80 0%, #23262C80 100%)' }}
      >
        <div className="border-b-none flex items-center justify-items-start rounded-t-2xl border-2 border-b-0 border-[#6F778480] bg-gradient-prediction p-5 backdrop-blur-lg">
          <div className="h-[38px] w-[38px] rounded-full">
            <img src={item?.sponsorLogo} className="h-full w-full object-cover" alt="p12" />
          </div>
          <div className="ml-3">
            <p className="text-sm">
              <span className="font-medium text-p12-link">{item?.sponsorName}</span>&nbsp; sponsored this prediction
            </p>
            <p className="text-sm text-p12-orange">{item?.meme}</p>
          </div>
        </div>
        <div className="h-0.5 bg-p12-gradient"></div>
        <div className="relative flex flex-1 flex-col items-center py-6">
          {!isTimeLock && item?.ifLock && (
            <div className="absolute inset-0 top-0 left-0 z-20 flex flex-col items-center justify-center rounded-b-2xl bg-[url('/img/arcana/lock_mask.webp')] bg-cover bg-no-repeat">
              <p className="text-xl text-p12-gold">Prize of this Tip</p>
              <p className="flex items-center justify-center font-ddin text-[52px] font-bold text-p12-gold">
                <img className="mr-1 w-10" src="/img/arcana/usdc.svg" alt="usdc" />
                {item?.currentPrice}
              </p>
              <div className="mt-[100px]">Finish task on Quest3 to Unlock</div>
              <div className="mt-4 w-full px-7">
                <button className="dota__button w-full py-3 text-xl" onClick={onUnlock}>
                  <div className="dota__gold h-[28px]">
                    {isLoading ? (
                      <img className="mx-auto h-full animate-spin" src="/img/arcana/loading_gold.svg" alt="loading" />
                    ) : (
                      'Unlock'
                    )}
                  </div>
                </button>
              </div>
              <p className="mt-3 text-center text-sm text-p12-darkgray">
                Notes: Synchronization will take some time, stay tuned.
              </p>
            </div>
          )}
          <h2 className="text-xl font-medium">{item?.predictionTitle}</h2>
          <p className="text-sm">{item?.predictionFull}</p>
          <div className="relative mt-6 h-[200px] w-[200px] cursor-pointer overflow-hidden rounded-lg" onClick={onSelect}>
            <div className="absolute top-0 left-0 z-10 h-full w-full hover:bg-white/10"></div>
            {answerSelect ? (
              <img loading="lazy" className="h-full w-full object-cover" src={answerSelect.img2} alt="select" />
            ) : (
              <img loading="lazy" className="h-full w-full" src="/img/arcana/no_selected.png" alt="no_selected" />
            )}
          </div>
          <div className="mt-4 text-xl font-medium leading-[24px]">{answerSelect?.team}</div>
          <div className="mt-4 text-xl font-medium leading-[24px]">{answerSelect?.name}</div>
          <div className="mt-[44px] flex w-full items-center justify-between px-6">
            <div className="text-center">
              <h3 className="font-medium">Total Tipsters</h3>
              <p className="font-ddin text-[36px] font-bold">{votes ?? 0}</p>
            </div>
            <div className="h-[46px] w-[2px] bg-[#474C55]/50"></div>
            <div className="text-center">
              <h3 className="font-medium text-p12-gold">Prize</h3>
              <p className="flex items-center justify-center font-ddin text-[36px] font-bold text-p12-gold">
                <img className="mr-1 w-8" src="/img/arcana/usdc.svg" alt="usdc" />
                {item?.currentPrice || 0}
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-p12-gold">Upto</h3>
              <p className="flex items-center justify-center font-ddin text-[36px] font-bold text-p12-gold">
                <img className="mr-1 w-8" src="/img/arcana/usdc.svg" alt="usdc" />
                {item?.maxPrice || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      <PredictionItemDialog
        open={openDialog}
        code={data?.predictionCode}
        type={data?.optionType}
        options={data?.optionList}
        title={data?.predictionTitle}
        subTitle={data?.predictionFull}
        onOpenChange={(op) => setOpenDialog(op)}
      />
    </div>
  );
}
