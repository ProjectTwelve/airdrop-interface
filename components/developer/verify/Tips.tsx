import Dialog from '../../dialog';
import RoadmapDialog from '../../dialog/RoadmapDialog';
import React from 'react';
import MessageCodeDialog from '../../dialog/MessageCodeDialog';

export function AddGameTips() {
  return (
    <div className="rounded-xl border-2 border-p12-tips bg-p12-tips/20 p-5 font-['.PingFang_SC'] text-xs">
      <div className="text-xs leading-5">
        1. Can’t find my game? Please double check your app ID, or join our Discord &nbsp;
        <img className="inline h-5 w-5" src="/img/discord.png" width={20} height={20} alt="discord" />
        &nbsp; to ask for help
      </div>
      <div className="mt-2 text-xs leading-5">
        2. Why is my amount of $P12 tokens displayed with a question mark - &apos;?&apos;
        <Dialog render={({ close }) => <RoadmapDialog close={close} />}>
          <span className="cursor-pointer text-p12-link"> click here </span>
        </Dialog>
        to learn
      </div>
    </div>
  );
}

export function OwnershipTips() {
  return (
    <div className="rounded-xl border-2 border-p12-tips bg-p12-tips/20 p-5 font-['.PingFang_SC'] text-xs leading-5">
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
