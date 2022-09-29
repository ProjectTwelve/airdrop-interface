import Button from '../../button';
import React, { useMemo } from 'react';
import GoldMulticastSVG from './GoldMulticastSVG';
import SilverMulticastSVG from './SilverMulticastSVG';
import { useRecoilValue } from 'recoil';
import { referralCodeAtom } from '../../../store/invite/state';
import { useCopyToClipboard } from 'react-use';
import { toast } from 'react-toastify';
import Message from '../../message';
import { arcanaVoteCountAtom } from '../../../store/arcana/state';

type MulticastVoteDialogProps = {
  close: () => void;
};

export default function MulticastVoteDialog({ close }: MulticastVoteDialogProps) {
  const referralCode = useRecoilValue(referralCodeAtom);
  const voteCount = useRecoilValue(arcanaVoteCountAtom);
  const [, copyToClipboard] = useCopyToClipboard();
  const referralLink = useMemo(() => {
    return referralCode ? window.location.origin + '/?code=' + referralCode : 'Please connect your wallet first';
  }, [referralCode]);

  return (
    <div className="w-[720px]">
      <div className="flex items-center justify-start">
        <div className="ml-3 mt-3">
          {voteCount >= 15 ? <GoldMulticastSVG votes={voteCount} /> : <SilverMulticastSVG votes={voteCount} />}
        </div>
        <div className="ml-12 flex-1">
          <h4 className="mt-4 text-xl font-medium">1. Genesis NFT Holder</h4>
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
          <h4 className="mt-[48px] text-xl font-medium">2. Invite friends</h4>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex flex-1 items-center justify-between rounded-full bg-[#494E69]/40 p-1.5">
              <p className="ml-3 w-[220px] truncate text-sm">{referralLink.replace(/https?:\/\//g, '')}</p>
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
            <p className="ml-3 text-2xl font-medium text-p12-success">x 1 - 12</p>
          </div>
          <h4 className="mt-[48px] text-xl font-medium">3. Plus by other NFTs</h4>
          <div className="mt-3 flex items-center justify-start">
            <img width={48} src="/img/arcana/community_badge.webp" alt="community_badge" />
            <p className="ml-3 text-2xl font-medium text-p12-success">X 1 - 30</p>
            <p className="mx-2 text-xs">Get More</p>
            <a href="https://discord.gg/p12" target="_blank">
              <img className="inline h-5 w-5" src="/img/discord.png" width={20} height={20} alt="discord" />
            </a>
            <img className="ml-12" src="/img/arcana/statusbar/bab.webp" width={48} alt="bab" />
            <p className="ml-3 text-2xl font-medium text-p12-success">X 6</p>
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
