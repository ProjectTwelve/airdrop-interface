import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { P12_CHAIN_ICONS, P12_COLLAB_LOGOS } from '../../constants';
import { CollabShortInfo } from '../../store/collab/state';

type CollabItemProps = {
  hover?: boolean;
  data: CollabShortInfo;
  // TODO: data: Partial<CollabInfo>;
};
export function CollabListItem({ hover, data }: CollabItemProps) {
  const { id, name, desc, logo, startTime, endTime, whitePaperUrl, badgeChainKey } = data;
  const collabLogo = P12_COLLAB_LOGOS[logo];
  const badgeChain = badgeChainKey ? P12_CHAIN_ICONS[badgeChainKey] : null;

  const handleClick = useCallback(() => {
    console.log('click!', id);
  }, [id]);

  return (
    <motion.div
      onClick={handleClick}
      layoutId={id}
      transition={{ ease: 'linear' }}
      className={classNames(
        'flex h-max cursor-pointer flex-col items-center gap-2  rounded-2xl bg-p12-black/80 p-4 xs:px-2',
        hover ? 'cursor-pointer hover:bg-[#7980AF]/20' : '',
      )}
    >
      <div className="flex w-full items-center gap-3 border-b border-p12-line pb-4">
        <img className="h-[72px] w-[72px] rounded-2xl " src={collabLogo} alt="icon" />
        <div className="flex w-14 flex-grow flex-col gap-2">
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-semibold leading-6">{name}</h1>
            <img src="/svg/door.svg" alt="door icon"></img>
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
              <img src="/img/whitepaper.png" className="h-5 w-5" alt={whitePaperUrl}></img>
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
CollabListItem.defaultProps = {
  hover: true,
};
