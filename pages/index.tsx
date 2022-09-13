import React from 'react';
import ReactGA from 'react-ga4';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { inviteModalAtom } from '../store/invite/state';
import { RankingHomeCard } from '../components/ranking/RankingHomeCard';
import DeveloperTabs from '../components/ranking/DeveloperTabs';
import GamerTabs from '../components/ranking/GamerTabs';
import { COLLAB_OPEN } from '../constants';
import LeaderboardTabs from '../components/ranking/LeaderboardTabs';
import CollabHomeCard from '../components/collab/CollabHomeCard';

export default function Home() {
  const router = useRouter();
  const setOpen = useSetRecoilState(inviteModalAtom);

  return (
    <div className="flex flex-col items-center justify-center pt-6 md:pt-4">
      <div
        className="cursor-pointer overflow-hidden rounded-2xl duration-200 ease-linear hover:-translate-y-1"
        onClick={() => router.push({ pathname: '/arcana', query: router.query })}
      >
        <img
          className="h-[240px] object-cover object-left md:h-[128px]"
          src="https://cdn1.p12.games/airdrop/arcana/banner_join.webp"
          alt="arcana_banner"
        />
      </div>
      <div className="mt-6 grid w-full grid-cols-3 gap-7 md:grid-cols-1 md:gap-4">
        <div
          className="home__card bg-white/10 py-7 hover:bg-[#FFFFFF26] xs:py-4"
          onClick={() => {
            ReactGA.event({ category: 'Invite', action: 'Click', label: 'Home' });
            setOpen(true);
          }}
        >
          <img src="/svg/invite-3.svg" className="h-12 w-12 md:h-8 md:w-8" alt="invite" />
          <p className="md:text-sm">My Referral Link</p>
        </div>
        <div
          className="home__card bg-p12-gradient-30 py-7 hover:bg-p12-gradient-45 xs:py-4"
          onClick={() => router.push({ pathname: '/gamer', query: router.query })}
        >
          <img src="/svg/gamer.svg" className="h-12 w-12 md:h-8 md:w-8" alt="developer" />
          <p className="md:text-sm">I am a Steam Gamer</p>
        </div>
        <div
          className="home__card bg-p12-gradient-30 py-7 hover:bg-p12-gradient-45 xs:py-4"
          onClick={() => router.push({ pathname: '/developer', query: router.query })}
        >
          <img src="/svg/developer.svg" className="h-12 w-12 md:h-8 md:w-8" alt="gamer" />
          <p className="md:text-sm">I am a Steam Game Dev</p>
        </div>
      </div>
      <div className="mt-[30px] grid w-full grid-cols-2 gap-8 md:grid-cols-1">
        {COLLAB_OPEN ? (
          <>
            <RankingHomeCard routerId="gamer" title="Leaderboard" layoutId="ranking_gamer">
              <LeaderboardTabs />
            </RankingHomeCard>
            <CollabHomeCard title="Airdrops" />
          </>
        ) : (
          <>
            <RankingHomeCard routerId="gamer" title="Gamer" layoutId="ranking_gamer">
              <GamerTabs />
            </RankingHomeCard>
            <RankingHomeCard routerId="developer" title="Developer" layoutId="ranking_developer">
              <DeveloperTabs />
            </RankingHomeCard>
          </>
        )}
      </div>
    </div>
  );
}
