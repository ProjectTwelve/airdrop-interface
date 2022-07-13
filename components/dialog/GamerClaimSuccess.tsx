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
          <div className="flex h-[28px] items-center justify-center text-xl">
            <ToastIcon type="success" />
            <p className="ml-3">Winner Winner, Chicken Dinner</p>
          </div>
          <div className="my-[30px] h-[1px] bg-p12-line"></div>
          <div className="max-w-[580px]">
            <ol className="flex list-decimal flex-col pl-5 text-sm">
              <li className="mb-1">Your NFT has been claimed and will take a few seconds to sync.</li>
              <li className="mb-1">Your game data has been snapshotted and will remain as-is.</li>
              <li>One address can only be bound to one Steam account and thus only one NFT.</li>
            </ol>
          </div>
          <div className="mt-8 mb-6 text-center text-2xl font-semibold text-p12-success">
            Your exclusive poster has been generated !
          </div>
          <div className="mt-8 mt-8 flex justify-center">
            <Button onClick={close} className="w-[260px]" type="gradient">
              Open Poster
            </Button>
          </div>
        </div>
      )}
    />
  );
}
