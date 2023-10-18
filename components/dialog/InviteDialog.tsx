import { EventCategory, EventName } from '@/constants/event';
import { useCopyArcanaReferralLink, useCopyReferralLink, useTotalInvitationCount } from '@/hooks/dashboard/referral';
import React, { useCallback, useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useAccount } from 'wagmi';
import { useIsMounted } from '../../hooks/useIsMounted';
import { inviteModalAtom } from '../../store/invite/state';
import { isConnectPopoverOpen } from '../../store/web3/state';
import Button from '../button';
import BlueButton from '../button/BlueButton';
import Dialog from '../dialog';
import { TwitterSvg } from '../svg/TwitterSvg';
import Tag from '../tag';
import { InviteRecordDialog } from './InviteRecordDialog';

function InviteDialog() {
  const { address } = useAccount();
  const isMounted = useIsMounted();
  const [open, setOpen] = useRecoilState(inviteModalAtom);
  const [isConnect, setIsConnect] = useState<boolean>(false);
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);
  const { referralLink, copyToClipboard, onTwitterShare } = useCopyReferralLink();
  const { arcanaReferralLink, copyToClipboardArcana, onArcanaTwitterShare } = useCopyArcanaReferralLink();
  const totalInvitationCount = useTotalInvitationCount();

  useEffect(() => {
    if (open) {
      ReactGA.event({ category: EventCategory.Global, action: EventName.ToInvitation });
    }
  }, [open]);

  const renderOptions = useCallback(() => {
    if (!isMounted) return null;
    return (
      <>
        <h3 className="mt-9 text-base/6 font-semibold">Option 1: by joining P12 Arcana</h3>
        <div className="mt-3 flex gap-4">
          <div className="relative flex flex-grow items-center justify-between overflow-hidden rounded-lg bg-white/15 px-5 py-3 text-sm/6">
            <p className="w-full truncate">{arcanaReferralLink}</p>
          </div>
          <BlueButton
            type="blue"
            className="px-5 text-base/5"
            onClick={() => {
              if (!address) return;
              copyToClipboardArcana();
            }}
          >
            Copy
          </BlueButton>
          <div
            onClick={onArcanaTwitterShare}
            className="flex-center h-12 cursor-pointer truncate rounded-lg bg-white/15 px-5 text-base/5 font-semibold hover:bg-white/30"
          >
            Share <TwitterSvg color="#fff" />
          </div>
        </div>

        <h3 className="mt-9 text-base/6 font-semibold">Option 2: by verifying Steam Account</h3>
        <div className="mt-3 flex gap-4">
          <div className="relative flex flex-grow items-center justify-between overflow-hidden rounded-lg bg-white/15 px-5 py-3 text-sm/6">
            <p className="w-full truncate">{referralLink}</p>
          </div>
          <BlueButton
            type="blue"
            className="px-5 text-base/5"
            onClick={() => {
              if (!address) return;
              copyToClipboard();
            }}
          >
            Copy
          </BlueButton>
          <div
            onClick={onTwitterShare}
            className="flex-center h-12 cursor-pointer rounded-lg bg-white/15 px-5 text-base/5 font-semibold hover:bg-white/30"
          >
            Share <TwitterSvg color="#fff" />
          </div>
        </div>
      </>
    );
  }, [
    isMounted,
    arcanaReferralLink,
    onArcanaTwitterShare,
    referralLink,
    onTwitterShare,
    address,
    copyToClipboardArcana,
    copyToClipboard,
  ]);

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
          <h2 className="text-center text-xl/5.5">Invite friend to mint P12 Genesis NFT</h2>
          {renderOptions()}
          <div className="mt-12">
            <p className="text-xs leading-5">
              The proportion of reward token is based on the rarity of P12 badge you hold. →P12 Badge updates in &nbsp;
              <a href="https://discord.gg/p12" target="_blank">
                <img className="inline h-5 w-5" src="/img/discord.png" width={20} height={20} alt="discord" />
              </a>
            </p>
            <div className="mt-4 flex items-start">
              <div className="mr-2">
                <div className="flex h-6 items-center justify-start text-xs">Rarity-&gt;</div>
                <div className="mt-2.5 flex items-center justify-start text-xs leading-5">Get tokens-&gt;</div>
              </div>
              <div className="mr-2">
                <div className="flex h-6 flex-none items-center justify-center text-xs">
                  <Tag size="small" value="Legendary" type="orange" />
                </div>
                <div className="mt-2.5 text-center text-sm font-bold">24%</div>
              </div>
              <div className="mr-2">&gt;</div>
              <div className="mr-2">
                <div className="flex h-6 flex-none items-center justify-center text-xs">
                  <Tag size="small" value="Epic" type="purple" />
                </div>
                <div className="mt-2.5 text-center text-sm font-bold">18%</div>
              </div>
              <div className="mr-2">&gt;</div>
              <div className="mr-2">
                <div className="flex h-6 flex-none items-center justify-center text-xs">
                  <Tag size="small" value="Rare" type="blue" />
                </div>
                <div className="mt-2.5 text-center text-sm font-bold">16%</div>
              </div>
              <div className="mr-2">&gt;</div>
              <div className="mr-2">
                <div className="flex h-6 flex-none items-center justify-center text-xs">
                  <Tag size="small" value="Uncommon" type="greenLight" />
                </div>
                <div className="mt-2.5 text-center text-sm font-bold">12%</div>
              </div>
              <div className="mr-2">&gt;</div>
              <div className="mr-2">
                <div className="flex h-6 flex-none items-center justify-center text-xs">
                  <Tag size="small" value="Common" type="white" />
                </div>
                <div className="mt-2.5 text-center text-sm font-bold">9%</div>
              </div>
              <div className="mr-2">&gt;</div>
              <div>
                <div className="flex h-6 flex-none items-center justify-center text-xs">
                  <span className="text-xs text-gray">No Badge</span>
                </div>
                <div className="mt-2.5 text-center text-sm font-bold">8%</div>
              </div>
            </div>
            <div className="mb-7.5 mt-9 h-[1px] bg-gray-650"></div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div>
              {isMounted && address && (
                <div className="flex items-center">
                  <p className="text-[18px] font-medium">My Referrals</p>
                  <p className="ml-3 text-xl font-medium">{totalInvitationCount}</p>
                  <Dialog render={({ close }) => <InviteRecordDialog close={close} />}>
                    <p
                      className="ml-3 cursor-pointer text-sm text-blue"
                      onClick={() => {
                        ReactGA.event({ category: EventCategory.Global, action: EventName.RefDetail });
                      }}
                    >
                      More
                      <img width={16} height={16} className="inline-block" src="/svg/more.svg" alt="more" />
                    </p>
                  </Dialog>
                </div>
              )}
            </div>
            <div>
              <Button type="bordered" className="w-[7.5rem]" onClick={() => setOpen(false)}>
                Confirm
              </Button>
              {isMounted && !address && (
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
        </div>
      )}
    />
  );
}

export default React.memo(InviteDialog);
