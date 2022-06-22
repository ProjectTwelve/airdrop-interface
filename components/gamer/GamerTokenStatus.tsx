import React from 'react';
import classNames from 'classnames';
import { GamerInfoData } from '../../lib/types';
import { shortenAddress } from '../../utils';
import { GAMER_NFT_CONTRACT_ADDRESS, NFT_CLAIM_TYPE } from '../../constants';

export default function GamerTokenStatus({ data }: { data?: GamerInfoData }) {
  return (
    <div className="mt-9 flex rounded-2xl border border-p12-line py-[30px] md:flex-col md:py-0">
      {[
        { label: 'ID', value: data?.nft_id || '--' },
        {
          label: 'Contract address',
          value: data?.credential ? shortenAddress(GAMER_NFT_CONTRACT_ADDRESS) : '--',
        },
        { label: 'Role', value: data?.credential ? 'Gamer' : '--' },
        {
          label: 'Status',
          value: data?.nft_claim ? NFT_CLAIM_TYPE[data.nft_claim] : 'NO NFT YET',
        },
      ].map((item) => (
        <div
          key={item.label}
          className={classNames(
            'flex flex-1 flex-col items-center justify-center border-r border-p12-line',
            'md:flex-row md:gap-2 md:border-r-0 md:border-b md:py-2',
            'last:border-none',
          )}
        >
          <p className="text-sm text-p12-sub">{item.label}</p>
          <p className="font-medium">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
