import React, { useMemo } from 'react';
import Image from 'next/image';
import Button from '../button';
import MyP12 from './tokens/MyP12';
import Dialog from '../dialog';
import TokenTabs from './tokens/TokenTabs';
import { InviteRecordDialog } from '../dialog/InviteRecordDialog';
import { useRecoilValue } from 'recoil';
import { claimGroupSelector, NFTClaim } from '../../store/developer/state';
import { useQuery } from 'react-query';
import { useWeb3React } from '@web3-react/core';
import { fetchDeveloperInvitation } from '../../lib/api';

function Tokens() {
  const { account } = useWeb3React();
  const claimGroup = useRecoilValue(claimGroupSelector);

  const { data: invitation } = useQuery(['invitation_info', account], () => fetchDeveloperInvitation({ addr: account }), {
    enabled: !!account,
    refetchOnWindowFocus: false,
    select: (data) => {
      if (data.code !== 0) return [];
      return data.data.invitation_info;
    },
  });

  const pieces = useMemo(() => {
    let piece = 0;
    claimGroup[NFTClaim.CLAIMED].length > 0 && (piece += 1);
    invitation && invitation.length > 0 && (piece += 1);
    return piece;
  }, [claimGroup, invitation]);

  return (
    <div className="relative px-8 pt-12">
      <div className="flex flex-col">
        <TokenTabs />
        <div className="mt-8">
          <MyP12 />
        </div>
        <div className="flex gap-4 border-b border-p12-line py-6">
          <div className="rounded-lg bg-p12-black/60 p-3">
            <div className="flex items-center justify-between">
              <p className="font-['D-DIN'] text-xl font-bold">{claimGroup[NFTClaim.CLAIMED].length ? '?,???' : '-,---'}</p>
              <Image src="/img/p12.png" width={30} height={30} alt="p12" />
            </div>
            <p className="mt-2 text-xs text-p12-sub">
              From <span className="text-p12-success"> {claimGroup[NFTClaim.CLAIMED].length} </span> verified Games
            </p>
          </div>
          <div className="rounded-lg bg-p12-black/60 p-3">
            <div className="flex items-center justify-between">
              <p className="font-['D-DIN'] text-xl font-bold">{invitation?.length ? '?,???' : '-,---'}</p>
              <Image src="/img/p12.png" width={30} height={30} alt="p12" />
            </div>
            <Dialog render={({ close }) => <InviteRecordDialog close={close} />}>
              <p className="mt-2 cursor-pointer text-xs text-p12-link">
                My invitation list <span className="pl-11 text-p12-link">&gt;</span>
              </p>
            </Dialog>
          </div>
        </div>
        <div className="flex items-center justify-between py-8">
          <div className="flex items-center justify-start">
            <p className="mr-3 text-p12-sub">{pieces} pieces</p>
            <p className="mr-4 text-lg font-bold">Total:</p>
            <p className="mr-6 font-['D-DIN'] text-[64px] font-bold leading-[64px]">{pieces > 0 ? '?,???' : '-,---'}</p>
            <Image src="/img/p12.png" width={60} height={60} alt="p12" />
          </div>
          <div>
            <Button className="w-[280px] font-bold" disabled size="large">
              Claim to my wallet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Tokens);
