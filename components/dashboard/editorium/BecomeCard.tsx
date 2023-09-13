import Button from '@/components/button';
import { openLink } from '@/utils';
import classNames from 'classnames';
import React from 'react';

export default function BecomeCard({ isVoter }: { isVoter?: boolean }) {
  return (
    <div className="arcana__p12-card relative flex-grow p-6">
      {!isVoter && <div className="mb-3.5 text-2xl/6.5 font-bold">Become a Voter</div>}
      <div className="flex items-start gap-14">
        <div className={classNames({ 'mt-5': !isVoter })}>
          <p className={classNames('flex items-center font-semibold', isVoter ? 'gap-2 text-xl/5.5' : 'gap-1.5 text-sm/5.5')}>
            <span className={classNames('text-gradient-yellow font-bold', isVoter ? 'text-5xl/12' : ' text-[2.125rem]/8.5')}>
              10,000
            </span>
            <img
              className={classNames(isVoter ? 'mr-1 h-12 w-12' : 'mr-0.5 h-7.5 w-7.5')}
              src="/img/editorium/pl-icon.webp"
              alt="PL"
            />
            for Gamer Genesis NFT
          </p>
          <p
            className={classNames(
              'flex items-center font-semibold',
              isVoter ? 'mt-5.5 gap-2 text-xl/5.5' : 'mt-2.5 gap-1.5 text-sm/5.5',
            )}
          >
            <span className={classNames('text-gradient-yellow font-bold', isVoter ? 'text-5xl/12' : ' text-[2.125rem]/8.5')}>
              12,000
            </span>
            <img
              className={classNames(isVoter ? 'mr-1 h-12 w-12' : 'mr-0.5 h-7.5 w-7.5')}
              src="/img/editorium/pl-icon.webp"
              alt="PL"
            />
            for Developer Genesis NFT
          </p>
        </div>
        {!isVoter && (
          <Button
            type="bordered"
            onClick={() => openLink('https://arcana.p12.games/#gallery')}
            size="large"
            className="h-[3.375rem] w-[12.5rem] backdrop-blur-lg"
          >
            CLICK HERE!
          </Button>
        )}
      </div>
    </div>
  );
}
