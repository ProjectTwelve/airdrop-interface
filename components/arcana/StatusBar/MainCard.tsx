import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { useCopyToClipboard } from 'react-use';
import SkillCard from './SkillCard';
import Message from '../../message';
import { referralCodeAtom } from '../../../store/invite/state';
import { ArcanaUserVotes } from '../../../lib/types';
import { GAMER_NFT_LEVEL, GAMER_BADGES } from '../../../constants';
import Dialog from '../../dialog';
import GenesisVoteDialog from './GenesisVoteDialog';

type MainCardProps = {
  data?: ArcanaUserVotes;
  nftLevel?: GAMER_NFT_LEVEL;
};

export default function MainCard({ data, nftLevel }: MainCardProps) {
  const referralCode = useRecoilValue(referralCodeAtom);
  const [, copyToClipboard] = useCopyToClipboard();
  const referralLink = useMemo(() => {
    return referralCode ? window.location.origin + '/?code=' + referralCode : 'Please connect your wallet first';
  }, [referralCode]);
  return (
    <div className="relative w-[462px] bg-[url('/img/arcana/statusbar/center.webp')] bg-cover bg-no-repeat px-4 py-2.5 md:w-full xs:px-3 xs:py-2">
      {data && (
        <div className="absolute -top-8 left-4 z-10 h-8 w-16 xs:left-3 xs:-top-[6.4vw] xs:h-[6.4vw] xs:w-[12.8vw]">
          <div className="group relative cursor-pointer overflow-hidden">
            <div className="absolute inset-0 z-10 hidden bg-white/10 group-hover:block"></div>
            <img className="relative" src="/img/arcana/statusbar/skill_add.webp" alt="add" />
          </div>
          {/*<div className="dota__button dota__gold flex h-full w-full items-center justify-center text-xs">Updated</div>*/}
        </div>
      )}
      <div className="flex h-16 justify-between xs:h-[12.8vw]">
        <div className="flex">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full xs:h-[12.8vw] xs:w-[12.8vw]"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, #FFFF91 0%, #FFFF98 29.14%, #D18C53 71.76%, #714E37 100%)',
            }}
          >
            <span className="h-[30px] bg-gradient-to-b from-[#541718] to-[#AD7442] bg-clip-text text-[36px] font-bold leading-[32px] text-transparent xs:text-[7.2vw]">
              {data?.votesTotalCurrent || 0}
            </span>
          </div>
          <div className="ml-2.5 xs:ml-[2.13vw]">
            <p className="h-[24px] text-sm font-medium text-p12-gold xs:h-[4.8vw] xs:text-xs">MultiCast Votes</p>
            <img src="/img/arcana/statusbar/multicast.webp" className="activity mt-1.5 w-[60px] xs:w-[12vw]" alt="multicast" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Dialog
            render={({ close }) => <GenesisVoteDialog close={close} nftLevel={nftLevel} votes={data?.votesGenesisNftCurrent} />}
          >
            <SkillCard
              votes={data?.votesGenesisNftCurrent}
              icon={nftLevel !== undefined ? GAMER_BADGES[nftLevel].img : undefined}
            />
          </Dialog>
          <SkillCard votes={data?.votesReferralCurrent} icon="/img/arcana/statusbar/skill_invite.webp" />
          <SkillCard votes={data?.votesCommunityNftCurrent} icon="/img/arcana/statusbar/skill_task.webp" />
        </div>
      </div>
      <div className="mt-3 xs:mt-2">
        <div className="flex h-[30px] items-center justify-between rounded bg-[url('/img/arcana/statusbar/health.webp')] bg-cover bg-no-repeat px-3 xs:px-1.5">
          <p className="flex-none text-sm xs:text-[10px]" style={{ textShadow: '0 0 6px #000000' }}>
            Invite with <span className="text-p12-link">Referral link</span>
          </p>
          <div className="relative ml-2 h-[24px] truncate pr-12 text-p12-gold">
            <span className="text-[10px] text-p12-gold">{referralLink.replace(/https?:\/\//g, '')}</span>
            <button
              className="copy__btn absolute top-0.5 right-0 h-[20px] w-[44px]"
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
            className="absolute left-0 top-0 h-full w-full object-none object-left"
          />
          <p className="relative z-10 text-sm xs:text-[10px]" style={{ textShadow: '0 0 6px #000000' }}>
            6/8
          </p>
        </div>
      </div>
    </div>
  );
}
