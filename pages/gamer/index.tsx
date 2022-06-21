import React from 'react';
import { useRouter } from 'next/router';
import Back from '../../components/back';
import SteamStatus from '../../components/gamer/SteamStatus';
import Image from 'next/image';
import Button from '../../components/button';
import GamerP12 from '../../components/gamer/GamerP12';
import classNames from 'classnames';
import Dialog from '../../components/dialog';
import { InviteRecordDialog } from '../../components/dialog/InviteRecordDialog';

export default function Gamer() {
  const router = useRouter();

  return (
    <div className="mt-8">
      <Back onClick={() => router.back()} />
      <div className="my-4" onClick={(event) => event.stopPropagation()}>
        <div className="backdrop-box rounded-2xl p-8 xs:p-4">
          <SteamStatus />
          <div>
            <h3 className="my-3 text-xl font-semibold">My Airdrop NFT</h3>
            <div className="flex overflow-hidden rounded-b-2xl bg-p12-black/80 md:flex-col">
              <div className="relative max-w-[643px] basis-1/2 overflow-hidden bg-[url('/img/no_badge_bg.jpg')] bg-cover bg-center md:max-w-full">
                <div className="relative z-10 flex aspect-square w-full items-center justify-center">
                  <h4 className="text-center text-xl font-medium text-p12-error">Sorry, you have no NFT yet</h4>
                </div>
                <p className="absolute bottom-8 z-10 w-full text-center text-sm text-p12-sub">
                  The airdrop is in collaboration with and powered by&nbsp;
                  <a className="text-p12-link" href="https://galaxy.eco/P12" target="_blank">
                    Project Galaxy
                  </a>
                </p>
              </div>
              <div className="basis-1/2 p-9 md:basis-auto md:p-4">
                <h2 className="mt-8 text-[30px] font-medium md:mt-2">P12 | Project Twelve | Genesis</h2>
                <h3 className="mt-9 text-xl font-medium md:mt-4">Genesis Soul-Bound NFT</h3>
                <p className="mt-2 text-sm text-p12-sub">Birthday:&nbsp;--</p>
                <div className="mt-9 rounded-2xl border border-white/80 py-6 px-[30px] md:mt-4">
                  <p>Amount of tokens from this game</p>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="cursor-pointer font-['D-DIN'] text-[48px] font-bold">-,---</p>
                    <Image src="/img/p12.png" width={48} height={48} alt="p12" />
                  </div>
                </div>
                <div className="mt-9 flex rounded-2xl border border-p12-line py-[30px] md:flex-col md:py-0">
                  {[
                    { label: 'ID', value: '--' },
                    { label: 'Contract address', value: '--' },
                    { label: 'Role address', value: '--' },
                    { label: 'Status', value: 'NO NFT YET' },
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
            <div className="mt-8">
              <GamerP12 />
            </div>
            <div className="flex gap-4 border-b border-p12-line py-4">
              <div className="rounded-lg bg-p12-black/80 p-3">
                <div className="flex items-center justify-between">
                  <p className="cursor-pointer font-['D-DIN'] text-xl font-bold">-,---</p>
                  <Image src="/img/p12.png" width={30} height={30} alt="p12" />
                </div>
                <p className="mt-2 mr-4 text-xs text-p12-sub">From your account</p>
              </div>
              <div className="rounded-lg bg-p12-black/80 p-3">
                <div className="flex items-center justify-between">
                  <p className="cursor-pointer font-['D-DIN'] text-xl font-bold">-,---</p>
                  <Image src="/img/p12.png" width={30} height={30} alt="p12" />
                </div>
                <Dialog render={({ close }) => <InviteRecordDialog close={close} />}>
                  <p className="mt-2 cursor-pointer text-xs text-p12-link">
                    My referral list <span className="pl-11 text-p12-link md:pl-1">&gt;</span>
                  </p>
                </Dialog>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 pt-8 md:flex-col">
              <div className="flex items-center justify-start">
                <p className="mr-4 text-lg font-medium">Total:</p>
                <p className="mr-6 cursor-pointer font-['D-DIN'] text-[64px] font-bold leading-[64px]">-,---</p>
                <Image src="/img/p12.png" width={60} height={60} alt="p12" />
              </div>
              <div>
                <Button className="w-[360px] font-medium xs:w-auto" disabled size="large">
                  Claim to my wallet (Coming)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
