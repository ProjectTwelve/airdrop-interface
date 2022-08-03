import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { CHAIN_ICON } from '../../constants';
import { CollabShortInfo } from '../../store/collab/state';

type CollabItemProps = {
  data: CollabShortInfo;
  // TODO: data: Partial<CollabInfo>;
};

export default function CollabListItem({ data }: CollabItemProps) {
  const { id, name, desc, logo, startTime, endTime, whitePaperUrl, badgeChainKey } = data;
  const badgeChain = badgeChainKey ? CHAIN_ICON[badgeChainKey] : null;

  const handleClick = useCallback(() => {
    console.log('click!', id);
  }, [id]);

  return (
    <motion.div
      onClick={handleClick}
      layoutId={id}
      transition={{ ease: 'linear' }}
      className="flex h-max cursor-pointer cursor-pointer flex-col items-center  gap-2 rounded-2xl bg-p12-black/80 p-4 hover:bg-[#7980AF]/20 xs:px-2"
    >
      <div className="flex w-full items-center gap-3 border-b border-p12-line pb-4">
        <img className="h-[72px] w-[72px] rounded-2xl " src={logo} alt="icon" />
        <div className="flex w-14 flex-grow flex-col gap-2">
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-semibold leading-6">{name}</h1>
            <img src="/svg/door.svg" alt="door icon" />
          </div>
          <p className="overflow-ellipsis text-xs leading-5 line-clamp-2">{desc}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center text-xs leading-5 text-p12-sub">
          {startTime} ~ {endTime}
        </div>
        <div className="flex gap-2">
          {whitePaperUrl && (
            <a href={whitePaperUrl} target="_blank" onClick={(e) => e.stopPropagation()}>
              <img src="/img/white_paper.png" className="h-5 w-5" alt={whitePaperUrl}></img>
            </a>
          )}
          {badgeChain && (
            <a href={whitePaperUrl} target="_blank" onClick={(e) => e.stopPropagation()}>
              <img src={badgeChain} className="h-5 w-5" alt={badgeChain}></img>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
