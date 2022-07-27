import React from 'react';
import dayjs from 'dayjs';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Back from '../../components/back';
import SteamStatus from '../../components/gamer/SteamStatus';
import Button from '../../components/button';
import GamerP12 from '../../components/gamer/GamerP12';
import Dialog from '../../components/dialog';
import { InviteRecordDialog } from '../../components/dialog/InviteRecordDialog';
import { useGamerInfo, useGamerInvitation } from '../../hooks/gamer';
import { gamerEmailShowAtom, gamerInfoAtom } from '../../store/gamer/state';
import GamerTokenStatus from '../../components/gamer/GamerTokenStatus';
import { GALAXY_LIST, GAMER_BADGES, NFT_CLAIM } from '../../constants';
import { openLink } from '../../utils';
import GamerEmailDialog from '../../components/dialog/GamerEmailDialog';
import { useGamerBadgeLoad } from '../../hooks/useBadgeLoad';
import GamerClaimSuccess from '../../components/dialog/GamerClaimSuccess';
import { roadmapModalAtom } from '../../store/roadmap/state';
import Poster from '../../components/poster';
import PosterCanvas from '../../components/poster/PosterCanvas';
import SteamValue from '../../components/gamer/SteamValue';
import PermissionSettingDialog from '../../components/dialog/PermissionSettingDialog';

