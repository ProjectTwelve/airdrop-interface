import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import classNames from 'classnames';
import { useInterval } from 'react-use';
import prettyMilliseconds from 'pretty-ms';
import { openLink } from '../../utils';

export default function Reward() {
  const claimTimestamp = 1671537600000;
  const [isRunning, setIsRunning] = useState(false);
  const [diffTime, setDiffTime] = useState<string>('');
  const onDiscordClick = () => {
    ReactGA.event({ action: 'qatar', category: 'Click', label: 'dcinvite' });
    openLink('https://discord.gg/p12');
  };

  const formatTimestamp = () => {
    const currentTimestamp = Date.now();
    setIsRunning(currentTimestamp < claimTimestamp);
    setDiffTime(prettyMilliseconds(claimTimestamp - currentTimestamp, { secondsDecimalDigits: 0 }));
  };

  const onClaim = () => {
    if (isRunning) return;
    ReactGA.event({ action: 'qatar', category: 'Click', label: 'claim' });
    openLink('https://galxe.com/P12/campaign/GCLG1UwRhx');
  };

  useInterval(() => formatTimestamp(), isRunning ? 1000 : null);

  useEffect(() => formatTimestamp(), []);

  return (
    <div>
      <div className="mx-auto flex max-w-[840px] items-center justify-between md:flex-col md:items-start">
        <h2 className="text-xl font-medium leading-6">Reward</h2>
        {isRunning && (
          <div className="flex items-end justify-center">
            <p className="text-sm font-medium leading-[14px] mb-[3px]">Ready to Claim</p>
            <p
              className="ml-3 bg-clip-text font-ddin text-2xl font-bold leading-6 text-transparent"
              style={{ backgroundImage: 'linear-gradient(180deg, #FFFDD6 0%, #C8A16F 100%)' }}
            >
              {diffTime}
            </p>
          </div>
        )}
      </div>
      <div className="qatar__box mx-auto mt-4 flex max-w-[840px] md:flex-col">
        <div className="flex h-[276px] w-[276px] items-center justify-center bg-[url('/img/collab/reward_bg.webp')] bg-cover bg-no-repeat md:w-full">
          <img className="h-[198px] w-[198px]" src="https://cdn1.p12.games/airdrop/collab/qatar_oat.webp" alt="revoland" />
        </div>
        <div className="flex-1 px-6 md:px-3">
          <h2 className="mt-[30px] text-2xl font-medium leading-7 md:mt-4 md:text-base">
            BNB Chain x P12 Football Fiesta Badge
          </h2>
          <p className="mt-5 text-xs leading-5">
            Must finish all above two steps to get entry of the reward.The reward will be ready after the activity ends. Stay
            tuned.
          </p>
          <p className="mt-5 text-xs leading-5">
            Join Discord for more information: &nbsp;
            <span onClick={onDiscordClick} className="cursor-pointer text-blue">
              https://discord.gg/p12
            </span>
          </p>
          <button
            className={classNames('mt-12 mb-3 w-full py-3', isRunning ? 'qatar__button--disable' : 'qatar__button')}
            onClick={onClaim}
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  );
}
