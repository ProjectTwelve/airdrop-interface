import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { ArcanaVotes } from '../../lib/types';
import { arcanaPredictionAnswerAtom } from '../../store/arcana/state';

export default function Claim({ data }: { data?: ArcanaVotes }) {
  const predictionAnswers = useRecoilValue(arcanaPredictionAnswerAtom);
  const predictionAnswerCount = useMemo(
    () => predictionAnswers.filter((item) => !!item.answer?.length).length || 0,
    [predictionAnswers],
  );

  const onAnchorClick = () => {
    const omgV1 = document.querySelector('#omg_v1');
    omgV1?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  return (
    <div
      className="w-full max-w-[442px] overflow-hidden rounded-lg backdrop-blur-lg md:max-w-full"
      style={{ background: 'linear-gradient(to bottom, #25293000 0%, #25293080 100%)' }}
    >
      <div className="w-full bg-omg-mask">
        <h3 className="pt-4 text-center font-medium leading-4 text-p12-gold">Glory</h3>
        <div className="mt-4 grid grid-cols-2 px-[30px]">
          <p className="text-center font-medium leading-4">You solved</p>
          <p className="text-center font-medium leading-4">You earned</p>
        </div>
      </div>
      <div className="mt-2 px-[30px]">
        <div className="flex">
          <div className="mt-5 flex-1 text-center text-[36px] font-semibold leading-[36px] text-p12-gold">
            {predictionAnswerCount}
          </div>
          <div className="h-[28px] w-[1px] bg-[#6F7784]/50" />
          <div className="mt-5 flex-1 text-center text-[36px] font-semibold leading-[36px] text-p12-gold">
            ${data?.userVotes.totalReward || 0}
          </div>
        </div>
        <div className="mt-8">
          <button className="dota__button dota__gold w-full py-3 leading-5">Claim</button>
        </div>
        <div className="relative mt-3 mb-3.5">
          <p onClick={onAnchorClick} className="cursor-pointer text-center text-xs font-medium leading-5 text-p12-link">
            Past OMG Results&nbsp;
            <svg width="16" className="inline" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.38367 8.0166L5.09174 12.3085L6.22311 13.4399L11.6464 8.0166L6.22311 2.5933L5.09174 3.72467L9.38367 8.0166Z"
                fill="#43BBFF"
              />
            </svg>
          </p>
          <div className="absolute top-2 h-[4px] w-full animate-ping-slow bg-p12-link blur-sm" />
        </div>
      </div>
    </div>
  );
}
