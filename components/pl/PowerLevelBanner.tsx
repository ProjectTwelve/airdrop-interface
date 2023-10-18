import Button from '@/components/button';
import { EventCategory, EventName } from '@/constants/event';
import { useThemeAsset } from '@/hooks/theme';
import { useIsMounted } from '@/hooks/useIsMounted';
import { userPowerLevelAtom } from '@/store/dashboard/state';
import { isConnectPopoverOpen } from '@/store/web3/state';
import { digitalFormat } from '@/utils/format';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga4';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { twMerge } from 'tailwind-merge';
import { useAccount } from 'wagmi';

export default function PowerLevelBanner({ className }: { className?: string }) {
  const { address } = useAccount();
  const router = useRouter();
  const isMounted = useIsMounted();
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);
  const bannerLeft = useThemeAsset('home_banner_left.webm');
  const bannerRight = useThemeAsset('home_banner_right.webm');

  const { activatedPL, gamerRank, developerRank, totalRank } = useRecoilValue(userPowerLevelAtom);

  const onClick = () => {
    if (!address) {
      ReactGA.event({ category: EventCategory.Assets, action: EventName.SbtEntrance, label: 'none' });
      setConnectOpen(true);
      return;
    }
    ReactGA.event({ category: EventCategory.Assets, action: EventName.SbtEntrance, label: 'claimed' });
    router.push('/dashboard').then();
  };

  return (
    <div
      className={twMerge(
        'relative cursor-pointer overflow-hidden rounded-[15px] backdrop-blur duration-200 hover:-translate-y-1',
        className,
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 -z-10 flex justify-between overflow-hidden">
        {bannerLeft && <video autoPlay loop muted className="brio absolute left-0 h-[12.5rem]" src={bannerLeft} />}
        {bannerRight && <video autoPlay loop muted className="absolute right-0 h-[12.5rem]" src={bannerRight} />}
      </div>
      <div className="absolute left-0 top-0 -z-10 h-20 w-full bg-card-mask" />
      {isMounted && address && activatedPL ? (
        <div className="py-6 pt-11">
          <div className="flex-center gap-7.5">
            <div className="text-gradient-yellow flex gap-2 text-5xl/13.5 font-bold">
              {digitalFormat.integer(activatedPL)}
              <img width={54} src="/img/pl/power_level.png" alt="power_level" />
            </div>
            <p className="h-8 w-px bg-gray" />
            <div>
              <h2 className="text-xl/6 font-semibold">RANK {totalRank ?? '--'}</h2>
              <p className="mt-1 text-base/6">
                Gamer {gamerRank ?? '--'} &nbsp;&nbsp; Developer {developerRank ?? '--'}
              </p>
            </div>
          </div>
          <div className="text-link mt-10 text-center text-base/5 font-medium">Click to view details</div>
        </div>
      ) : (
        <div className="flex-center-y gap-4 py-10">
          <div className="flex-center select-none gap-2 text-2xl/12 font-semibold">
            Claim P12 SBTs to activate Power Level
            <img className="w-12" src="/img/pl/power_level.png" alt="power_level" />
          </div>
          <div>
            <Button type="bordered" style={{ padding: '0.875rem 6rem' }}>
              CLAIM NOW
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
