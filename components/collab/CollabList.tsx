// import { useQuery } from 'react-query';
import { mockCollabList } from '../../temp/mock';
import CollabListItem from './CollabListItem';
// import { fetchCollabList } from '../../lib/api';

export default function CollabList() {
  // const { data: collabList } = useQuery(['collab_list'], () => fetchCollabList(), {
  //   select: (data) => (data.code === 0 ? data.data : undefined),
  // });
  const collabList = mockCollabList;
  return (
    <div className="grid h-[460px] grid-cols-2 gap-4 overflow-scroll pt-6 md:grid-cols-1 md:gap-4 md:pt-3">
      {collabList?.map((item) => (
        <CollabListItem key={item.id} data={item} />
      ))}
    </div>
  );
}
