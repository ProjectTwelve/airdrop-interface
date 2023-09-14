import { fetchUserNotSubmittedList, fetchUserSubmittedList } from '@/lib/api-nest';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useIsLogged } from '../user';

export const useFetchUserSubmittedList = () => {
  const isLogged = useIsLogged();
  return useQuery(['fetch_user_submitted_list'], () => fetchUserSubmittedList(), {
    enabled: isLogged,
    select: (res) => (res.code === 200 ? res.data : []),
  });
};

export const useFetchUserNotSubmittedList = () => {
  const isLogged = useIsLogged();

  return useQuery(['fetch_user_not_submitted_list'], () => fetchUserNotSubmittedList(), {
    enabled: isLogged,
    select: (res) => (res.code === 200 ? res.data : []),
  });
};

export const useFetchCreationData = () => {
  const { data: submitData, isLoading, refetch: submitRefetch, isRefetching: isSubmitRefetching } = useFetchUserSubmittedList();

  const {
    data: inventoryData,
    isLoading: inventoryLoading,
    refetch: refetchInventory,
    isRefetching: isInventoryRefetching,
  } = useFetchUserNotSubmittedList();

  const isRefetching = useMemo(() => isSubmitRefetching || isInventoryRefetching, [isInventoryRefetching, isSubmitRefetching]);

  const loading = useMemo(() => isLoading || inventoryLoading, [isLoading, inventoryLoading]);

  const refetch = useCallback(
    async () => Promise.all([refetchInventory(), submitRefetch()]),
    [submitRefetch, refetchInventory],
  );
  return useMemo(
    () => ({ data: { inventoryData, submitData }, loading, refetch, isRefetching }),
    [inventoryData, isRefetching, loading, refetch, submitData],
  );
};
