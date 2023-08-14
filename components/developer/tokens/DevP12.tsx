import React, { useMemo } from 'react';
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
      <div className="mt-3 mb-8 flex rounded-2xl border border-gray-600 py-[30px] md:flex-col md:py-0">
        <div className="flex flex-1 flex-col items-center justify-center border-r border-gray-600 md:border-r-0 md:border-b md:py-2">
          <div className="flex items-center justify-center">
            <img src={iconStatus.get(leastOneGame) || ''} className="w-5 2xl:w-[26px]" alt="icon" />
            <p className="ml-2 font-medium lg:text-sm">Verified at least</p>
          </div>
          <p className="font-medium lg:text-sm">one game as developer</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center border-r border-gray-600  md:border-r-0 md:border-b md:py-2">
          <div className="flex items-center justify-center">
            <img src={iconStatus.get(leastOneGame && isAllClaimed) || ''} className="w-5 2xl:w-[26px]" alt="icon" />
            <p className="ml-2 font-medium lg:text-sm">{leastOneGame ? 'Airdrop NFT' : 'NO NFT YET'}</p>
          </div>
          {leastOneGame && !isAllClaimed && <p className="font-medium lg:text-sm">you have unclaimed NFT</p>}
        </div>
        <div className="flex flex-1 items-center justify-center border-r border-gray-600 md:border-r-0 md:border-b md:py-2 lg:flex-col lg:gap-2">
          <div className="flex">
            <img src={iconStatus.get(isClicked) || ''} className="w-5 2xl:w-[26px]" alt="icon" />
            <p className="mx-2 font-medium lg:text-sm">Join us on</p>
          </div>
          <SocialMedia />
        </div>
        <div className="flex flex-1 items-center justify-center md:py-2">
          <img src="/svg/wait_info.svg" className="w-5 2xl:w-[26px]" alt="icon" />
          <p className="ml-2 font-medium lg:text-sm">P12 token TGE</p>
        </div>
      </div>
    </div>
  );
}

export default DevP12;
