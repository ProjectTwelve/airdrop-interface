import { useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';
import classNames from 'classnames';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import OMGPrediction from './OMGPrediction';
import OMGTopVotes from './OMGTopVotes';
import OMGLuckyDraw from './OMGLuckyDraw';
import { PredictionItemData } from '../../../lib/types';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { ZERO_ADDRESS } from '../../../constants/addresses';
import { useArcanaPredictionsOMG } from '../../../hooks/arcana';
import {
  arcanaOriginAddressAtom,
  arcanaPredictionOMGAnswerAtom,
  arcanaPredictionOMGSubmitAtom,
} from '../../../store/arcana/state';

export default function OMG() {
  const { address } = useAccount();
  const isMounted = useIsMounted();
  // const [isOMGEnd, setIsOMGEnd] = useState<boolean>(false);
  const originAddress = useRecoilValue(arcanaOriginAddressAtom);
  const [isSubmit, setIsSubmit] = useRecoilState(arcanaPredictionOMGSubmitAtom);
  // const { data: AnswerCount } = useArcanaPredictionsAnswerCount();
  const { data } = useArcanaPredictionsOMG(originAddress ?? address ?? ZERO_ADDRESS);
  // const [predictionAnswer, setPredictionAnswer] = useRecoilState(arcanaPredictionOMGAnswerAtom);
  const setPredictionAnswer = useSetRecoilState(arcanaPredictionOMGAnswerAtom);
  const predictionItem = useMemo<PredictionItemData | undefined>(() => (data ? data[0] : undefined), [data]);

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
    // const endDate = dayjs.unix(predictionItem.endDate);
    // const currentDate = dayjs();
    // if (currentDate > endDate) {
    //   setIsOMGEnd(true);
    // }
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
        <h2 className="text-[26px] font-medium leading-[30px]">Check Winners of OMG Round 2</h2>
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
      <div className="mt-3 flex justify-between gap-4 px-[30px] md:flex-col md:items-center md:px-4">
        <OMGPrediction />
        <OMGTopVotes />
        <OMGLuckyDraw />
      </div>
    </div>
  );
}
