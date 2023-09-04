import React from 'react';
import { motion } from 'framer-motion';
import { isMobile } from 'react-device-detect';
import { useSetRecoilState } from 'recoil';
import { rankingLayoutIdAtom } from '../../store/ranking/state';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga4';

type RankingHomeCardProps = {
  title: string;
  routerId: 'gamer' | 'developer';
  layoutId: string;
};

export function RankingHomeCard({ title, layoutId, children, routerId }: React.PropsWithChildren<RankingHomeCardProps>) {
  const router = useRouter();
  const setLayoutId = useSetRecoilState(rankingLayoutIdAtom);

  const handleGoToRanking = () => {
    setLayoutId(layoutId);
    ReactGA.event({ action: 'Ranking', category: 'Click', label: routerId });
    router.push('/ranking/' + routerId).then();
  };
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ ease: 'linear' }}
      className="w-full"
      layoutId={isMobile ? undefined : layoutId}
    >
      <div className="backdrop-box rounded-2xl px-6 py-4 sm:px-3">
        <h2 className="flex items-center justify-between pb-1.5 font-medium">
          <p className="text-[22px]">{title}</p>
          <p onClick={handleGoToRanking} className="cursor-pointer text-xl text-blue">
            More
            <img className="inline-block" src="/svg/more.svg" alt="more" />
          </p>
        </h2>
        <div>{children}</div>
      </div>
    </motion.div>
  );
}
