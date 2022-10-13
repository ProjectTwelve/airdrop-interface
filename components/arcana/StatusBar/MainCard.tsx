import React, { useMemo, useState } from 'react';
import { useNetwork } from 'wagmi';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useCopyToClipboard } from 'react-use';
import { isIOS, isMobile } from 'react-device-detect';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Button from '../../button';
import Dialog from '../../dialog';
import SkillCard from './SkillCard';
import Message from '../../message';
import TaskVoteDialog from './TaskVoteDialog';
import GenesisVoteDialog from './GenesisVoteDialog';
import ReferralVoteDialog from './ReferralVoteDialog';
import MulticastVoteDialog from './MulticastVoteDialog';
import { referralCodeAtom } from '../../../store/invite/state';
import { ArcanaUserInfo, ArcanaUserVotes } from '../../../lib/types';
import { GAMER_NFT_LEVEL, GAMER_BADGES, ARCANA_CHAIN_ID } from '../../../constants';
import {
  arcanaInviteDialogAtom,
  arcanaMulticastVideoAtom,
  arcanaPredictionAnswerAtom,
  arcanaPredictionCountAtom,
} from '../../../store/arcana/state';

type MainCardProps = {
  data?: ArcanaUserVotes;
  userInfo?: ArcanaUserInfo;
  nftLevel?: GAMER_NFT_LEVEL;
};

