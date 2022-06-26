import React from 'react';
import Button from '../button';
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
        <div className="max-w-[780px]">
          <h2 className="text-center text-xl">P12 Genesis Airdrop Roadmap</h2>
          <div className="flex gap-5">
            <div className="flex flex-col items-center justify-start">
              <div className="h-[26px] w-[26px] rounded-full border-2 border-p12-success text-center text-xs font-medium leading-[22px]">
                1
              </div>
              <div className="h-[194px] w-[2px] bg-p12-success"></div>
              <div className="h-[26px] w-[26px] rounded-full border-2 border-p12-sub text-center text-xs font-medium leading-[22px]">
                2
              </div>
              <div className="h-[94px] w-[2px] bg-p12-sub"></div>
              <div className="h-[26px] w-[26px] rounded-full border-2 border-p12-sub text-center text-xs font-medium leading-[22px]">
                3
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-[10px]">
                <h3 className="border-b border-p12-line pb-1.5 text-sm font-medium leading-[26px]">Stage 1（LIVE）</h3>
                <div className="py-5 text-xs">
                  <p className="flex justify-start gap-1.5 leading-5">
                    <img src="/svg/check.svg" className="h-4 w-4" alt="check" />
                    P12 Genesis Airdrop for Steam developers launch.
                  </p>
                  <p className="flex justify-start gap-1.5 leading-5">
                    <img src="/svg/check.svg" className="h-4 w-4" alt="check" />
                    Developers verify their games and get Airdrop NFT - &quot;P12 Genesis&quot;.
                  </p>
                  <p className="flex justify-start gap-1.5 leading-5">
                    <img src="/svg/check.svg" className="h-4 w-4" alt="check" />
                    &quot;P12 Genesis&quot; has 4 forms: Legendary, Epic, Rare and Uncommon.
                  </p>
                  <p className="flex justify-start gap-1.5 leading-5 text-p12-success">
                    <img src="/svg/check.svg" className="h-4 w-4" alt="check" />
                    Amount of token granted is shown as &apos;?&apos; in Stage 1, which will unveil in Stage2.
                  </p>
                  <div className="flex items-start justify-start gap-1.5 leading-5">
                    <div className="flex h-5 w-4 flex-none items-center justify-center">
                      <img src="/svg/check.svg" className="h-4 w-4" alt="check" />
                    </div>
                    Referral mechanism - when other developers successfully verify their games through your invitation link, as
                    referrer you get up to 24% of that game&apos;s token.
                  </div>
                  <div className="flex justify-start gap-1.5 leading-5">
                    <img src="/svg/check.svg" className="h-4 w-4" alt="check" />
                    Airdrop community channels in <SocialMedia size="small" />
                  </div>
                </div>
              </div>
              <div className="mb-[10px]">
                <h3 className="border-b border-p12-line pb-2 text-sm font-medium">Stage 2 (Coming in 22Q3)</h3>
                <div className="py-5 text-xs">
                  <p className="flex justify-start gap-1.5 leading-5">
                    <span className="h-4 w-4 text-center text-sm">·</span>
                    P12 Airdrop for Steam gamers launch. Gamers can verify Steam accounts to get Gamer Genesis NFT, in a fair
                    way.
                  </p>
                  <p className="flex justify-start gap-1.5 leading-5">
                    <span className="h-4 w-4 text-center text-sm">·</span>
                    Amount of tokens and calculation formula will be revealed.
                  </p>
                </div>
              </div>
              <div className="mb-[10px]">
                <h3 className="border-b border-p12-line pb-2 text-sm font-medium">Stage 3</h3>
                <div className="py-5 text-xs">
                  <p className="flex justify-start gap-1.5 leading-5">
                    <span className="h-4 w-4 text-center text-sm">·</span>
                    P12 Platform go live. All developers and gamers who held P12 Genesis NFT can claim tokens from within P12
                    Platform.
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
