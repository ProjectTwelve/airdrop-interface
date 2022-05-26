import React, { useMemo } from 'react';
import Image from 'next/image';
import Tag from '../tag';
import { useQuery } from 'react-query';
import { fetchDeveloperInfo } from '../../lib/api';
import { useWeb3React } from '@web3-react/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { developerGameAtom, claimGroupSelector, NFTClaim } from '../../store/developer/state';

function DeveloperStatus() {
  const { account } = useWeb3React();
  const [games, setGames] = useRecoilState(developerGameAtom);
  const claimGroup = useRecoilValue(claimGroupSelector);
  useQuery(['developer_info', account], () => fetchDeveloperInfo({ addr: account }), {
    enabled: !!account,
    onSuccess: (data) => {
      if (data.code !== 0) return;
      setGames(data.data.account_info || []);
    },
  });

  const tagType = useMemo(
    () => (claimGroup[NFTClaim.CLAIMED].length === games.length ? 'success' : 'error'),
    [claimGroup, games.length],
  );

  return (
    <div className="flex overflow-hidden">
      <div className="flex items-center justify-center gap-3 border-r border-p12-line px-3 text-xl">
        {games.length ? (
          <Tag type={tagType} value={`${claimGroup[NFTClaim.CLAIMED].length}/${games.length} NFT Coupon`} />
        ) : (
          <Tag type="error" value="Not Eligible" />
        )}
      </div>
      <div className="flex items-center justify-center gap-2 border-r border-p12-line px-3 font-['D-DIN'] text-xl">
        <span className="text-p12-success">{games.length}</span>Games
      </div>
      <div className="flex items-center justify-center gap-3 border-r border-p12-line px-3 text-xl">
        <p className="font-['D-DIN'] font-bold">?,???</p>
        <Image width={30} height={30} src="/img/p12.png" alt="p12" />
      </div>
    </div>
  );
}

export default React.memo(DeveloperStatus);
