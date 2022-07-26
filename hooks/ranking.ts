import { useQuery, UseQueryOptions } from 'react-query';
import {
  fetchDeveloperRank,
  fetchDeveloperTimeRank,
  fetchDeveloperTokenRank,
  fetchDeveloperVerifiedCount,
  fetchGamerRank,
  fetchGamerTimeRank,
  fetchGamerTokenRank,
  fetchGamerVerifiedCount,
} from '../lib/api';

type Pagination = {
  page: number;
  size: number;
};

type Options = Pick<UseQueryOptions, 'staleTime' | 'enabled'>;

export const useDeveloperVerifiedCount = () => {
  return useQuery(['dev_verified_count'], () => fetchDeveloperVerifiedCount(), {
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });
};

export const useDeveloperRank = (addr?: string) => {
  return useQuery(['dev_rank', addr], () => fetchDeveloperRank({ addr }), {
    enabled: !!addr,
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });
};

export const useDeveloperTimeRank = ({ page, size }: Pagination) => {
  return useQuery(['dev_time_rank', { page, size }], () => fetchDeveloperTimeRank({ page, size }), {
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
  return useQuery(['dev_token_rank', { page, size }], () => fetchDeveloperTokenRank({ page, size }), {
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

export const useGamerVerifiedCount = () => {
  return useQuery(['gamer_verified_count'], () => fetchGamerVerifiedCount(), {
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });
};

export const useGamerRank = (addr?: string) => {
  return useQuery(['gamer_rank', addr], () => fetchGamerRank({ addr }), {
    enabled: !!addr,
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });
};

export const useGamerTimeRank = ({ page, size }: Pagination) => {
  return useQuery(['gamer_time_rank', { page, size }], () => fetchGamerTimeRank({ page, size }), {
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

export const useGamerTokenRank = ({ page, size }: Pagination, options?: Options) => {
  return useQuery(['gamer_token_rank', { page, size }], () => fetchGamerTokenRank({ page, size }), {
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
