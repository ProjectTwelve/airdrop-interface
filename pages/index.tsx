import { CollabListDialog } from '@/components/dialog/CollabListDialog';
import PowerLevelBanner from '@/components/pl/PowerLevelBanner';
import GamerRanking from '@/components/ranking/Gamer';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center px-8 pt-4 md:px-4 2xl:px-0">
      {/*<div className="mt-4 grid w-full grid-cols-2 gap-4 md:grid-cols-1">*/}
      <div className="flex w-full gap-5 tablet:flex-col">
        <PowerLevelBanner className="flex-grow" />
        <div
          className="relative w-[456px] cursor-pointer overflow-hidden rounded-2xl duration-200 ease-linear hover:-translate-y-1"
          onClick={() => {
            router.push('/inventory').then();
          }}
        >
          <div className="absolute left-0 top-0 -z-10 h-20 w-full bg-card-mask" />
        </div>
        {/* <CollabSwiper /> */}
      </div>
      {/* <div className="mt-5 w-full">
        <PowerLevelBanner />
      </div> */}
      <div className="mt-4">
        <GamerRanking />
      </div>
      <CollabListDialog />
    </div>
  );
}
