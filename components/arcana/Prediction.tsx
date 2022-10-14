import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useAccount } from 'wagmi';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import PredictionItem from './PredictionItem';
import { referralCodeAtom } from '../../store/invite/state';
import {
  arcanaObserverAtom,
  arcanaOriginAddressAtom,
  arcanaPredictionAnswerAtom,
  arcanaPredictionCountAtom,
} from '../../store/arcana/state';
import { useArcanaPredictions, useArcanaPredictionsAnswerCount } from '../../hooks/arcana';
import { ZERO_ADDRESS } from '../../constants/addresses';

export default function Prediction() {
  const isObserver = useRecoilValue(arcanaObserverAtom);
  const { address } = useAccount();
  const referralCode = useRecoilValue(referralCodeAtom);
  const originAddress = useRecoilValue(arcanaOriginAddressAtom);
  const setPredictionCount = useSetRecoilState(arcanaPredictionCountAtom);
  const [predictionAnswer, setPredictionAnswer] = useRecoilState(arcanaPredictionAnswerAtom);
  const { data } = useArcanaPredictions(originAddress ?? address ?? ZERO_ADDRESS);
  const { data: AnswerCount } = useArcanaPredictionsAnswerCount();

  useEffect(() => {
    if (!data) return;
    const answers = data.map((item) => ({ predictionCode: item.predictionCode, answer: item.answer }));
    setPredictionAnswer(answers);
    setPredictionCount(data.length);
  }, [data, setPredictionAnswer, setPredictionCount]);

  const onShareTwitter = () => {
    if (!address || !referralCode) return;
    ReactGA.event({ category: 'Arcana-Info', action: 'Click', label: 'Share' });
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
          <p className="mt-2 text-sm">More Votes, More Bounties!</p>
        </div>
        {!isObserver && (
          <button
            onClick={onShareTwitter}
            className="dota__button flex items-center justify-center py-3 px-8 md:py-1.5 md:px-4"
          >
            <span className="dota__gold mr-1 pl-1 text-xl leading-[24px]">Share</span>
            <img width={24} src="/img/arcana/twitter_gold.svg" alt="twitter" />
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