export default function MainCard({ data, nftLevel, userInfo }: MainCardProps) {
  const { chain } = useNetwork();
  const referralCode = useRecoilValue(referralCodeAtom);
  const predictionAnswers = useRecoilValue(arcanaPredictionAnswerAtom);
  const predictionCount = useRecoilValue(arcanaPredictionCountAtom);
  const setMulticastVideo = useSetRecoilState(arcanaMulticastVideoAtom);
  const [playDotaDialog, setPlayDotaDialog] = useState<boolean>(false);
  const [inviteDialog, setInviteDialog] = useRecoilState(arcanaInviteDialogAtom);
  const predictionAnswerCount = useMemo(
    () => predictionAnswers.filter((item) => !!item.answer?.length).length || 0,
    [predictionAnswers],
  );
  const [, copyToClipboard] = useCopyToClipboard();
  const referralLink = useMemo(() => {
    return referralCode ? window.location.origin + '/?code=' + referralCode : 'Please connect your wallet first';
  }, [referralCode]);

  const onManaClick = () => {
    if (predictionAnswerCount !== predictionCount) return;
    setPlayDotaDialog(true);
  };

  return (
    <div className="relative w-[462px] bg-[url('/img/arcana/statusbar/center.webp')] bg-cover bg-no-repeat px-4 py-2.5 md:w-full xs:px-3 xs:py-2">
      {data && chain?.id === ARCANA_CHAIN_ID && (
        <Dialog render={({ close }) => <MulticastVoteDialog close={close} />}>
          <div className="absolute -top-8 left-[28px] z-20 h-8 w-16 xs:left-6 xs:-top-[6.4vw] xs:h-[6.4vw] xs:w-[12.8vw]">
            <div className="group relative cursor-pointer overflow-hidden">
              <div className="absolute inset-0 z-10 hidden bg-white/10 group-hover:block"></div>
              <img className="relative" src="/img/arcana/statusbar/skill_add.webp" alt="add" />
            </div>
          </div>
        </Dialog>
      )}
      <div className="flex h-16 justify-between xs:h-[12.8vw]">
        <div className="flex">
          <div className="mx-3 xs:mx-[2.15vw]">
            <p className="h-[24px] text-sm font-medium text-p12-gold xs:h-[4.8vw] xs:text-xs">My Votes</p>
            <img
              src="/img/arcana/statusbar/multicast.webp"
              onClick={() => {
                if (isMobile && isIOS) return;
                setMulticastVideo(true);
              }}
              className="activity mt-1.5 w-[60px] xs:w-[12vw]"
              alt="multicast"
            />
          </div>
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full xs:h-[12.8vw] xs:w-[12.8vw]"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, #FFFF91 0%, #FFFF98 29.14%, #D18C53 71.76%, #714E37 100%)',
            }}
          >
            <span className="h-[30px] bg-gradient-to-b from-[#541718] to-[#AD7442] bg-clip-text text-[32px] font-bold leading-[32px] text-transparent xs:text-[7.2vw]">
              {data?.votesTotalCurrent || 0}
            </span>
          </div>
        </div>
        <div className="mr-3 grid grid-cols-3 gap-[22px] xs:mr-[2.15vw]">
          <Dialog
            render={({ close }) => (
              <GenesisVoteDialog
                nftId={userInfo?.nftId}
                createdAt={userInfo?.createdAt}
                close={close}
                nftLevel={nftLevel}
                votes={data?.votesGenesisNftCurrent}
              />
            )}
          >
            <SkillCard
              votes={data?.votesGenesisNftCurrent}
              icon={nftLevel !== undefined ? GAMER_BADGES[nftLevel].img : undefined}
            />
          </Dialog>
          <SkillCard
            onClick={() => setInviteDialog(true)}
            votes={data?.votesReferralCurrent}
            icon="/img/arcana/statusbar/skill_invite.webp"
          />
          <Dialog render={({ close }) => <TaskVoteDialog data={data} close={close} />}>
            <SkillCard votes={data?.votesCommunityNftCurrent} icon="/img/arcana/statusbar/skill_task.webp" />
          </Dialog>
        </div>
      </div>
      <div className="mt-3 xs:mt-2">
        <div className="flex h-[30px] items-center justify-between rounded bg-[url('/img/arcana/statusbar/health.webp')] bg-cover bg-no-repeat px-3 xs:px-1.5">
          <p className="flex-none text-sm text-p12-link xs:text-[10px]" style={{ textShadow: '0 0 6px #000000' }}>
            My Referral Link
          </p>
          <div className="dota__gold relative ml-2 h-[24px] truncate pr-12">
            <span className="dota__gold text-[10px]">{referralLink.replace(/https?:\/\//g, '')}</span>
            <button
              className="copy__btn absolute top-0.5 right-0 h-[20px] w-[44px] text-white"
              onClick={() => {
                copyToClipboard(referralLink);
                toast.success(<Message message="Copied to clipboard" title="Mission Complete" />);
              }}
            >
              copy
            </button>
          </div>
        </div>
        <div className="relative mt-1 flex h-[30px] items-center justify-center overflow-hidden rounded bg-[url('/img/arcana/statusbar/mana_bg.webp')] bg-cover bg-no-repeat">
          <img
            src="/img/arcana/statusbar/mana.webp"
            alt="mana"
            className="absolute left-0 top-0 h-full object-none object-left"
            style={{ width: (predictionAnswerCount / predictionCount) * 100 + '%' }}
          />
          <p
            className={classNames(
              'relative z-10 select-none text-sm xs:text-[10px]',
              predictionAnswerCount === predictionCount && 'dota__gold cursor-pointer',
            )}
            style={{ textShadow: '0 0 6px #000000' }}
            onClick={onManaClick}
          >
            {predictionAnswerCount}/{predictionCount}
          </p>
        </div>
        <Dialog
          open={playDotaDialog}
          onOpenChange={(op) => setPlayDotaDialog(op)}
          render={({ close }) => (
            <div>
              <h2 className="mb-[30px] text-center text-xl font-medium">LETS PLAY SOME DOTA</h2>
              <video autoPlay loop src="https://cdn1.p12.games/airdrop/video/play_dota.mp4"></video>
              <div className="mt-[30px] flex w-full justify-end">
                <Button type="bordered" onClick={close}>
                  Confirm
                </Button>
              </div>
            </div>
          )}
        />
        <Dialog
          open={inviteDialog}
          onOpenChange={(op) => setInviteDialog(op)}
          render={({ close }) => <ReferralVoteDialog data={data} close={close} />}
        />
      </div>
    </div>
  );
}
