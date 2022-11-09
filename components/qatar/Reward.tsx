import ReactGA from 'react-ga4';
import { openLink } from '../../utils';

export default function Reward() {
  const onDiscordClick = () => {
    ReactGA.event({ category: 'qatar', action: 'Click', label: 'dcinvite' });
    openLink('https://discord.gg/p12');
  };

  return (
    <div className="qatar__box mx-auto mt-4 flex max-w-[840px] md:flex-col">
      <div className="flex h-[276px] w-[276px] items-center justify-center bg-[url('/img/collab/reward_bg.webp')] bg-cover bg-no-repeat md:w-full">
        <img className="h-[198px] w-[198px]" src="/img/collab/revoland.webp" alt="revoland" />
      </div>
      <div className="flex-1 px-6 md:px-3">
        <h2 className="mt-[30px] text-2xl font-medium leading-7 md:mt-4 md:text-base">BNB Chain x P12 Football Fiesta Badge</h2>
        <p className="mt-5 text-xs leading-5">
          Must finish all above two steps to get entry of the reward.11The reward will be ready after the activity ends. Stay
          tuned.
        </p>
        <p className="mt-5 text-xs leading-5">
          Join Discord for more information: &nbsp;
          <span onClick={onDiscordClick} className="cursor-pointer text-p12-link">
            https://discord.gg/p12
          </span>
        </p>
        <div className="qatar__button mt-12 mb-3 py-3">Claim</div>
      </div>
    </div>
  );
}
