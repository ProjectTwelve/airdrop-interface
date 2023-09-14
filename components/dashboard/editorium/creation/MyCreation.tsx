import Loading from '@/components/loading';
import { useFetchCreationData } from '@/hooks/dashboard/creation';
import { useEffect, useMemo } from 'react';
import ArcanaWorks from './ArcanaWorks';
import { useAccount } from 'wagmi';

export default function MyCreation() {
  const { address } = useAccount();
  const { data, refetch, loading } = useFetchCreationData();

  useEffect(() => {
    if (address) refetch();
  }, [address, refetch]);

  const works = useMemo(() => {
    if (loading || !data) return [];
    const { inventoryData, submitData } = data;
    const works = submitData?.length ? submitData.slice(0, 9) : [];
    if ((works?.length ?? 0) < 8 && inventoryData?.length)
      return works.concat(inventoryData.slice(0, 8 - (submitData?.length ?? 0)));
    return works;
  }, [data, loading]);

  return (
    <div className="flex flex-col">
      {loading ? <Loading className="mt-12 self-center" size={48} /> : <ArcanaWorks data={works} className="mt-12" />}
    </div>
  );
}
