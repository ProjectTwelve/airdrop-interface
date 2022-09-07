import { useRecoilState } from 'recoil';
import Dialog from '.';
import { CollabInfoType } from '../../lib/types';
import { collabClaimModalAtom } from '../../store/collab/state';
import Button from '../button';

type CollabClaimDialogProps = {
  data: CollabInfoType;
};

export function CollabClaimDialog({ data }: CollabClaimDialogProps) {
  const [open, setOpen] = useRecoilState(collabClaimModalAtom);
  const { claimNote } = data;

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
          <div className="border-t border-p12-line py-9">
            <p className="text-center text-xl font-semibold leading-6 text-[#1EDB8C]">
              Congratulate on becoming our lucky draw winner!
            </p>
            <p className="mt-8 text-sm leading-6" dangerouslySetInnerHTML={{ __html: claimNote }}></p>
          </div>

          <div className="text flex justify-end gap-5">
            <Button
              className="h-[44px] w-[118px] px-5"
              type="bordered"
              onClick={() => {
                close();
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    />
  );
}
