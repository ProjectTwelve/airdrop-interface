import React from 'react';
import Image from 'next/image';
import SocialMedia from '../socialMedia';
import { useRecoilValue } from 'recoil';
import { isSocialMediaClickSelector } from '../../store/invite/state';
import { gamerInfoAtom } from '../../store/gamer/state';

export default function GamerP12() {
  const isClicked = useRecoilValue(isSocialMediaClickSelector);
  const gamerInfo = useRecoilValue(gamerInfoAtom);
  const iconStatus = new Map([
    [true, '/svg/check_success.svg'],
    [false, '/svg/close_error.svg'],
  ]);

  return (
    <div>
      <h3 className="text-xl font-medium">My P12 tokens</h3>
      <div className="mt-3 mb-8 flex rounded-2xl border border-p12-line py-[30px] md:flex-col md:py-0">
        <div className="flex flex-1 flex-col items-center justify-center border-r border-p12-line md:border-r-0 md:border-b md:py-2">
          <div className="flex items-center justify-center gap-2">
            <Image src={iconStatus.get(!!gamerInfo?.steam_id) || ''} width={26} height={26} alt="icon" />
            <p className="font-medium">Sign in with Steam</p>
          </div>
          <p className="font-medium">account and sync profile</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center border-r border-p12-line  md:border-r-0 md:border-b md:py-2">
          <div className="flex items-center justify-center gap-2">
            <Image src={iconStatus.get(false) || ''} width={26} height={26} alt="icon" />
            <p className="font-medium">NO NFT YET</p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 border-r border-p12-line  md:border-r-0 md:border-b md:py-2">
          <Image src={iconStatus.get(isClicked) || ''} width={26} height={26} alt="icon" />
          <p className="font-medium">Join us on</p>
          <SocialMedia />
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 md:py-2">
          <Image src="/svg/wait_info.svg" width={26} height={26} alt="icon" />
          <p className="font-medium">P12 token TGE</p>
        </div>
      </div>
    </div>
  );
}
