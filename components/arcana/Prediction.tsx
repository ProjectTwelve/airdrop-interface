import { useAccount } from 'wagmi';
import { useRecoilState, useRecoilValue } from 'recoil';
import PredictionItem from './PredictionItem';
import { referralCodeAtom } from '../../store/invite/state';
import { arcanaObserverAtom, arcanaOriginAddressAtom, arcanaPredictionAnswerAtom } from '../../store/arcana/state';
import { useArcanaPredictions, useArcanaPredictionsAnswerCount } from '../../hooks/arcana';
import { ZERO_ADDRESS } from '../../constants/addresses';
import { useEffect } from 'react';

export default function Prediction() {
  const isObserver = useRecoilValue(arcanaObserverAtom);
  const { address } = useAccount();
  const referralCode = useRecoilValue(referralCodeAtom);
  const originAddress = useRecoilValue(arcanaOriginAddressAtom);
  const [predictionAnswer, setPredictionAnswer] = useRecoilState(arcanaPredictionAnswerAtom);
  const { data } = useArcanaPredictions(originAddress ?? address ?? ZERO_ADDRESS);
  const { data: AnswerCount } = useArcanaPredictionsAnswerCount();

  useEffect(() => {
    if (!data) return;
    const answers = data.map((item) => ({ predictionCode: item.predictionCode, answer: item.answer }));
    setPredictionAnswer(answers);
  }, [data, setPredictionAnswer]);

  const onShareTwitter = () => {
    if (!address || !referralCode) return;
    const referralLink = window.location.origin + window.location.pathname + `?address=${address}&code=${referralCode}`;
    const url = encodeURIComponent(referralLink);
    const text = encodeURIComponent(
      'Join P12 Arcana @ TI11 tune into the Great Web3 Gaming Event Featuring #Dota2\n' +
        'Make your pick to unlock the awesome prize pool sponsored by @_p12_ & great partners!',
    );
    window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url, '_blank');
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[30px] font-medium">Tips & Predictions</h2>
          <p className="mt-2 text-sm">
            Your pick shall subject to the <span className="font-medium text-p12-success">Main Event (10/20-10/30)</span>{' '}
            results.
          </p>
        </div>
        {!isObserver && (
          <button
            onClick={onShareTwitter}
            className="dota__button flex items-center justify-center py-3 px-8 md:py-1.5 md:px-4"
          >
            <span className="dota__gold pl-1 leading-[24px]">Share</span>
            <img className="w-[30px]" src="/img/arcana/twitter_gold.webp" alt="twitter" />
          </button>
        )}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-3 xl:gap-6 2xl:grid-cols-3 2xl:gap-8 xs:grid-cols-1">
        {data
          ? data.map((item, index) => (
              <PredictionItem
                key={item.predictionCode}
                answer={predictionAnswer[index]}
                data={item}
                votes={AnswerCount ? AnswerCount[item.predictionCode] : 0}
              />
            ))
          : Array(6)
              .fill(undefined)
              .map((item, index) => <PredictionItem key={index} data={item} />)}
      </div>
    </div>
  );
}
