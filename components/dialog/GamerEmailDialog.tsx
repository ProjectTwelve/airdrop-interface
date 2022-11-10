import { useState } from 'react';
import { toast } from 'react-toastify';
import { useInterval } from 'react-use';
import { useAccount, useSignMessage } from 'wagmi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import Dialog from './index';
import Button from '../button';
import Message from '../message';
import Loading from '../loading';
import { fetchGamerEmail } from '../../lib/api';
import { setLocalStorage } from '../../utils/storage';
import { getEmailSignData, openLink } from '../../utils';
import { GAMER_BADGES, STORAGE_KEY } from '../../constants';
import { GamerEmailParams, Response } from '../../lib/types';
import { gamerEmailDialogTypeAtom, gamerEmailInfoAtom, gamerEmailShowAtom, gamerInfoAtom } from '../../store/gamer/state';
import { useGamerVerifyEmailCode } from '../../hooks/gamer';

export default function GamerEmailDialog() {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const gamerInfo = useRecoilValue(gamerInfoAtom);
  const { signMessageAsync, isLoading } = useSignMessage();
  const [open, setOpen] = useRecoilState(gamerEmailShowAtom);
  const [type, setType] = useRecoilState(gamerEmailDialogTypeAtom);
  const [gamerEmailInfo, setGamerEmailInfo] = useRecoilState(gamerEmailInfoAtom);
  const [count, setCount] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [verifyCode, setVerifyCode] = useState<string>('');
  const { mutateAsync, isLoading: isVerifyLoading } = useGamerVerifyEmailCode();
  const mutation = useMutation<Response<any>, any, GamerEmailParams, any>((data) => fetchGamerEmail(data), {
    onSuccess: ({ code, msg }, variables) => {
      if (code === 0) {
        setCount(60);
        setType('type2');
        setGamerEmailInfo({
          is_new_user: false,
          is_email_verified: false,
          email: variables.email,
          wallet_address: variables.wallet_address,
        });
      } else {
        toast.error(<Message title="Ah shit, here we go again" message={msg} />);
      }
    },
  });

  const onSubmit = (email: string) => {
    if (!address || isLoading) return;
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

  const onSend = () => {
    const { wallet_address, email } = gamerEmailInfo;
    mutation.mutate({ wallet_address, email, signature: '' });
  };

  const onVerify = (code: string) => {
    const { wallet_address } = gamerEmailInfo;
    mutateAsync({ wallet_address, email_verify_code: code }).then(({ code, msg }) => {
      if (code === 0) {
        toast.success(<Message message="Bind email successfully" title="Mission Complete" />);
        setLocalStorage(STORAGE_KEY.DEV_EMAIL_SUBMIT, 1);
        gamerEmailInfo.is_new_user && openLink(GAMER_BADGES[gamerInfo?.nft_level!].claim);
        setGamerEmailInfo((status) => ({ ...status, is_email_verified: true }));
        setOpen(false);
        queryClient.refetchQueries(['gamer_info', address]).then();
      } else {
        toast.error(<Message title="Ah shit, here we go again" message={msg} />);
      }
    });
  };

  useInterval(() => setCount((c) => c - 1), count ? 1000 : null);

  return (
    <Dialog
      open={open}
      onOpenChange={(op) => {
        if (!op) setType(gamerEmailInfo.email ? 'type2' : 'type1');
        setOpen(op);
      }}
      render={() => (
        <div>
          <div className="flex h-[28px] items-center justify-center text-xl">Email Verification</div>
          <div className="my-7 h-[1px] bg-p12-line"></div>
          <div className="w-[384px]">
            {type === 'type2' ? (
              <>
                <p className="text-sm">
                  {count ? 'Check your email for verification code' : 'Verify your email to continue the journey'}
                </p>
                <div className="mt-10 flex justify-between text-sm">
                  <p>{gamerEmailInfo.email}</p>
                  <p className="cursor-pointer font-medium text-p12-link" onClick={() => setType('type1')}>
                    Change email
                  </p>
                </div>
                <div className="mt-[22px] flex items-center justify-between rounded-lg bg-[#494E69]/60 px-5 py-3">
                  <input
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    className="bg-black/0 text-sm"
                    placeholder="4-digit code"
                  />
                  <p className="text-sm font-medium" onClick={() => !count && onSend()}>
                    {count ? count + ' s' : <span className="cursor-pointer text-p12-link">Send</span>}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-end">
                  <Button
                    disabled={!verifyCode}
                    loading={isVerifyLoading}
                    onClick={() => onVerify(verifyCode)}
                    className="w-[118px]"
                    type={verifyCode ? 'gradient' : 'default'}
                  >
                    Verify
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm">Enter your email to continue verification</p>
                <div className="mt-5 rounded-lg bg-[#494E69]/60 px-5 py-3">
                  <input
                    value={value}
                    onChange={(e) => {
                      setError('');
                      setValue(e.target.value);
                    }}
                    className="w-full bg-black/0 text-sm"
                    placeholder="Please enter email address"
                  />
                </div>
                <div className="h-8 pt-1 pl-4 text-xs text-p12-error">{error}</div>
                <div className="mt-[65px] px-[30px]">
                  <Button
                    disabled={!value || isLoading}
                    className="w-full"
                    onClick={() => onSubmit(value)}
                    type={value && !isLoading ? 'gradient' : 'default'}
                  >
                    {!isLoading ? (
                      'Send code'
                    ) : (
                      <p className="flex items-center justify-center">
                        <Loading /> &nbsp; Please sign to continue
                      </p>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    />
  );
}
