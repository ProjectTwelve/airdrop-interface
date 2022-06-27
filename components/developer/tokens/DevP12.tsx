import React, { useMemo } from 'react';
import Image from 'next/image';
import SocialMedia from '../../socialMedia';
import { isSocialMediaClickSelector } from '../../../store/invite/state';
import { useRecoilValue } from 'recoil';
import { claimGroupSelector, developerGameAtom } from '../../../store/developer/state';
import { NFT_CLAIM } from '../../../constants';

export function DevP12() {
  const isClicked = useRecoilValue(isSocialMediaClickSelector);
  const games = useRecoilValue(developerGameAtom);
  const claimGroup = useRecoilValue(claimGroupSelector);
  const leastOneGame = useMemo(() => games.some((game) => game.appid), [games]);
  const isAllClaimed = useMemo(() => claimGroup[NFT_CLAIM.CLAIMED].length === games.length, [claimGroup, games.length]);

  const iconStatus = new Map([
    [true, '/svg/check_success.svg'],
    [false, '/svg/close_error.svg'],
  ]);

  return (
    <div>
      <h3 className="text-xl font-medium">My P12 tokens</h3>
      <div className="mt-3 mb-8 flex rounded-2xl border border-p12-line py-[30px] md:flex-col md:py-0">
        <div className="flex flex-1 flex-col items-center justify-center border-r border-p12-line md:border-r-0 md:border-b md:py-2">
          <div className="flex items-center justify-center">
            <Image src={iconStatus.get(leastOneGame) || ''} width={26} height={26} alt="icon" />
            <p className="font-medium ml-2">Verified at least</p>
          </div>
          <p className="font-medium">one game as developer</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center border-r border-p12-line  md:border-r-0 md:border-b md:py-2">
          <div className="flex items-center justify-center">
            <Image src={iconStatus.get(leastOneGame && isAllClaimed) || ''} width={26} height={26} alt="icon" />
            <p className="font-medium ml-2">{leastOneGame ? 'Airdrop NFT' : 'NO NFT YET'}</p>
          </div>
          {leastOneGame && !isAllClaimed && <p className="font-medium">you have unclaimed NFT</p>}
        </div>
        <div className="flex flex-1 items-center justify-center border-r border-p12-line  md:border-r-0 md:border-b md:py-2">
          <Image src={iconStatus.get(isClicked) || ''} width={26} height={26} alt="icon" />
          <p className="font-medium mx-2">Join us on</p>
          <SocialMedia />
        </div>
        <div className="flex flex-1 items-center justify-center md:py-2">
          <Image src="/svg/wait_info.svg" width={26} height={26} alt="icon" />
          <p className="font-medium ml-2">P12 token TGE</p>
        </div>
      </div>
    </div>
  );
}

export default DevP12;
