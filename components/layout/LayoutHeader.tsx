import { useFetchUserPowerLevel } from '@/hooks/dashboard/powerLevel';
import { useFetchGlobalData, useIsLogged } from '@/hooks/user';
import { fetchGamerEmailInfo, fetchInvitationCount } from '@/lib/api';
import { userPowerLevelAtom } from '@/store/dashboard/state';
import { gamerEmailDialogTypeAtom, gamerEmailInfoAtom } from '@/store/gamer/state';
import { invitationCountAtom } from '@/store/invite/state';
import { digitalFormat } from '@/utils/format';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useAccount } from 'wagmi';
import Web3Status from '../web3/Web3Status';
import LayoutHeaderExtra from './LayoutHeaderExtra';

function LayoutHeader() {
  const router = useRouter();
  const { address } = useAccount();
  const setInvitationCount = useSetRecoilState(invitationCountAtom);
  const setGamerEmailInfo = useSetRecoilState(gamerEmailInfoAtom);
  const setGamerEmailDialogTypeAtom = useSetRecoilState(gamerEmailDialogTypeAtom);
  const fetchGlobalData = useFetchGlobalData();
  const isLogged = useIsLogged();
  const { activatedPL } = useRecoilValue(userPowerLevelAtom);

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

  return (
    <header className="relative z-20 flex justify-between">
      <div className="flex items-center justify-start">
        <div className="h-[36px] w-[80px] cursor-pointer bg-p12-logo bg-cover" onClick={() => router.push('/')} />
        <div className="ml-8 md:hidden">
          <LayoutHeaderExtra />
        </div>
      </div>
      <div className="flex items-center gap-4 xs:flex-wrap xs:justify-end">
        {router.pathname === '/dashboard' ? (
          <div className="relative flex items-center gap-2 rounded-full border-2 border-yellow px-6 py-1.5 text-sm/5.5  font-semibold backdrop-blur">
            Activated PL
            <div className="text-gradient-yellow ml-0.5 text-[2.125rem]/8.5 font-bold">
              {digitalFormat.integer(activatedPL)}
            </div>
            <img src="/img/pl/power_level.png" alt="PL" className="inline-block h-10 w-10" />
          </div>
        ) : null}
        <Web3Status />
      </div>
    </header>
  );
}

export default React.memo(LayoutHeader);
