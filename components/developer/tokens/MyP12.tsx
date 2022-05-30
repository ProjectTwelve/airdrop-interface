import React, { useMemo } from 'react';
import Image from 'next/image';
import SocialMedia from '../../socialMedia';
import { isSocialMediaClickSelector } from '../../../store/invite/state';
import { useRecoilValue } from 'recoil';
import { claimGroupSelector, developerGameAtom, NFTClaim } from '../../../store/developer/state';

export function MyP12() {
  const isAllClicked = useRecoilValue(isSocialMediaClickSelector);
  const games = useRecoilValue(developerGameAtom);
  const claimGroup = useRecoilValue(claimGroupSelector);
  const leastOneGame = useMemo(() => games.some((game) => game.appid), [games]);
  const isAllClaimed = useMemo(() => claimGroup[NFTClaim.CLAIMED].length === games.length, [claimGroup, games.length]);

  const iconStatus = new Map([
    [true, '/svg/check_success.svg'],
    [false, '/svg/close_error.svg'],
  ]);

  return (
    <div>
      <h3 className="text-xl font-bold">My $P12</h3>
      <div className="mt-3 flex rounded-2xl border border-p12-line py-[30px]">
        <div className="flex flex-1 flex-col items-center justify-center border-r border-p12-line">
          <div className="flex items-center justify-center gap-2">
            <Image src={iconStatus.get(leastOneGame) || ''} width={26} height={26} alt="icon" />
            <p className="font-bold">Verified at least 1</p>
          </div>
          <p className="font-bold">steam game as a developer</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center border-r border-p12-line">
          <div className="flex items-center justify-center gap-2">
            <Image src={iconStatus.get(leastOneGame && isAllClaimed) || ''} width={26} height={26} alt="icon" />
            <p className="font-bold">{leastOneGame ? 'Airdrop NFT' : 'NOT Eligible'}</p>
          </div>
          {leastOneGame && !isAllClaimed && <p className="font-bold">you have unclaimed NFT</p>}
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 border-r border-p12-line">
          <Image src={iconStatus.get(isAllClicked) || ''} width={26} height={26} alt="icon" />
          <p className="font-bold">Join us</p>
          <SocialMedia />
        </div>
        <div className="flex flex-1 items-center justify-center gap-2">
          <Image src={iconStatus.get(false) || ''} width={26} height={26} alt="icon" />
          <p className="font-bold">P12 token ICO</p>
        </div>
      </div>
    </div>
  );
}

export default MyP12;
