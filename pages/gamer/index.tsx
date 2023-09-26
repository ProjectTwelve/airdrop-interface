import React from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { openLink } from '@/utils';
import { useRouter } from 'next/router';
import Back from '../../components/back';
import Poster from '@/components/poster';
import Button from '../../components/button';
import { useGamerInfo } from '@/hooks/gamer';
import Dialog from '../../components/dialog';
import GamerP12 from '../../components/gamer/GamerP12';
import { roadmapModalAtom } from '@/store/roadmap/state';
import { useGamerBadgeLoad } from '@/hooks/useBadgeLoad';
import { invitationCountAtom } from '@/store/invite/state';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import PosterCanvas from '@/components/poster/PosterCanvas';
import SteamStatus from '../../components/gamer/SteamStatus';
import { GALXE_LIST, GAMER_BADGES, GenesisClaim } from '@/constants';
import GamerTokenStatus from '@/components/gamer/GamerTokenStatus';
import { gamerGamesAtom, gamerInfoAtom } from '@/store/gamer/state';
import GamerClaimSuccess from '@/components/dialog/GamerClaimSuccess';
import { InviteRecordDialog } from '@/components/dialog/InviteRecordDialog';
import PermissionSettingDialog from '@/components/dialog/PermissionSettingDialog';

