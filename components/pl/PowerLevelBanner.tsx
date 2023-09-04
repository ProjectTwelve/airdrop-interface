import Button from '@/components/button';
import { useRouter } from 'next/router';

export default function PowerLevelBanner() {
  const router = useRouter();

  const onClick = () => {
    router.push('/dashboard').then();
  };

  return (
    <div className="flex-center relative gap-6 rounded-2xl bg-gradient-to-b from-gray-550/50 py-19 backdrop-blur-lg">
      <div className="absolute left-0 top-0 h-[138px] w-full rounded-t-2xl bg-card-mask" />
      <img width={104} src="/img/pl/power_level.png" alt="power_level" />
      <div>
        <p className="text-xl/5.5">Your P12 Power Level</p>
        <div className="text-gradient-yellow mt-3.5 text-[68px]/[68px] font-bold">1,024,25</div>
      </div>
      <Button type="bordered" onClick={onClick} className="px-7.5 py-4 text-lg/5">
        Check --&gt;
      </Button>
    </div>
  );
}
