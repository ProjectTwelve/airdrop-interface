import React from 'react';
import Dialog from '../../dialog';
import MessageCodeDialog from '../../dialog/MessageCodeDialog';
import { useSetRecoilState } from 'recoil';
import { roadmapModalAtom } from '../../../store/roadmap/state';

export function AddGameTips() {
  const setOpen = useSetRecoilState(roadmapModalAtom);

  return (
    <div className="rounded-xl border-2 border-p12-tips bg-p12-tips/20 p-6 sm:p-3">
      <div>
        1. &nbsp;Can&apos;t find your game? Please double check your app ID, or join our Discord &nbsp;
        <a href="https://discord.gg/p12" target="_blank">
          <img className="inline h-5 w-5" src="/img/discord.png" width={20} height={20} alt="discord" />
        </a>
        &nbsp; to ask for help.
      </div>
      <div className="mt-2">
        2. &nbsp;Why is my amount of tokens displayed with a question mark - &apos;?&apos; -
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
    <div className="rounded-xl border-2 border-p12-tips bg-p12-tips/20 p-6 sm:p-3">
      <div className="">
        You need to <span className="font-medium">add the signature on your game description</span> to prove you are the creator
        of the game.
      </div>
      <div className="mt-6">
        1. &nbsp;Will this action affect my game? No, it&apos;s just a one-off verification to prove your authorship over the
        game. Once you have succeeded in verifying your game, you are free to remove the signature chunk from your game
        description.
      </div>
      <div className=" mt-2">
        2. &nbsp;How to add the signature?
        <Dialog render={({ close }) => <MessageCodeDialog close={close} />}>
          <span className="cursor-pointer text-p12-link"> click here </span>
        </Dialog>
        to see a step-by-step guide.
      </div>
    </div>
  );
}
