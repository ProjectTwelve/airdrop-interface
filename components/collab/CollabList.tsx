import { useRecoilValue } from 'recoil';
import { collabListAtom } from '../../store/collab/state';
import { CollabListItem } from './CollabListItem';

export function CollabList() {
  const collabs = useRecoilValue(collabListAtom);
  return (
    <div className="grid grid-cols-2 gap-4 pt-6 md:grid-cols-1 md:gap-4 md:pt-3">
      {collabs.map((item) => (
        <CollabListItem key={item?.id} data={item} />
      ))}
    </div>
  );
}
