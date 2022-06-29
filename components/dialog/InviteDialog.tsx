import React, { useState } from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useCopyToClipboard } from 'react-use';
import Dialog from '../dialog';
import Button from '../button';
import Message from '../message';
import Tag from '../tag';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { inviteModalAtom } from '../../store/invite/state';
import { fetchReferralCode } from '../../lib/api';
import { InviteRecordDialog } from './InviteRecordDialog';
import { isConnectPopoverOpen } from '../../store/web3/state';

function InviteDialog() {
  const { data: account } = useAccount();
  const [open, setOpen] = useRecoilState(inviteModalAtom);
  const [isConnect, setIsConnect] = useState<boolean>(false);
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);
  const [inviteLink, setInviteLink] = useState('Please connect your wallet first');
  const [, copyToClipboard] = useCopyToClipboard();

  useQuery(['invite', account?.address], () => fetchReferralCode({ wallet_address: account?.address }), {
    enabled: !!account?.address,
    refetchOnWindowFocus: false,
    onSuccess: (data) => setInviteLink(window.location.origin + '/?code=' + data.data.referral_code),
  });

  const handleTwitterShareClick = () => {
    const shareLink = 'Join @_p12_ P12 Genesis Airdrop Steam gamers and get Soul-Bound NFT which captures your unique gaming credentials for free!';
    window.open(
      decodeURIComponent(
        'https://twitter.com/intent/tweet?text=' + shareLink + '&hashtags=NFTGiveaway&hashtags=P12&url=' + inviteLink,
      ),
      '_blank',
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(op) => setOpen(op)}
      onExitComplete={() => {
        setConnectOpen(isConnect);
        setIsConnect(false);
      }}
      render={() => (
        <div className="w-[720px]">
          <h2 className="text-center text-xl">My P12 Airdrop Invitation Link</h2>
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
                Connect wallet and copy your referral link below.
              </div>
              <div className="basis-1/4 px-2.5 text-center text-xs leading-5">
                Send the link to your Steam developer or gamer friends.
                {account?.address && (
                  <p className="flex justify-center">
                    Or share on &nbsp;
                    <img
                      onClick={handleTwitterShareClick}
                      className="cursor-pointer"
                      src="/img/twitter_share.png"
                      alt="share"
                    />
                  </p>
                )}
              </div>
              <div className="basis-1/4 px-2.5 text-center text-xs leading-5">
                Game developers verify their published games with your link. Gamers sign in and sync their profile.
              </div>
              <div className="basis-1/4 px-2.5 text-center text-xs leading-5">
                As the referrer, you will get <span className="font-bold">x%</span> tokens as rewards from each verified game or
                referred gamer.
              </div>
            </div>
          </div>
          <div className="my-4 h-[1px] bg-p12-line"></div>
          <div className="py-4">
            <p className="text-center text-xs leading-5">
              The proportion of reward token is based on the rarity of P12 badge you hold. →P12 Badge updates in &nbsp;
              <a href="https://discord.gg/p12" target="_blank">
                <img className="inline h-5 w-5" src="/img/discord.png" width={20} height={20} alt="discord" />
              </a>
            </p>
            <div className="mt-7 flex items-start justify-center">
              <div className="mr-2">
                <div className="flex h-6 items-center justify-start text-xs">Rarity-&gt;</div>
                <div className="mt-2.5 flex items-center justify-start text-xs leading-5">Get tokens-&gt;</div>
              </div>
              <div className="mr-2">
                <div className="flex h-6 flex-none items-center justify-center text-xs">
                  <Tag size="small" value="Orange" type="orange" />
                </div>
                <div className="mt-2.5 text-center text-sm font-bold">24%</div>
              </div>
              <div className="mr-2">&gt;</div>
              <div className="mr-2">
                <div className="flex h-6 flex-none items-center justify-center text-xs">
                  <Tag size="small" value="Purple" type="purple" />
                </div>
                <div className="mt-2.5 text-center text-sm font-bold">18%</div>
              </div>
              <div className="mr-2">&gt;</div>
              <div className="mr-2">
                <div className="flex h-6 flex-none items-center justify-center text-xs">
                  <Tag size="small" value="Blue" type="blue" />
                </div>
                <div className="mt-2.5 text-center text-sm font-bold">16%</div>
              </div>
              <div className="mr-2">&gt;</div>
              <div className="mr-2">
                <div className="flex h-6 flex-none items-center justify-center text-xs">
                  <Tag size="small" value="Green" type="green" />
                </div>
                <div className="mt-2.5 text-center text-sm font-bold">12%</div>
              </div>
              <div className="mr-2">&gt;</div>
              <div className="mr-2">
                <div className="flex h-6 flex-none items-center justify-center text-xs">
                  <Tag size="small" value="White" type="white" />
                </div>
                <div className="mt-2.5 text-center text-sm font-bold">9%</div>
              </div>
              <div className="mr-2">&gt;</div>
              <div>
                <div className="flex h-6 flex-none items-center justify-center text-xs">
                  <span className="text-xs text-p12-sub">No Badge</span>
                </div>
                <div className="mt-2.5 text-center text-sm font-bold">8%</div>
              </div>
            </div>
          </div>
          {account?.address && (
            <div className="relative mt-6 flex items-center justify-between rounded-lg bg-p12-black/80 p-5 text-sm">
              {inviteLink}
              <Button
                size="small"
                type="gradient"
                onClick={() => {
                  copyToClipboard(inviteLink);
                  toast.success(<Message message="Copied to clipboard" title="Mission Complete" />);
                }}
              >
                Copy
              </Button>
            </div>
          )}
          <div className="mt-3 ml-4 h-6">
            {account?.address && (
              <Dialog render={({ close }) => <InviteRecordDialog close={close} />}>
                <p className="cursor-pointer text-p12-link">My Referral List</p>
              </Dialog>
            )}
          </div>
          <div className="mt-3 flex justify-end">
            <Button type="bordered" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {!account?.address && (
              <Button
                className="ml-6"
                type="gradient"
                onClick={() => {
                  setOpen(false);
                  setIsConnect(true);
                }}
              >
                Connect wallet
              </Button>
            )}
          </div>
        </div>
      )}
    />
  );
}

export default React.memo(InviteDialog);
