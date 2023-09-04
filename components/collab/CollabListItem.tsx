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
        'flex cursor-pointer flex-col items-center gap-2 rounded-2xl bg-gray-800/80 p-4 pb-3 backdrop-blur-lg hover:bg-[#7980AF]/20 sm:px-2',
        loading ? 'animate-pulse' : null,
      )}
    >
      <div className="flex w-full items-center gap-3 border-b border-gray-600 pb-4">
        <div className="h-[66px] w-[66px]">
          {projectLogo ? <img className="h-full w-full rounded-2xl" src={projectLogo} alt="icon" /> : null}
        </div>
        <div className="flex w-14 flex-grow flex-col gap-[.375rem]">
          <div className="flex items-center gap-2">
            <h1 className="flex-shrink truncate text-base font-semibold leading-5">{projectName}</h1>
            {projectWebsite && (
              <a href={projectWebsite} target="_blank" onClick={(e) => e.stopPropagation()} className="min-w-[20px]">
                <img className="aspect-square min-w-[20px] hover:brightness-200" src="/svg/website.svg" alt="website icon" />
              </a>
            )}
          </div>
          <p className="line-clamp-2 overflow-ellipsis text-xs leading-5">{projectInfoBrief || projectInfo}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between pt-1">
        <div className="flex items-center text-xs leading-5 text-gray">
          {startTime} ~ {endTime}
        </div>
        {collabCode ? generateStatusLabel() : null}
      </div>
    </div>
  );
}
