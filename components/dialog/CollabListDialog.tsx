import { useFetchCollabList } from '@/hooks/collab';
import { CollabShortInfo } from '@/lib/types';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import Dialog from '.';
import { collabListModalAtom } from '../../store/collab/state';
import CollabListItem from '../collab/CollabListItem';

export function CollabListDialog() {
  const [open, setOpen] = useRecoilState(collabListModalAtom);

  const { data, isLoading } = useFetchCollabList();
  const collabList = useMemo<CollabShortInfo[]>(() => data ?? [], [data]);
  return (
    <Dialog
      open={open}
      isDismiss
      overlayClass="flex justify-end items-stretch"
      className="my-3 ml-auto mr-3 w-[25rem] overflow-auto xs:w-full"
      containerClass="h-full"
      onOpenChange={(op) => setOpen(op)}
      render={() => (
        <div className="flex h-full flex-col gap-5">
          <h2 className="text-xl/5.5 font-semibold">collabs</h2>
          <div className="vertical-scroll -mx-4 flex flex-grow flex-col gap-4 overflow-auto px-4">
            {!collabList?.length ? (
              <>
                <CollabListItem loading={isLoading} />
                <CollabListItem loading={isLoading} />
                <CollabListItem loading={isLoading} />
                <CollabListItem loading={isLoading} />
                <CollabListItem loading={isLoading} />
                <CollabListItem loading={isLoading} />
                <CollabListItem loading={isLoading} />
                <CollabListItem loading={isLoading} />
              </>
            ) : (
              collabList.map((item) => <CollabListItem key={item?.collabCode} data={item} />)
            )}
          </div>
        </div>
      )}
    />
  );
}
