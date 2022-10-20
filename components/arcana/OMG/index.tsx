import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useAccount } from 'wagmi';
import classNames from 'classnames';
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

  const onAnchorClick = () => {
    const omgV1 = document.querySelector('#omg_v1');
    omgV1?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

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
    <div className="overflow-hidden rounded-lg pb-6 backdrop-blur-lg">
      <div
        className={classNames(
          'flex items-center justify-between gap-2 px-[30px] py-2.5 pt-6 xs:flex-col xs:items-center',
          isSubmit ? 'bg-omg-mask' : null,
        )}
      >
        <div>
          <div className="flex items-center xs:justify-center">
            <h2 className="text-[26px] font-medium leading-[30px]">OMG</h2>
            <p
              className="ml-3 bg-clip-text text-[26px] font-bold leading-[30px] text-transparent"
              style={{ backgroundImage: 'linear-gradient(180deg, #FFFFDA 0%, #FFE7B6 50.34%, #A87945 100%)' }}
            >
              $10,000
            </p>
            <p className="ml-3 text-sm text-[#A5A6AB]">Round 2</p>
          </div>
          <p className="text-xs leading-5 xs:text-center">Only invitees after 2022/10/21 are counted in OMG sepcial round.</p>
        </div>
        <div>
          {!isOMGEnd && (
            <div className="flex items-center justify-center text-sm font-medium leading-6">
              <span className="mr-3">Drop Time</span>
              <span className="text-right font-ddin text-[24px] font-bold text-p12-gold">{relativeTime}</span>
            </div>
          )}
          <p
            className="mt-1.5 cursor-pointer text-right text-sm font-medium text-p12-link xs:text-center"
            onClick={onAnchorClick}
          >
            Back to Round 1&nbsp;
            <svg width="16" className="inline" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.38367 8.0166L5.09174 12.3085L6.22311 13.4399L11.6464 8.0166L6.22311 2.5933L5.09174 3.72467L9.38367 8.0166Z"
                fill="#43BBFF"
              />
            </svg>
          </p>
        </div>
      </div>
      <div className="mt-3 flex justify-between gap-4 px-[30px] md:flex-col md:items-center md:px-4">
        <OMGPrediction
          isEnd={isOMGEnd}
          answer={predictionAnswer[0]}
          item={predictionItem}
          votes={AnswerCount && predictionItem ? AnswerCount[predictionItem.predictionCode] : 0}
        />
        <OMGTopVotes />
        <OMGLuckyDraw />
      </div>
    </div>
  );
}