export default function Gamer() {
  const router = useRouter();
  const { data: account } = useAccount();
  const setOpen = useSetRecoilState(roadmapModalAtom);
  const gamerInfo = useRecoilValue(gamerInfoAtom);
  const setGamerEmailShow = useSetRecoilState(gamerEmailShowAtom);
  const { data: invitation } = useGamerInvitation(account?.address);
  useGamerInfo(account?.address);

  const badge = useGamerBadgeLoad(gamerInfo);

  const handleClaim = () => {
    if (gamerInfo?.email) {
      openLink(GAMER_BADGES[gamerInfo?.nft_level!].claim);
    } else {
      setGamerEmailShow(true);
    }
  };

  const handleClaimedRoadmap = () => {
    if (gamerInfo?.nft_claim === NFT_CLAIM.CLAIMED) {
      setOpen(true);
    }
  };

  return (
    <div className="mt-8">
      <Back onClick={() => router.push({ pathname: '/', query: router.query })} />
      <div className="my-4" onClick={(event) => event.stopPropagation()}>
        <div className="backdrop-box rounded-2xl p-8 xs:p-3">
          <SteamStatus />
          <SteamValue />
          <div>
            <h3 className="mb-3 mt-10 text-xl font-semibold xs:mt-4">My Airdrop NFT</h3>
            <div className="flex overflow-hidden rounded-b-2xl bg-p12-black/80 md:flex-col">
              <div className="relative max-w-[643px] basis-1/2 overflow-hidden bg-no-badge bg-cover bg-center md:max-w-full">
                <div className="absolute top-0 left-0 h-full w-full blur-3xl">
                  {gamerInfo?.nft_claim === NFT_CLAIM.CLAIMED && (
                    <div
                      className="h-full w-full bg-cover"
                      style={{ backgroundImage: `url(${GAMER_BADGES[gamerInfo.nft_level!].asset})` }}
                    />
                  )}
                </div>
                <div className="relative z-10">
                  <div className="w-full pb-[100%]"></div>
                  <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                    {gamerInfo?.credential ? (
                      <div className="flex w-full flex-col items-center justify-center xs:w-auto">
                        {gamerInfo.nft_claim === NFT_CLAIM.UNCLAIMED && (
                          <>
                            <h4 className="text-center text-xl font-medium text-p12-success">
                              Congrats! P12 Genesis NFT to be claimed
                            </h4>
                            <Button type="bordered" className="mt-9 w-[260px]" onClick={handleClaim}>
                              Claim
                            </Button>
                          </>
                        )}
                        {gamerInfo.nft_claim === NFT_CLAIM.PENDING && (
                          <>
                            <h4 className="text-center text-xl font-medium text-p12-success">
                              Pending: update in a few minutes
                            </h4>
                            <Button type="bordered" className="mt-9 w-[260px]" onClick={handleClaim}>
                              Check on Galaxy
                            </Button>
                          </>
                        )}
                        {gamerInfo.nft_claim === NFT_CLAIM.CLAIMED && (
                          <>
                            <div className="relative aspect-square w-full max-w-[420px]">
                              {badge.isLoading && (
                                <div className="absolute top-1/2 left-1/2 -z-10 h-[58px] w-[58px] -translate-x-1/2 -translate-x-1/2 opacity-60">
                                  <Image className="animate-spin" src="/svg/loading.svg" width={58} height={58} alt="loading" />
                                </div>
                              )}
                              <div
                                className="aspect-square max-w-[420px] bg-cover"
                                style={{ backgroundImage: `url(${GAMER_BADGES[gamerInfo.nft_level!].asset})` }}
                              />
                            </div>
                            <Button type="bordered" className="mt-9 w-[260px] xs:mt-4" onClick={() => openLink(GALAXY_LIST)}>
                              My NFT at Galaxy
                            </Button>
                          </>
                        )}
                      </div>
                    ) : (
                      <h4 className="text-center text-xl font-medium text-p12-error">AYBABTU</h4>
                    )}
                  </div>
                </div>
                <p className="absolute bottom-8 z-10 w-full text-center text-sm text-p12-sub xs:static xs:py-2">
                  The airdrop is in collaboration with and powered by&nbsp;
                  <a className="text-p12-link" href="https://galaxy.eco/P12" target="_blank">
                    Project Galaxy
                  </a>
                </p>
              </div>
              <div className="basis-1/2 p-9 md:basis-auto md:p-4">
                <h2 className="mt-8 text-[30px] font-medium md:mt-2">
                  {gamerInfo?.credential ? GAMER_BADGES[gamerInfo.nft_level!].title : 'P12 | Project Twelve | Genesis'}
                </h2>
                <h3 className="mt-9 text-xl font-medium md:mt-4">Genesis Soul-Bound NFT</h3>
                <p className="mt-2 text-sm text-p12-sub">
                  Birthday:&nbsp;{gamerInfo?.birthday ? dayjs(gamerInfo.birthday).format('YYYY/MM/DD') : '--'}
                </p>
                <div className="gradient__box mt-9 py-6 px-[30px] md:mt-4">
                  <p>Amount of tokens from this Steam account</p>
                  <div className="mt-5 flex items-center justify-between">
                    <p onClick={handleClaimedRoadmap} className="cursor-pointer font-ddin text-[48px] font-bold">
                      {gamerInfo?.display || (gamerInfo?.nft_claim === NFT_CLAIM.CLAIMED ? '?,???' : '-,---')}
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
            <div className="flex border-b border-p12-line py-4">
              <div className="mr-4 rounded-lg bg-p12-black/80 p-3">
                <div className="flex items-center justify-between">
                  <p onClick={handleClaimedRoadmap} className="cursor-pointer font-ddin text-xl font-bold">
                    {gamerInfo?.nft_claim === NFT_CLAIM.CLAIMED ? '?,???' : '-,---'}
                  </p>
                  <Image src="/img/p12.png" width={30} height={30} alt="p12" />
                </div>
                <p className="mt-2 mr-4 text-xs text-p12-sub">From your account</p>
              </div>
              <div className="rounded-lg bg-p12-black/80 p-3">
                <div className="flex items-center justify-between">
                  <p className="cursor-pointer font-ddin text-xl font-bold" onClick={() => invitation?.length && setOpen(true)}>
                    {invitation?.length ? '?,???' : '-,---'}
                  </p>
                  <Image src="/img/p12.png" width={30} height={30} alt="p12" />
                </div>
                <Dialog render={({ close }) => <InviteRecordDialog close={close} tab="gamer" />}>
                  <p className="mt-2 cursor-pointer text-xs text-p12-link">
                    My referral list <span className="pl-11 text-p12-link md:pl-1">&gt;</span>
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
                  {gamerInfo?.display || (gamerInfo?.nft_claim === NFT_CLAIM.CLAIMED ? '?,???' : '-,---')}
                </p>
                <Image src="/img/p12.png" width={60} height={60} alt="p12" />
              </div>
              <div>
                <Button className="w-[360px] font-medium xs:w-auto" disabled size="large">
                  Claim via P12 (Under Construction)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GamerEmailDialog />
      <PermissionSettingDialog />
      <GamerClaimSuccess />
      <Poster />
      <PosterCanvas />
    </div>
  );
}
