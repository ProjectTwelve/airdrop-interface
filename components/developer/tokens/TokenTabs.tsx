import React, { useMemo, useRef } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import Image from 'next/image';
import Tag from '../../tag';
import Button from '../../button';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { claimingGameAtom, developerGameAtom, NFTClaim, tabSelectAtom } from '../../../store/developer/state';
import { LeftCircle } from '../../svg/LeftCircle';
import { useClickScroll } from '../../../hooks/useClickScroll';
import { useSelectedGame } from '../../../hooks/useSelectedGame';
import { BADGES, GALAXY_LIST, NFT_CONTRACT_ADDRESS } from '../../../constants';
import { useWeb3React } from '@web3-react/core';
import { useIsFetching, useQueryClient } from 'react-query';
import { shortenAddress } from '../../../utils';

import styles from './tokens.module.css';
import { roadmapModalAtom } from '../../../store/roadmap/state';

const claimComponents: Record<NFTClaim, JSX.Element> = {
  [NFTClaim.UNCLAIMED]: <Tag size="small" type="error" value="Unclaimed" />,
  [NFTClaim.PENDING]: <p className="text-xs text-p12-bg">Update in few minutes</p>,
  [NFTClaim.CLAIMED]: <Tag size="small" type="success" value="Obtained" />,
};

