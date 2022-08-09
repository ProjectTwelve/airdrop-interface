import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { useAccount } from 'wagmi';
import { CollabTimeLimeProps } from '../components/collab/CollabTimeLime';
import { fetchCollabList, fetchCollabUserInfo } from '../lib/api';
import { CollabShortInfo, CollabTimes, CollabUserInfo, Response } from '../lib/types';
import { collabUserInfoAtom } from '../store/collab/state';

export const useFetchCollabList = () => {
  return useQuery(['collab_short_list'], () => fetchCollabList(), {
    select: (data: Response<CollabShortInfo[]>) => (data.code === 200 ? data.data : undefined),
  });
};

export const useFetchCollabUserInfo = (collabCode: string) => {
  const { data: account } = useAccount();
  const address = account?.address;
  return useQuery(['collab_user_info'], () => fetchCollabUserInfo({ walletAddress: address as string, collabCode }), {
    enabled: !!address,
    select: (data: Response<CollabUserInfo>) => (data.code === 200 ? data.data : undefined),
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

export const useCollabIsWin = () => {
  const userInfo = useRecoilValue(collabUserInfoAtom);
  const isWin = useMemo(() => !!userInfo?.resultStatus, [userInfo]);
  return isWin;
};

export const useCollabIsClaimed = () => {
  const userInfo = useRecoilValue(collabUserInfoAtom);
  const isClaimed = useMemo(() => !!(userInfo?.tokenClaim || userInfo?.nftClaim), [userInfo]);
  return isClaimed;
};
