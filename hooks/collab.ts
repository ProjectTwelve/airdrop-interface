import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { CollabTimeLimeProps } from '../components/collab/CollabTimeLime';
import { fetchCollabList } from '../lib/api';
import { CollabShortInfo, CollabTimes, Response } from '../lib/types';

export const useFetchCollabList = () => {
  return useQuery(['collab_short_list'], () => fetchCollabList(), {
    select: (data: Response<CollabShortInfo[]>) => (data.code === 200 ? data.data : undefined),
  });
};

export const useCollabTimes = (times: Partial<CollabTimes>) => {
  const { timeWarmup, timeClose } = times;
  const { startTime, endTime } = useMemo(() => {
    if (!timeWarmup || !timeClose) return { startTime: timeWarmup || 'unknown', endTime: timeClose || 'unknown' };
    return {
      startTime: dayjs.unix(timeWarmup).format('YYYY.MM.DD'),
      endTime: dayjs.unix(timeClose).format('YYYY.MM.DD'),
    };
  }, [timeWarmup, timeClose]);

  const shortTimes = useMemo(() => {
    let shortTimes: CollabTimeLimeProps = {
      timeWarmup: 'unknown',
      timeJoin: 'unknown',
      timeAllocation: 'unknown',
      timeClaim: 'unknown',
      timeClose: 'unknown',
    };
    let key: keyof CollabTimes;
    for (key in times) {
      if (!key || !times[key]) continue;
      shortTimes[key] = dayjs.unix(times[key] as number).format('MM.DD');
    }
    return shortTimes;
  }, [times]);

  return { startTime, endTime, shortTimes };
};

export const useCollabClaimed = (timeClaim: number) => {
  const isClaimed = useMemo(() => {
    const nowDate = dayjs();
    const claimDate = dayjs.unix(timeClaim);
    return nowDate.isAfter(claimDate);
  }, [timeClaim]);
  return isClaimed;
};
