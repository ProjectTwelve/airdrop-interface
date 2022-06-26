import React from 'react';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import Tag from '../tag';
import { gamerInfoAtom } from '../../store/gamer/state';
import { NFT_CLAIM } from '../../constants';

export default function GamerStatus() {
  const gamerInfo = useRecoilValue(gamerInfoAtom);

  return (
    <motion.div
      initial={{ opacity: 0.65, width: 0 }}
      animate={{ opacity: 1, width: 'auto' }}
      exit={{ opacity: 0, width: 0 }}
      className="flex border-r border-p12-line px-3"
    >
      {gamerInfo?.nft_claim === NFT_CLAIM.CLAIMED ? (
        <Tag type="green" size="large">
          <p className="flex items-center justify-center gap-1.5 text-p12-success">
            <img src="/svg/check.svg" alt="check" /> NFT
          </p>
        </Tag>
      ) : (
        <Tag type="red" size="large" value="No NFT yet" />
      )}
    </motion.div>
  );
}
