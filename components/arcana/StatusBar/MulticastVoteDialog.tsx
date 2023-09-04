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
    <div className="w-[730px]">
      <div className="flex items-center justify-start">
        <div className="ml-3 mt-3">
          {voteCount >= 15 ? <GoldMulticastSVG votes={voteCount} /> : <SilverMulticastSVG votes={voteCount} />}
        </div>
        <div className="ml-8 flex-1">
          <h4 className="mt-5 text-center text-xl font-medium">What is Multicast Votes?</h4>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 items-end">
            <div>
              <div className="flex items-center justify-center pb-4">
                <img width={136} src="/img/arcana/statusbar/votes_01.webp" alt="votes_01" />
              </div>
              <div className="flex items-center justify-center">
                <p className="mr-2 font-semibold text-green">01</p>
                <p className="text-xs">The prize pool for one prediction is $10000</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center pb-4">
                <img width={167} src="/img/arcana/statusbar/votes_02.webp" alt="votes_02" />
              </div>
              <div className="flex items-center justify-center">
                <p className="mr-2 font-semibold text-green">02</p>
                <p className="text-xs">10 people answered correctly, with total of 200 votes</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center pb-4">
                <img width={173} src="/img/arcana/statusbar/votes_03.webp" alt="votes_03" />
              </div>
              <div className="flex items-center justify-center">
                <p className="mr-2 font-semibold text-green">03</p>
                <p className="text-xs">You are one of them. You have 40 Votes, accounting 20%</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center pb-4">
                <img width={137} src="/img/arcana/statusbar/votes_04.webp" alt="votes_04" />
              </div>
              <div className="flex items-center justify-center">
                <p className="mr-2 font-semibold text-green">04</p>
                <p className="text-xs">You will get 20% of the prize pool, which is $2000!</p>
              </div>
            </div>
          </div>
          <h4 className="mt-[48px] text-center text-xl font-medium">Get Votes by Referral</h4>
          <div className="mt-6 flex items-center justify-between">
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
