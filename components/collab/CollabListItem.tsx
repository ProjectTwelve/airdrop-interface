import { useRouter } from 'next/router';
import { useCollabTimes } from '../../hooks/collab';
import { CollabShortInfo } from '../../lib/types';
import ReactGA from 'react-ga4';

type CollabItemProps = {
  data: CollabShortInfo;
};

export default function CollabListItem({ data }: CollabItemProps) {
  const router = useRouter();
  const { collabCode, projectName, projectInfoBrief, projectInfo, projectLogo, timeWarmup, timeClose, projectWebsite } = data;

  const { startTime, endTime } = useCollabTimes({ timeWarmup, timeClose });

  return (
    <div
      onClick={() => {
        ReactGA.event({ category: 'Collab-List', action: 'Click', label: collabCode });
        router.push({ pathname: '/collab/[id]', query: { id: collabCode } });
      }}
      className="flex h-max cursor-pointer flex-col items-center gap-2 rounded-2xl bg-p12-black/80 p-4 hover:bg-[#7980AF]/20 xs:px-2"
    >
      <div className="flex w-full items-center gap-3 border-b border-p12-line pb-4">
        <img className="h-[72px] w-[72px] rounded-2xl" src={projectLogo} alt="icon" />
        <div className="flex w-14 flex-grow flex-col gap-2">
          <div className="flex items-center gap-1">
            <h1 className="flex-shrink truncate text-xl font-semibold leading-6">{projectName}</h1>
            {projectWebsite && (
              <a href={projectWebsite} onClick={(e) => e.stopPropagation()} className="min-w-[20px]">
                <img className="aspect-square min-w-[20px] hover:brightness-200" src="/svg/website.svg" alt="website icon" />
              </a>
            )}
          </div>
          <p className="overflow-ellipsis text-xs leading-5 line-clamp-2">{projectInfoBrief || projectInfo}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center text-xs leading-5 text-p12-sub">
          {startTime} ~ {endTime}
        </div>
      </div>
    </div>
  );
}
