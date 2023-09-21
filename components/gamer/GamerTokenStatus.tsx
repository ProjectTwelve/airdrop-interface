import React from 'react';
import classNames from 'classnames';
import { GamerInfoData } from '../../lib/types';
import { shortenAddress } from '../../utils';
import { BADGE_CONTRACT_ADDRESS, GenesisClaim_TYPE } from '../../constants';

export default function GamerTokenStatus({ data }: { data?: GamerInfoData }) {
  return (
    <div className="mt-9 flex rounded-2xl border border-gray-600 py-[30px] md:flex-col md:py-0">
      {[
        { label: 'ID', value: data?.nft_id || '--' },
        {
          label: 'Contract address',
          value: data?.credential ? shortenAddress(BADGE_CONTRACT_ADDRESS) : '--',
        },
        { label: 'Role', value: data?.credential ? 'Gamer' : '--' },
        {
          label: 'Status',
          value: data?.nft_claim ? GenesisClaim_TYPE[data.nft_claim] : 'NO NFT YET',
        },
      ].map((item) => (
        <div
          key={item.label}
          className={classNames(
            'flex flex-1 flex-col items-center justify-center border-r border-gray-600',
            'md:flex-row md:border-r-0 md:border-b md:py-2',
            'last:border-none',
          )}
        >
          <p className="text-sm text-gray md:mr-2 lg:text-xs xl:text-xs">{item.label}</p>
          <p className="font-medium">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
