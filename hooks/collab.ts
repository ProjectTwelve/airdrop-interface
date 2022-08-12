import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useAccount } from 'wagmi';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { fetchCollabList, fetchCollabUserInfo } from '../lib/api';
import { CollabShortInfo, CollabTimes, CollabUserInfo, Response } from '../lib/types';
import { collabUserInfoAtom } from '../store/collab/state';
import { CollabTimeLimeProps } from '../components/collab/CollabTimeLime';
import { useLocalStorage } from 'react-use';
import { STORAGE_KEY } from '../constants';

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
    timeComingSoon: '',
    timeJoin: '',
    timeAllocation: '',
    timeClaim: '',
    timeClose: '',
  });

  useEffect(() => {
    if (!times.timeComingSoon || !times.timeClose) return;
    setStartTime(dayjs.unix(times.timeComingSoon).format('YYYY.MM.DD'));
    setEndTime(dayjs.unix(times.timeClose).format('YYYY.MM.DD'));
  }, [times.timeClose, times.timeComingSoon]);

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

export const useCollabIsJoined = () => {
  const userInfo = useRecoilValue(collabUserInfoAtom);
  const isJoined = useMemo(() => !!userInfo?.joinStatus, [userInfo]);
  return isJoined;
};

export const useCollabIsClaim = (timeClaim: number) => {
  const userInfo = useRecoilValue(collabUserInfoAtom);
  return useMemo(() => {
    const nowDate = dayjs();
    const claimDate = dayjs.unix(timeClaim);
    if (nowDate.isBefore(claimDate)) return false;
    return !!userInfo?.resultStatus;
  }, [userInfo, timeClaim]);
};

export const useCollabIsFirstClaim = (collabCode: string): [boolean, (status: boolean) => void] => {
  const [collabFirstClaimMap, setCollabFirstClaimMap] = useLocalStorage(STORAGE_KEY.COLLAB_FIRST_CLAIM_MAP, {
    [collabCode]: true,
  });
  const setFirstClaim = useCallback(
    (status: boolean) => {
      setCollabFirstClaimMap({ ...collabFirstClaimMap, [collabCode]: status });
    },
    [setCollabFirstClaimMap, collabFirstClaimMap, collabCode],
  );
  const isFirstClaim = useMemo(() => {
    if (collabFirstClaimMap?.[collabCode] === false) return false;
    return true;
  }, [collabFirstClaimMap, collabCode]);
  return [isFirstClaim, setFirstClaim];
};