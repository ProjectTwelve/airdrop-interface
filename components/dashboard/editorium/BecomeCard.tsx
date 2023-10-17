import Button from '@/components/button';
import { EventCategory, EventName } from '@/constants/event';
import { openLink } from '@/utils';
import classNames from 'classnames';
import ReactGA from 'react-ga4';
import { digitalFormat } from '@/utils/format';
import { useRecoilValue } from 'recoil';
import { userPowerLevelAtom } from '@/store/dashboard/state';

export default function BecomeCard({ isVoter }: { isVoter?: boolean }) {
  const { arcanaGamerPL, arcanaDeveloperPL } = useRecoilValue(userPowerLevelAtom);

  return (
    <div className="arcana__p12-card relative flex-grow px-6 py-4.5">
      {!isVoter && <div className="mb-2 text-xl/6 font-bold">Become a Voter</div>}
      <div className={classNames('flex items-start justify-between gap-10', { 'h-full': isVoter })}>
        <div className={classNames(isVoter ? 'flex h-full flex-col justify-center' : 'mt-1.5')}>
          <p className={classNames('flex items-center font-semibold', isVoter ? 'gap-2 text-base/5' : 'gap-1.5 text-sm/5.5')}>
            <span className={classNames('text-gradient-yellow font-bold', isVoter ? 'text-[34px]/10' : ' text-[2.125rem]/8.5')}>
              {digitalFormat.integer(arcanaGamerPL)}
            </span>
            <img
              className={classNames(isVoter ? 'mr-1 h-10 w-10' : 'mr-0.5 h-7.5 w-7.5')}
              src="/img/pl/power_level.png"
              alt="PL"
            />
            for Gamer Genesis NFT
          </p>
          <p
            className={classNames(
              'flex items-center font-semibold',
              isVoter ? 'mt-4 gap-2 text-base/5' : 'mt-2.5 gap-1.5 text-sm/5.5',
            )}
          >
            <span className={classNames('text-gradient-yellow font-bold', isVoter ? 'text-[34px]/10' : ' text-[2.125rem]/8.5')}>
              {digitalFormat.integer(arcanaDeveloperPL)}
            </span>
            <img
              className={classNames(isVoter ? 'mr-1 h-10 w-10' : 'mr-0.5 h-7.5 w-7.5')}
              src="/img/pl/power_level.png"
              alt="PL"
            />
            for Developer Genesis NFT
          </p>
        </div>
        {!isVoter && (
          <Button
            type="bordered"
            onClick={() => {
              ReactGA.event({
                action: EventName.BecomeVoter,
                category: EventCategory.Global,
              });
              openLink('https://arcana.p12.games/#gallery');
            }}
            className="h-12 w-[168px] backdrop-blur-lg"
          >
            CLICK HERE!
          </Button>
        )}
      </div>
    </div>
  );
}
