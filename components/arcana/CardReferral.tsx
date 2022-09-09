import React, { useMemo } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { useCopyToClipboard } from 'react-use';
import { invitationCountSelector, referralCodeAtom } from '../../store/invite/state';
import Button from '../button';
import Message from '../message';

export default function CardReferral() {
  const referralCode = useRecoilValue(referralCodeAtom);
  const invitationCount = useRecoilValue(invitationCountSelector);
  const [, copyToClipboard] = useCopyToClipboard();
  const referralLink = useMemo(() => {
    return referralCode ? window.location.origin + '/?code=' + referralCode : 'Please connect your wallet first';
  }, [referralCode]);

  return (
    <div className="relative flex flex-col rounded-2xl bg-p12-black/80 p-4 backdrop-blur 2xl:p-6 2xl:px-[30px]">
      <h3 className="text-xl font-medium">Referral</h3>
      <div className="mt-4 flex flex-1 flex-col justify-between 2xl:mt-6">
        <div>
          <p className="text-sm">
            Invite friends with your <span className="font-medium text-p12-link">Referral link</span>
          </p>
          <div className="mt-3 flex items-center justify-between rounded-full bg-[#494E69]/60 p-[6px]">
            <span className="ml-3 text-sm">{referralLink.replace(/https?:\/\//g, '')}</span>
            <Button
              size="small"
              type="gradient"
              onClick={() => {
                copyToClipboard(referralLink);
                toast.success(<Message message="Copied to clipboard" title="Mission Complete" />);
              }}
            >
              copy
            </Button>
          </div>
        </div>
        <div className="mt-2 text-sm font-medium text-p12-success">
          <span className="text-xl font-semibold text-p12-success">{invitationCount}</span> of your invitations are valid.
        </div>
      </div>
    </div>
  );
}
