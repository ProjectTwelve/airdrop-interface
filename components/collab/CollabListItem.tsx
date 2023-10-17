import { useCallback } from 'react';
import ReactGA from 'react-ga4';
import { openLink } from '@/utils';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { CollabShortInfo } from '@/lib/types';
import { useCollabTimes } from '@/hooks/collab';
import { COLLAB_TIME_STATUS } from '@/constants';

type CollabItemProps = {
  data?: CollabShortInfo;
  loading?: boolean;
};

const openLinkCollabCode = ['oathofpeakea'];

export default function CollabListItem({ data, loading }: CollabItemProps) {
  const router = useRouter();
  const {
    collabCode,
    projectName,
    projectInfoBrief,
    projectInfo,
    projectLogo,
    timeComingSoon,
    timeJoin,
    timeAllocation,
    timeClaim,
    timeClose,
    projectWebsite,
  } = data ?? {};
  const { startTime, endTime, timeStatus } = useCollabTimes({
    timeComingSoon,
    timeJoin,
    timeAllocation,
    timeClaim,
    timeClose,
  });

  const generateStatusLabel = useCallback(() => {
    if (timeStatus === COLLAB_TIME_STATUS.CLOSED)
      return <div className="flex items-center text-xs leading-5 text-gray">{COLLAB_TIME_STATUS.CLOSED}</div>;
    if (timeStatus === COLLAB_TIME_STATUS.UPCOMING)
      return (
        <div className="flex items-center rounded bg-[#C859FF]/20 px-2 text-xs leading-5 text-[#FC59FF]">
          {COLLAB_TIME_STATUS.UPCOMING}
        </div>
      );
    if (timeStatus === COLLAB_TIME_STATUS.JOIN)
      return <div className="flex items-center rounded bg-[#16F497]/20 px-2 text-xs leading-5 text-[#1EDB8C]">Live</div>;
    // allocate or claim
    return <div className="flex items-center rounded bg-[#F36E22]/20 px-2 text-xs leading-5 text-[#FFAA2C]">Allocating</div>;
  }, [timeStatus]);

  return (
    <div
      onClick={() => {
        ReactGA.event({ action: 'Collab-List', category: 'Click', label: collabCode });
        if (collabCode && openLinkCollabCode.includes(collabCode)) {
          openLink(projectWebsite ?? '');
        } else {
          router.push({ pathname: `/collab/${collabCode}` }).then();
        }
      }}
      className={classNames(
        'flex cursor-pointer flex-col items-center gap-2 rounded-lg bg-white/[0.12] p-3 hover:bg-white/20 sm:px-2',
        loading ? 'animate-pulse' : null,
      )}
    >
      <div className="flex w-full items-center gap-3 border-b border-white/15 pb-3">
        <div className="h-[56px] w-[56px]">
          {projectLogo ? <img className="h-full w-full rounded-lg" src={projectLogo} alt="icon" /> : null}
        </div>
        <div className="flex w-14 flex-grow flex-col gap-2">
          <div className="flex items-center gap-1">
            <h1 className="flex-shrink truncate text-sm/4 font-semibold">{projectName}</h1>
            {projectWebsite && (
              <a href={projectWebsite} target="_blank" onClick={(e) => e.stopPropagation()} className="h-4 w-4">
                <img className="aspect-square min-w-[16px] hover:brightness-200" src="/svg/website.svg" alt="website icon" />
              </a>
            )}
          </div>
          <p className="line-clamp-2 overflow-ellipsis text-xs">{projectInfoBrief || projectInfo}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center text-xs text-gray">
          {startTime} ~ {endTime}
        </div>
        {collabCode ? generateStatusLabel() : null}
      </div>
    </div>
  );
}
