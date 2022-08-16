import { useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import Dialog from './index';
import Button from '../button';
import { getEmailSignData, openLink } from '../../utils';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gamerEmailShowAtom, gamerInfoAtom } from '../../store/gamer/state';
import {GAMER_BADGES, STORAGE_KEY} from '../../constants';
import { useMutation } from '@tanstack/react-query';
import { GamerEmailParams, Response } from '../../lib/types';
import { fetchGamerEmail } from '../../lib/api';
import { toast } from 'react-toastify';
import Message from '../message';
import { setLocalStorage } from '../../utils/storage';

export default function GamerEmailDialog() {
  const { address } = useAccount();
  const { signMessageAsync, isLoading } = useSignMessage();
  const gamerInfo = useRecoilValue(gamerInfoAtom);
  const [open, setOpen] = useRecoilState(gamerEmailShowAtom);
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const mutation = useMutation<Response<any>, any, GamerEmailParams, any>((data) => fetchGamerEmail(data), {
    onSuccess: () => {
      toast.success(<Message message="Bind email successfully" title="Mission Complete" />);
      setLocalStorage(STORAGE_KEY.DEV_EMAIL_SUBMIT, 1);
      setOpen(false);
      openLink(GAMER_BADGES[gamerInfo?.nft_level!].claim);
    },
  });

  const onSubmit = (email: string) => {
    if (!address) {
      return;
    }
    if (!/^[\w.+-]+@[\w-]+\.[\w-.]+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    signMessageAsync({
      message: JSON.stringify(getEmailSignData({ account: address, email: value })),
    })
      .then((signature) => {
        mutation.mutate({ wallet_address: address, email: value, signature });
      })
      .catch((error) => error);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(op) => setOpen(op)}
      render={() => (
        <div>
          <div className="flex h-[28px] items-center justify-center text-xl">One more step</div>
          <div className="my-[28px] h-[1px] bg-p12-line"></div>
          <div className="max-w-[420px]">
            <p className="text-sm">Enter your email address and continue with your claim process.</p>
            <div className="mt-3 rounded-2xl bg-p12-black/60 px-5 py-6">
              <input
                value={value}
                onChange={(e) => {
                  setError('');
                  setValue(e.target.value);
                }}
                className="w-full bg-black/0"
                placeholder="Please enter email address"
              />
            </div>
            <div className="h-8 pt-1 pl-4 text-xs text-p12-error">{error}</div>
            <div className="flex items-center justify-end">
              {isLoading && <p className="mr-2 text-sm text-p12-success">Please check your wallet (PC or mobile) and sign.</p>}
              <Button
                disabled={!value}
                loading={isLoading}
                onClick={() => onSubmit(value)}
                className="w-[118px]"
                type={value ? 'gradient' : 'default'}
              >
                Bind
              </Button>
            </div>
          </div>
        </div>
      )}
    />
  );
}
