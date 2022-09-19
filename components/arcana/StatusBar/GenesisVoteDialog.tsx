import Button from '../../button';
import { shortenAddress } from '../../../utils';
import { BADGE_CONTRACT_ADDRESS, GAMER_BADGES, GAMER_NFT_LEVEL } from '../../../constants';
import classNames from 'classnames';
import React from 'react';

type GenesisVoteDialogProps = {
  close: () => void;
  nftLevel?: GAMER_NFT_LEVEL;
  votes?: number;
};

export default function GenesisVoteDialog({ nftLevel, close, votes }: GenesisVoteDialogProps) {
  return (
    <div className="flex w-[calc(100vw-20px)] max-w-[540px] flex-col items-center justify-center">
      <h2 className="text-center font-medium">MULTICAST VOTES</h2>
      <p className="flex items-center justify-center text-[60px] font-semibold text-p12-success">
        <span className="mr-2 text-[45px] text-p12-success">X</span> {votes || 0}
      </p>
      {nftLevel !== undefined ? <img className="h-[240px] w-[240px]" src={GAMER_BADGES[nftLevel].asset} alt="asset" /> : null}
      <p className="mt-4 text-xl font-medium">P12 Airdrop Coupon</p>
      <p className="mt-1.5 text-xs text-p12-sub">Birthday : 2022/05/13</p>
      <div className="mt-6 flex w-full rounded-2xl border border-p12-line py-4 md:flex-col md:py-0">
        {[
          { label: 'ID', value: '--' },
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
