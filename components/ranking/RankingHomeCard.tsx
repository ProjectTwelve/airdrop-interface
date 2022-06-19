import React from 'react';
import { motion } from 'framer-motion';
import { isMobile } from 'react-device-detect';

type RankingHomeCardProps = {
  title: string;
  layoutId: string;
};

export function RankingHomeCard({ title, layoutId, children }: React.PropsWithChildren<RankingHomeCardProps>) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ ease: 'linear' }}
      className="w-full"
      layoutId={isMobile ? undefined : layoutId}
    >
      <div className="backdrop-box rounded-2xl px-6 py-4 xs:px-3">
        <h2 className="pb-1.5 text-xl font-medium">{title}</h2>
        <div>{children}</div>
      </div>
    </motion.div>
  );
}
