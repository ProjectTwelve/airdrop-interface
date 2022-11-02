import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useAccount } from 'wagmi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import PredictionItem from './PredictionItem';
import { ZERO_ADDRESS } from '../../constants/addresses';
import { referralCodeAtom } from '../../store/invite/state';
import {
  arcanaObserverAtom,
  arcanaOriginAddressAtom,
  arcanaPredictionAnswerAtom,
  arcanaPredictionCountAtom,
} from '../../store/arcana/state';
import { useArcanaPredictions } from '../../hooks/arcana';

export default function Prediction() {
  const isObserver = useRecoilValue(arcanaObserverAtom);
  const { address } = useAccount();
  const referralCode = useRecoilValue(referralCodeAtom);
  const originAddress = useRecoilValue(arcanaOriginAddressAtom);
  const setPredictionCount = useSetRecoilState(arcanaPredictionCountAtom);
  const setPredictionAnswer = useSetRecoilState(arcanaPredictionAnswerAtom);
  const { data } = useArcanaPredictions(originAddress ?? address ?? ZERO_ADDRESS);

  useEffect(() => {
    if (!data) return;
    const answers = data.map((item) => ({ predictionCode: item.predictionCode, answer: item.answer }));
    setPredictionAnswer(answers);
    setPredictionCount(data.length);
  }, [data, setPredictionAnswer, setPredictionCount]);

  const onShareTwitter = () => {
    if (!address || !referralCode) return;
    ReactGA.event({ category: 'Arcana-Info', action: 'Click', label: 'Share' });
    const referralLink = window.location.origin + `/arcana/${address}?code=${referralCode}`;
    const url = encodeURIComponent(referralLink);
    const text = encodeURIComponent(
      'Join P12 Arcana @ TI11 tune into the Great Web3 Gaming Event Featuring #Dota2\n' +
        'Make your pick to unlock the awesome prize pool sponsored by @_p12_ & great partners!',
    );
    window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url, '_blank');
  };

  return (
    <div className="px-[30px] xs:px-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[26px] font-medium leading-[30px]">Tips & Predictions</h2>
          <p className="text-xs leading-5">More Votes, More Bounties!</p>
        </div>
        {!isObserver && (
          <button
            onClick={onShareTwitter}
            className="dota__button flex items-center justify-center py-[11px] px-8 md:py-1.5 md:px-3"
          >
            <span className="dota__gold mr-1 pl-1 leading-5">Share</span>
            <img width={20} src="/img/arcana/twitter_gold.svg" alt="twitter" />
          </button>
        )}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-3 xl:gap-6 2xl:grid-cols-3 2xl:gap-8 xs:grid-cols-1">
        {data
          ? data.map((item) => <PredictionItem key={item.predictionCode} data={item} />)
          : Array(6)
              .fill(undefined)
              .map((item, index) => <PredictionItem key={index} data={item} />)}
      </div>
    </div>
  );
}
