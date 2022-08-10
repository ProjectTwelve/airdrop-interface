import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useAccount } from 'wagmi';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { fetchCollabList, fetchCollabUserInfo } from '../lib/api';
import { CollabShortInfo, CollabTimes, CollabUserInfo, Response } from '../lib/types';
import { collabUserInfoAtom } from '../store/collab/state';
import { CollabTimeLimeProps } from '../components/collab/CollabTimeLime';

export const useFetchCollabList = () => {
  return useQuery(['collab_short_list'], () => fetchCollabList(), {
    select: (data: Response<CollabShortInfo[]>) => (data.code === 200 ? data.data : undefined),
  });
};

export const useFetchCollabUserInfo = (collabCode: string) => {
  const { address } = useAccount();
  return useQuery(['collab_user_info'], () => fetchCollabUserInfo({ walletAddress: address as string, collabCode }), {
    enabled: !!address,
    select: (data: Response<CollabUserInfo>) => (data.code === 200 ? data.data : undefined),
  });
};

export const useCollabTimes = (times: Partial<CollabTimes>) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [shortTimes, setShortTimes] = useState<CollabTimeLimeProps>({
    timeWarmup: '',
    timeJoin: '',
    timeAllocation: '',
    timeClaim: '',
    timeClose: '',
  });

  useEffect(() => {
    if (!times.timeWarmup || !times.timeClose) return;
    setStartTime(dayjs.unix(times.timeWarmup).format('YYYY.MM.DD'));
    setEndTime(dayjs.unix(times.timeClose).format('YYYY.MM.DD'));
  }, [times.timeClose, times.timeWarmup]);

  useEffect(() => {
    setShortTimes((_times) => {
      Object.keys(_times).forEach((key) => {
        _times[key] = times[key] ? dayjs.unix(times[key]!).format('MM.DD') : '';
      });
      return _times;
    });
  }, [times]);

  return { startTime, endTime, shortTimes };
};

export const useCollabIsWin = () => {
  const userInfo = useRecoilValue(collabUserInfoAtom);
  return useMemo(() => !!userInfo?.resultStatus, [userInfo]);
};

export const useCollabIsClaimed = () => {
  const userInfo = useRecoilValue(collabUserInfoAtom);
  return useMemo(() => !!(userInfo?.tokenClaim || userInfo?.nftClaim), [userInfo]);
};
