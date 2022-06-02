import React from 'react';
import Button from '../button';
import Image from 'next/image';
import SocialMedia from '../socialMedia';
import Dialog from './index';
import { useRecoilState } from 'recoil';
import { roadmapModalAtom } from '../../store/roadmap/state';

export default function RoadmapDialog() {
  const [open, setOpen] = useRecoilState(roadmapModalAtom);

  return (
    <Dialog
      open={open}
      onOpenChange={(op) => setOpen(op)}
      render={() => (
        <div className="w-[780px]">
          <h2 className="text-center text-xl">P12 Airdrop Roadmap</h2>
          <div className="flex gap-5">
            <div className="flex flex-col items-center justify-start">
              <div className="h-[26px] w-[26px] rounded-full border-2 border-p12-success text-center text-xs font-medium leading-[22px]">
                1
              </div>
              <div className="h-[174px] w-[2px] bg-p12-success"></div>
              <div className="h-[26px] w-[26px] rounded-full border-2 border-p12-sub text-center text-xs font-medium leading-[22px]">
                2
              </div>
              <div className="h-[112px] w-[2px] bg-p12-sub"></div>
              <div className="h-[26px] w-[26px] rounded-full border-2 border-p12-sub text-center text-xs font-medium leading-[22px]">
                3
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-[10px]">
                <h3 className="border-b border-p12-line pb-1.5 text-sm font-medium leading-[26px]">Stage 1（Released）</h3>
                <div className="py-5 text-xs">
                  <p className="flex justify-start gap-1.5 leading-5">
                    <Image src="/svg/check.svg" width={16} height={16} alt="check" />
                    P12 Airdrop for Steam developers launched.
                  </p>
                  <p className="flex justify-start gap-1.5 leading-5">
                    <Image src="/svg/check.svg" width={16} height={16} alt="check" />
                    Developers are able to verify their games and get Airdrop NFT - &quot;P12 Genesis&quot;.
                  </p>
                  <p className="flex justify-start gap-1.5 leading-5">
                    <Image src="/svg/check.svg" width={16} height={16} alt="check" />
                    &quot;P12 Genesis&quot; has 4 forms: Orange, Purple, Blue and Green.
                  </p>
                  <p className="flex justify-start gap-1.5 leading-5 text-p12-success">
                    <Image src="/svg/check.svg" width={16} height={16} alt="check" />
                    Amount of your verified P12 is shown as &apos;?&apos; in Stage 1, which will unfold in Stage2 as well as
                    calculation formula.
                  </p>
                  <p className="flex items-start justify-start gap-1.5 leading-5">
                    <div className="flex h-5 w-4 flex-none items-center justify-center">
                      <Image src="/svg/check.svg" width={16} height={16} alt="check" />
                    </div>
                    Invitation-reward function is available, when developers successfully verify their games through the invite
                    link, every inviter will be able to get 18% of P12 tokens for each game as rewards.
                  </p>
                  <div className="flex justify-start gap-1.5 leading-5">
                    <Image src="/svg/check.svg" width={16} height={16} alt="check" />
                    Airdrop community channels in <SocialMedia size="small" />
                  </div>
                </div>
              </div>
              <div className="mb-[10px]">
                <h3 className="border-b border-p12-line pb-2 text-sm font-medium">Stage 2</h3>
                <div className="py-5 text-xs">
                  <p className="flex justify-start gap-1.5 leading-5">
                    <span className="h-4 w-4 text-center text-sm">·</span>
                    Specific amount of P12 tokens and the calculation formula will be displayed.
                  </p>
                  <p className="flex justify-start gap-1.5 leading-5">
                    <span className="h-4 w-4 text-center text-sm">·</span>
                    P12 Airdrop for Steam gamers launched.
                  </p>
                  <p className="flex justify-start gap-1.5 leading-5">
                    <span className="h-4 w-4 text-center text-sm">·</span>
                    Gamers are able to verify steam accounts and get airdrop NFT.
                  </p>
                </div>
              </div>
              <div className="mb-[10px]">
                <h3 className="border-b border-p12-line pb-2 text-sm font-medium">Stage 3</h3>
                <div className="py-5 text-xs">
                  <p className="flex justify-start gap-1.5 leading-5">
                    <span className="h-4 w-4 text-center text-sm">·</span>
                    P12 tokens ICO.
                  </p>
                  <p className="flex justify-start gap-1.5 leading-5">
                    <span className="h-4 w-4 text-center text-sm">·</span>
                    Developers and gamers are able to claim P12 tokens to wallets.
                  </p>
                </div>
              </div>
              <div className="flex justify-end pt-[10px]">
                <Button type="bordered" onClick={() => setOpen(false)}>
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
}
