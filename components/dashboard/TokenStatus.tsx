import React from 'react';
import classNames from 'classnames';
import { useSBTLevelConfig } from '@/hooks/dashboard/useSBTLevelConfig';

export type TokenStatusData = {
  id?: string;
  birthday?: string;
  role?: string;
  rarity?: number;
};
export default function TokenStatus({ data }: { data?: TokenStatusData }) {
  const rarityConfig = useSBTLevelConfig(data?.rarity);

  return (
    <div className="flex rounded-2xl border border-gray-600 py-3">
      {[
        { label: 'ID', value: data?.id || '--' },
        { label: 'Birthday', value: data?.birthday ?? '--' },
        { label: 'Role', value: data?.role ?? '--' },
        // { label: 'Rarity', value: data?.rarity ?? '--' },
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
      <div
        className={classNames(
          'flex flex-1 flex-col items-center justify-center border-r border-gray-600',
          'md:flex-row md:border-b md:border-r-0 md:py-2',
          'last:border-none',
        )}
      >
        <p className="text-sm text-gray md:mr-2 lg:text-xs xl:text-xs">Rarity</p>
        <p className={classNames('text-sm', rarityConfig.text)}>{rarityConfig.rarity}</p>
      </div>
    </div>
  );
}
