import React, { useRef, useState } from 'react';
import { LeftCircle } from '../svg/LeftCircle';
import classNames from 'classnames';
import styles from './tokens.module.css';
import { useClickScroll } from '../../hooks/useClickScroll';
import Tag from '../tag';
import Image from 'next/image';
import Button from '../button';
import MyP12 from './MyP12';
import Dialog from '../dialog';
import { InviteRecordDialog } from '../dialog/InviteRecordDialog';
import { useRecoilState } from 'recoil';
import { tabSelectAtom } from '../../store/developer/state';

function Tokens() {
  const [tokens] = useState<any[]>([
    {
      steam_appid: '',
      header_image: '',
      name: '',
    },
  ]);
  const [selectedToken, setSelectedToken] = useState(0);
  const [, setSelectedTab] = useRecoilState(tabSelectAtom);
  const [count, setCount] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const enableTabScroll = tokens.length > 4;

  useClickScroll(ref, count);

  return (
    <div className="relative px-8 pt-12">
      <div className="relative flex flex-col">
        <div className={classNames('absolute z-10 w-full', styles.tokens__tab)}>
          {enableTabScroll && (
            <div
              className={classNames('-left-[18px] select-none', styles.tokens__tab__scrollButton)}
              onClick={() => setCount((c) => c - 1)}
            >
              <LeftCircle />
            </div>
          )}
          <div
            ref={ref}
            className={classNames('horizontal-scroll flex w-full overflow-scroll rounded-t-2xl pb-[10px] ', enableTabScroll)}
          >
            <div className="whitespace-nowrap">
              {tokens.map((token, index) => (
                <div
                  key={index}
                  className={classNames(
                    'relative mr-[13px] inline-block w-[315px] rounded-t-2xl bg-p12-black/60 p-2.5',
                    selectedToken === index ? 'opacity-100' : 'opacity-60',
                    'cursor-pointer last:mr-0 hover:opacity-100',
                  )}
                  onClick={() => setSelectedToken(index)}
                >
                  <div className="flex gap-3">
                    <div className="h-[72px] w-[112px] overflow-hidden rounded-2xl bg-[#CEDCFF]/10">
                      {token.header_image ? (
                        <img className="h-[72px] w-[112px] object-cover" src={token.header_image} alt="app" />
                      ) : (
                        <p className="text-center text-xs leading-[72px] text-[#74788B]">No Game</p>
                      )}
                    </div>
                    <div className="flex-1">
                      {token.name ? (
                        <>
                          <h4 className="mb-3 max-w-[170px] truncate font-bold">{token.name}</h4>
                          <Tag size="small" value="Unclaimed" type="error" />
                        </>
                      ) : (
                        <p className="font-bold leading-[72px]">NOT Eligible</p>
                      )}
                    </div>
                  </div>
                  {selectedToken === index && (
                    <div className="absolute -bottom-[10px] left-0 h-[10px] w-full">
                      <Image src="/svg/select.svg" layout="fill" alt="select" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {enableTabScroll && (
            <div
              className={classNames('-right-[18px] select-none', styles.tokens__tab__scrollButton)}
              onClick={() => setCount((c) => c + 1)}
            >
              <LeftCircle className="rotate-180" />
            </div>
          )}
        </div>
        <div className="mt-[92px] flex w-full overflow-hidden rounded-b-2xl bg-p12-black/60">
          <div className="relative flex max-w-[643px] basis-1/2 items-center justify-center overflow-hidden bg-[url('/img/no_badge_bg.jpg')] bg-cover bg-center">
            <div className="absolute top-0 left-0 h-full w-full blur-3xl">
              {/*<Image src="/img/badge/purple.gif" layout="fill" objectFit="cover" alt="badge" />*/}
            </div>
            <div className="relative z-10 flex aspect-square w-full items-center justify-center">
              <div>
                <h4 className="text-center text-xl font-bold text-p12-error">Sorry, you are NOT eligible</h4>
                <Button type="bordered" className="mt-9 w-[260px]" onClick={() => setSelectedTab(0)}>
                  verify my game
                </Button>
              </div>
            </div>
            <p className="absolute bottom-8 text-center text-sm text-p12-sub">The Coupon NFT is powered by Project GALAXY</p>
          </div>
          <div className="basis-1/2 p-9">
            <h2 className="mt-8 text-[30px] font-bold">P12 Genesis</h2>
            <h3 className="mt-9 text-xl font-bold">P12 Airdrop Coupon</h3>
            <p className="mt-2 text-sm text-p12-sub">Birthday: --</p>
            <div className="mt-9 rounded-2xl border border-white/80 py-6 px-[30px]">
              <p>Amount of $P12 from this game</p>
              <div className="mt-5 flex items-center justify-between">
                <p className="font-['D-DIN'] text-[48px] font-bold">-,---</p>
                <Image src="/img/p12.png" width={48} height={48} alt="p12" />
              </div>
            </div>
            <div className="mt-9 flex rounded-2xl border border-p12-line py-[30px]">
              <div className="flex flex-1 flex-col items-center justify-center border-r border-p12-line">
                <p className="text-sm text-p12-sub">ID</p>
                <p className="text-lg font-bold">--</p>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center border-r border-p12-line">
                <p className="text-sm text-p12-sub">Contract address</p>
                <p className="text-lg font-bold">--</p>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center border-r border-p12-line">
                <p className="text-sm text-p12-sub">Character</p>
                <p className="text-lg font-bold">--</p>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center">
                <p className="text-sm text-p12-sub">Status</p>
                <p className="text-lg font-bold">NOT Eligible</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <MyP12 />
        </div>
        <div className="flex gap-4 border-b border-p12-line py-6">
          <div className="hidden rounded-lg bg-p12-black/60 p-3">
            <div className="flex items-center justify-between">
              <p className="font-['D-DIN'] text-xl font-bold">?,???</p>
              <Image src="/img/p12.png" width={30} height={30} alt="p12" />
            </div>
            <p className="mt-2 text-xs text-p12-sub">
              From <span className="text-p12-success"> 2 </span> verified Games
            </p>
          </div>
          <div className="hidden rounded-lg bg-p12-black/60 p-3">
            <div className="flex items-center justify-between">
              <p className="font-['D-DIN'] text-xl font-bold">?,???</p>
              <Image src="/img/p12.png" width={30} height={30} alt="p12" />
            </div>
            <Dialog render={({ close }) => <InviteRecordDialog close={close} />}>
              <p className="mt-2 cursor-pointer text-xs text-p12-link">
                My invitation list <span className="pl-11 text-p12-link">&gt;</span>
              </p>
            </Dialog>
          </div>
        </div>
        <div className="flex items-center justify-between py-8">
          <div className="flex items-center justify-start">
            <p className="mr-3 text-p12-sub">0 pieces</p>
            <p className="mr-4 text-lg font-bold">Total:</p>
            <p className="mr-6 font-['D-DIN'] text-[64px] font-bold leading-[64px]">-,---</p>
            <Image src="/img/p12.png" width={60} height={60} alt="p12" />
          </div>
          <div>
            <Button className="w-[280px] font-bold" disabled size="large">
              Claim to my wallet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Tokens);
