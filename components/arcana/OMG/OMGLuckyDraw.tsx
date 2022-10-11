import React from 'react';
import { useSetRecoilState } from 'recoil';
import { arcanaInviteDialogAtom } from '../../../store/arcana/state';

export default function OMGLuckyDraw() {
  const setInviteDialog = useSetRecoilState(arcanaInviteDialogAtom);

  return (
    <div className="flex w-full max-w-[300px] flex-col rounded-lg md:max-w-[450px]">
      <div
        className="w-full rounded-t-lg border border-[#EB9D55] py-[30px]"
        style={{ background: 'linear-gradient(to top, #934F1F 1.49%, #CB7729 51.25%, #FAB44B 100%)' }}
      >
        <p className="text-center text-xl font-semibold" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
          Lucky Draw
        </p>
        <p className="dota__gold mt-3 text-center font-ddin text-[42px] leading-[42px]">$800 x 3</p>
      </div>
      <div className="dota__box flex flex-1 flex-col items-center justify-between gap-4 rounded-b-lg px-[20px] py-[48px]">
        <p className="text-center font-medium leading-[30px] text-p12-gold">3 lucky winners will walk away with $800</p>
        <div>
          <p className="mb-3 text-center text-sm font-medium leading-6 text-p12-gold">Increase the probability of winning</p>
          <button onClick={() => setInviteDialog(true)} className="dota__button dota__gold w-full py-3 text-xl leading-6">
            Get more Votes!
          </button>
        </div>
      </div>
    </div>
  );
}
