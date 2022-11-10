import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Web3Status from '../web3/Web3Status';
import LayoutHeaderExtra from './LayoutHeaderExtra';
import { gamerEmailDialogTypeAtom, gamerEmailInfoAtom, gamerEmailShowAtom } from '../../store/gamer/state';
import { invitationCountAtom } from '../../store/invite/state';
import { fetchGamerEmailInfo, fetchInvitationCount } from '../../lib/api';

function LayoutHeader() {
  const router = useRouter();
  const { address } = useAccount();
  const setGamerEmailShow = useSetRecoilState(gamerEmailShowAtom);
  const setInvitationCount = useSetRecoilState(invitationCountAtom);
  const [gamerEmailInfo, setGamerEmailInfo] = useRecoilState(gamerEmailInfoAtom);
  const setGamerEmailDialogTypeAtom = useSetRecoilState(gamerEmailDialogTypeAtom);

  useQuery(['invitation_count', { addr: address }], () => fetchInvitationCount(address), {
    enabled: !!address,
    onSuccess: ({ data, code }) => {
      if (code === 0) {
        setInvitationCount([data[0], data[1]]);
      }
    },
  });

  useQuery(['gamer_email_info', { wallet_address: address }], () => fetchGamerEmailInfo(address), {
    enabled: !!address,
    onSuccess: ({ data, code }) => {
      if (code === 0) {
        setGamerEmailInfo({
          wallet_address: data.wallet_address,
          email: data.email,
          is_email_verified: data.is_email_verified,
          is_new_user: !data.email,
        });
        setGamerEmailDialogTypeAtom(data.email ? 'type2' : 'type1');
      } else {
        setGamerEmailInfo({
          wallet_address: undefined,
          email: undefined,
          is_email_verified: false,
          is_new_user: true,
        });
        setGamerEmailDialogTypeAtom('type1');
      }
    },
  });

  useEffect(() => {
    if (router.pathname === '/') return;
    const { is_email_verified, is_new_user } = gamerEmailInfo;
    setGamerEmailShow(!is_new_user && !is_email_verified);
  }, [gamerEmailInfo, router, setGamerEmailShow]);

  return (
    <header className="relative z-10 flex justify-between">
      <div className="flex items-center justify-start">
        <div className="h-[36px] w-[80px] cursor-pointer bg-p12-logo bg-cover" onClick={() => router.push('/')} />
        <div className="ml-8 md:hidden">
          <LayoutHeaderExtra />
        </div>
      </div>
      <Web3Status />
    </header>
  );
}

export default React.memo(LayoutHeader);
