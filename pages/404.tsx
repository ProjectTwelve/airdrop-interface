import Button from '../components/button';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center">
      <h1 className="mb-8 text-[36px] font-medium">404 - Page Not Found</h1>
      <Button className="w-[180px]" type="bordered" onClick={() => router.push('/')}>
        Back Home
      </Button>
    </div>
  );
}
