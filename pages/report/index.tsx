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
        <div className="rounded-2xl bg-[#7980AF]/20 p-[30px]">1</div>
        <div className="rounded-2xl bg-[#7980AF]/20 p-[30px]">2</div>
      </div>
    </div>
  );
}

Report.getLayout = function getLayout(page: ReactElement) {
  return <ReportLayout>{page}</ReportLayout>;
};
