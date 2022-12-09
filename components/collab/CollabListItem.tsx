import { useRouter } from 'next/router';
import { useCollabTimes } from '../../hooks/collab';
import { CollabShortInfo } from '../../lib/types';
import ReactGA from 'react-ga4';
import { COLLAB_TIME_STATUS } from '../../constants';
import { useCallback } from 'react';
import { openLink } from '../../utils';

type CollabItemProps = {
  data: CollabShortInfo;
};

const openLinkCollabCode = ['oathofpeakea'];

export default function CollabListItem({ data }: CollabItemProps) {
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
  } = data;
  const { startTime, endTime, timeStatus } = useCollabTimes({
    timeComingSoon,
    timeJoin,
    timeAllocation,
    timeClaim,
    timeClose,
  });

  const generateStatusLabel = useCallback(() => {
    if (timeStatus === COLLAB_TIME_STATUS.CLOSED)
      return <div className="flex items-center text-xs leading-5 text-p12-sub">{COLLAB_TIME_STATUS.CLOSED}</div>;
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
        ReactGA.event({ category: 'Collab-List', action: 'Click', label: collabCode });
        if (openLinkCollabCode.includes(collabCode)) {
          openLink(projectWebsite ?? '');
        } else {
          router.push({ pathname: `/collab/${collabCode}` }).then();
        }
      }}
      className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl bg-p12-black/80 p-4 pb-3 hover:bg-[#7980AF]/20 sm:px-2"
    >
      <div className="flex w-full items-center gap-3 border-b border-p12-line pb-4">
        <img className="aspect-square h-[66px] rounded-2xl" src={projectLogo} alt="icon" />
        <div className="flex w-14 flex-grow flex-col gap-[.375rem]">
          <div className="flex items-center gap-2">
            <h1 className="flex-shrink truncate text-base font-semibold leading-5">{projectName}</h1>
            {projectWebsite && (
              <a href={projectWebsite} target="_blank" onClick={(e) => e.stopPropagation()} className="min-w-[20px]">
                <img className="aspect-square min-w-[20px] hover:brightness-200" src="/svg/website.svg" alt="website icon" />
              </a>
            )}
          </div>
          <p className="overflow-ellipsis text-xs leading-5 line-clamp-2">{projectInfoBrief || projectInfo}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between pt-1">
        <div className="flex items-center text-xs leading-5 text-p12-sub">
          {startTime} ~ {endTime}
        </div>
        {generateStatusLabel()}
      </div>
    </div>
  );
}
