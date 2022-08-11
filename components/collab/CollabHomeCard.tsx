import { motion } from 'framer-motion';
import { isMobile } from 'react-device-detect';
import CollabList from './CollabList';

type CollabHomeCardProps = {
  title: string;
};

export default function CollabHomeCard({ title }: CollabHomeCardProps) {
  return (
    <motion.div
      className="w-full"
      whileHover={{ y: -5 }}
      transition={{ ease: 'linear' }}
      layoutId={isMobile ? undefined : 'collab'}
    >
      <div className="backdrop-box rounded-2xl px-6 pt-4 pb-2 xs:px-3">
        <h2 className="flex items-center justify-between pb-1.5 font-medium">
          <p className="text-[22px]">{title}</p>
        </h2>
        <CollabList />
      </div>
    </motion.div>
  );
}