export default function TokenTabs() {
  const { account } = useWeb3React();
  const games = useRecoilValue(developerGameAtom);
  const isFetching = useIsFetching(['developer_info', account]);
  const setClaimingGame = useSetRecoilState(claimingGameAtom);
  const setOpen = useSetRecoilState(roadmapModalAtom);
  const queryClient = useQueryClient();
  const enableTabScroll = games.length > 4;
  const [selectedGame, setSelectedGame] = useSelectedGame();
  const tabs = useMemo(() => (games.length ? games : [selectedGame]), [games, selectedGame]);
  const setSelectedTab = useSetRecoilState(tabSelectAtom);
  const ref = useRef<HTMLDivElement>(null);
  const count = useClickScroll(ref);

  return (
    <div className="relative">
      <div className={classNames('absolute z-10 w-full', styles.tokens__tab)}>
        {enableTabScroll && (
          <div className={classNames('-left-[18px] select-none', styles.tokens__tab__scrollButton)} onClick={count.subCount}>
            <LeftCircle />
          </div>
        )}
        <div
          ref={ref}
          className={classNames(
            'horizontal-scroll flex w-full overflow-x-auto rounded-t-2xl pb-[10px]',
            !enableTabScroll && 'xl:overflow-x-hidden',
          )}
        >
          <div className="whitespace-nowrap">
            {tabs.map((game) => (
              <div
                key={game.appid}
                className={classNames(
                  'relative mr-[13px] inline-block w-[315px] rounded-t-2xl bg-p12-black/60 p-2.5',
                  selectedGame.appid === game.appid ? 'opacity-100' : 'opacity-60',
                  'cursor-pointer last:mr-0 hover:opacity-100',
                )}
                onClick={() => setSelectedGame(game)}
              >
                <div className="flex gap-3">
                  <div className="h-[72px] w-[112px] overflow-hidden rounded-2xl bg-[#CEDCFF]/10">
                    {game.header_image ? (
                      <img loading="lazy" className="h-[72px] w-[112px] object-cover" src={game.header_image} alt="app" />
                    ) : (
                      <p className="text-center text-xs leading-[72px] text-p12-bg">No Game</p>
                    )}
                  </div>
                  <div className="flex-1">
                    {game.name ? (
                      <>
                        <h4 className="my-2 max-w-[170px] truncate font-medium">{game.name}</h4>
                        {claimComponents[game.nft_claim]}
                      </>
                    ) : (
                      <p className="font-medium leading-[72px]">NOT Eligible</p>
                    )}
                  </div>
                </div>
                {selectedGame.appid === game.appid && (
                  <div className="absolute -bottom-[10px] left-0 h-[10px] w-full bg-[image:var(--select)] bg-cover" />
                )}
              </div>
            ))}
          </div>
        </div>
        {enableTabScroll && (
          <div className={classNames('-right-[18px] select-none', styles.tokens__tab__scrollButton)} onClick={count.addCount}>
            <LeftCircle className="rotate-180" />
          </div>
        )}
      </div>
      <div className="mt-[92px] flex w-full overflow-hidden rounded-b-2xl bg-p12-black/60">
        <div className="relative flex max-w-[643px] basis-1/2 items-center justify-center overflow-hidden bg-[url('/img/no_badge_bg.jpg')] bg-cover bg-center">
          <div className="absolute top-0 left-0 h-full w-full blur-3xl">
            {selectedGame.nft_claim === NFTClaim.CLAIMED && (
              <Image src={BADGES[selectedGame.nft_level].asset} layout="fill" objectFit="cover" alt="badge" />
            )}
          </div>
          <div className="relative z-10 flex aspect-square w-full items-center justify-center">
            {selectedGame.appid ? (
              <div className="flex flex-col items-center justify-center">
                {selectedGame.nft_claim === NFTClaim.CLAIMED ? (
                  <>
                    <div className="relative h-[420px] w-[420px]">
                      <div className="absolute top-1/2 left-1/2 -z-10 h-[58px] w-[58px] -translate-x-1/2 -translate-x-1/2 opacity-60">
                        <Image className="animate-spin" src="/svg/loading.svg" width={58} height={58} alt="loading" />
                      </div>
                      <Image src={BADGES[selectedGame.nft_level].asset} width={420} height={420} alt="badge" />
                    </div>
                    {selectedGame.credential <= 10 && (
                      <Button type="bordered" className="mt-9 w-[260px]" onClick={() => window.open(GALAXY_LIST)}>
                        My NTF at Galaxy
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <h4 className="text-center text-xl font-medium text-p12-success">
                      {selectedGame.nft_claim === NFTClaim.PENDING
                        ? 'Pending: update in few minutes'
                        : 'Congrats! you are eligible'}
                    </h4>
                    <Button
                      type="bordered"
                      className="mt-9 w-[260px]"
                      onClick={() => {
                        if (isFetching) return;
                        setClaimingGame(selectedGame);
                        queryClient.refetchQueries(['developer_info', account]).then();
                      }}
                    >
                      Claim
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <div>
                <h4 className="text-center text-xl font-medium text-p12-error">Sorry, you are NOT eligible</h4>
                <Button type="bordered" className="mt-9 w-[260px]" onClick={() => setSelectedTab(0)}>
                  verify my game
                </Button>
              </div>
            )}
          </div>
          {selectedGame.nft_claim !== NFTClaim.CLAIMED && (
            <p className="absolute bottom-8 text-center text-sm text-p12-sub">The Airdrop NFT is powered by Project GALAXY</p>
          )}
          {selectedGame.credential > 10 && (
            <p className="absolute bottom-8 text-center text-sm text-p12-sub">
              You&apos;ve got 10 identical NFTs that reached our limit <br /> $P12 unaffected
            </p>
          )}
        </div>
        <div className="basis-1/2 p-9">
          <h2 className="mt-8 text-[30px] font-medium">P12 Genesis</h2>
          <h3 className="mt-9 text-xl font-medium">Project twelve Airdrop</h3>
          <p className="mt-2 text-sm text-p12-sub">
            Birthday:{' '}
            {selectedGame.updatedAt && selectedGame.credential <= 10
              ? dayjs(selectedGame.updatedAt).format('YYYY/MM/DD')
              : '--'}
          </p>
          <div className="mt-9 rounded-2xl border border-white/80 py-6 px-[30px]">
            <p>Amount of $P12 from this game</p>
            <div className="mt-5 flex items-center justify-between">
              <p
                className="cursor-pointer font-['D-DIN'] text-[48px] font-bold"
                onClick={() => selectedGame.nft_claim === NFTClaim.CLAIMED && setOpen(true)}
              >
                {selectedGame.nft_claim === NFTClaim.CLAIMED ? '?,???' : '-,---'}
              </p>
              <Image src="/img/p12.png" width={48} height={48} alt="p12" />
            </div>
          </div>
          <div className="mt-9 flex rounded-2xl border border-p12-line py-[30px]">
            <div className="flex flex-1 flex-col items-center justify-center border-r border-p12-line">
              <p className="text-sm text-p12-sub">ID</p>
              <p className="font-medium">{selectedGame.nft_id || '--'}</p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center border-r border-p12-line">
              <p className="text-sm text-p12-sub">Contract address</p>
              <p className="font-medium">
                {selectedGame.appid && selectedGame.credential <= 10 ? shortenAddress(NFT_CONTRACT_ADDRESS) : '--'}
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center border-r border-p12-line">
              <p className="text-sm text-p12-sub">Character</p>
              <p className="font-medium">{selectedGame.appid ? 'Developer' : '--'}</p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center">
              <p className="text-sm text-p12-sub">Status</p>
              <p className="font-medium">
                {selectedGame.appid
                  ? {
                      [NFTClaim.UNCLAIMED]: 'Eligible',
                      [NFTClaim.PENDING]: 'Pending',
                      [NFTClaim.CLAIMED]: 'Obtained',
                    }[selectedGame.nft_claim]
                  : 'NOT Eligible'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
