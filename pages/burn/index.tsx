import Back from '@/components/back';
import { useRouter } from 'next/router';

export default function Burn() {
  const router = useRouter();
  return (
    <div>
      <Back className="my-3.5" onClick={() => router.push('inventory')} />
    </div>
  );
}
