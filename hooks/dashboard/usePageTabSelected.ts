import { EventCategory, EventName } from '@/constants/event';
import { dashboardSelectedTabAtom } from '@/store/dashboard/state';
import { useCallback, useEffect, useMemo } from 'react';
import ReactGA from 'react-ga4';
import { useRecoilState } from 'recoil';

export enum HOME_TAB_TYPE {
  ARCANA = 'arcana',
  GAMER = 'gamer',
  DEVELOPER = 'developer',
}

const tabHash = Object.values(HOME_TAB_TYPE);

export function usePageTabSelected() {
  const [index, setIndex] = useRecoilState(dashboardSelectedTabAtom);

  const onSelect = useCallback(
    (index: number) => {
      const hash = tabHash[index];
      if (!hash) return;
      ReactGA.event({ category: EventCategory.Assets, action: EventName.SectionTab, label: hash });
      setIndex(index);
    },
    [setIndex],
  );

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (!hash) return;
    const index = tabHash.indexOf(hash as HOME_TAB_TYPE);
    if (index === -1) return;
    setIndex(index);
    window.location.hash = '';
    setTimeout(() => {
      const element = document.querySelector(`#${hash}`);
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }, [setIndex]);

  return useMemo(() => ({ index, onSelect }), [index, onSelect]);
}
