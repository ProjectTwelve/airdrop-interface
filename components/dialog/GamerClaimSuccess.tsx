import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Dialog from './index';
import Button from '../button';
import { motion } from 'framer-motion';
import { getLocalStorage, setLocalStorage } from '../../utils/storage';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gamerClaimedPosterAtom, gamerInfoAtom } from '../../store/gamer/state';
import { NFT_CLAIM } from '../../constants';

export default function GamerClaimSuccess() {
  const { data: account } = useAccount();
  const [open, setOpen] = useState<boolean>(false);
  const gamerInfo = useRecoilValue(gamerInfoAtom);
  const gamerClaimedPoster = useSetRecoilState(gamerClaimedPosterAtom);

  useEffect(() => {
    const claimedMap = getLocalStorage('gamer_claimed_map') || {};
    const address = account?.address;
    if (address && gamerInfo?.nft_claim === NFT_CLAIM.CLAIMED && !claimedMap[address]) {
      setOpen(true);
      claimedMap[address] = 1;
      setLocalStorage('gamer_claimed_map', claimedMap);
    }
  }, [account?.address, gamerInfo?.nft_claim]);

  return (
    <Dialog
      open={open}
      showCloseButton={false}
      render={({ close }) => (
        <div>
          <div className="flex h-[28px] items-center justify-center text-xl">Winner Winner, Chicken Dinner</div>
          <div className="my-[28px] h-[1px] bg-p12-line"></div>
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
          <motion.div
            layoutId="sharing_poster"
            className="mx-auto h-[130px] max-w-[540px] overflow-hidden rounded-2xl border border-p12-link"
          ></motion.div>
          <div className="mt-8 mt-8 flex justify-center">
            <Button
              className="w-[260px]"
              type="gradient"
              onClick={() => {
                gamerClaimedPoster(true);
                close();
              }}
            >
              Open Poster
            </Button>
          </div>
        </div>
      )}
    />
  );
}
