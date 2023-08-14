import Loading from '../loading';
import { RewardRankItem } from '../../lib/types';
import { useArcanaRewardRank } from '../../hooks/arcana';

function RankItem({ data, index }: { data: RewardRankItem; index: number }) {
  return (
    <div className="mb-[10px] flex items-center">
      <div className="flex basis-1/4  items-center justify-start 2xl:min-w-[300px]">
        <p className="w-[35px] text-sm font-medium">{index + 1}</p>
        <div className="h-[30px] w-[30px] rounded bg-gray-600">
          {data.avatarFull && <img src={data.avatarFull} alt="avatar" />}
        </div>
        <p className="ml-2 w-[120px] truncate text-sm font-medium 2xl:w-[200px]">{data.personName}</p>
      </div>
      <div className="basis-1/4 text-sm font-medium">{data.solvedPredictions}</div>
      <div className="basis-1/4 text-sm font-medium">{data.votesTotalCurrent}</div>
      <div className="basis-1/4 text-sm font-medium">${data.totalReward}</div>
    </div>
  );
}

export default function ArcanaRank() {
  const { data, isLoading } = useArcanaRewardRank();

  return (
    <div
      className="relative w-full max-w-[886px] overflow-hidden rounded-lg px-4 pt-4 pb-3.5 backdrop-blur-lg"
      style={{ background: 'linear-gradient(to bottom, #25293000 0%, #25293080 100%)' }}
    >
      <div className="absolute top-0 left-0 -z-10 h-[64px] w-full bg-card-mask"></div>
      <div className="mb-4 flex justify-center">
        <div className="min-w-[193px] basis-1/4 text-xs font-medium leading-[14px] text-yellow 2xl:min-w-[300px]">
          DOTO Master
        </div>
        <div className="basis-1/4 text-xs font-medium leading-[14px] text-yellow">Hit</div>
        <div className="basis-1/4 text-xs font-medium leading-[14px] text-yellow">Votes</div>
        <div className="basis-1/4 text-xs font-medium leading-[14px] text-yellow">Rewards</div>
      </div>
      <div className="vertical-scroll h-[190px] overflow-y-scroll">
        {isLoading && <Loading className="mt-4" size={36} />}
        {data?.map((item, index) => (
          <RankItem data={item} index={index} key={item.walletAddress} />
        ))}
      </div>
    </div>
  );
}
