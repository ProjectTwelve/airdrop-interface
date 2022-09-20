import Button from '../../button';
import React, { useMemo } from 'react';
import GoldMulticastSVG from './GoldMulticastSVG';
import SilverMulticastSVG from './SilverMulticastSVG';
import { useRecoilValue } from 'recoil';
import { referralCodeAtom } from '../../../store/invite/state';
import { useCopyToClipboard } from 'react-use';
import { toast } from 'react-toastify';
import Message from '../../message';

type MulticastVoteDialogProps = {
  total?: number;
  close: () => void;
};

export default function MulticastVoteDialog({ total, close }: MulticastVoteDialogProps) {
  const referralCode = useRecoilValue(referralCodeAtom);
  const [, copyToClipboard] = useCopyToClipboard();
  const referralLink = useMemo(() => {
    return referralCode ? window.location.origin + '/?code=' + referralCode : 'Please connect your wallet first';
  }, [referralCode]);

  return (
    <div className="w-[720px]">
      <div className="flex items-center justify-start">
        <div>{total && total >= 15 ? <GoldMulticastSVG votes={total} /> : <SilverMulticastSVG votes={total} />}</div>
        <div className="ml-7 flex-1">
          <h4 className="mt-4 text-xl font-medium">Method One：Plus by P12 Genesis NFT</h4>
          <div className="mt-3 grid grid-cols-5 overflow-hidden rounded-lg">
            <div className="bg-[#F36E22]/20 py-1.5">
              <p className="text-center text-xs text-p12-orange">Legendary</p>
              <p className="text-center font-ddin text-2xl font-bold text-p12-orange">60</p>
            </div>
            <div className="bg-[#C859FF]/30 py-1.5">
              <p className="text-center text-xs text-p12-purple">Epic</p>
              <p className="text-center font-ddin text-2xl font-bold text-p12-purple">36</p>
            </div>
            <div className="bg-p12-tips/30 py-1.5">
              <p className="text-center text-xs text-p12-link">Rare</p>
              <p className="text-center font-ddin text-2xl font-bold text-p12-link">12</p>
            </div>
            <div className="bg-[#62F82D]/20 py-1.5">
              <p className="text-center text-xs text-p12-uncommon">Uncommon</p>
              <p className="text-center font-ddin text-2xl font-bold text-p12-uncommon">4</p>
            </div>
            <div className="bg-[#99A7C3]/20 py-1.5">
              <p className="text-center text-xs text-p12-common">Common</p>
              <p className="text-center font-ddin text-2xl font-bold text-p12-common">1</p>
            </div>
          </div>
          <div className="mt-[40px] h-[1px] bg-[#6E7786]/50" />
          <h4 className="mt-[40px] text-xl font-medium">Method Two：Plus by Valid Invitations</h4>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs">
              Invite friends with your <span className="text-p12-link">Referral link</span>
            </p>
            <p className="text-xs text-p12-success">1 Valid Invitation = 2 MultiCast Votes</p>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-full bg-[#494E69]/40 p-1.5">
            <p className="ml-3 text-sm">{referralLink.replace(/https?:\/\//g, '')}</p>
            <Button
              type="gradient"
              size="small"
              onClick={() => {
                copyToClipboard(referralLink);
                toast.success(<Message message="Copied to clipboard" title="Mission Complete" />);
              }}
            >
              copy
            </Button>
          </div>
          <div className="mt-[40px] h-[1px] bg-[#6E7786]/50" />
          <h4 className="mt-[40px] text-xl font-medium">Method Three：Plus by other NFTs & Tasks</h4>
          <div className="mt-3 flex items-center justify-between">
            <div className="h-[64px] rounded-lg bg-[#1F2028]/60 py-1.5 px-3">
              <p className="text-center text-[10px] font-normal text-[#A7A7B6]">P12 Community Badge</p>
              <p className="mt-1.5 text-center font-ddin text-2xl font-bold leading-6">1 - 30</p>
            </div>
            <div className="flex items-center justify-center text-xs">
              Join P12 Discord &nbsp;
              <a href="https://discord.gg/p12" target="_blank">
                <img className="inline h-5 w-5" src="/img/discord.png" width={20} height={20} alt="discord" />
              </a>
              &nbsp; to obtain community badges.
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <img src="/img/arcana/statusbar/bab.webp" width={48} alt="bab" />
            <p className="ml-4 text-xs">BAB NFT holders will get MultiCast Votes x 6</p>
          </div>
        </div>
      </div>
      <div className="mt-[30px] flex w-full justify-end">
        <Button type="bordered" onClick={close}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
