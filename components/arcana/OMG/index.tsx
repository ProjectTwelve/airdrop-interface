import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useAccount } from 'wagmi';
import { useRecoilState, useRecoilValue } from 'recoil';
import OMGPrediction from './OMGPrediction';
import OMGTopVotes from './OMGTopVotes';
import OMGLuckyDraw from './OMGLuckyDraw';
import { PredictionItemData } from '../../../lib/types';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { ZERO_ADDRESS } from '../../../constants/addresses';
import { useRelativeTime } from '../../../hooks/useRelativeTime';
import { useArcanaPredictionsAnswerCount, useArcanaPredictionsOMG } from '../../../hooks/arcana';
import {
  arcanaOriginAddressAtom,
  arcanaPredictionOMGAnswerAtom,
  arcanaPredictionOMGSubmitAtom,
} from '../../../store/arcana/state';
import { openLink } from '../../../utils';

export default function OMG() {
  const { address } = useAccount();
  const isMounted = useIsMounted();
  const [isOMGEnd, setIsOMGEnd] = useState<boolean>(false);
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
    if (currentDate > endDate) {
      setIsOMGEnd(true);
    }
    if (predictionItem.answer && predictionItem.answer.length > 0) {
      setIsSubmit(true);
    }
  }, [predictionItem, setIsSubmit]);

  if (!isMounted) return null;

  return (
    <div
      className="rounded-xl bg-black/30 py-8 px-14 backdrop-blur-lg xs:p-4"
      style={{ border: '2px solid var(--omg-color)', boxShadow: 'inset 0 0 60px var(--omg-color)' }}
    >
      <div className="flex items-center justify-between gap-2 xs:flex-col xs:items-center">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-[48px] font-medium leading-[48px]">OMG</h2>
            <p
              className="bg-clip-text text-[42px] font-bold leading-[48px] text-transparent"
              style={{ backgroundImage: 'linear-gradient(180deg, #FFFFDA 0%, #FFE7B6 50.34%, #A87945 100%)' }}
            >
              $5,000
            </p>
          </div>
          <p className="text-[22px] font-medium tracking-[1px]">At the tip of your finger!</p>
        </div>
        {!isOMGEnd && (
          <div className="text-xl font-medium">
            Drop Time <span className="font-ddin text-[30px] font-bold text-p12-gold">{relativeTime}</span>
          </div>
        )}
      </div>
      <div className="mt-12 mb-10">
        {isSubmit || isOMGEnd ? (
          <div>
            <p className="text-center text-[30px] font-medium leading-[36px] text-p12-success">
              {isOMGEnd ? 'Congratulations to the Winners!' : 'Correct Answer!'}
            </p>
            <p className="mt-3 text-center text-xl font-medium leading-[22px]">
              {isOMGEnd ? (
                <>
                  Please claim your reward through our&nbsp;
                  <span onClick={() => openLink('https://discord.gg/p12')} className="cursor-pointer text-p12-link">
                    Discord
                  </span>
                  &nbsp;!
                </>
              ) : (
                'You have the chance to win the following rewards.'
              )}
            </p>
            <div className="mt-8 flex items-stretch justify-between gap-4 md:flex-col md:items-center md:px-0">
              <OMGPrediction
                isEnd={isOMGEnd}
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
              isEnd={isOMGEnd}
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
