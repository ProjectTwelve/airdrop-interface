import React from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import Tag from '../tag';
import { gamerInfoAtom } from '../../store/gamer/state';
import { NFT_CLAIM } from '../../constants';
import { isBABTHolderAtom } from '../../store/web3/state';

export default function GamerStatus() {
  const gamerInfo = useRecoilValue(gamerInfoAtom);
  const isBABTHolder = useRecoilValue(isBABTHolderAtom);

  return (
    <motion.div
      initial={{ opacity: 0.65, width: 0 }}
      animate={{ opacity: 1, width: 'auto' }}
      exit={{ opacity: 0, width: 0 }}
      className={classNames('flex px-3', !isBABTHolder && 'border-r border-p12-line')}
    >
      {gamerInfo?.nft_claim === NFT_CLAIM.CLAIMED ? (
        <Tag type="green" size="large">
          <p className="flex items-center justify-center  text-p12-success">
            <img className="mr-1.5" src="/svg/check.svg" alt="check" /> NFT
          </p>
        </Tag>
      ) : (
        <Tag type="red" size="large" value="No NFT yet" />
      )}
    </motion.div>
  );
}
