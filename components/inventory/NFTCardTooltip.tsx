import { GalxeBadge } from '@/constants';
import React from 'react';
import ChainIcon from './ChainIcon';
import { ChainIdToName, transferRarity } from '@/utils/inventory';
import Image from 'next/image';
import { Tooltip } from '../tooltip';
import classNames from 'classnames';

interface NFTCardTooltipProps {
  info: GalxeBadge;
  onClick?: () => void;
  selectedBadge: GalxeBadge | null;
}

const NFTCardTooltip: React.FunctionComponent<NFTCardTooltipProps> = ({ info, onClick, selectedBadge }) => {
  return (
    <Tooltip
      placement="bottom"
      label={
        <div className="flex w-[194px] flex-col items-center justify-start p-[14px]">
          <div className="relative h-[180px] w-[180px]">
            <Image src={info.image} alt="badge" objectFit="contain" layout="fill" />
          </div>
          <div className="mt-6 w-full text-center text-sm font-medium">{info.galxeCampaign?.name}</div>
          <div className="mt-4 flex w-full items-center justify-between text-xs">
            <span className="text-inherit">Chain:</span>
            <span className="flex items-center gap-1">
              <ChainIcon chainId={info.chainId} className="w-4" />
              <span className="text-inherit">{ChainIdToName(info.chainId)}</span>
            </span>
          </div>
          <div className="mt-1 flex w-full items-center justify-between text-xs">
            <span className="text-inherit">Rarity:</span>
            <span className="text-inherit">{transferRarity(info.galxeCampaign?.rarity) ?? info.galxeCampaign?.rarity}</span>
          </div>
          <div className="mt-1 flex w-full items-center justify-between text-xs">
            <span className="text-inherit">Amount:</span>
            <span className="text-inherit">{info.count || 0}</span>
          </div>
        </div>
      }
    >
      <div
        onClick={() => {
          onClick?.();
        }}
        className={classNames(
          'nft-backdrop-box relative flex h-[108px] w-[108px] cursor-pointer items-center justify-center overflow-hidden rounded',
          {
            'border-[#A5A6AB]':
              selectedBadge &&
              selectedBadge.galxeCampaign?.stringId === info.galxeCampaign?.stringId &&
              selectedBadge.chainId === info.chainId,
          },
        )}
      >
        <div className="relative h-[80px] w-[80px]">
          <Image src={info.image} alt="badge" objectFit="contain" layout="fill" />
        </div>
        <ChainIcon chainId={info.chainId} className="absolute left-[6px] top-[6px] w-[20px]" />
        <div className="absolute bottom-[6px] right-[6px] text-xs text-green">{info.count}</div>
      </div>
    </Tooltip>
  );
};

export default NFTCardTooltip;
