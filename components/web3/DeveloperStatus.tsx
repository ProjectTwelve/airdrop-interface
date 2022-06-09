import React, { useMemo } from 'react';
import Image from 'next/image';
import Tag from '../tag';
import { useQuery } from 'react-query';
import { fetchDeveloperInfo } from '../../lib/api';
import { useWeb3React } from '@web3-react/core';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { claimGroupSelector, claimingGameAtom, developerGameAtom, NFTClaim } from '../../store/developer/state';
import { BADGES } from '../../constants';
import { roadmapModalAtom } from '../../store/roadmap/state';

function DeveloperStatus() {
  const { account } = useWeb3React();
  const [games, setGames] = useRecoilState(developerGameAtom);
  const claimGroup = useRecoilValue(claimGroupSelector);
  const [claimingGame, setClaimingGame] = useRecoilState(claimingGameAtom);
  const setOpen = useSetRecoilState(roadmapModalAtom);
  useQuery(['developer_info', account], () => fetchDeveloperInfo({ addr: account }), {
    enabled: !!account,
    onSuccess: (data) => {
      if (data.code !== 0) return;
      if (claimingGame) {
        const currentGame = games.find((game) => game.appid === claimingGame.appid);
        currentGame?.nft_claim !== NFTClaim.CLAIMED &&
          claimingGame.nft_level !== undefined &&
          window.open(BADGES[claimingGame.nft_level].claim);
        setClaimingGame(undefined);
      }
      setGames(data.data.account_info || []);
    },
  });

  const tagType = useMemo(
    () => (claimGroup[NFTClaim.CLAIMED].length === games.length ? 'green' : 'red'),
    [claimGroup, games.length],
  );

  return (
    <motion.div
      initial={{ opacity: 0.65, width: 0 }}
      animate={{ opacity: 1, width: 'auto' }}
      exit={{ opacity: 0, width: 0 }}
      className="flex overflow-hidden"
    >
      <div className="flex items-center justify-center gap-3 border-r border-p12-line px-3 text-xl">
        {games.length ? (
          <Tag type={tagType} size="large" value={`${claimGroup[NFTClaim.CLAIMED].length}/${games.length} Airdrop NFT`} />
        ) : (
          <Tag type="red" size="large" value="No NFT yet" />
        )}
      </div>
      <div className="flex items-center justify-center gap-2 border-r border-p12-line px-3 font-['D-DIN'] text-xl font-bold">
        <span className="text-p12-success">{games.length}</span>
        {games.length > 1 ? 'Games' : 'Game'}
      </div>
      <div className="flex items-center justify-center gap-3 border-r border-p12-line px-3 text-xl">
        <p className="cursor-pointer font-['D-DIN'] font-bold" onClick={() => setOpen(true)}>
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
