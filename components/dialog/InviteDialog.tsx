import React, { useState } from 'react';
import Dialog from '../dialog';
import Button from '../button';
import { useRecoilState } from 'recoil';
import { inviteModalAtom } from '../../store/invite/state';
import { useWeb3React } from '@web3-react/core';
import { useCopyToClipboard } from 'react-use';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import { fetchReferralCode } from '../../lib/api';

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
        <div className="w-[600px]">
          <h2 className="text-center text-xl">My P12 Airdrop Invite Link</h2>
          <div className="mt-8 rounded-lg border-2 border-p12-tips bg-p12-tips/20 p-5 text-xs leading-5">
            · You can share the link below with your Steam developer friends.
            <br />
            · You will be rewarded with $P12 once they have successfully verified their games.
            <br />
            · You will be able to get 18% of $P12 for each verified game from your invite link.
            <br />· You can check your rewarded $P12 on &quot;My P12 tokens&quot; page.
          </div>
          <div className="relative mt-6 break-words rounded-lg bg-p12-black/80 p-5 pb-16 text-sm">
            {inviteLink}
            {account && (
              <div className="absolute right-5 bottom-5">
                <Button
                  size="small"
                  type="gradient"
                  onClick={() => {
                    copyToClipboard(inviteLink);
                    toast.success('Copied to clipboard');
                  }}
                >
                  copy
                </Button>
              </div>
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
