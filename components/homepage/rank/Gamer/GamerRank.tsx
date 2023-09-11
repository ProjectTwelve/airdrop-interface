import Pagination from 'rc-pagination';
import React, { useState } from 'react';
import { useGamerTokenRank } from '@/hooks/ranking';
import MyGamerRankItem from './MyGamerRankItem';
import GamerRankItem, { GamerRankItemHeader } from './GamerRankItem';

export default function GamerRank() {
  const [page, setPage] = useState(1);
  const { data } = useGamerTokenRank({ page: page, size: 10 });

  return (
    <div>
      <GamerRankItemHeader />
      <div className="grid gap-4">
        <MyGamerRankItem />
        {data?.rankList.map((item, index) => (
          <GamerRankItem data={item} key={item.steam_id || index} />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center">
        {data && data.rankLength > 10 && (
          <Pagination
            simple
            current={page}
            total={data.rankLength}
            onChange={(page) => setPage(page)}
          />
        )}
      </div>
    </div>
  );
}
