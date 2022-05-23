import React from 'react';
import Button from '../button';
import Image from 'next/image';
import SocialMedia from '../socialMedia';

type RoadmapDialogProps = {
  close?: () => void;
};

export default function RoadmapDialog({ close }: RoadmapDialogProps) {
  return (
    <div className="w-[780px]">
      <h2 className="text-center text-xl">P12 Airdrop Roadmap</h2>
      <div className="flex gap-5">
        <div className="flex flex-col items-center justify-start">
          <div className="h-[26px] w-[26px] rounded-full border-2 border-p12-success text-center text-xs font-bold leading-[22px]">
            1
          </div>
          <div className="h-[174px] w-[2px] bg-p12-success"></div>
          <div className="h-[26px] w-[26px] rounded-full border-2 border-p12-sub text-center text-xs font-bold leading-[22px]">
            2
          </div>
          <div className="h-[112px] w-[2px] bg-p12-sub"></div>
          <div className="h-[26px] w-[26px] rounded-full border-2 border-p12-sub text-center text-xs font-bold leading-[22px]">
            3
          </div>
        </div>
        <div>
          <div className="mb-[10px]">
            <h3 className="border-b border-p12-line pb-1.5 text-sm font-bold leading-[26px]">Stage 1（Released）</h3>
            <div className="py-5 text-xs">
              <p className="flex items-center justify-start gap-1.5 leading-5">
                <Image src="/svg/check.svg" width={16} height={16} alt="check" />
                P12 Airdrop for Steam developers launched.
              </p>
              <p className="flex items-center justify-start gap-1.5 leading-5">
                <Image src="/svg/check.svg" width={16} height={16} alt="check" />
                Developers are able to verify their games and get NFT coupon - &quot;P12 Genesis&quot;.
              </p>
              <p className="flex items-center justify-start gap-1.5 leading-5">
                <Image src="/svg/check.svg" width={16} height={16} alt="check" />
                &quot;P12 Genesis&quot; has 4 forms: Orange, Purple, Blue and Green.
              </p>
              <p className="flex items-center justify-start gap-1.5 leading-5 text-p12-success">
                <Image src="/svg/check.svg" width={16} height={16} alt="check" />
                Amount of your verified P12 is shown as &apos;?&apos; in Stage 1, which will unfold in Stage2 as well as
                calculation formula.
              </p>
              <p className="flex items-center justify-start gap-1.5 leading-5">
                <span className="h-4 w-4 text-center text-sm">·</span>
                Invitation-reward function is available, the amount of reward $P12 is shown as &quot;?&quot;.
              </p>
              <p className="flex items-center justify-start gap-1.5 leading-5">
                <span className="h-4 w-4 text-center text-sm">·</span>
                Airdrop community channels in <SocialMedia size="small" />
              </p>
            </div>
          </div>
          <div className="mb-[10px]">
            <h3 className="border-b border-p12-line pb-2 text-sm font-bold">Stage 2</h3>
            <div className="py-5 text-xs">
              <p className="flex items-center justify-start gap-1.5 leading-5">
                <span className="h-4 w-4 text-center text-sm">·</span>
                Specific amount of $P12 and the calculation formula will be displayed.
              </p>
              <p className="flex items-center justify-start gap-1.5 leading-5">
                <span className="h-4 w-4 text-center text-sm">·</span>
                P12 Airdrop for Steam gamers launched.
              </p>
              <p className="flex items-center justify-start gap-1.5 leading-5">
                <span className="h-4 w-4 text-center text-sm">·</span>
                Gamers are able to verify steam accounts and get NFT coupons.
              </p>
            </div>
          </div>
          <div className="mb-[10px]">
            <h3 className="border-b border-p12-line pb-2 text-sm font-bold">Stage 3</h3>
            <div className="py-5 text-xs">
              <p className="flex items-center justify-start gap-1.5 leading-5">
                <span className="h-4 w-4 text-center text-sm">·</span>
                $P12 ICO.
              </p>
              <p className="flex items-center justify-start gap-1.5 leading-5">
                <span className="h-4 w-4 text-center text-sm">·</span>
                Developers and gamers are able to claim $P12 to wallets.
              </p>
            </div>
          </div>
          <div className="flex justify-end pt-[10px]">
            <Button type="bordered" onClick={close}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
