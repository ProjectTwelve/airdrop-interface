import React, { useMemo, useRef } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import Image from 'next/image';
import Tag from '../../tag';
import Button from '../../button';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { developerGameAtom, tabSelectAtom } from '../../../store/developer/state';
import { LeftCircle } from '../../svg/LeftCircle';
import { useClickScroll } from '../../../hooks/useClickScroll';
import { useSelectedGame } from '../../../hooks/useSelectedGame';
import {
  DEV_BADGES,
  GALAXY_LIST,
  DEV_NFT_CONTRACT_ADDRESS,
  NFT_CLAIM_TYPE,
  NFT_CLAIM,
  GALAXY_P12_SPACE,
} from '../../../constants';
import { roadmapModalAtom } from '../../../store/roadmap/state';
import {useDevBadgeLoad} from '../../../hooks/useBadgeLoad';
import { openLink, shortenAddress } from '../../../utils';

import styles from './tokens.module.css';

const claimComponents: Record<NFT_CLAIM, JSX.Element> = {
  [NFT_CLAIM.UNCLAIMED]: <Tag size="small" type="red" value="Unclaimed" />,
  [NFT_CLAIM.PENDING]: <p className="text-xs text-p12-bg">Update in few minutes</p>,
  [NFT_CLAIM.CLAIMED]: <Tag size="small" type="green" value="Obtained" />,
};

