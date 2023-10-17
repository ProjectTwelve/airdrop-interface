import React from 'react';
import { useAccount } from 'wagmi';
import classNames from 'classnames';
import { GAMER_BADGES } from '@/constants';
import { useGamerRank } from '@/hooks/ranking';
import Button from '@/components/button';
import { useRouter } from 'next/router';

export default function MyGamerRankItem() {
  const { address } = useAccount();
  const { data } = useGamerRank(address);
  const router = useRouter();

  return (
    <div className="rank-item gap-2">
      <div className="w-7.5 flex-none text-center text-xs font-medium 2xl:mr-4 2xl:w-10">
        <p>YOU</p>
        <p>{data?.tokenRank ?? '???'}</p>
      </div>
      <div className="h-11 w-11 overflow-hidden rounded bg-gray-200/10">
        {data?.avatar_full && <img loading="lazy" src={data.avatar_full} alt="avatar" />}
      </div>
      <div className="overflow-hidden">
        <p className={classNames('w-20 truncate text-sm font-medium', !data?.person_name && 'text-gray-350')}>
          {data?.person_name ?? 'Null'}
        </p>
        {/*{data?.ss_game_count && data.ss_game_count > 0 ? (*/}
        {/*  <span className="whitespace-nowrap rounded bg-purple-500/20 px-2 py-[1.5px] text-xs text-purple">SS Gamer</span>*/}
        {/*) : null}*/}
      </div>
      {data?.nft_level === undefined ? (
        <div className="w-[11rem]">
          <Button type="gradient" className="w-full px-0 text-sm" onClick={() => router.push('/dashboard')}>
            Enter Gamer Airdrop
          </Button>
        </div>
      ) : (
        <>
          <div className="rounded bg-blue-550/20 px-2 py-1">
            <p className="border-b border-blue-550/30 pb-[3px] text-center text-xs/3.5 text-blue">Steam year</p>
            <p className="mt-1 text-center text-xs/3.5 text-blue">--</p>
          </div>
          <div className="rounded bg-blue-550/20 px-2 py-1 lg:hidden xs:hidden">
            <p className="border-b border-blue-550/30 pb-[3px] text-center text-xs/3.5 text-blue">SS Games</p>
            <p className="text-p12-lin mt-1 text-center text-xs/3.5 text-blue">--</p>
          </div>
        </>
      )}
      <div className={classNames('flex-1 px-3 text-xl/7 font-semibold', data ? ' text-yellow' : 'text-gray-350')}>0</div>
      <div className="mr-3 h-13 w-13">
        {data?.nft_level !== undefined ? (
          <img src={GAMER_BADGES[data.nft_level].img} className="w-full" alt="badge" />
        ) : (
          <img className="w-full" src="/img/unclaimed.webp" alt="unclaimed" />
        )}
      </div>
    </div>
  );
}
