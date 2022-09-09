import Link from 'next/link';

export default function ArcanaNotNFTHolder() {
  return (
    <div className="flex h-[255px] flex-col items-center justify-center rounded-2xl bg-p12-black/80 backdrop-blur">
      <img src="/svg/error.svg" alt="error" />
      <p className="mt-6 text-center text-p12-bg">
        You are not P12 Genesis NFT holder yet,
        <br />
        please&nbsp;
        <Link href="/gamer" passHref>
          <a className="font-semibold text-p12-link">claim</a>
        </Link>
        &nbsp;it first.
      </p>
    </div>
  );
}
