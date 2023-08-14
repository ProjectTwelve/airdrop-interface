import Dialog from './index';
import Button from '../button';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAccount, useSignMessage } from 'wagmi';
import { getEmailSignData } from '../../utils';
import { fetchDeveloperEmail } from '../../lib/api';
import { DeveloperEmailParams, Response } from '../../lib/types';
import { toast } from 'react-toastify';
import Message from '../message';
import { getLocalStorage, setLocalStorage } from '../../utils/storage';
import { useRecoilValue } from 'recoil';
import { hasClaimedGameSelector } from '../../store/developer/state';
import { STORAGE_KEY } from '../../constants';

export default function DeveloperEmailDialog() {
  const { address } = useAccount();
  const claimedGame = useRecoilValue(hasClaimedGameSelector);
  const [open, setOpen] = useState<boolean>(false);
  const mutation = useMutation<Response<any>, any, DeveloperEmailParams, any>((data) => fetchDeveloperEmail(data), {
    onSuccess: () => {
      toast.success(<Message message="Bind email successfully" title="Mission Complete" />);
      setLocalStorage(STORAGE_KEY.DEV_EMAIL_SUBMIT, 1);
      setOpen(false);
    },
  });
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { signMessageAsync } = useSignMessage();
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

  useEffect(() => {
    const day = dayjs().format('YYYY-MM-DD');
    const emailSubmit = getLocalStorage(STORAGE_KEY.DEV_EMAIL_SUBMIT);
    const emailDaily = getLocalStorage(STORAGE_KEY.DEV_EMAIL_DAILY);
    if (!emailSubmit && emailDaily !== day && claimedGame) {
      setOpen(true);
      setLocalStorage(STORAGE_KEY.DEV_EMAIL_DAILY, day);
    }
  }, [claimedGame]);

  return (
    <Dialog
      open={open}
      render={() => (
        <div>
          <div className="flex h-[28px] items-center justify-center text-xl">Winner Winner, Chicken Dinner</div>
          <div className="my-[28px] h-[1px] bg-gray-600"></div>
          <div className="max-w-[420px]">
            <p className="text-sm">
              P12 is a GameFi ecosystem with sustainable economylies. We will launch our own editor soon.
            </p>
            <p className="mt-[30px] text-sm">Enter your email address and tune in for more give aways for game developers! </p>
          </div>
          <div className="mt-3 rounded-2xl bg-gray-800/60 px-5 py-6">
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
          <div className="h-8 pt-1 pl-4 text-xs text-red">{error}</div>
          <div className="flex justify-end">
            <Button
              disabled={!value}
              onClick={() => onSubmit(value)}
              className="w-[118px]"
              type={value ? 'gradient' : 'default'}
            >
              Bind
            </Button>
          </div>
        </div>
      )}
    />
  );
}
