import { useRouter } from 'next/router';
import { useArcanaThemeAsset } from '@/hooks/theme';

export default function PowerLevelBanner() {
  const router = useRouter();
  const banner = useArcanaThemeAsset('banner.webm');

  const onClick = () => {
    router.push('/dashboard').then();
  };

  return (
    <div
      className="flex-center relative cursor-pointer gap-6 rounded-2xl py-19 duration-200 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="absolute inset-0 left-0 top-0 -z-10 overflow-hidden">
        {banner && <video autoPlay loop muted className="w-full" src={banner} />}
      </div>
      <div className="absolute left-0 top-0 -z-10 h-[138px] w-full rounded-t-2xl bg-card-mask" />
      <img width={104} src="/img/pl/power_level.png" alt="power_level" />
      <div>
        <p className="text-xl/5.5">Your P12 Power Level</p>
        <div className="text-gradient-yellow mt-3.5 text-[68px]/[68px] font-bold">1,024,25</div>
      </div>
      <div className="mx-6 h-10 w-px bg-gray" />
      <div>
        <h2 className="text-2xl/7.5 font-semibold">RANK 58</h2>
        <p className="mt-3 text-xl/7.5">Gamer 58 &nbsp;&nbsp; Developer 58</p>
      </div>
    </div>
  );
}
