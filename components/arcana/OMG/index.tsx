import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import OMGPrediction from './OMGPrediction';
import OMGTopVotes from './OMGTopVotes';
import OMGLuckyDraw from './OMGLuckyDraw';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { useArcanaPredictionsOMG } from '../../../hooks/arcana';
import { arcanaOriginAddressAtom, arcanaPredictionOMGAnswerAtom } from '../../../store/arcana/state';

export default function OMG() {
  const { address } = useAccount();
  const isMounted = useIsMounted();
  const originAddress = useRecoilValue(arcanaOriginAddressAtom);
  const { data } = useArcanaPredictionsOMG(originAddress ?? address);
  const setPredictionAnswer = useSetRecoilState(arcanaPredictionOMGAnswerAtom);

  const onAnchorClick = () => {
    const omgV1 = document.querySelector('#omg_v1');
    omgV1?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  useEffect(() => {
    if (!data) return;
    const answers = data.map((item) => ({ predictionCode: item.predictionCode, answer: item.answer }));
    setPredictionAnswer(answers);
  }, [data, setPredictionAnswer]);

  if (!isMounted) return null;

  return (
    <div className="overflow-hidden rounded-lg pb-6 backdrop-blur-lg">
      <div className="flex items-center justify-between gap-2 bg-card-mask px-[30px] py-2.5 pt-6 xs:flex-col xs:items-center">
        <h2 className="text-[26px] font-medium leading-[30px]">Check Winners of OMG Round 2</h2>
        <p
          className="mt-1.5 cursor-pointer text-right text-sm font-medium text-blue xs:text-center"
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
