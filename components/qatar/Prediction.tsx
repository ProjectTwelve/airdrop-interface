import React from 'react';

export default function Prediction() {
  const onDialogClick = () => {
    // if (isObserver || !address || !isGenesisNFTHolder || isEnd) return;
    // setOpenDialog(true);
  };

  return (
    <div className="qatar__box mx-auto mt-4 flex max-w-[840px] p-6 md:p-3">
      <div className="relative h-[230px] w-[230px] cursor-pointer overflow-hidden rounded-lg" onClick={onDialogClick}>
        <div className="flex h-full w-full animate-omg flex-col items-center justify-center bg-black/60 font-medium hover:bg-white/10">
          <p className="text-[70px] leading-[84px]">?</p>
          <p className="text-sm">Click to Answer</p>
        </div>
      </div>
      <div className="relative ml-12 w-full flex-1">
        <h3 className="text-center text-2xl leading-7">The Champion</h3>
        <p className="mt-2 text-center text-xs leading-4">Which team won WorldCup in 2002</p>
        <button className="qatar__button absolute bottom-0 w-full py-3">Submit</button>
      </div>
    </div>
  );
}
