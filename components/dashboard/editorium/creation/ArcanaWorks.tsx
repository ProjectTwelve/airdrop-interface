import { GameInfo } from '@/lib/types-nest';
import _ from 'lodash-es';
import GalleryItem from './GalleryItem';
import Button from '@/components/button';
import { openLink } from '@/utils';
import classNames from 'classnames';

type ArcanaWorksProps = {
  className?: string;
  data?: GameInfo[];
};
export default function ArcanaWorks({ className, data }: ArcanaWorksProps) {
  return (
    <div className={classNames('flex flex-col', className)}>
      <h1 className="mb-6 text-xl/6 font-semibold">My Creation</h1>
      <div className="mt-9.5 grid grid-cols-4 gap-8 md:grid-cols-2 md:gap-4 xs:grid-cols-1">
        {data?.length
          ? data.map((item) => <GalleryItem id={item.id} key={item.id} data={item} isRank50={(item?.rank ?? 999) <= 50} />)
          : null}
        {_.range(1, (data?.length ?? 0) < 4 ? 5 - (data?.length ?? 0) : 9 - (data?.length ?? 0)).map((v) => (
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
        className="mt-12 w-[438px] self-center py-4 xs:w-full"
        onClick={() => openLink('https://arcana.p12.games/#creation')}
      >
        View all or Edit on{' '}
        <a href="https://arcana.p12.games/#creation" className="cursor-pointer text-blue">
          arcana.p12.games
        </a>
      </Button>
    </div>
  );
}
