import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import Web3Status from '../web3/Web3Status';
import { useQuery } from '@tanstack/react-query';
import LayoutHeaderExtra from './LayoutHeaderExtra';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { invitationCountAtom } from '@/store/invite/state';
import { fetchGamerEmailInfo, fetchInvitationCount } from '@/lib/api';
import { gamerEmailDialogTypeAtom, gamerEmailInfoAtom, gamerEmailShowAtom } from '@/store/gamer/state';
import { useFetchGlobalData, useIsLogged } from '@/hooks/user';
import { useFetchUserPowerLevel } from '@/hooks/dashboard/powerLevel';

function LayoutHeader() {
  const router = useRouter();
  const { address } = useAccount();
  const setGamerEmailShow = useSetRecoilState(gamerEmailShowAtom);
  const setInvitationCount = useSetRecoilState(invitationCountAtom);
  const [gamerEmailInfo, setGamerEmailInfo] = useRecoilState(gamerEmailInfoAtom);
  const setGamerEmailDialogTypeAtom = useSetRecoilState(gamerEmailDialogTypeAtom);
  const fetchGlobalData = useFetchGlobalData();
  const isLogged = useIsLogged();
  useFetchUserPowerLevel(address);

  useEffect(() => {
    if (isLogged) {
      fetchGlobalData();
    }
  }, [fetchGlobalData, isLogged, address]); // 切钱包 refetch

  useEffect(() => {
    // set GA ID
    if (!address) return;
    ReactGA.set({ userId: address });
    ReactGA.set({ wallet_address: address.substring(2) });
  }, [address]);

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
