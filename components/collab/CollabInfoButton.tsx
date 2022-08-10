import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useAccount } from 'wagmi';
import { useCollabIsClaimed, useCollabIsWin } from '../../hooks/collab';
import { fetchCollabJoin } from '../../lib/api';
import { collabUserInfoAtom } from '../../store/collab/state';
import { isConnectPopoverOpen } from '../../store/web3/state';
import Button from '../button';
import { toast } from 'react-toastify';
import Message from '../message';
import { useIsMounted } from '../../hooks/useIsMounted';
import ReactGA from 'react-ga4';
import type { CollabInfoType, CollabUserInfo, CollabUserParams, Response } from '../../lib/types';

dayjs.extend(isBetween);

export type CollabInfoButtonProps = {
  data: CollabInfoType;
};
export default function CollabInfoButton({ data }: CollabInfoButtonProps) {
  const { collabCode, timeJoin, timeAllocation, timeClaim, timeClose, nftClaimLink, tokenClaimLink } = data;
  const nowDate = dayjs();
  const joinDate = dayjs.unix(timeJoin);
  const allocDate = dayjs.unix(timeAllocation);
  const claimDate = dayjs.unix(timeClaim);
  const closeDate = dayjs.unix(timeClose);
  const { address } = useAccount();
  const [nowUserInfo, setUserInfo] = useRecoilState(collabUserInfoAtom);
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);
  const isClaimed = useCollabIsClaimed();
  const isWin = useCollabIsWin();
  const isMounted = useIsMounted();
  const className = 'min-w-fit max-w-[300px] flex-grow';

  const mutationJoin = useMutation<Response<CollabUserInfo>, any, CollabUserParams, any>((data) => fetchCollabJoin(data), {
    onSuccess: (data) => {
      if (data.code !== 200) {
        toast.error(<Message message={data.msg} title="Ah shit, here we go again" />);
        return;
      }
      setUserInfo(data.data);
      toast.success(<Message message="Join successfully!" />);
    },
  });

  const handleJoin = useCallback(() => {
    ReactGA.event({ category: 'Collab-Item', action: 'Click', label: 'join' });
    if (!address) {
      ReactGA.event({ category: 'Collab-Item', action: 'Click', label: 'connect' });
      setConnectOpen(true);
      // TODO: connect callback should join again
      return;
    }
    mutationJoin.mutate({ collabCode, walletAddress: address });
  }, [collabCode, address, mutationJoin, setConnectOpen]);

  const handleClaim = useCallback(() => {
    ReactGA.event({ category: 'Collab-Item', action: 'Click', label: 'claim' });
    if (!tokenClaimLink && !nftClaimLink) return toast.error(<Message message="No claim link" title="Oops" />);
    if (nftClaimLink) {
      window.open(nftClaimLink, '_blank');
      return;
    }
    if (tokenClaimLink) {
      window.open(tokenClaimLink, '_blank');
      return;
    }
  }, [tokenClaimLink, nftClaimLink]);

  const generateDisableButton = useCallback(
    (className: string, label: string) => (
      <Button size="large" className={className} disabled={true}>
        {label}
      </Button>
    ),
    [],
  );

  const generateConnectButton = useCallback(
    (className: string) => (
      <Button size="large" type="gradient" className={className} onClick={() => setConnectOpen(true)}>
        Connect Wallet
      </Button>
    ),
    [setConnectOpen],
  );

  const generateJoinButton = useCallback(
    (className: string) => (
      <Button
        size="large"
        type={nowUserInfo ? 'default' : 'gradient'}
        className={className}
        onClick={handleJoin}
        disabled={!!nowUserInfo}
      >
        Join
      </Button>
    ),
    [nowUserInfo, handleJoin],
  );

  const generateClaimButton = useCallback(
    (className: string) =>
      isWin ? (
        <Button
          size="large"
          type={isClaimed ? 'default' : 'gradient'}
          className={className}
          onClick={handleClaim}
          disabled={isClaimed}
        >
          {isClaimed ? 'Claimed' : 'Claim'}
        </Button>
      ) : (
        <Button size="large" type="default" className={className} disabled={true}>
          Claim
        </Button>
      ),
    [isWin, isClaimed, handleClaim],
  );

  if (!isMounted) return null;
  if (!address) return generateConnectButton(className);
  if (nowDate.isBefore(joinDate)) return generateDisableButton(className, 'Coming Soon');
  if (nowDate.isBetween(joinDate, allocDate, null, '[)')) return generateJoinButton(className);
  if (nowDate.isBetween(allocDate, claimDate, null, '[)')) return generateDisableButton(className, 'Picking');
  if (nowDate.isBetween(claimDate, closeDate, null, '[]')) return generateClaimButton(className);
  if (nowDate.isAfter(closeDate)) return generateDisableButton(className, 'Closed');
  return null;
}
