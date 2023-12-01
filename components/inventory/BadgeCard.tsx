import React from 'react';
import { BadgeInfo } from '@/constants';
import Image from 'next/image';
import classNames from 'classnames';

type BadgeCardProps = {
  info: BadgeInfo;
};

const BadgeCard: React.FunctionComponent<BadgeCardProps> = ({ info }) => {
  return (
    <div className={classNames('nft-backdrop-box relative h-[300px] w-full overflow-hidden rounded opacity-25')}>
      <div className="relative my-7.5 flex items-center justify-center">
        <div className="relative h-[180px] w-[180px]">
          <Image src={info.polygonImage} alt="badge" objectFit="contain" layout="fill" />
        </div>
        <div className="absolute bottom-0 right-2 text-xl font-semibold text-white/25">0</div>
      </div>
      <div className="px-7.5 text-center">{info.polygonName}</div>
    </div>
  );
};

export default BadgeCard;
