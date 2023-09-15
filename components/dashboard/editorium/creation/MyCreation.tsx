import Button from '@/components/button';
import { EventCategory, EventName } from '@/constants/event';
import { arcanaEditorDownloadDialogOpen, arcanaNotSubmittedListAtom, arcanaSubmittedListAtom } from '@/store/arcana/state';
import { openLink } from '@/utils';
import _ from 'lodash-es';
import { useMemo } from 'react';
import ReactGA from 'react-ga4';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import GalleryItem from './GalleryItem';

export default function MyCreation() {
  const submitData = useRecoilValue(arcanaSubmittedListAtom);
  const inventoryData = useRecoilValue(arcanaNotSubmittedListAtom);
  const setEditorDownloadDialogOpen = useSetRecoilState(arcanaEditorDownloadDialogOpen);

  const works = useMemo(() => {
    const works = submitData?.length ? submitData.slice(0, 9) : [];
    if ((works?.length ?? 0) < 8 && inventoryData?.length)
      return works.concat(inventoryData.slice(0, 8 - (submitData?.length ?? 0)));
    return works;
  }, [inventoryData, submitData]);

  return (
    <div className="flex flex-col">
      <div className="mb-6 mt-13 flex items-end justify-between">
        <h1 className="text-xl/6 font-semibold">My Creation</h1>
        <Button
          type="bordered"
          className="flex gap-1.5 border-white px-8 py-4 text-base/5.5"
          onClick={() => setEditorDownloadDialogOpen(true)}
        >
          <img className="h-6 w-6" src="/svg/download.svg" alt="" /> Download Editor & P12 App
        </Button>
      </div>
      <div className="mt-9.5 grid grid-cols-4 gap-8 md:grid-cols-2 md:gap-4 xs:grid-cols-1">
        {works?.length
          ? works.map((item) => <GalleryItem id={item.id} key={item.id} data={item} isRank50={(item?.rank ?? 999) <= 50} />)
          : null}
        {_.range(1, (works?.length ?? 0) < 4 ? 5 - (works?.length ?? 0) : 9 - (works?.length ?? 0)).map((v) => (
          <div
            key={v}
            className="flex min-h-[15rem] items-center justify-center rounded-lg border border-gray-600/50 text-6xl text-gray-100 backdrop-blur-lg"
          >
            ?
          </div>
        ))}
      </div>
      <Button
        type="bordered"
        className="mt-12 w-[438px] self-center border-white py-4 xs:w-full"
        onClick={() => {
          ReactGA.event({ category: EventCategory.Global, action: EventName.ViewCreations });
          openLink('https://arcana.p12.games/#creation');
        }}
      >
        View all or Edit on{' '}
        <a href="https://arcana.p12.games/#creation" className="cursor-pointer text-blue">
          arcana.p12.games
        </a>
      </Button>
    </div>
  );
}
