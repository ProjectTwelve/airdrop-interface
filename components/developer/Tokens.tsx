import React, { useMemo } from 'react';
import Image from 'next/image';
import Button from '../button';
import MyP12 from './tokens/MyP12';
import Dialog from '../dialog';
import TokenTabs from './tokens/TokenTabs';
import { InviteRecordDialog } from '../dialog/InviteRecordDialog';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { claimGroupSelector, NFTClaim } from '../../store/developer/state';
import { useQuery } from 'react-query';
import { useWeb3React } from '@web3-react/core';
import { fetchDeveloperInvitation } from '../../lib/api';
import { roadmapModalAtom } from '../../store/roadmap/state';

function Tokens() {
  const { account } = useWeb3React();
  const claimGroup = useRecoilValue(claimGroupSelector);
  const setOpen = useSetRecoilState(roadmapModalAtom);
  const claimGames = useMemo(() => claimGroup[NFTClaim.CLAIMED].length || 0, [claimGroup]);

  const { data: invitation } = useQuery(['invitation_info', account], () => fetchDeveloperInvitation({ addr: account }), {
    enabled: !!account,
    refetchOnWindowFocus: false,
    select: (data) => {
      if (data.code !== 0) return [];
      return data.data.invitation_info;
    },
  });

  return (
    <div className="relative px-8 pt-12 md:px-4 md:pt-6">
      <div className="flex flex-col">
        <TokenTabs />
        <div className="mt-8">
          <MyP12 />
        </div>
        <div className="flex gap-4 border-b border-p12-line py-6">
          <div className="rounded-lg bg-p12-black/80 p-3">
            <div className="flex items-center justify-between">
              <p className="cursor-pointer font-['D-DIN'] text-xl font-bold" onClick={() => claimGames && setOpen(true)}>
                {claimGames ? '?,???' : '-,---'}
              </p>
              <Image src="/img/p12.png" width={30} height={30} alt="p12" />
            </div>
            <p className="mt-2 text-xs text-p12-sub">
              From <span className="text-p12-success"> {claimGames} </span> verified {claimGames > 1 ? 'games' : 'game'}
            </p>
          </div>
          <div className="rounded-lg bg-p12-black/80 p-3">
            <div className="flex items-center justify-between">
              <p
                className="cursor-pointer font-['D-DIN'] text-xl font-bold"
                onClick={() => invitation?.length && setOpen(true)}
              >
                {invitation?.length ? '?,???' : '-,---'}
              </p>
              <Image src="/img/p12.png" width={30} height={30} alt="p12" />
            </div>
            <Dialog render={({ close }) => <InviteRecordDialog close={close} />}>
              <p className="mt-2 cursor-pointer text-xs text-p12-link">
                My referral list <span className="pl-11 text-p12-link md:pl-1">&gt;</span>
              </p>
            </Dialog>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 py-8 md:flex-col">
          <div className="flex items-center justify-start">
            <p className="mr-3 text-p12-sub">
              {claimGames} {claimGames > 1 ? 'NFTs' : 'NFT'}
            </p>
            <p className="mr-4 text-lg font-medium">Total:</p>
            <p
              className="mr-6 cursor-pointer font-['D-DIN'] text-[64px] font-bold leading-[64px]"
              onClick={() => claimGames && setOpen(true)}
            >
              {claimGames > 0 ? '?,???' : '-,---'}
            </p>
            <Image src="/img/p12.png" width={60} height={60} alt="p12" />
          </div>
          <div>
            <Button className="w-[280px] font-medium" disabled size="large">
              Claim to my wallet (Coming)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Tokens);
