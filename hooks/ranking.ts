import { useQuery, UseQueryOptions } from 'react-query';
import { fetchDeveloperRank, fetchDeveloperTimeRank, fetchDeveloperTokenRank, fetchDeveloperVerifiedCount } from '../lib/api';

type Pagination = {
  page: number;
  size: number;
};

type Options = Pick<UseQueryOptions, 'staleTime' | 'enabled'>;

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

export const useDeveloperTimeRank = ({ page, size }: Pagination) => {
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

export const useDeveloperTokenRank = ({ page, size }: Pagination, options?: Options) => {
  return useQuery(['token_rank', { page, size }], () => fetchDeveloperTokenRank({ page, size }), {
    select: (data) => data.data,
    placeholderData: {
      code: 0,
      msg: '',
      status: 'success',
      data: { rankLength: 10, size: 10, page: 1, rankList: new Array(10).fill({}) },
    },
    refetchOnWindowFocus: false,
    ...options,
  });
};
