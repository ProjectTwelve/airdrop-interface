import { CollabListDialog } from '@/components/dialog/CollabListDialog';
import PowerLevelBanner from '@/components/pl/PowerLevelBanner';
import GamerRanking from '@/components/ranking/Gamer';
import { EventCategory, EventName } from '@/constants/event';
import { useThemeAsset } from '@/hooks/theme';
import { collabListModalAtom } from '@/store/collab/state';
import { openLink } from '@/utils';
import ReactGA from 'react-ga4';
import { useSetRecoilState } from 'recoil';

export default function Home() {
  const src = useThemeAsset('arcana_banner_2.webp');
  const setCollabModalOpen = useSetRecoilState(collabListModalAtom);
  return (
    <div className="flex flex-col justify-center px-8 pt-4 md:px-4 2xl:px-0">
      {/*<div className="mt-4 grid w-full grid-cols-2 gap-4 md:grid-cols-1">*/}
      <div className="flex w-full gap-5 tablet:flex-col">
        <div
          className="relative cursor-pointer rounded-2xl duration-200 ease-linear hover:-translate-y-1 "
          onClick={() => {
            ReactGA.event({ category: EventCategory.Assets, action: EventName.CollabBanner });
            openLink('https://arcana.p12.games/');
          }}
        >
          <div
            className="absolute right-0 top-0 origin-top-right rounded-es-lg rounded-se-lg bg-gradient-green px-2.5 py-2 text-xl/5.5 font-bold text-black backdrop-blur-lg transition duration-500 hover:scale-110"
            onClick={(e) => {
              e?.preventDefault();
              e?.stopPropagation();
              setCollabModalOpen(true);
            }}
          >
            View all collabs
          </div>
          {src ? (
            <img
              className="-mt-[10px] h-[13.125rem] w-[28.5rem] rounded-xl object-cover object-center md:h-auto tablet:w-full"
              src={src}
              alt="p12Arcana"
            />
          ) : (
            <div className="h-[300px] w-[684px] animate-pulse bg-white/10" />
          )}
        </div>
        <PowerLevelBanner className="flex-grow" />
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
