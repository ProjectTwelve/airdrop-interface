import { useRouter } from 'next/router';

export default function ArcanaNotNFTHolder() {
  const router = useRouter();

  return (
    <div>
      <p className="mt-6 w-[250px] text-center text-sm">
        You are not P12 Genesis NFT holder yet, please&nbsp;
        <span className="font-semibold text-blue">claim</span>
        &nbsp;it first.
      </p>
      <button className="dota__button dota__yellow mt-4 h-[44px] w-[250px]" onClick={() => router.push('/gamer')}>
        Click to Claim
      </button>
    </div>
  );
}
