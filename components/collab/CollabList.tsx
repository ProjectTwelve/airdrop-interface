import { useRecoilValue } from 'recoil';
import { collabListAtom } from '../../store/collab/state';
import CollabListItem from './CollabListItem';

export default function CollabList() {
  const collabList = useRecoilValue(collabListAtom);

  return (
    <div className="grid h-[460px] grid-cols-2 gap-4 overflow-scroll pt-6 md:grid-cols-1 md:gap-4 md:pt-3">
      {collabList.map((item) => (
        <CollabListItem key={item.id} data={item} />
      ))}
    </div>
  );
}
