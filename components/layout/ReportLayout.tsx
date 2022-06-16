import React from 'react';

export default function ReportLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative mx-auto max-w-[1080px] bg-[#10172D] px-[54px] py-12">
      <img src="/report/bg_header.jpg" alt="report_bg_header" className="absolute top-0 left-0 z-10" />
      <header className="relative z-10 mt-[90px] px-5 pb-4">
        <img src="/report/p12_logo.svg" alt="logo" />
        <h1 className="mt-[30px] text-[72px] font-medium leading-[72px]">Genesis Airdrop</h1>
        <div className="mt-[56px] flex items-center gap-5">
          <p className="rounded-full bg-[#4383FF]/20 py-3 px-5 text-[30px] font-medium leading-[30px] text-[#43BBFF]">Daily</p>
          <p className="rounded-full bg-[#C859FF]/20 py-3 px-5 text-[30px] font-medium leading-[30px] text-[#C859FF]">Weekly</p>
          <p className="text-[30px] font-medium leading-[30px]">[06/15/2022]</p>
        </div>
      </header>
      <main>{children}</main>
      <div className="flex justify-center">
        <img src="/report/copyright.png" alt="copyright" />
      </div>
    </div>
  );
}
