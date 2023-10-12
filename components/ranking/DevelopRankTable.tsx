import React, { useState } from 'react';
import DevTokenRankingItem, { DevTokenRankingHeader } from './DevTokenRankingItem';
import { useDeveloperTokenRank } from '@/hooks/ranking';
import Pagination from 'rc-pagination';

export default function DevelopRankTable() {
  const [tokenRankPage, setTokenRankPage] = useState(1);

  const { data: tokenRankData } = useDeveloperTokenRank({ page: tokenRankPage, size: 10 });

  return (
    <>
      <DevTokenRankingHeader />
      <div className="grid">
        {tokenRankData?.rankList.map((item, index) => (
          <DevTokenRankingItem data={item} key={item.appid || index} />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center">
        {tokenRankData && tokenRankData.rankLength > 10 && (
          <Pagination
            simple
            current={tokenRankPage}
            total={tokenRankData.rankLength}
            onChange={(page) => setTokenRankPage(page)}
          />
        )}
      </div>
    </>
  );
}
