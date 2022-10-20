import React from 'react';

export default function OMGLuckyDraw() {
  return (
    <div
      className="flex w-full max-w-[412px] flex-col rounded-lg"
      style={{ background: 'linear-gradient(to bottom, #47505980 0%, #25293080 100%)' }}
    >
      <div
        className="flex w-full items-center justify-between rounded-t-lg border border-[#EB9D55] py-5 px-4"
        style={{ background: 'linear-gradient(to top, #934F1F 1.49%, #CB7729 51.25%, #FAB44B 100%)' }}
      >
        <p className="text-center font-semibold" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
          Lucky Draw
        </p>
        <p className="dota__gold text-center font-ddin text-[26px] leading-[28px]">$600 x 5</p>
      </div>
      <div className="flex flex-col items-center rounded-b-lg pt-4 pb-3">
        <p className="max-w-[325px] text-center text-sm font-medium text-p12-gold">
          5 Lucky winners will be selected randomly to walk away with $600.
        </p>
        <div className="relative mt-3 flex h-[94px] w-full flex-col justify-center bg-[url('/img/arcana/present.webp')] bg-cover bg-center">
          <p className="text-center text-sm font-semibold">More Referral</p>
          <p className="mb-1 text-center text-sm font-semibold">Higher Winning Rate</p>
        </div>
      </div>
    </div>
  );
}
