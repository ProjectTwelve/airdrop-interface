import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useGamerVerifiedCount } from '@/hooks/ranking';

export default function VerifiedGamer() {
  const { data: verified } = useGamerVerifiedCount();
  const commonCount = useMemo(
    () => (verified ? (verified.verifiedCount[4] || 0) + (verified.verifiedCount[5] || 0) : 0),
    [verified],
  );
  const levelCount = useMemo(
    () => [
      { color: 'text-orange', num: verified?.verifiedCount[0] ?? 0 },
      { color: 'text-purple', num: verified?.verifiedCount[1] ?? 0 },
      { color: 'text-blue', num: verified?.verifiedCount[2] ?? 0 },
      { color: 'text-green-300', num: verified?.verifiedCount[3] ?? 0 },
      {
        color: 'text-gray-300',
        num: commonCount,
      },
    ],
    [commonCount, verified?.verifiedCount],
  );

  return (
    <div>
      <h3 className="text-sm font-medium leading-5">Verified Gamers</h3>
      <div className="gradient__box mt-3 grid grid-cols-3 py-[21px] leading-[90px] 2xl:flex 2xl:items-center">
        <div className="h-[40px] w-full border-[#949FA9]/50 2xl:w-[130px] 2xl:border-r">
          <p className="h-[14px] text-center text-xs">Total</p>
          <p className="mt-1 text-center font-ddin text-xl leading-5">{new Intl.NumberFormat().format(verified?.total ?? 0)}</p>
        </div>
        {levelCount.map((item, index) => (
          <p
            key={index}
            className={classNames(
              'h-[40px] flex-1 border-[#949FA9]/50 text-center font-ddin text-lg leading-[40px]',
              '2xl:border-r 2xl:last:border-r-0',
              item.color,
            )}
          >
            {new Intl.NumberFormat().format(item.num)}
          </p>
        ))}
      </div>
    </div>
  );
}
