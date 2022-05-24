import React from 'react';

function VerifyGames() {
  return (
    <div className="flex gap-16 py-12 px-8">
      <div className="w-full">
        <h2 className="text-xl font-bold">
          Step1: Add steam games
          <span className="text-sm font-normal">&nbsp;(you can add 3 games at once)</span>
        </h2>
        <div className="mt-7 rounded-xl border-2 border-p12-tips bg-p12-tips/20 p-5">
          <div className="text-xs leading-5">
            1. Can’t find my game? Please double check your app ID, or join our Discord &nbsp;
            <img className="inline h-5 w-5" src="/img/discord.png" width={20} height={20} alt="discord" />
            &nbsp; to ask for help
          </div>
          <div className="mt-2 text-xs leading-5">
            2. Why is my amount of $P12 tokens displayed with a question mark - &apos;?&apos;{' '}
            <span className="text-p12-link cursor-pointer">click here</span> to learn
          </div>
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-xl font-bold">Step2：Verify Ownership</h2>
        <div className="mt-7 rounded-xl border-2 border-p12-tips bg-p12-tips/20 p-5">Ownership</div>
      </div>
    </div>
  );
}

export default React.memo(VerifyGames);
