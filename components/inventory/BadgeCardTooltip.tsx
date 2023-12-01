import { BadgeInfo } from '@/constants';
import React from 'react';
import { Tooltip } from '../tooltip';
import Image from 'next/image';
import classNames from 'classnames';

interface BadgeCardTooltipProps {
  info: BadgeInfo;
}

const BadgeCardTooltip: React.FunctionComponent<BadgeCardTooltipProps> = ({ info }) => {
  return (
    <Tooltip
      placement="bottom"
      label={
        <div className="flex w-[194px] flex-col items-center justify-start p-[14px]">
          <div className="relative h-[180px] w-[180px]">
            <Image src={info.polygonImage} alt="badge" objectFit="contain" layout="fill" />
          </div>
          <div className="mt-6 w-full text-center text-sm font-medium">{info.polygonName}</div>
          <div className="mt-6 flex w-full items-center justify-between text-xs">
            <span className="text-inherit">Rarity:</span>
            <span className="text-inherit">{info.rarity}</span>
          </div>
        </div>
      }
    >
      <div
        className={classNames(
          'nft-backdrop-box relative flex h-[108px] w-[108px] items-center justify-center overflow-hidden rounded opacity-25',
        )}
      >
        <div className="relative h-[80px] w-[80px]">
          <Image src={info.polygonImage} alt="badge" objectFit="contain" layout="fill" />
        </div>
        <div className="absolute bottom-[6px] right-[6px] text-xs text-white/25">0</div>
      </div>
    </Tooltip>
  );
};

export default BadgeCardTooltip;
