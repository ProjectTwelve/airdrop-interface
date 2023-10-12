import React, { useMemo, useRef } from 'react';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import { initialGame } from '@/hooks/useSelectedGame';
import { useClickScroll } from '@/hooks/useClickScroll';
import { LeftCircle } from '@/components/svg/LeftCircle';
import { developerGameAtom } from '@/store/developer/state';
import styles from '@/components/developer/tokens/tokens.module.css';

export default function GameList() {
  const games = useRecoilValue(developerGameAtom);
  const list = useMemo(() => (games.length ? games : [initialGame]), [games]);
  const enableTabScroll = games.length > 4;
  const ref = useRef<HTMLDivElement>(null);
  const count = useClickScroll(ref);

  return (
    <div className={classNames('relative z-10 w-full', styles.tokens__tab)}>
      {enableTabScroll && (
        <div
          className={classNames('-left-[18px] select-none md:hidden', styles.tokens__tab__scrollButton)}
          onClick={count.subCount}
        >
          <LeftCircle />
        </div>
      )}
      {enableTabScroll && (
        <div
          className={classNames('-right-[18px] select-none md:hidden', styles.tokens__tab__scrollButton)}
          onClick={count.addCount}
        >
          <LeftCircle className="rotate-180" />
        </div>
      )}
      <div
        ref={ref}
        className={classNames(
          'horizontal-scroll flex w-full overflow-x-auto rounded-t-2xl',
          !enableTabScroll && '2xl:overflow-x-hidden',
        )}
      >
        <div className="whitespace-nowrap">
          {list.map((game) => (
            <div key={game.appid} className={classNames('relative mr-[13px] inline-block w-[315px] rounded-t-2xl last:mr-0')}>
              <div className="flex">
                <div className="mr-3 h-[72px] w-[112px] overflow-hidden rounded-lg bg-gray-700/30">
                  {game.header_image ? (
                    <img loading="lazy" className="h-[72px] w-[112px] object-cover" src={game.header_image} alt="" />
                  ) : (
                    <p className="text-center text-sm/[72px] text-gray-400">No Game</p>
                  )}
                </div>
                <div className="flex-1">
                  {game.name ? (
                    <>
                      <h4 className="max-w-[170px] truncate text-base/6 font-medium">{game.name}</h4>
                      <p className="text-gradient-yellow mt-2 text-[34px]/10 font-bold">100</p>
                    </>
                  ) : (
                    <p className="text-base/[72px] font-semibold">NO GAME YET</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
