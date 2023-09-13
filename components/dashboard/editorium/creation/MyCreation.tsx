import Loading from '@/components/loading';
import { useFetchCreationData } from '@/hooks/dashboard/creation';
import { useMemo } from 'react';
import ArcanaWorks from './ArcanaWorks';

export default function MyCreation() {
  const { data, loading } = useFetchCreationData();
  const works = useMemo(() => {
    if (loading || !data) return [];
    const { inventoryData, submitData } = data;
    const works = submitData?.length ? submitData.slice(0, 9) : [];
    if ((works?.length ?? 0) < 8 && inventoryData?.length)
      return works.concat(inventoryData.slice(0, 8 - (submitData?.length ?? 0)));
    return works;
  }, [data, loading]);

  return <div>{loading ? <Loading /> : <ArcanaWorks data={works} className="mt-12" />}</div>;
}
