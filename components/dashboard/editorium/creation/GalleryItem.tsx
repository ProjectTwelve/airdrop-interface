import { Tooltip } from '@/components/tooltip';
import { useFileType } from '@/hooks/dashboard/useFileType';
import { GameInfo } from '@/lib/types-nest';
import { openLink, shortenArcanaShowName } from '@/utils';
import classNames from 'classnames';

import { ReactNode, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

type GalleryItemProps = {
  id: number;
  data: GameInfo;
  renderFooter?: () => ReactNode;
  className?: string;
  isRank50?: boolean;
};
export default function GalleryItem({ renderFooter, className, data, isRank50 }: GalleryItemProps) {
  const { id, rank, twitter, twitterVerify, gameName, gameDescription, gameVotes, mainImage, showName, walletAddress } =
    data ?? {};

  const fileType = useFileType(mainImage ?? '');

  const realShowName = useMemo(() => shortenArcanaShowName(showName ?? walletAddress), [showName, walletAddress]);

  return (
    <div
      className={twMerge(
        classNames(
          'relative flex cursor-pointer flex-col rounded-lg border border-gray-400/50 transition hover:-translate-y-2',
          { 'shadow-rank50': isRank50 },
        ),
        className,
      )}
      onClick={() => openLink('https://arcana.p12.games/#creation')}
    >
      <div className="absolute flex items-center gap-0.5 rounded-ee-lg rounded-ss-lg bg-black/20 p-2 font-semibold backdrop-blur-lg">
        {rank ? (
          rank <= 3 ? (
            <img src={`/img/editorium/rank_${rank}.webp`} alt="" className="h-7.5 w-7.5 xs:h-5 xs:w-5" />
          ) : (
            <span className="text-base/5 xs:text-sm/4">No.{rank}</span>
          )
        ) : null}
        <p className="ml-1.5 flex items-center gap-0.5 text-lg/5.5 font-semibold text-red-300 xs:text-base/4.5">
          <img alt="votesNum" className="h-4.5 w-4.5 xs:h-4 xs:w-4" src="/svg/editorium/vote_icon.svg" />
          {gameVotes}
        </p>
      </div>

      <div className="h-[10.5rem]">
        {fileType === 'video' ? (
          <video className="pointer-events-none h-full w-full" src={mainImage ?? ''} loop muted />
        ) : (
          <img
            className="pointer-events-none h-full w-full rounded-t-lg object-cover"
            loading="lazy"
            src={mainImage ?? ''}
            alt="gallery"
          />
        )}
      </div>
      <div className="flex flex-grow flex-col rounded-b-lg bg-black/20 p-2 backdrop-blur-lg">
        <div className="flex justify-between overflow-hidden text-left text-xs/3.5 xs:text-[.625rem]/3.5">
          <div className="flex-grow truncate font-semibold">{gameName}</div>
          <p className="text-white/50 hover:text-white">ID:{id}</p>
        </div>
        <div className="mt-0.5 flex items-end gap-2 text-sm/5 xs:mt-0 xs:text-xs/4">
          <div className="truncate text-left font-semibold">By {realShowName}</div>
          {twitter ? (
            <a
              onClick={() => {
                // ReactGA.event({
                //   action: type === 'premium' ? EventName.PremiumAuthor : EventName.GalleryAuthor,
                //   category: EventCategory.Editorium,
                //   label: id.toString(),
                // });
              }}
              className="flex items-center gap-1 text-blue hover:underline"
              href={'https://twitter.com/' + twitter}
              target="_blank"
            >
              <span className="flex-grow truncate text-right text-blue">@{twitter}</span>
              {twitterVerify && (
                <Tooltip label={<p className="text-xs/3.5">Verified Creator</p>}>
                  <img src="/svg/editorium/twitter_verified.svg" alt="" className="h-5 w-5" />
                </Tooltip>
              )}
            </a>
          ) : null}
        </div>
        <p className="mt-1 line-clamp-2 max-h-9 flex-grow overflow-hidden whitespace-pre-wrap break-all text-left text-xs/4 xs:mt-0.5">
          {gameDescription}
        </p>
        {renderFooter?.()}
      </div>
    </div>
  );
}
