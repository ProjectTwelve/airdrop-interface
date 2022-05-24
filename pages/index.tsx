import React from 'react';
import Image from 'next/image';
import Button from '../components/button';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { inviteModalAtom } from '../store/invite/state';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const [, setOpen] = useRecoilState(inviteModalAtom);
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="mt-16">
        <Image width={394} height={180} src="/svg/logo.svg" alt="logo" />
      </div>
      <div className="mt-16 text-center">
        <h2 className="text-[36px] font-bold">Claim your Airdrop</h2>
        <h2 className="text-[36px] font-bold">Experience Fantastic Metaverse</h2>
      </div>
      <div className="mt-24 flex flex-col items-center gap-6">
        <Button className="w-[470px]" size="large" type="bordered" onClick={() => setOpen(true)}>
          My invite address
        </Button>
        <Button className="w-[470px]" size="large" type="gradient" onClick={() => router.push('/developer')}>
          I am a developer
        </Button>
        <Button disabled className="w-[470px]" size="large">
          I am a gamer
        </Button>
      </div>
      <p className="mt-3 text-xs text-[#A3A6B3]">coming in stage2</p>
    </div>
  );
};

export default Home;
