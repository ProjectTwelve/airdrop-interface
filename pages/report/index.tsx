import ReportLayout from '../../components/layout/ReportLayout';
import type { ReactElement } from 'react';

export default function Report() {
  return (
    <div className="relative z-10">
      <div className="mt-[120px] border-b border-[#676F8B] py-4 text-center text-[30px] font-medium leading-[36px]">
        Developer
      </div>
      <div className="flex justify-between py-6">
        <div>
          <p className="font-['D-DIN] text-[80px] font-medium leading-[80px]">152</p>
          <p className="text-[30px] font-medium leading-[30px]">Total Games</p>
        </div>
        <div>
          <p className="font-['D-DIN] text-[80px] font-medium leading-[80px]">+3</p>
          <p className="text-[30px] font-medium leading-[30px]">Today</p>
        </div>
      </div>
      <div className="flex flex-col gap-[30px] py-6">
        <div className="flex rounded-2xl bg-[#7980AF]/20 p-[30px]">
          <div className="mr-[30px] h-[128px] w-[160px] rounded-lg border border-[#FFAA2C] bg-[#F36E22]/20 p-3">
            <p className="text-center font-['D-DIN'] text-[60px] font-bold leading-[60px] text-[#FFAA2C]">7</p>
            <p className="my-3 h-[1px] bg-[#FFAA2C]/30"></p>
            <p className="text-center text-xl leading-5 text-[#FFAA2C]">Current Rank</p>
          </div>
          <div className="h-[128px] w-[200px] overflow-hidden rounded-2xl">
            <img
              src="https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg?t=1650611880"
              alt="steam_game"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="rounded-2xl bg-[#7980AF]/20 p-[30px]">2</div>
      </div>
    </div>
  );
}

Report.getLayout = function getLayout(page: ReactElement) {
  return <ReportLayout>{page}</ReportLayout>;
};
