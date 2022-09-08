import React, { useMemo } from 'react';
import { Tooltip } from '../tooltip';
import { getSteamGameImage } from '../../utils';
import { GamerInfoData } from '../../lib/types';

type SteamValueProps = {
  data?: GamerInfoData;
};

export default function SteamValue({ data }: SteamValueProps) {
  const inventoriesValue = useMemo(
    () => [
      { name: 'CS: GO', img: getSteamGameImage(730), value: data?.csgo_value },
      { name: 'DOTA 2', img: getSteamGameImage(570), value: data?.dota2_value },
      { name: 'TF 2', img: getSteamGameImage(440), value: data?.tf2_value },
    ],
    [data?.csgo_value, data?.dota2_value, data?.tf2_value],
  );
  const hasInventoriesValue = useMemo(() => !!inventoriesValue.find((i) => i.value), [inventoriesValue]);

  if (!data) return null;

  return (
    <div className="mt-8 flex sm:mt-4 md:flex-col">
      <div className="w-full max-w-[300px] md:max-w-full">
        <div className="flex items-center">
          <h4 className="text-xl font-medium">My Account Value</h4>
          <Tooltip label="Represents your Steam store value of games owned.">
            <img src="/svg/question.svg" className="ml-2 cursor-pointer" width={18} height={18} alt="question" />
          </Tooltip>
        </div>
        <div className="mt-3 rounded-lg border border-p12-orange bg-[#F36E22]/20 py-6 text-center font-ddin text-[48px] font-bold leading-[48px] text-p12-orange">
          {Math.floor(data.value || 0)}
        </div>
      </div>
      <div className="ml-9 w-full md:ml-0 md:mt-4">
        <div className="flex items-center">
          <h4 className="text-xl font-medium">My Inventory Value</h4>
          <Tooltip label="Represents your inventory value of CSGO, DOTA2 and TF2.">
            <img src="/svg/question.svg" className="ml-2 cursor-pointer" width={18} height={18} alt="question" />
          </Tooltip>
        </div>
        {hasInventoriesValue ? (
          <div className="mt-3 grid grid-cols-3 gap-5 md:grid-cols-1 lg:mt-5">
            {inventoriesValue.map((item) =>
              item.value ? (
                <div key={item.name} className="bg-gradient-item flex rounded-xl p-3">
                  <img width={112} height={72} src={item.img} className="rounded-lg object-cover lg:hidden" alt="game" />
                  <div className="ml-2 2xl:ml-4">
                    <p className="font-medium">{item.name}</p>
                    <div className="mt-1.5 font-ddin text-[42px] font-bold leading-[42px] text-p12-success lg:text-2xl xl:text-2xl">
                      {Math.floor(item.value)}
                    </div>
                  </div>
                </div>
              ) : null,
            )}
          </div>
        ) : (
          <div className="mt-3 h-[98px] w-full rounded-2xl bg-p12-black/80 text-center text-xs leading-[98px] text-p12-bg">
            No data
          </div>
        )}
      </div>
    </div>
  );
}
