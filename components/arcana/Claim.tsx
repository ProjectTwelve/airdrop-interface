import { ArcanaVotes } from '../../lib/types';

export default function Claim({ data }: { data?: ArcanaVotes }) {
  const onAnchorClick = () => {
    const omgV1 = document.querySelector('#omg_v1');
    omgV1?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  return (
    <div
      className="w-full max-w-[442px] overflow-hidden rounded-lg backdrop-blur-lg md:max-w-full"
      style={{ background: 'linear-gradient(to bottom, #25293000 0%, #25293080 100%)' }}
    >
      <div className="w-full bg-card-mask">
        <h3 className="pt-4 text-center font-medium leading-4 text-yellow">Glory</h3>
        <div className="mt-4 grid grid-cols-2 px-[30px]">
          <p className="text-center font-medium leading-4">Hit</p>
          <p className="text-center font-medium leading-4">Earned</p>
        </div>
      </div>
      <div className="mt-2 px-[30px]">
        <div className="flex">
          <div className="mt-5 flex-1 text-center text-[36px] font-semibold leading-[36px] text-yellow">
            {data?.userVotes.solvedPredictions || 0}
          </div>
          <div className="h-[28px] w-[1px] bg-gray-550/50" />
          <div className="mt-5 flex-1 text-center text-[36px] font-semibold leading-[36px] text-yellow">
            ${data?.userVotes.totalReward || 0}
          </div>
        </div>
        <div className="mt-8 h-[46px]">
          <button className="dota__yellow dota__button--disable w-full py-3 leading-5">Claim</button>
        </div>
        <div className="relative mt-3 mb-3.5">
          <p onClick={onAnchorClick} className="cursor-pointer text-center text-xs font-medium leading-5 text-blue">
            Past OMG Results&nbsp;
            <svg width="16" className="inline" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.38367 8.0166L5.09174 12.3085L6.22311 13.4399L11.6464 8.0166L6.22311 2.5933L5.09174 3.72467L9.38367 8.0166Z"
                fill="#43BBFF"
              />
            </svg>
          </p>
          <div className="absolute left-0 right-0 top-2 -z-10 mx-auto h-[4px] w-[60%] animate-ping-slow bg-blue blur-sm" />
        </div>
      </div>
    </div>
  );
}
