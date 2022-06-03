import Dialog from '../../dialog';
import React from 'react';
import MessageCodeDialog from '../../dialog/MessageCodeDialog';
import { useSetRecoilState } from 'recoil';
import { roadmapModalAtom } from '../../../store/roadmap/state';

export function AddGameTips() {
  const setOpen = useSetRecoilState(roadmapModalAtom);

  return (
    <div className="rounded-xl border-2 border-p12-tips bg-p12-tips/20 p-5 text-xs tracking-tight">
      <div className="text-xs leading-5">
        1. Can&apos;t find your game? Please double check your app ID, or join our Discord &nbsp;
        <img className="inline h-5 w-5" src="/img/discord.png" width={20} height={20} alt="discord" />
        &nbsp; to ask for help.
      </div>
      <div className="mt-2 text-xs leading-5">
        2. Why is my amount of tokens displayed with a question mark - &apos;?&apos; - 
        <span className="cursor-pointer text-p12-link" onClick={() => setOpen(true)}>
          &nbsp;click here&nbsp;
        </span>
        to know more.
      </div>
    </div>
  );
}

export function OwnershipTips() {
  return (
    <div className="rounded-xl border-2 border-p12-tips bg-p12-tips/20 p-5 text-xs leading-5 tracking-tight">
      <div className="leading-5">
        You need to <span className="text-p12-success">add the signature on your game description</span> to prove you are the
        creator of the game.
      </div>
      <div className="mt-6 leading-5">
        1. Will this action affect my game? No, it&apos;s just a one-off verification to prove your authorship over the game. Once you have succeeded in verifying your game,
        you are free to remove the signature chunk from your game description.
      </div>
      <div className=" mt-2 leading-5">
        2. How to add the signature?
        <Dialog render={({ close }) => <MessageCodeDialog close={close} />}>
          <span className="cursor-pointer text-p12-link"> Click here </span>
        </Dialog>
        to see a step-by-step guide.
      </div>
    </div>
  );
}
