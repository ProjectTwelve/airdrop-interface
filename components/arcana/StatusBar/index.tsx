import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useRecoilValue } from 'recoil';
import InfoCard from './InfoCard';
import MainCard from './MainCard';
import EasterEgg from './EasterEgg';
import SwiperCard from './SwiperCard';
import { openLink } from '../../../utils';
import { ArcanaVotes } from '../../../lib/types';
import { arcanaObserverAtom } from '../../../store/arcana/state';

export default function StatusBar({ data }: { data?: ArcanaVotes }) {
  const [level, setLevel] = useState<number>(30);
  const isObserver = useRecoilValue(arcanaObserverAtom);
  const [easterEggShow, setEasterEggShow] = useState<boolean>(false);

  const onLevelClick = () => {
    ReactGA.event({ category: 'Arcana-Info', action: 'Click', label: 'Easter-Egg' });
    if (level === 30) return;
    setEasterEggShow(true);
  };

  useEffect(() => {
    const random = Math.random();
    if (random < 0.3) return setLevel(1);
    if (random < 0.6) return setLevel(25);
    setLevel(30);
  }, []);

  return (
    <>
      {isObserver && data && (
        <div className="absolute -top-16 z-20 mx-auto flex text-sm md:fixed md:bottom-4 md:top-auto">
          <div className="dota__box px-4 py-3 xs:px-2 xs:py-1.5">
            You are visiting <span className="text-p12-link">{data?.userInfo.personName}</span> &apos;s Voting page
          </div>
          <button className="dota__button dota__gold px-4 xs:px-2" onClick={() => openLink(window.location.origin + '/arcana')}>
            Back to my Votes
          </button>
        </div>
      )}
      <EasterEgg level={level} show={easterEggShow} onMaskClick={() => setEasterEggShow(false)} />
      <div className="flex w-[750px] md:hidden">
        <InfoCard onLevelClick={onLevelClick} level={level} data={data?.userInfo} />
        <MainCard data={data?.userVotes} userInfo={data?.userInfo} nftLevel={data?.userInfo.nftLevel} />
        <SwiperCard data={data?.memeEvaluate} />
      </div>
      <div className="hidden w-full overflow-x-scroll bg-[url('/img/arcana/statusbar/center.webp')] bg-cover bg-no-repeat md:block">
        <div>
          <div className="flex justify-between">
            <InfoCard onLevelClick={onLevelClick} level={level} data={data?.userInfo} />
            <SwiperCard data={data?.memeEvaluate} />
          </div>
          <MainCard data={data?.userVotes} userInfo={data?.userInfo} nftLevel={data?.userInfo.nftLevel} />
        </div>
      </div>
    </>
  );
}
