import SwiperCard from './SwiperCard';
import InfoCard from './InfoCard';
import MainCard from './MainCard';
import { ArcanaVotes } from '../../../lib/types';

type StatusBarProps = {
  data?: ArcanaVotes;
};

export default function StatusBar({ data }: StatusBarProps) {
  return (
    <>
      {/*<div className="absolute -top-16 z-10 mx-auto flex text-sm md:fixed md:bottom-4 md:top-auto">*/}
      {/*  <div className="dota__box px-4 py-3 xs:px-2 xs:py-1.5">*/}
      {/*    You are visiting <span className="text-p12-link">PSG.LGD.Ame</span> &apos;s Voting page*/}
      {/*  </div>*/}
      {/*  <button className="dota__button dota__gold px-4 xs:px-2">Back to my Votes</button>*/}
      {/*</div>*/}
      <div className="flex w-[1000px] md:hidden">
        <InfoCard data={data?.userInfo} />
        <MainCard data={data?.userVotes} nftLevel={data?.userInfo.nftLevel} />
        <SwiperCard data={data?.memeEvaluate} />
      </div>
      <div className="hidden w-full overflow-x-scroll bg-[url('/img/arcana/statusbar/center.webp')] bg-cover bg-no-repeat md:block">
        <div>
          <div className="flex justify-between">
            <InfoCard data={data?.userInfo} />
            <SwiperCard data={data?.memeEvaluate} />
          </div>
          <MainCard data={data?.userVotes} nftLevel={data?.userInfo.nftLevel} />
        </div>
      </div>
    </>
  );
}
