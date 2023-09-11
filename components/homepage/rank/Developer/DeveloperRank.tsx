import React, { useState } from 'react';
import Pagination from 'rc-pagination';
import { useGamerTokenRank } from '@/hooks/ranking';
import DeveloperRankItem, { DevRankItemHeader } from './DeveloperRankItem';
import MyDeveloperRankItem from './MyDeveloperRankItem';

export default function DeveloperRank() {
  const [page, setPage] = useState(1);
  const { data } = useGamerTokenRank({ page: page, size: 10 });

  return (
    <div>
      <DevRankItemHeader />
      <div className="grid gap-4">
        <MyDeveloperRankItem />
        {data?.rankList.map((item, index) => (
          <DeveloperRankItem data={item} key={item.steam_id || index} />
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
