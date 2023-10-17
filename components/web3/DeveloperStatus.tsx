import React, { useMemo } from 'react';
import Image from 'next/image';
import Tag from '../tag';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { claimGroupSelector, developerGameAtom } from '@/store/developer/state';
import { roadmapModalAtom } from '@/store/roadmap/state';
import { GenesisClaim } from '@/constants';

function DeveloperStatus() {
  const games = useRecoilValue(developerGameAtom);
  const claimGroup = useRecoilValue(claimGroupSelector);
  const setOpen = useSetRecoilState(roadmapModalAtom);

  const tagType = useMemo(
    () => (claimGroup[GenesisClaim.Claimed].length === games.length ? 'green' : 'red'),
    [claimGroup, games.length],
  );

  return (
    <motion.div
      initial={{ opacity: 0.65, width: 0 }}
      animate={{ opacity: 1, width: 'auto' }}
      exit={{ opacity: 0, width: 0 }}
      className="flex overflow-hidden"
    >
      <div className="flex items-center justify-center border-r border-gray-600 px-3 text-xl">
        {games.length ? (
          <Tag type={tagType} size="large" value={`${claimGroup[GenesisClaim.Claimed].length}/${games.length} Airdrop NFT`} />
        ) : (
          <Tag type="red" size="large" value="No NFT yet" />
        )}
      </div>
      <div className="flex items-center justify-center border-r border-gray-600 px-3 font-ddin text-xl font-bold">
        <span className="mr-2 text-green">{games.length}</span>
        {games.length > 1 ? 'Games' : 'Game'}
      </div>
      <div className="flex items-center justify-center border-r border-gray-600 px-3 text-xl">
        <p className="mr-3 cursor-pointer font-ddin font-bold" onClick={() => setOpen(true)}>
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
