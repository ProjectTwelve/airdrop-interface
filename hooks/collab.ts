import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
// import { useSetRecoilState } from 'recoil';
import { fetchCollabList } from '../lib/api';
import { CollabShortInfo, Response } from '../lib/types';
// import { collabShortListAtom } from '../store/collab/state';

export const useFetchCollabList = () => {
  // const setCollabList = useSetRecoilState(collabShortListAtom);
  const result = useQuery(['collab_short_list'], () => fetchCollabList(), {
    select: (data: Response<CollabShortInfo[]>) => (data.code === 200 ? data.data : undefined),
  });
  return result;
};

export const useCollabTimes = ({ timeWarmup, timeClose }: { timeWarmup?: number; timeClose?: number }) => {
  const { startTime, endTime } = useMemo(() => {
    if (!timeWarmup || !timeClose) return { startTime: timeWarmup || 'unknown', endTime: timeClose || 'unknown' };
    return {
      startTime: dayjs.unix(timeWarmup).format('YYYY.MM.DD'),
      endTime: dayjs.unix(timeClose).format('YYYY.MM.DD'),
    };
  }, [timeWarmup, timeClose]);
  return { startTime, endTime };
};
