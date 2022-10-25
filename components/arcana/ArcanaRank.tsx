function RankItem({ data }: any) {
  return (
    <div className="mt-[10px] flex items-center">
      <div className="flex basis-1/4 items-center justify-start">
        <p className="w-[35px] text-sm font-medium">1st</p>
        <div className="h-[30px] w-[30px] rounded bg-gray-600"></div>
        <p className="ml-2 w-[120px] truncate text-sm font-medium">{data.name}</p>
      </div>
      <div className="basis-1/4 text-sm font-medium">{data.count1}</div>
      <div className="basis-1/4 text-sm font-medium">{data.count2}</div>
      <div className="basis-1/4 text-sm font-medium">{data.count3}</div>
    </div>
  );
}

export default function ArcanaRank() {
  const data = [
    { name: '233', count1: 1, count2: 2, count3: 3 },
    { name: 'linchengzzz linchengzzz', count1: 100, count2: 200, count3: 300 },
    { name: 'nessary', count1: 1000, count2: 2000, count3: 3000 },
    { name: 'array', count1: 2000, count2: 3000, count3: 4000 },
    { name: 'linear-gradient', count1: 12000, count2: 23000, count3: 34000 },
  ];
  return (
    <div
      className="relative w-full max-w-[886px] overflow-hidden rounded-lg px-4 pt-4 pb-3.5 backdrop-blur-lg"
      style={{ background: 'linear-gradient(to bottom, #25293000 0%, #25293080 100%)' }}
    >
      <div className="absolute top-0 left-0 -z-10 h-[64px] w-full bg-omg-mask"></div>
      <div className="mb-4 flex justify-center">
        <div className="min-w-[193px] basis-1/4 text-xs font-medium leading-[14px] text-p12-gold">DOTA Master</div>
        <div className="basis-1/4 text-xs font-medium leading-[14px] text-p12-gold">Hit</div>
        <div className="basis-1/4 text-xs font-medium leading-[14px] text-p12-gold">Votes</div>
        <div className="basis-1/4 text-xs font-medium leading-[14px] text-p12-gold">Rewards</div>
      </div>
      {data.map((item) => (
        <RankItem data={item} key={item.name} />
      ))}
    </div>
  );
}
