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
      <h3 className="text-xl font-medium">My P12 tokens</h3>
      <div className="mt-3 flex rounded-2xl border border-p12-line py-[30px]">
        <div className="flex flex-1 flex-col items-center justify-center border-r border-p12-line">
          <div className="flex items-center justify-center gap-2">
            <Image src={iconStatus.get(leastOneGame) || ''} width={26} height={26} alt="icon" />
            <p className="font-medium">Verified at least</p>
          </div>
          <p className="font-medium">one game as developer</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center border-r border-p12-line">
          <div className="flex items-center justify-center gap-2">
            <Image src={iconStatus.get(leastOneGame && isAllClaimed) || ''} width={26} height={26} alt="icon" />
            <p className="font-medium">{leastOneGame ? 'Airdrop NFT' : 'NO TOKEN YET'}</p>
          </div>
          {leastOneGame && !isAllClaimed && <p className="font-medium">you have unclaimed NFT</p>}
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 border-r border-p12-line">
          <Image src={iconStatus.get(isAllClicked) || ''} width={26} height={26} alt="icon" />
          <p className="font-medium">Join us on</p>
          <SocialMedia />
        </div>
        <div className="flex flex-1 items-center justify-center gap-2">
          <Image src={iconStatus.get(false) || ''} width={26} height={26} alt="icon" />
          <p className="font-medium">P12 token TGE</p>
        </div>
      </div>
    </div>
  );
}

export default MyP12;
