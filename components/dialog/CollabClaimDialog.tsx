import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import Dialog from '.';
import { CollabInfoType } from '../../lib/types';
import { collabClaimModalAtom } from '../../store/collab/state';
import Button from '../button';
import ReactGA from 'react-ga4';

type CollabClaimDialogProps = {
  data: CollabInfoType;
};

export function CollabClaimDialog({ data }: CollabClaimDialogProps) {
  const [open, setOpen] = useRecoilState(collabClaimModalAtom);
  const { nftClaimLink, tokenClaimLink } = data;

  const handleClaim = useCallback(() => {
    ReactGA.event({ category: 'Collab-Item', action: 'Click', label: 'claim' });
    if (nftClaimLink) {
      window.open(nftClaimLink, '_blank');
      return;
    }
    if (tokenClaimLink) {
      window.open(tokenClaimLink, '_blank');
      return;
    }
  }, [nftClaimLink, tokenClaimLink]);

  return (
    <Dialog
      open={open}
      onOpenChange={(op) => setOpen(op)}
      render={({ close }) => (
        <div className="flex max-w-[440px] flex-col justify-between gap-8">
          <h2 className="text-center">
            <img src={'/svg/check_success.svg'} className="inline-block" alt="check_success.svg" />
            <span className="ml-2 align-middle text-xl leading-6">Congratulates</span>!
          </h2>
          <p className="border-y border-p12-line py-9">
            Congratulate on becoming our lucky draw winner! Claim your reward now!
          </p>
          <div className="text flex justify-end gap-5">
            <Button
              className="h-[44px] w-[118px] px-5"
              type="bordered"
              onClick={() => {
                close();
              }}
            >
              Cancel
            </Button>
            <Button
              className="h-[44px] w-[118px] px-5"
              type="gradient"
              onClick={() => {
                handleClaim();
                close();
              }}
            >
              Claim
            </Button>
          </div>
        </div>
      )}
    />
  );
}
