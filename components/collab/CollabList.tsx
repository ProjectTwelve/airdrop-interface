import { CollabListItem } from './CollabListItem';

export function CollabList() {
  return (
    <div className="grid grid-cols-2 gap-4 pt-6 md:grid-cols-1 md:gap-2 md:pt-3">
      <CollabListItem key="item1" />
      <CollabListItem key="item2" />
    </div>
  );
}