export default function TokenTabs() {
  const games = useRecoilValue(developerGameAtom);
  const setOpen = useSetRecoilState(roadmapModalAtom);
  const enableTabScroll = games.length > 4;
  const [selectedGame, setSelectedGame] = useSelectedGame();
  const tabs = useMemo(() => (games.length ? games : [selectedGame]), [games, selectedGame]);
  const setSelectedTab = useSetRecoilState(tabSelectAtom);
  const ref = useRef<HTMLDivElement>(null);
  const count = useClickScroll(ref);

  const badge = useDevBadgeLoad(selectedGame);

  return (
    <div className="relative">
      <div className={classNames('absolute z-10 w-full', styles.tokens__tab)}>
        {enableTabScroll && (
          <div
            className={classNames('-left-[18px] select-none md:hidden', styles.tokens__tab__scrollButton)}
            onClick={count.subCount}
          >
            <LeftCircle />
          </div>
        )}
        {enableTabScroll && (
          <div
            className={classNames('-right-[18px] select-none md:hidden', styles.tokens__tab__scrollButton)}
            onClick={count.addCount}
          >
            <LeftCircle className="rotate-180" />
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
                  'relative mr-[13px] inline-block w-[315px] rounded-t-2xl bg-p12-black/80 p-2.5',
                  selectedGame.appid === game.appid ? 'opacity-100' : 'opacity-60',
                  'cursor-pointer last:mr-0 hover:opacity-100',
                )}
                onClick={() => setSelectedGame(game)}
              >
                <div className="flex gap-3">
                  <div className="h-[72px] w-[112px] overflow-hidden rounded-2xl bg-[#CEDCFF]/10">
                    {game.header_image ? (
                      <img loading="lazy" className="h-[72px] w-[112px] object-cover" src={game.header_image} alt="" />
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
                      <p className="font-medium leading-[72px]">NO GAME YET</p>
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
      </div>
      <div className="mt-[92px] flex w-full overflow-hidden rounded-b-2xl bg-p12-black/80 md:flex-col">
        <div className="relative max-w-[643px] basis-1/2 overflow-hidden bg-[url('/img/no_badge_bg.jpg')] bg-cover bg-center md:max-w-full">
          <div className="absolute top-0 left-0 h-full w-full blur-3xl">
            {selectedGame.nft_claim === NFT_CLAIM.CLAIMED && (
              <div
                className="h-full w-full bg-cover"
                style={{ backgroundImage: `url(${DEV_BADGES[selectedGame.nft_level].asset})` }}
              />
            )}
          </div>
          <div className="relative z-10 flex aspect-square w-full items-center justify-center">
            {selectedGame.appid ? (
              <div className="flex w-full flex-col items-center justify-center">
                {selectedGame.nft_claim === NFT_CLAIM.CLAIMED ? (
                  <>
                    <div className="relative aspect-square w-full max-w-[420px]">
                      {badge.isLoading && (
                        <div className="absolute top-1/2 left-1/2 -z-10 h-[58px] w-[58px] -translate-x-1/2 -translate-x-1/2 opacity-60">
                          <Image className="animate-spin" src="/svg/loading.svg" width={58} height={58} alt="loading" />
                        </div>
                      )}
                      <div
                        className="aspect-square max-w-[420px] bg-cover"
                        style={{ backgroundImage: `url(${DEV_BADGES[selectedGame.nft_level].asset})` }}
                      />
                    </div>
                    {selectedGame.credential <= 10 && (
                      <Button type="bordered" className="mt-9 w-[260px]" onClick={() => openLink(GALAXY_LIST)}>
                        My NFT at Galaxy
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <h4 className="text-center text-xl font-medium text-p12-success">
                      {selectedGame.nft_claim === NFT_CLAIM.PENDING
                        ? 'Pending: update in a few minutes'
                        : 'Congrats! P12 Genesis NFT to be claimed'}
                    </h4>
                    <Button
                      type="bordered"
                      className="mt-9 w-[260px]"
                      onClick={() => openLink(DEV_BADGES[selectedGame.nft_level].claim)}
                    >
                      Claim
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <div>
                <h4 className="text-center text-xl font-medium text-p12-error">Sorry, you have no NFT yet</h4>
                <Button type="bordered" className="mt-9 w-[260px]" onClick={() => setSelectedTab(0)}>
                  Verify my game
                </Button>
              </div>
            )}
          </div>
          {selectedGame.nft_claim !== NFT_CLAIM.CLAIMED && (
            <p className="absolute bottom-8 z-10 w-full text-center text-sm text-p12-sub">
              The airdrop is in collaboration with and powered by&nbsp;
              <a className="text-p12-link" href={GALAXY_P12_SPACE} target="_blank">
                Project Galaxy
              </a>
            </p>
          )}
          {selectedGame.credential > 10 && (
            <p className="absolute bottom-8 w-full text-center text-sm text-p12-sub">
              You&apos;ve got 10 identical NFTs that reached our limit
            </p>
          )}
        </div>
        <div className="basis-1/2 p-9 md:p-4">
          <h2 className="mt-8 text-[30px] font-medium md:mt-2">
            {selectedGame.appid ? DEV_BADGES[selectedGame.nft_level].title : 'P12 | Project Twelve | Genesis'}
          </h2>
          <h3 className="mt-9 text-xl font-medium md:mt-4">Genesis Soul-Bound NFT</h3>
          <p className="mt-2 text-sm text-p12-sub">
            Birthday:&nbsp;
            {selectedGame.updatedAt && selectedGame.credential <= 10
              ? dayjs(selectedGame.updatedAt).format('YYYY/MM/DD')
              : '--'}
          </p>
          <div className="gradient__box mt-9 py-6 px-[30px] md:mt-4">
            <p>Amount of tokens from this game</p>
            <div className="mt-5 flex items-center justify-between">
              <p
                className="cursor-pointer font-['D-DIN'] text-[48px] font-bold"
                onClick={() => selectedGame.nft_claim === NFT_CLAIM.CLAIMED && setOpen(true)}
              >
                {selectedGame.nft_claim === NFT_CLAIM.CLAIMED ? '?,???' : '-,---'}
              </p>
              <Image src="/img/p12.png" width={48} height={48} alt="p12" />
            </div>
          </div>
          <div className="mt-9 flex rounded-2xl border border-p12-line py-[30px] md:flex-col md:py-0">
            {[
              { label: 'ID', value: selectedGame.nft_id || '--' },
              {
                label: 'Contract address',
                value: selectedGame.appid && selectedGame.credential <= 10 ? shortenAddress(DEV_NFT_CONTRACT_ADDRESS) : '--',
              },
              { label: 'Role', value: selectedGame.appid ? 'Developer' : '--' },
              {
                label: 'Status',
                value: selectedGame.appid ? NFT_CLAIM_TYPE[selectedGame.nft_claim] : 'NO NFT YET',
              },
            ].map((item) => (
              <div
                key={item.label}
                className={classNames(
                  'flex flex-1 flex-col items-center justify-center border-r border-p12-line',
                  'md:flex-row md:gap-2 md:border-r-0 md:border-b md:py-2',
                  'last:border-none',
                )}
              >
                <p className="text-sm text-p12-sub">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