export default function Gamer() {
  const router = useRouter();
  const { address } = useAccount();
  const setOpen = useSetRecoilState(roadmapModalAtom);
  const gamerInfo = useRecoilValue(gamerInfoAtom);
  const gamerGames = useRecoilValue(gamerGamesAtom);
  const [, invitation] = useRecoilValue(invitationCountAtom);
  useGamerInfo(address);

  const badge = useGamerBadgeLoad(gamerInfo);

  const handleClaim = () => {
    openLink(GAMER_BADGES[gamerInfo?.nft_level!].claim);
  };

  const handleClaimedRoadmap = () => {
    if (gamerInfo?.nft_claim === GenesisClaim.Claimed) {
      setOpen(true);
    }
  };

  return (
    <div className="mt-8">
      <Back onClick={() => router.push({ pathname: '/', query: router.query })} />
      <div className="my-4" onClick={(event) => event.stopPropagation()}>
        <div className="backdrop-box rounded-2xl p-4 2xl:p-8">
          <SteamStatus />
          <div>
            <h3 className="my-3 text-xl font-semibold">My Airdrop NFT</h3>
            <div className="flex overflow-hidden rounded-b-2xl bg-gray-700/30 md:flex-col">
              <div className="relative max-w-[643px] basis-1/2 overflow-hidden bg-no-badge bg-cover bg-center md:max-w-full">
                <div className="absolute left-0 top-0 h-full w-full blur-3xl">
                  {gamerInfo?.nft_claim === GenesisClaim.Claimed && (
                    <div
                      className="h-full w-full bg-cover"
                      style={{ backgroundImage: `url(${GAMER_BADGES[gamerInfo.nft_level!].asset})` }}
                    />
                  )}
                </div>
                <div className="relative z-10">
                  <div className="w-full pb-[100%]"></div>
                  <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                    {gamerInfo?.credential ? (
                      <div className="flex w-full flex-col items-center justify-center sm:w-auto">
                        {gamerInfo.nft_claim === GenesisClaim.Unclaimed && (
                          <>
                            <h4 className="text-center text-xl font-medium text-green">
                              Congrats! P12 Genesis NFT to be claimed
                            </h4>
                            <Button type="bordered" className="mt-9 w-[260px]" onClick={handleClaim}>
                              Claim
                            </Button>
                          </>
                        )}
                        {gamerInfo.nft_claim === GenesisClaim.Pending && (
                          <>
                            <h4 className="text-center text-xl font-medium text-green">Pending: update in a few minutes</h4>
                            <Button type="bordered" className="mt-9 w-[260px]" onClick={handleClaim}>
                              Check on Galxe
                            </Button>
                          </>
                        )}
                        {gamerInfo.nft_claim === GenesisClaim.Claimed && (
                          <>
                            <div className="relative aspect-square w-full max-w-[420px]">
                              {badge.isLoading && (
                                <div className="absolute left-1/2 top-1/2 -z-10 h-[58px] w-[58px] -translate-x-1/2 opacity-60">
                                  <Image className="animate-spin" src="/svg/loading.svg" width={58} height={58} alt="loading" />
                                </div>
                              )}
                              <div
                                className="aspect-square max-w-[420px] bg-cover"
                                style={{ backgroundImage: `url(${GAMER_BADGES[gamerInfo.nft_level!].asset})` }}
                              />
                            </div>
                            <Button type="bordered" className="mt-9 w-[260px] sm:mt-4" onClick={() => openLink(GALXE_LIST)}>
                              My NFT at Galxe
                            </Button>
                          </>
                        )}
                      </div>
                    ) : (
                      <h4 className="text-center text-xl font-medium text-red">AYBABTU</h4>
                    )}
                  </div>
                </div>
                <p className="absolute bottom-8 z-10 w-full text-center text-sm text-gray sm:static sm:py-2">
                  The airdrop is in collaboration with and powered by&nbsp;
                  <a className="text-blue" href="https://galxe.com/P12" target="_blank">
                    Galxe
                  </a>
                </p>
              </div>
              <div className="basis-1/2 p-4 md:basis-auto 2xl:p-8">
                <h2 className="mt-8 text-[30px] font-medium md:mt-2">
                  {gamerInfo?.credential ? GAMER_BADGES[gamerInfo.nft_level!].title : 'P12 | Project Twelve | Genesis'}
                </h2>
                <h3 className="mt-9 text-xl font-medium md:mt-4">Genesis Soul-Bound NFT</h3>
                <p className="mt-2 text-sm text-gray">
                  Birthday:&nbsp;{gamerInfo?.birthday ? dayjs(gamerInfo.birthday).format('YYYY/MM/DD') : '--'}
                </p>
                <div className="gradient__box mt-9 px-[30px] py-6 md:mt-4">
                  <p>Amount of tokens from this Steam account</p>
                  <div className="mt-5 flex items-center justify-between">
                    <p onClick={handleClaimedRoadmap} className="cursor-pointer font-ddin text-[48px] font-bold">
                      {gamerInfo?.display || (gamerInfo?.nft_claim === GenesisClaim.Claimed ? '?,???' : '-,---')}
                    </p>
                    <Image src="/img/p12.png" width={48} height={48} alt="p12" />
                  </div>
                </div>
                <GamerTokenStatus data={gamerInfo} />
              </div>
            </div>
            <div className="mt-8">
              <GamerP12 />
            </div>
            <div className="flex border-b border-gray-600 py-4">
              <div className="mr-4 rounded-lg bg-gray-700/30 p-3">
                <div className="flex items-center justify-between">
                  <p onClick={handleClaimedRoadmap} className="cursor-pointer font-ddin text-xl font-bold">
                    {gamerInfo?.nft_claim === GenesisClaim.Claimed ? '?,???' : '-,---'}
                  </p>
                  <Image src="/img/p12.png" width={30} height={30} alt="p12" />
                </div>
                <p className="mr-4 mt-2 text-xs text-gray">From your account</p>
              </div>
              <div className="rounded-lg bg-gray-700/30 p-3">
                <div className="flex items-center justify-between">
                  <p className="cursor-pointer font-ddin text-xl font-bold" onClick={() => invitation && setOpen(true)}>
                    {invitation ? '?,???' : '-,---'}
                  </p>
                  <Image src="/img/p12.png" width={30} height={30} alt="p12" />
                </div>
                <Dialog render={({ close }) => <InviteRecordDialog close={close} tab="gamer" />}>
                  <p className="mt-2 cursor-pointer text-xs text-blue">
                    My referral list <span className="pl-11 text-blue md:pl-1">&gt;</span>
                  </p>
                </Dialog>
              </div>
            </div>
            <div className="flex items-center justify-between pt-8 md:flex-col">
              <div className="flex items-center justify-start md:mb-4">
                <p className="mr-4 text-lg font-medium">Total:</p>
                <p
                  onClick={handleClaimedRoadmap}
                  className="mr-6 cursor-pointer font-ddin text-[64px] font-bold leading-[64px]"
                >
                  {gamerInfo?.display || (gamerInfo?.nft_claim === GenesisClaim.Claimed ? '?,???' : '-,---')}
                </p>
                <Image src="/img/p12.png" width={60} height={60} alt="p12" />
              </div>
              <div>
                <Button className="w-[360px] font-medium sm:w-auto" disabled size="large">
                  Claim via P12 (Under Construction)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PermissionSettingDialog />
      <GamerClaimSuccess />
      <Poster gamerInfo={gamerInfo} />
      <PosterCanvas gamerInfo={gamerInfo} gamerGames={gamerGames} />
    </div>
  );
}
