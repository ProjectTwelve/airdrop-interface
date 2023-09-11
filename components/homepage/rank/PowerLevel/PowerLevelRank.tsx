import React, { useState } from 'react';
import Pagination from 'rc-pagination';
import { useGamerTokenRank } from '@/hooks/ranking';
import PowerLevelRankItem, { PowerLevelRankItemHeader } from './PowerLevelRankItem';
import MyPowerLevelRankItem from '@/components/homepage/rank/PowerLevel/MyPowerLevelRankItem';

export default function PowerLevelRank() {
  const [page, setPage] = useState(1);
  const { data } = useGamerTokenRank({ page: page, size: 10 });

  return (
    <div>
      <PowerLevelRankItemHeader />
      <div className="grid gap-4">
        <MyPowerLevelRankItem />
        {data?.rankList.map((item, index) => (
          <PowerLevelRankItem data={item} key={item.steam_id || index} />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center">
        {data && data.rankLength > 10 && (
          <Pagination simple current={page} total={data.rankLength} onChange={(page) => setPage(page)} />
        )}
      </div>
    </div>
  );
}
