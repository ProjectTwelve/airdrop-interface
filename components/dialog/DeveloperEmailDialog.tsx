import Dialog from './index';
import Button from '../button';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import ToastIcon from '../svg/ToastIcon';
import { useMutation } from 'react-query';
import { useAccount, useSignMessage } from 'wagmi';
import { getEmailSignData } from '../../utils';
import { fetchDeveloperEmail } from '../../lib/api';
import { DeveloperEmailParams, Response } from '../../lib/types';
import { toast } from 'react-toastify';
import Message from '../message';
import { getLocalStorage, setLocalStorage } from '../../utils/storage';
import { useRecoilValue } from 'recoil';
import { hasClaimedGameSelector } from '../../store/developer/state';

export default function DeveloperEmailDialog() {
  const { data: account } = useAccount();
  const claimedGame = useRecoilValue(hasClaimedGameSelector);
  const [open, setOpen] = useState<boolean>(false);
  const mutation = useMutation<Response<any>, any, DeveloperEmailParams, any>((data) => fetchDeveloperEmail(data), {
    onSuccess: () => {
      toast.success(<Message message="Bind email successfully" title="Mission Complete" />);
      setLocalStorage('dev_email_submit', 1);
      setOpen(false);
    },
  });
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { signMessageAsync } = useSignMessage();
  const onSubmit = (email: string) => {
    if (!account?.address) {
      return;
    }
    if (!/^[\w.+-]+@[\w-]+\.[\w-.]+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    signMessageAsync({
      message: JSON.stringify(getEmailSignData({ account: account.address, email: value })),
    }).then((signature) => {
      mutation.mutate({ wallet_address: account.address, email: value, signature });
    }).catch(error => error);
  };

  useEffect(() => {
    const day = dayjs().format('YYYY-MM-DD');
    const emailSubmit = getLocalStorage('dev_email_submit');
    const emailDaily = getLocalStorage('dev_email_daily');
    if (!emailSubmit && emailDaily !== day && claimedGame) {
      setOpen(true);
      setLocalStorage('dev_email_daily', day);
    }
  }, [claimedGame]);

  return (
    <Dialog
      open={open}
      render={() => (
        <div>
          <div className="flex h-[28px] items-center justify-center text-xl">
            <ToastIcon type="success" />
            <p className="ml-3">Claim Success</p>
          </div>
          <div className="my-[30px] h-[1px] bg-p12-line"></div>
          <div className="max-w-[420px]">
            <p className="text-sm">
              P12 is a GameFi ecosystem with sustainable economylies. We will launch our own editor soon.
            </p>
            <p className="mt-[30px] text-sm">Enter your email address and tune in for more give aways for game developers! </p>
          </div>
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
