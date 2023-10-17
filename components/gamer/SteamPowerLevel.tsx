import React from 'react';
import { Tooltip } from '@/components/tooltip';
import { digitalFormat } from '@/utils/format';
import { GamerInfoData } from '@/lib/types';

type SteamPowerLevelProps = {
  data?: GamerInfoData;
};

export default function SteamPowerLevel({ data }: SteamPowerLevelProps) {
  return (
    <div className="grid grid-cols-3 gap-4 py-7.5 sm:my-4 sm:gap-2 md:grid-cols-1">
      <div>
        <div className="flex items-center">
          <h4 className="text-base/6 font-semibold">Account</h4>
          <Tooltip label="Determined by the basic information of the Steam account.">
            <img src="/svg/question.svg" className="ml-1.5 cursor-pointer" width={18} height={18} alt="question" />
          </Tooltip>
        </div>
        <div className="bg-gradient-item flex-center mt-3 gap-1.5 rounded-lg py-6 font-ddin">
          <span className="text-gradient-yellow text-[34px]/10 font-bold">{digitalFormat.integer(data?.account_pl)}</span>
          <img className="w-10" src="/img/pl/power_level.png" alt="pl" />
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <h4 className="text-base/6 font-semibold">SS games</h4>
          <Tooltip label="Determined by game experiences with over 1000 hours of playtime.">
            <img src="/svg/question.svg" className="ml-1.5 cursor-pointer" width={18} height={18} alt="question" />
          </Tooltip>
        </div>
        <div className="bg-gradient-item flex-center mt-3 gap-1.5 rounded-lg py-6 font-ddin">
          <span className="text-gradient-yellow text-[34px]/10 font-bold">{digitalFormat.integer(data?.ss_games_pl)}</span>
          <img className="w-10" src="/img/pl/power_level.png" alt="pl" />
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <h4 className="text-base/6 font-semibold">Value</h4>
          <Tooltip label="Determined by the library value and inventory value.">
            <img src="/svg/question.svg" className="ml-1.5 cursor-pointer" width={18} height={18} alt="question" />
          </Tooltip>
        </div>
        <div className="bg-gradient-item flex-center mt-3 gap-1.5 rounded-lg py-6 font-ddin">
          <span className="text-gradient-yellow text-[34px]/10 font-bold">{digitalFormat.integer(data?.value_pl)}</span>
          <img className="w-10" src="/img/pl/power_level.png" alt="pl" />
        </div>
      </div>
    </div>
  );
}
