import React, { ReactNode, useMemo } from 'react';
import Tag from '../tag';
import { GamerInfoData } from '../../lib/types';
import { GAMER_BADGES, GAMER_NFT_LEVEL } from '../../constants';

export default function CardVotingEntry({ data }: { data: GamerInfoData }) {
  const nftTags = useMemo<Record<GAMER_NFT_LEVEL, ReactNode>>(
    () => ({
      [GAMER_NFT_LEVEL.ORANGE]: <Tag size="small" value="Legendary" type="orange" />,
      [GAMER_NFT_LEVEL.PURPLE]: <Tag size="small" value="Epic" type="purple" />,
      [GAMER_NFT_LEVEL.BLUE]: <Tag size="small" value="Rare" type="blue" />,
      [GAMER_NFT_LEVEL.GREEN]: <Tag size="small" value="Uncommon" type="greenLight" />,
      [GAMER_NFT_LEVEL.WHITE]: <Tag size="small" value="Common" type="white" />,
      [GAMER_NFT_LEVEL.REKT]: <Tag size="small" value="Common" type="white" />,
    }),
    [],
  );
  return (
    <div className="rounded-2xl bg-p12-black/80 p-4 backdrop-blur 2xl:p-6">
      <h3 className="text-xl font-medium">Voting Entry</h3>
      <div className="mt-4 flex 2xl:mt-6">
        <div className="flex h-[146px] w-[146px] items-center justify-center 2xl:flex-none">
          <img className="w-full" src={GAMER_BADGES[data.nft_level!].img} alt="" />
        </div>
        <div className="ml-5">
          <h3 className="text-lg font-medium">P12 Genesis Soul-Bound NFT</h3>
          {nftTags[data.nft_level!]}
          <p className="mt-6 text-sm font-medium text-p12-success 2xl:mt-10">You are eligible to vote!</p>
        </div>
      </div>
    </div>
  );
}
