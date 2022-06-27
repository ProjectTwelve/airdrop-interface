import React, { useMemo } from 'react';
import Image from 'next/image';
import Tag from '../tag';
import { useQuery } from 'react-query';
import { fetchDeveloperInfo } from '../../lib/api';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { claimGroupSelector, developerGameAtom } from '../../store/developer/state';
import { roadmapModalAtom } from '../../store/roadmap/state';
import { useAccount } from 'wagmi';
import { NFT_CLAIM } from '../../constants';

function DeveloperStatus() {
  const { data: account } = useAccount();
  const [games, setGames] = useRecoilState(developerGameAtom);
  const claimGroup = useRecoilValue(claimGroupSelector);
  const setOpen = useSetRecoilState(roadmapModalAtom);

  useQuery(['developer_info', account?.address], () => fetchDeveloperInfo({ addr: account?.address }), {
    enabled: !!account?.address,
    onSuccess: (data) => {
      if (data.code !== 0) return;
      setGames(data.data.account_info || []);
    },
  });

  const tagType = useMemo(
    () => (claimGroup[NFT_CLAIM.CLAIMED].length === games.length ? 'green' : 'red'),
    [claimGroup, games.length],
  );

  return (
    <motion.div
      initial={{ opacity: 0.65, width: 0 }}
      animate={{ opacity: 1, width: 'auto' }}
      exit={{ opacity: 0, width: 0 }}
      className="flex overflow-hidden"
    >
      <div className="flex items-center justify-center border-r border-p12-line px-3 text-xl">
        {games.length ? (
          <Tag type={tagType} size="large" value={`${claimGroup[NFT_CLAIM.CLAIMED].length}/${games.length} Airdrop NFT`} />
        ) : (
          <Tag type="red" size="large" value="No NFT yet" />
        )}
      </div>
      <div className="flex items-center justify-center border-r border-p12-line px-3 font-din text-xl font-bold">
        <span className="mr-2 text-p12-success">{games.length}</span>
        {games.length > 1 ? 'Games' : 'Game'}
      </div>
      <div className="flex items-center justify-center border-r border-p12-line px-3 text-xl">
        <p className="mr-3 cursor-pointer font-din font-bold" onClick={() => setOpen(true)}>
          ?,???
        </p>
        <div className="h-[30px] w-[30px]">
          <Image width={30} height={30} src="/img/p12.png" alt="p12" />
        </div>
      </div>
    </motion.div>
  );
}

export default React.memo(DeveloperStatus);
