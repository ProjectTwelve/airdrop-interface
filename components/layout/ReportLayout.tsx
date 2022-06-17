import React from 'react';

export default function ReportLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative mx-auto max-w-[1080px] bg-[#10172D] px-[54px] py-12">
      <img src="/report/bg_header.jpg" alt="bg_header" className="absolute top-0 left-0 z-[1]" />
      <header className="relative z-[2] mt-[90px] px-5 pb-4">
        <img src="/report/p12_logo.svg" alt="logo" />
        <h1 className="mt-[30px] text-[72px] font-medium leading-[72px]">Genesis Airdrop</h1>
        <div className="mt-[56px] flex items-center gap-5">
          <p className="rounded-full bg-[#4383FF]/20 py-3 px-5 text-[30px] font-medium leading-[30px] text-[#43BBFF]">Daily</p>
          <p className="rounded-full bg-[#C859FF]/20 py-3 px-5 text-[30px] font-medium leading-[30px] text-[#C859FF]">Weekly</p>
          <p className="text-[30px] font-medium leading-[30px]">[06/15/2022]</p>
        </div>
      </header>
      <main className="relative z-[2]">{children}</main>
      <div className="relative z-[2] mt-1.5 flex flex-col items-center justify-center">
        <p className="mb-[120px] text-[24px] leading-[36px]">
          Visit <span className="text-[#1EDB8C]">airdrop.p12.games</span> for full list
        </p>
        <img src="/report/copyright.png" alt="copyright" />
      </div>
      <img src="/report/bg_footer.jpg" alt="bg_footer" className="absolute bottom-0 left-0 z-[1]" />
    </div>
  );
}
