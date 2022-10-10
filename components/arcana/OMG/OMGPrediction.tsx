import React from 'react';

export default function OMGPrediction() {
  const isSubmit = true;
  return (
    <div className="dota__box relative flex w-full max-w-[430px] flex-col items-center justify-start rounded-lg">
      {isSubmit ? (
        <div className="w-full">
          <div className="rounded-t-lg bg-gradient-prediction px-5 py-4">
            <p className="text-xl font-medium leading-6">Held Place</p>
            <p className="text-sm">Where is the Ti 11 Main Event held?</p>
          </div>
          <div className="h-0.5 bg-p12-gradient"></div>
          <div className="mt-[60px] flex flex-col items-center justify-start">
            <div className="h-[200px] w-[200px] rounded-lg bg-black"></div>
          </div>
          <div className="mt-3 flex h-[20px] flex-col items-center justify-around">
            <div className="text-lg font-medium leading-5">Singapore</div>
          </div>
          <div className="mt-[60px] mb-[30px] grid grid-cols-2">
            <div className="flex flex-col items-center justify-center border-r-2 border-[#474C55]/50">
              <h3 className="text-sm font-medium">Total Tipsters</h3>
              <p className="font-ddin text-[30px] font-bold">8888</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-sm font-medium text-p12-gold">Prize</h3>
              <p className="flex items-center justify-center font-ddin text-[30px] font-bold text-p12-gold">$1000</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-7 py-12">
          <p className="text-xl font-medium">Held Place</p>
          <p className="text-sm">Where is the Ti 11 Main Event held?</p>
          <div className="relative mt-5 h-[200px] w-[200px] cursor-pointer overflow-hidden rounded-lg">
            <div className="flex h-full w-full flex-col items-center justify-center bg-black/60 font-medium hover:bg-white/10">
              <p className="text-[82px] leading-[82px]">?</p>
              <p className="text-sm">Click to Answer</p>
            </div>
          </div>
          <div className="mt-3 flex h-[20px] flex-col items-center justify-around">
            <div className="text-lg font-medium leading-5"></div>
          </div>
          <div className="mt-[60px] w-full">
            <div className="dota__button dota__gold dota__button--disable h-[50px] text-center text-xl leading-[50px]">
              Submit
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
