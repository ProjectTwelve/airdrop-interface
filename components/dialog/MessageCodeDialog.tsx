import React from 'react';
import Button from '../button';
import Image from 'next/image';

type MessageCodeDialogProps = {
  close?: () => void;
};

export default function MessageCodeDialog({ close }: MessageCodeDialogProps) {
  return (
    <div className="flex h-[618px] w-[780px] flex-col">
      <h2 className="text-center text-xl">Add Message Code</h2>
      <div className="vertical-scroll mt-8 w-full overflow-auto text-xs">
        <div className="ml-[150px]">
          <p className="leading-5">1. Log in to your steamworks account.</p>
          <p className="leading-5">2. Find your listed game and enter &quot;Store Presence - Edit Store Page&quot;.</p>
          <div className="mt-5 mb-7">
            <Image src="/img/message_code_step_01@2x.jpg" width={310} height={155} alt="message_code_01" />
          </div>
          <p className="leading-5">3. Add your message-code on your game description and save.</p>
          <div className="mt-5">
            <Image src="/img/message_code_step_02@2x.jpg" width={413} height={295} alt="message_code_02" />
          </div>
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
