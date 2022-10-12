import React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import Button from '../../button';
import { shortenAddress } from '../../../utils';
import { BADGE_CONTRACT_ADDRESS, GAMER_BADGES, GAMER_NFT_LEVEL } from '../../../constants';

type GenesisVoteDialogProps = {
  close: () => void;
  nftLevel?: GAMER_NFT_LEVEL;
  votes?: number;
  createdAt?: number;
  nftId?: number;
};

export default function GenesisVoteDialog({ nftLevel, close, votes, createdAt, nftId }: GenesisVoteDialogProps) {
  return (
    <div className="flex w-[calc(100vw-20px)] max-w-[540px] flex-col items-center justify-center">
      <h2 className="text-center font-medium">Get VOTES by Genesis NFT</h2>
      <p className="flex items-center justify-center text-[60px] font-medium text-p12-success">
        <span className="mr-2 text-[45px] text-p12-success">X</span> {votes || 0}
      </p>
      {nftLevel !== undefined ? <img className="h-[220px] w-[220px]" src={GAMER_BADGES[nftLevel].imgBig} alt="asset" /> : null}
      <p className="mt-4 text-xl font-medium">P12 Airdrop Genesis NFT</p>
      <p className="mt-1.5 text-xs text-p12-sub">Birthday: {createdAt ? dayjs(createdAt).format('YYYY/MM/DD') : '--'}</p>
      <div className="mt-6 flex w-full rounded-xl border border-p12-line py-4 md:flex-col md:py-0">
        {[
          { label: 'ID', value: nftId ?? '--' },
          { label: 'Contract address', value: shortenAddress(BADGE_CONTRACT_ADDRESS) },
          { label: 'Role', value: 'Gamer' },
          { label: 'Status', value: 'Obtained' },
        ].map((item) => (
          <div
            key={item.label}
            className={classNames(
              'flex flex-1 flex-col items-center justify-center border-r border-p12-line',
              'md:flex-row md:border-r-0 md:border-b md:py-2',
              'last:border-none',
            )}
          >
            <p className="h-5 text-xs leading-5 text-p12-sub md:mr-2">{item.label}</p>
            <p className="h-5 text-sm font-medium leading-5">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-[30px] flex w-full justify-end">
        <Button type="bordered" onClick={close}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
