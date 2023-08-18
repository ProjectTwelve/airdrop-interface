import React from 'react';
import classNames from 'classnames';
import { shortenAddress } from '@/utils';
import { NFT_CLAIM, NFT_CLAIM_TYPE } from '@/constants';

export type TokenStatusData = {
  id?: string;
  contract?: string;
  role?: string;
  claim?: NFT_CLAIM;
};
export default function TokenStatus({ data }: { data?: TokenStatusData }) {
  return (
    <div className="flex rounded-2xl border border-gray-600 py-3">
      {[
        { label: 'ID', value: data?.id || '--' },
        {
          label: 'Contract',
          value: data?.contract ? shortenAddress(data.contract, 3) : '--',
        },
        { label: 'Role', value: data?.role ?? '--' },
        {
          label: 'Status',
          value: data?.claim ? NFT_CLAIM_TYPE[data.claim] : '--',
        },
      ].map((item) => (
        <div
          key={item.label}
          className={classNames(
            'flex flex-1 flex-col items-center justify-center border-r border-gray-600',
            'md:flex-row md:border-b md:border-r-0 md:py-2',
            'last:border-none',
          )}
        >
          <p className="text-sm text-gray md:mr-2 lg:text-xs xl:text-xs">{item.label}</p>
          <p className="text-sm">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
