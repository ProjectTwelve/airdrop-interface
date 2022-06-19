import { useQuery } from 'react-query';
import {
  fetchDeveloperRank,
  fetchDeveloperTimeRank,
  fetchDeveloperTokenRank,
  fetchDeveloperVerifiedCount,
} from '../../lib/api';
import { useEffect, useMemo, useState } from 'react';
import { animate, useMotionValue, useTransform } from 'framer-motion';

export const useDeveloperVerifiedCount = () => {
  return useQuery('developer_verified_count', () => fetchDeveloperVerifiedCount(), {
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });
};

export const useDeveloperRank = (addr?: string) => {
  return useQuery(['developer_rank', addr], () => fetchDeveloperRank({ addr }), {
    enabled: !!addr,
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });
};

export const useDeveloperTimeRank = ({ page, size }: { page: number; size: number }) => {
  return useQuery(['time_rank', { page, size }], () => fetchDeveloperTimeRank({ page, size }), {
    select: (data) => data.data,
    placeholderData: {
      code: 0,
      msg: '',
      status: 'success',
      data: { rankLength: 10, size: 10, page: 1, rankList: new Array(10).fill({}) },
    },
    refetchOnWindowFocus: false,
  });
};

export const useDeveloperTokenRank = ({ page, size }: { page: number; size: number }) => {
  return useQuery(['token_rank', { page, size }], () => fetchDeveloperTokenRank({ page, size }), {
    select: (data) => data.data,
    placeholderData: {
      code: 0,
      msg: '',
      status: 'success',
      data: { rankLength: 10, size: 10, page: 1, rankList: new Array(10).fill({}) },
    },
    refetchOnWindowFocus: false,
  });
};

export const useTokenAnimation = (list?: any[], start = true) => {
  const len = useMemo(() => list?.length || 0, [list]);
  const [index, setIndex] = useState(1);
  const progress = useMotionValue(0);
  const value = useTransform(progress, (latest) => latest * -120);

  useEffect(() => {
    if (!start || !len || index > len - 3) return () => {};
    const controls = animate(progress, index, {
      duration: 0.8,
      delay: 2,
      ease: 'easeOut',
      onComplete: () => {
        setIndex(index + 1);
      },
    });
    return () => controls.stop;
  }, [index, len, progress, start]);

  return value;
};
