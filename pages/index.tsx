import React from 'react';
import Button from '../components/button';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { inviteModalAtom } from '../store/invite/state';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const setOpen = useSetRecoilState(inviteModalAtom);
  const router = useRouter();

  return (
    <div className="fixed top-1/2 left-0 right-0 flex -translate-y-1/2 flex-col items-center justify-start">
      <div className="mt-16">
        <div className="h-[180px] w-[394px] bg-[image:var(--logo)] bg-cover"></div>
      </div>
      <div className="mt-16 text-center">
        <h2 className="text-[34px] font-medium">Tribute to Gamers</h2>
        <h2 className="text-[34px] font-medium">P12 Genesis Soul-Bound NFT Airdrop</h2>
      </div>
      <div className="mt-24 flex flex-col items-center gap-6">
        <Button className="w-[470px]" size="large" type="bordered" onClick={() => setOpen(true)}>
          My Invitation Link
        </Button>
        <Button
          className="w-[470px]"
          size="large"
          type="gradient"
          onClick={() => router.push({ pathname: '/developer', query: router.query })}
        >
          I am a Steam Game Dev
        </Button>
        <Button disabled className="w-[470px]" size="large">
          I am a Steam Gamer
        </Button>
      </div>
      <p className="mt-3 text-xs text-[#A3A6B3]">Airdrop to gamers coming in stage 2</p>
    </div>
  );
};

export default Home;
