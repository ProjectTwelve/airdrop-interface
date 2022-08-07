import CollabListItem from './CollabListItem';
import { useFetchCollabList } from '../../hooks/collab';
import { CollabShortInfo } from '../../lib/types';

export default function CollabList() {
  const { data: collabList, isLoading } = useFetchCollabList();
  return (
    <div className="grid h-[460px] grid-cols-2 gap-4 overflow-scroll pt-6 md:grid-cols-1 md:gap-4 md:pt-3">
      {!isLoading &&
        collabList?.length &&
        collabList?.map((item: CollabShortInfo) => <CollabListItem key={item.collabCode} data={item} />)}
    </div>
  );
}
