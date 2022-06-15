import React from 'react';
import { motion } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { rankingLayoutIdAtom } from '../../store/ranking/state';
import { useRouter } from 'next/router';

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
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      className="w-full cursor-pointer"
      layoutId={layoutId}
      onClick={() => {
        setLayoutId(layoutId);
        router.push('/ranking').then();
      }}
    >
      <div className="backdrop-box rounded-2xl px-6 py-4">
        <h2 className="border-b border-p12-line pb-4 text-center text-xl font-medium">{title}</h2>
        <div>{children}</div>
      </div>
    </motion.div>
  );
}
