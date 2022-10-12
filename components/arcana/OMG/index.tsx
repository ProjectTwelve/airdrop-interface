import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useAccount } from 'wagmi';
import { useRecoilState, useRecoilValue } from 'recoil';
import OMGPrediction from './OMGPrediction';
import OMGTopVotes from './OMGTopVotes';
import OMGLuckyDraw from './OMGLuckyDraw';
import { PredictionItemData } from '../../../lib/types';
import { ZERO_ADDRESS } from '../../../constants/addresses';
import { useRelativeTime } from '../../../hooks/useRelativeTime';
import { useArcanaPredictionsAnswerCount, useArcanaPredictionsOMG } from '../../../hooks/arcana';
import {
  arcanaOriginAddressAtom,
  arcanaPredictionOMGAnswerAtom,
  arcanaPredictionOMGSubmitAtom,
} from '../../../store/arcana/state';

export default function OMG() {
  const { address } = useAccount();
  const [showOMG, setShowOMG] = useState<boolean>(false);
  const originAddress = useRecoilValue(arcanaOriginAddressAtom);
  const [isSubmit, setIsSubmit] = useRecoilState(arcanaPredictionOMGSubmitAtom);
  const { data: AnswerCount } = useArcanaPredictionsAnswerCount();
  const { data } = useArcanaPredictionsOMG(originAddress ?? address ?? ZERO_ADDRESS);
  const [predictionAnswer, setPredictionAnswer] = useRecoilState(arcanaPredictionOMGAnswerAtom);
  const predictionItem = useMemo<PredictionItemData | undefined>(() => (data ? data[0] : undefined), [data]);
  const relativeTime = useRelativeTime(predictionItem?.endDate);

  useEffect(() => {
    if (!data) return;
    const answers = data.map((item) => ({ predictionCode: item.predictionCode, answer: item.answer }));
    setPredictionAnswer(answers);
  }, [data, setPredictionAnswer]);

  useEffect(() => {
    if (!predictionItem) return;
    const endDate = dayjs.unix(predictionItem.endDate);
    const currentDate = dayjs();
    if (currentDate < endDate) {
      setShowOMG(true);
    }
    if (predictionItem.answer && predictionItem.answer.length > 0) {
      setIsSubmit(true);
    }
  }, [predictionItem, setIsSubmit]);

  if (!showOMG) return null;

  return (
    <div
      className="rounded-xl bg-black/30 py-8 px-14 backdrop-blur-lg xs:p-4"
      style={{ border: '2px solid var(--omg-color)', boxShadow: 'inset 0 0 60px var(--omg-color)' }}
    >
      <div className="flex items-center justify-between gap-2 xs:flex-col xs:items-start">
        <div>
          <h2 className="text-[40px] font-medium">OMG</h2>
          <p className="text-sm">Simple predictions, independent jackpots, bounty rune!</p>
        </div>
        <div className="text-xl font-medium">
          Drop Time <span className="font-ddin text-[30px] font-bold text-p12-gold">{relativeTime}</span>
        </div>
      </div>
      <div className="mt-12 mb-10">
        {isSubmit ? (
          <div>
            <p className="text-center text-[30px] font-medium leading-[36px] text-p12-success">Correct Answer!</p>
            <p className="mt-3 text-center text-xl font-medium leading-[22px]">
              You have the chance to win the following rewards.
            </p>
            <div className="mt-8 flex items-stretch justify-between gap-4 md:flex-col md:items-center md:px-0">
              <OMGPrediction
                answer={predictionAnswer[0]}
                item={predictionItem}
                votes={AnswerCount && predictionItem ? AnswerCount[predictionItem.predictionCode] : 0}
              />
              <OMGTopVotes code={predictionItem?.predictionCode} />
              <OMGLuckyDraw />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <OMGPrediction
              item={predictionItem}
              answer={predictionAnswer[0]}
              votes={AnswerCount && predictionItem ? AnswerCount[predictionItem.predictionCode] : 0}
            />
          </div>
        )}
      </div>
    </div>
  );
}
