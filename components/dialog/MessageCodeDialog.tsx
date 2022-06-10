import React from 'react';
import Button from '../button';

type MessageCodeDialogProps = {
  close?: () => void;
};

export default function MessageCodeDialog({ close }: MessageCodeDialogProps) {
  return (
    <div className="flex h-[710px] w-[750px] flex-col">
      <h2 className="text-center text-xl">Add Message Code</h2>
      <div className="vertical-scroll mt-8 w-full overflow-auto text-xs">
        <p className="leading-5">1. Log in to your Steamworks account.</p>
        <p className="leading-5">2. Find your listed games and enter &quot;Store Presence - Edit Store Page&quot;.</p>
        <div className="mt-5 mb-7">
          <img
            className="h-[220px] w-[440px]"
            src="https://cdn1.p12.games/airdrop/img/message_code_step_01_0610.jpg"
            alt="message_code_01"
          />
        </div>
        <p className="leading-5">3. Add your SIGNATURE on your game description and save.</p>
        <div className="mt-5 mb-7">
          <img
            className="h-[453px] w-[720px]"
            src="https://cdn1.p12.games/airdrop/img/message_code_step_02_0610.jpg"
            alt="message_code_02"
          />
        </div>
        <p className="leading-5">4. Publish to public.</p>
        <div className="mt-5">
          <img
            className="h-[218px] w-[572px]"
            src="https://cdn1.p12.games/airdrop/img/message_code_step_03_0610.jpg"
            alt="message_code_03"
          />
        </div>
      </div>
      <div className="flex justify-end pt-[30px]">
        <Button type="bordered" onClick={close}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
