import { useEffect, useState } from 'react';
import Dialog from './index';
import ToastIcon from '../svg/ToastIcon';
import Button from '../button';
import { getLocalStorage, setLocalStorage } from '../../utils/storage';
import { useRecoilValue } from 'recoil';
import { gamerInfoAtom } from '../../store/gamer/state';
import { NFT_CLAIM } from '../../constants';

export default function GamerClaimSuccess() {
  const [open, setOpen] = useState<boolean>(false);
  const gamerInfo = useRecoilValue(gamerInfoAtom);

  useEffect(() => {
    const claimedConfirm = getLocalStorage('gamer_claimed_confirm');
    if (gamerInfo?.nft_claim === NFT_CLAIM.CLAIMED && !claimedConfirm) {
      setOpen(true);
      setLocalStorage('gamer_claimed_confirm', 1);
    }
  }, [gamerInfo?.nft_claim]);

  return (
    <Dialog
      open={open}
      render={({ close }) => (
        <div>
          <div className="flex h-[28px] items-center justify-center gap-3 text-xl">
            <ToastIcon type="success" />
            Claim Success
          </div>
          <div className="my-[30px] h-[1px] bg-p12-line"></div>
          <div className="max-w-[420px]">
            <ol className="flex list-decimal flex-col gap-1 pl-5">
              <li>Your NFT has been claimed and it will take a few seconds to sync status.</li>
              <li>Your game data has been snapshotted and will not be updated.</li>
              <li>Your wallet can only be bound to one Steam account and claim one NFT.</li>
            </ol>
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={close} className="w-[118px]" type="bordered">
              Confirm
            </Button>
          </div>
        </div>
      )}
    />
  );
}
