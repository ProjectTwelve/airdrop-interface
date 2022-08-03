import React from 'react';
import { useAccount } from 'wagmi';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import Web3Status from '../web3/Web3Status';
import LayoutHeaderExtra from './LayoutHeaderExtra';
import { fetchInvitationCount } from '../../lib/api';
import { invitationCountAtom } from '../../store/invite/state';

function LayoutHeader() {
  const router = useRouter();
  const { data: account } = useAccount();
  const setInvitationCount = useSetRecoilState(invitationCountAtom);

  useQuery(['invitation_count', { addr: account?.address }], () => fetchInvitationCount(account?.address), {
    enabled: !!account?.address,
    onSuccess: ({ data, code }) => {
      if (code === 0) {
        setInvitationCount([data[0], data[1]]);
      }
    },
  });

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
