import React from 'react';
import { Tooltip } from '../tooltip';

export default function SteamValue() {
  return (
    <div className="flex md:flex-col">
      <div className="w-full max-w-[300px] xs:max-w-full">
        <div className="flex items-center">
          <h4 className="text-xl font-medium">My Account Value</h4>
          <Tooltip label="My Account Value">
            <img src="/svg/question.svg" className="ml-2 cursor-pointer" width={18} height={18} alt="question" />
          </Tooltip>
        </div>
        <div className="mt-3 rounded-lg border border-[#FFAA2C] bg-[#F36E22]/20 py-6 text-center font-ddin text-[48px] font-bold leading-[48px] text-[#FFAA2C]">
          14543
        </div>
      </div>
      <div className="ml-9 w-full md:ml-0 md:mt-4">
        <div className="flex items-center">
          <h4 className="text-xl font-medium">My Inventory Value</h4>
          <Tooltip label="My Account Value">
            <img src="/svg/question.svg" className="ml-2 cursor-pointer" width={18} height={18} alt="question" />
          </Tooltip>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-5 xs:grid-cols-1">
          <div className="bg-gradient-item flex rounded-xl p-3">
            <div className="h-[72px] w-[112px] bg-[#CEDCFF]/10"></div>
            <div className="ml-4">
              <p className="font-medium">CS:GO</p>
              <div className="font-ddin text-[48px] font-bold leading-[48px] text-p12-success">2525</div>
            </div>
          </div>
          <div className="bg-gradient-item flex rounded-xl p-3">
            <div className="h-[72px] w-[112px] bg-[#CEDCFF]/10"></div>
            <div className="ml-4">
              <p className="font-medium">DOTA2</p>
              <div className="font-ddin text-[48px] font-bold leading-[48px] text-p12-success">2525</div>
            </div>
          </div>
          <div className="bg-gradient-item flex rounded-xl p-3">
            <div className="h-[72px] w-[112px] bg-[#CEDCFF]/10"></div>
            <div className="ml-4">
              <p className="font-medium">TF2</p>
              <div className="font-ddin text-[48px] font-bold leading-[48px] text-p12-success">2525</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
