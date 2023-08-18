import React, { useMemo } from 'react';
import { toast } from 'react-toastify';
import Dialog from '@/components/dialog';
import Message from '@/components/message';
import { useCopyToClipboard } from 'react-use';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { inviteModalAtom, referralCodeAtom } from '@/store/invite/state';
import { InviteRecordDialog } from '@/components/dialog/InviteRecordDialog';

export default function ReferralMechanism() {
  const [, copyToClipboard] = useCopyToClipboard();
  const setRuleOpen = useSetRecoilState(inviteModalAtom);
  const referralCode = useRecoilValue(referralCodeAtom);
  const referralLink = useMemo(() => {
    return referralCode ? window.location.origin + '/?code=' + referralCode : 'Please connect your wallet first';
  }, [referralCode]);

  return (
    <div className="w-full bg-[url(/svg/pl/referral.svg)] bg-contain bg-center bg-no-repeat py-9">
      <h2 className="text-center text-3xl/[42px] font-semibold">Referral Mechanism</h2>
      <div className="flex-center mx-auto mt-12 2xl:w-3/4">
        <div className="flex-1">
          <div className="text-center text-xl/6.5 text-gray-400">My Referrals</div>
          <div className="mt-2 text-center text-5xl font-semibold">2</div>
        </div>
        <div className="h-14 w-px bg-gray-650" />
        <div className="flex-1">
          <div className="text-center text-xl/6.5 text-gray-400">PPL Reward</div>
          <div className="text-gradient-yellow mt-2 text-center text-5xl font-bold">10,000</div>
        </div>
        <div className="h-14 w-px bg-gray-650" />
        <div className="flex-1">
          <div className="text-center text-xl/6.5 text-gray-400">Bonus Level</div>
          <div className="mt-2 text-center text-5xl font-semibold">8%</div>
        </div>
      </div>
      <div className="mx-auto mb-13 mt-15 flex gap-12 2xl:w-3/4">
        <div className="flex flex-1 gap-4">
          <div className="max-w-[500px] flex-1 rounded-lg bg-white/10 px-5 py-3 text-sm/6">{referralLink}</div>
          <div
            onClick={() => {
              copyToClipboard(referralLink);
              toast.success(<Message message="Copied to clipboard" title="Mission Complete" />);
            }}
            className="cursor-pointer rounded-lg bg-blue/20 p-3.5 text-center text-sm text-blue hover:bg-blue/30"
          >
            Copy
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => setRuleOpen(true)}
            className="cursor-pointer rounded-lg bg-white/10 px-9 py-3.5 text-center text-sm hover:bg-white/20"
          >
            Referral Rules
          </div>
          <Dialog render={({ close }) => <InviteRecordDialog close={close} />}>
            <div className="cursor-pointer rounded-lg bg-white/10 px-9 py-3.5 text-center text-sm hover:bg-white/20">
              My Referrals
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
