import { fetchUserNotSubmittedList, fetchUserSubmittedList } from '@/lib/api-nest';
import { arcanaNotSubmittedListAtom, arcanaSubmittedListAtom } from '@/store/arcana/state';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

export const useMutationUserSubmittedList = () => {
  const setArcanaSubmittedList = useSetRecoilState(arcanaSubmittedListAtom);

  return useMutation({
    mutationFn: () => fetchUserSubmittedList(),
    onSuccess: (res) => {
      const { code, data } = res ?? {};
      if (code === 200) {
        setArcanaSubmittedList(data);
        return data;
      }
    },
    onError: () => {
      setArcanaSubmittedList([]);
    },
  });
};

export const useFetchUserNotSubmittedList = () => {
  const setArcanaNotSubmittedList = useSetRecoilState(arcanaNotSubmittedListAtom);

  return useMutation({
    mutationFn: () => fetchUserNotSubmittedList(),
    onSuccess: (res) => {
      const { code, data } = res ?? {};
      if (code === 200) {
        setArcanaNotSubmittedList(data);
        return data;
      }
    },
    onError: () => {
      setArcanaNotSubmittedList([]);
    },
  });
};
