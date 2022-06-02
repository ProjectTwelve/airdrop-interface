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
        1. Can&apos;t find my game? Please double check your app ID, or join our Discord &nbsp;
        <img className="inline h-5 w-5" src="/img/discord.png" width={20} height={20} alt="discord" />
        &nbsp; to ask for help.
      </div>
      <div className="mt-2 text-xs leading-5">
        2. Why is my amount of P12 tokens displayed with a question mark - &apos;?&apos;
        <span className="cursor-pointer text-p12-link" onClick={() => setOpen(true)}>
          &nbsp;click here&nbsp;
        </span>
        to learn.
      </div>
    </div>
  );
}

export function OwnershipTips() {
  return (
    <div className="rounded-xl border-2 border-p12-tips bg-p12-tips/20 p-5 text-xs leading-5 tracking-tight">
      <div className="leading-5">
        You need to <span className="text-p12-success">Add the message-code on your game description</span> to prove you are the
        game creator.
      </div>
      <div className="mt-6 leading-5">
        1. Will this action affect my game? We will not link your game and wallet address through the existing public API. Once
        you have succeed in verifying your game, you can remove the message.
      </div>
      <div className=" mt-2 leading-5">
        2. How to add the message-code?
        <Dialog render={({ close }) => <MessageCodeDialog close={close} />}>
          <span className="cursor-pointer text-p12-link"> click here </span>
        </Dialog>
        to check for the steps!
      </div>
    </div>
  );
}
