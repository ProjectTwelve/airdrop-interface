import { arcanaNotSubmittedListAtom, arcanaSubmittedListAtom } from '@/store/arcana/state';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import ArcanaWorks from './ArcanaWorks';

export default function MyCreation() {
  const submitData = useRecoilValue(arcanaSubmittedListAtom);
  const inventoryData = useRecoilValue(arcanaNotSubmittedListAtom);
  console.log('=========my creation', { submitData, inventoryData });
  const works = useMemo(() => {
    const works = submitData?.length ? submitData.slice(0, 9) : [];
    if ((works?.length ?? 0) < 8 && inventoryData?.length)
      return works.concat(inventoryData.slice(0, 8 - (submitData?.length ?? 0)));
    return works;
  }, [inventoryData, submitData]);

  return (
    <div className="flex flex-col">
      <ArcanaWorks data={works} className="mt-12" />
    </div>
  );
}
