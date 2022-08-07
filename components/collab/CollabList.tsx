import CollabListItem from './CollabListItem';
import { useFetchCollabList } from '../../hooks/collab';

export default function CollabList() {
  const { data: collabList } = useFetchCollabList();
  return (
    <div className="grid h-[460px] grid-cols-2 gap-4 overflow-scroll pt-6 md:grid-cols-1 md:gap-4 md:pt-3">
      {collabList?.length && collabList?.map((item) => <CollabListItem key={item.collabCode} data={item} />)}
    </div>
  );
}
