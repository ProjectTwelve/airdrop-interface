import React from 'react';
import { motion } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { rankingLayoutIdAtom } from '../../store/ranking/state';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

type RankingHomeCardProps = {
  title: string;
  layoutId: string;
};

export function RankingHomeCard({ title, layoutId, children }: React.PropsWithChildren<RankingHomeCardProps>) {
  const setLayoutId = useSetRecoilState(rankingLayoutIdAtom);
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ ease: 'linear' }}
      className="w-full cursor-pointer"
      layoutId={isMobile ? undefined : layoutId}
      onClick={() => {
        setLayoutId(layoutId);
        router.push('/ranking').then();
      }}
    >
      <div className="backdrop-box rounded-2xl px-6 py-4 xs:px-3">
        <h2 className="border-b border-p12-line pb-4 text-center text-xl font-medium">{title}</h2>
        <div>{children}</div>
      </div>
    </motion.div>
  );
}
