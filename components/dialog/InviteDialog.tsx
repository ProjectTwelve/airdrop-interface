import React, { useState } from 'react';
import Dialog from '../dialog';
import Button from '../button';
import Message from '../message';
import { useRecoilState } from 'recoil';
import { inviteModalAtom } from '../../store/invite/state';
import { useWeb3React } from '@web3-react/core';
import { useCopyToClipboard } from 'react-use';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import { fetchReferralCode } from '../../lib/api';
import Image from 'next/image';

function InviteDialog() {
  const { account } = useWeb3React();
  const [open, setOpen] = useRecoilState(inviteModalAtom);
  const [inviteLink, setInviteLink] = useState('Please connect your wallet first');
  const [, copyToClipboard] = useCopyToClipboard();

  useQuery(['invite', account], () => fetchReferralCode({ wallet_address: account }), {
    enabled: !!account,
    refetchOnWindowFocus: false,
    onSuccess: (data) => setInviteLink(window.location.origin + '?code=' + data.data.referral_code),
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(op) => setOpen(op)}
      render={() => (
        <div className="w-[720px]">
          <h2 className="text-center text-xl">My P12 Airdrop Invite Link</h2>
          <div className="mt-8 rounded-lg py-4 text-xs">
            <div className="flex items-center justify-around">
              <Image src="/img/invite_step_01.png" alt="invite_01" width={100} height={100} />
              <Image src="/img/invite_step_02.png" alt="invite_01" width={100} height={100} />
              <Image src="/img/invite_step_03.png" alt="invite_01" width={100} height={100} />
              <Image src="/img/invite_step_04.png" alt="invite_01" width={100} height={100} />
            </div>
            <div className="flex items-center justify-center">
              <div className="h-[26px] w-[26px] rounded-full border-2 border-p12-success text-center text-xs font-medium leading-[22px]">
                1
              </div>
              <div className="h-[2px] w-[155px] bg-p12-success"></div>
              <div className="h-[26px] w-[26px] rounded-full border-2 border-p12-success text-center text-xs font-medium leading-[22px]">
                2
              </div>
              <div className="h-[2px] w-[155px] bg-p12-success"></div>
              <div className="h-[26px] w-[26px] rounded-full border-2 border-p12-success text-center text-xs font-medium leading-[22px]">
                3
              </div>
              <div className="h-[2px] w-[155px] bg-p12-success"></div>
              <div className="h-[26px] w-[26px] rounded-full border-2 border-p12-success text-center text-xs font-medium leading-[22px]">
                4
              </div>
            </div>
            <div className="mt-5 flex items-start justify-around">
              <div className="basis-1/4 px-2.5 text-center text-xs leading-5">
                Connect wallet and copy your Invite link below.
              </div>
              <div className="basis-1/4 px-2.5 text-center text-xs leading-5">
                Send the link to your Steam game developer friends.
              </div>
              <div className="basis-1/4 px-2.5 text-center text-xs leading-5">
                Steam game developer verify games with your link.
              </div>
              <div className="basis-1/4 px-2.5 text-center text-xs leading-5">
                As the inviter, you will be able to get 18% of P12 tokens from each verified game as rewards.
              </div>
            </div>
          </div>
          <div className="relative mt-6 flex items-center justify-between rounded-lg bg-p12-black/80 p-5 text-sm">
            {inviteLink}
            {account && (
              <Button
                size="small"
                type="gradient"
                onClick={() => {
                  copyToClipboard(inviteLink);
                  toast.success(<Message message="Copied to clipboard" title="Succeed" />);
                }}
              >
                copy
              </Button>
            )}
          </div>
          <div className="mt-7 h-[1px] bg-p12-line"></div>
          <div className="mt-7 flex justify-end">
            <Button type="bordered" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      )}
    />
  );
}

export default React.memo(InviteDialog);
