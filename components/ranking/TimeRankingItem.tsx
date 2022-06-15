import Image from 'next/image';
import classNames from 'classnames';

type TimeRankingItemProps = {
  hover?: boolean;
};
export default function TimeRankingItem({ hover }: TimeRankingItemProps) {
  return (
    <div className={classNames('overflow-hidden rounded-2xl bg-p12-black/80 p-4', hover ? 'hover:bg-[#7980AF]/20' : '')}>
      <div className="float-left mr-4 w-[40px] text-center font-medium leading-[72px]">222</div>
      <div className="float-left mt-3 mr-4 font-medium">
        <p>Aug 16, 2018</p>
        <p>8:02 PM</p>
      </div>
      <div>
        <div className="relative float-left mr-3 h-[72px] w-[112px] flex-none overflow-hidden rounded-2xl">
          <Image layout="fill" alt="header" objectFit="cover" src="https://cdn.p12.games/steam/apps/570/header.jpg" />
        </div>
        <div className="truncate">
          <h4 className="truncate font-medium">Symphony of War: The Nephilim Saga</h4>
          <div className="mt-1.5 truncate text-xs">14 Jul, 2014 9FingerGames,9FingerGames...</div>
          <div className="relative mt-1.5 flex h-[20px] flex-wrap gap-1.5 overflow-hidden">
            <span className="rounded bg-p12-link/20 px-2 py-[1.5px] text-xs text-p12-link">Multi-player</span>
            <span className="rounded bg-p12-link/20 px-2 py-[1.5px] text-xs text-p12-link">PvP</span>
            <span className="rounded bg-p12-link/20 px-2 py-[1.5px] text-xs text-p12-link">Online</span>
            <span className="rounded bg-p12-link/20 px-2 py-[1.5px] text-xs text-p12-link">Action</span>
            <span className="rounded bg-p12-link/20 px-2 py-[1.5px] text-xs text-p12-link">Action</span>
            <span className="rounded bg-p12-link/20 px-2 py-[1.5px] text-xs text-p12-link">Action</span>
          </div>
        </div>
        <div className="clear-both"></div>
      </div>
    </div>
  );
}

TimeRankingItem.defaultProps = {
  hover: true,
};
