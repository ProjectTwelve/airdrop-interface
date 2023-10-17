import React, { useMemo } from 'react';
import Image from 'next/image';
import Button from '../button';
import DevP12 from './tokens/DevP12';
import Dialog from '../dialog';
import TokenTabs from './tokens/TokenTabs';
import { InviteRecordDialog } from '../dialog/InviteRecordDialog';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { claimGroupSelector } from '../../store/developer/state';
import { roadmapModalAtom } from '../../store/roadmap/state';
import { GenesisClaim } from '../../constants';
import { invitationCountAtom } from '../../store/invite/state';

function Tokens() {
  const claimGroup = useRecoilValue(claimGroupSelector);
  const setOpen = useSetRecoilState(roadmapModalAtom);
  const [invitation] = useRecoilValue(invitationCountAtom);
  const claimGames = useMemo(() => claimGroup[GenesisClaim.Claimed].length || 0, [claimGroup]);

  return (
    <div className="relative px-3 pt-6 2xl:px-8 2xl:pt-12 ">
      <div className="flex flex-col">
        <TokenTabs />
        <div className="mt-8">
          <DevP12 />
        </div>
        <div className="flex border-b border-gray-600 py-4">
          <div className="mr-4 rounded-lg bg-gray-700/30 p-3">
            <div className="flex items-center justify-between">
              <p className="cursor-pointer font-ddin text-xl font-bold" onClick={() => claimGames && setOpen(true)}>
                {claimGames ? '?,???' : '-,---'}
              </p>
              <Image src="/img/p12.png" width={30} height={30} alt="p12" />
            </div>
            <p className="mt-2 text-xs text-gray">
              From <span className="text-green"> {claimGames} </span> verified {claimGames > 1 ? 'games' : 'game'}
            </p>
          </div>
          <div className="rounded-lg bg-gray-700/30 p-3">
            <div className="flex items-center justify-between">
              <p className="cursor-pointer font-ddin text-xl font-bold" onClick={() => invitation && setOpen(true)}>
                {invitation ? '?,???' : '-,---'}
              </p>
              <Image src="/img/p12.png" width={30} height={30} alt="p12" />
            </div>
            <Dialog render={({ close }) => <InviteRecordDialog close={close} tab="developer" />}>
              <p className="mt-2 cursor-pointer text-xs text-blue">
                My referral list <span className="pl-11 text-blue md:pl-1">&gt;</span>
              </p>
            </Dialog>
          </div>
        </div>
        <div className="flex items-center justify-between py-8 md:flex-col">
          <div className="flex items-center justify-start">
            <p className="mr-3 text-gray">
              {claimGames} {claimGames > 1 ? 'NFTs' : 'NFT'}
            </p>
            <p className="mr-4 text-lg font-medium">Total:</p>
            <p
              className="mr-6 cursor-pointer font-ddin text-[64px] font-bold leading-[64px]"
              onClick={() => claimGames && setOpen(true)}
            >
              {claimGames > 0 ? '?,???' : '-,---'}
            </p>
            <Image src="/img/p12.png" width={60} height={60} alt="p12" />
          </div>
          <div className="md:mt-4">
            <Button className="w-[360px] font-medium sm:w-auto" disabled size="large">
              Claim via P12 (Under Construction)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Tokens);
