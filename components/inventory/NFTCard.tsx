import React from 'react';
import { GalxeBadge } from '@/constants';
import Image from 'next/image';
import ChainIcon from '@/components/inventory/ChainIcon';
import classNames from 'classnames';

type NFTCardProps = {
  info: GalxeBadge;
};

const NFTCard: React.FunctionComponent<NFTCardProps> = ({ info }) => {
  return (
    <div className={classNames('nft-backdrop-box relative h-[300px] w-full overflow-hidden rounded')}>
      <div className="relative my-7.5 flex items-center justify-center">
        <div className="relative h-[180px] w-[180px]">
          <Image src={info.image} alt="badge" objectFit="contain" layout="fill" />
        </div>
        <div className="absolute bottom-0 right-2 text-xl font-semibold text-green">{info.count}</div>
      </div>
      <ChainIcon chainId={info.chainId} className="absolute left-2 top-2 w-7.5" />
      <div className="px-7.5 text-center">{info.galxeCampaign?.name}</div>
    </div>
  );
};

export default NFTCard;
