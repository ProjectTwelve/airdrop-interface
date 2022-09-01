import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useCallback, useEffect, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useAccount } from 'wagmi';
import { useCollabIsJoined, useCollabIsClaim, useFetchCollabUserInfo } from '../../hooks/collab';
import { fetchCollabJoin, fetchCollabUserInfo } from '../../lib/api';
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
  const comingSoonText = joinDate.format('MMM D, YYYY h:mm A');
  const allocDate = dayjs.unix(timeAllocation);
  const claimDate = dayjs.unix(timeClaim);
  const closeDate = dayjs.unix(timeClose);
  const { address } = useAccount();
  const setUserInfo = useSetRecoilState(collabUserInfoAtom);
  const [isConnectOpen, setConnectOpen] = useRecoilState(isConnectPopoverOpen);
  const isJoined = useCollabIsJoined();
  const isConnected = useMemo(() => !!address, [address]);
  const isClaim = useCollabIsClaim(timeClaim);
  const isMounted = useIsMounted();
  const className = 'min-w-fit max-w-[300px] flex-grow';
  const { isLoading } = useFetchCollabUserInfo(collabCode);

  const mutationJoin = useMutation<Response<CollabUserInfo>, any, CollabUserParams, any>((data) => fetchCollabJoin(data), {
    onSuccess: (data) => {
      if (data.code !== 200 || !data.data) {
        toast.error(<Message message={data.msg} title="Ah shit, here we go again" />);
        return;
      }
      setUserInfo(data.data);
      toast.success(<Message message="Join successfully!" />);
      document.getElementById('collabTasks')?.scrollIntoView();
    },
  });

  const mutationUserInfo = useMutation<Response<CollabUserInfo>, any, CollabUserParams, any>(
    (data) => fetchCollabUserInfo(data),
    {
      onSuccess: (data) => {
        if (data.code !== 200) {
          return;
        }
        setUserInfo(data.data);
        if (!data.data?.joinStatus) {
          mutationJoin.mutate({ collabCode: collabCode, walletAddress: address as string });
        }
      },
    },
  );

  const handleJoin = useCallback(() => {
    if (isJoined) return;
    ReactGA.event({ category: 'Collab-Item', action: 'Click', label: 'join' });
    if (!address) {
      ReactGA.event({ category: 'Collab-Item', action: 'Click', label: 'connect' });
      setConnectOpen(true);
      return;
    }
    mutationJoin.mutate({ collabCode, walletAddress: address });
  }, [collabCode, address, mutationJoin, setConnectOpen, isJoined]);

  useEffect(() => {
    if (isConnectOpen && isConnected && address && !isJoined && nowDate.isBetween(joinDate, allocDate, null, '[)')) {
      mutationUserInfo.mutate({ collabCode, walletAddress: address });
      setConnectOpen(false);
    }
  }, [
    isConnectOpen,
    isConnected,
    address,
    collabCode,
    mutationUserInfo,
    setConnectOpen,
    isJoined,
    nowDate,
    joinDate,
    allocDate,
  ]);

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

  const generateJoinButton = useCallback(
    (className: string) =>
      isJoined ? (
        generateDisableButton(className, 'Join Successfully')
      ) : (
        <Button size="large" type="gradient" className={className} onClick={handleJoin} loading={isLoading}>
          Join
        </Button>
      ),
    [isJoined, handleJoin, generateDisableButton, isLoading],
  );

  const generateClaimButton = useCallback(
    (className: string) =>
      isClaim ? (
        <Button size="large" type="gradient" className={className} onClick={handleClaim} loading={isLoading}>
          Claim
        </Button>
      ) : (
        generateDisableButton(className, 'Unlucky')
      ),
    [isClaim, handleClaim, generateDisableButton, isLoading],
  );

  if (!isMounted) return null;
  if (nowDate.isBefore(joinDate)) return generateDisableButton(className, comingSoonText);
  if (nowDate.isBetween(joinDate, allocDate, null, '[)')) return generateJoinButton(className);
  if (nowDate.isBetween(allocDate, claimDate, null, '[)')) return generateDisableButton(className, 'Allocating');
  if (nowDate.isBetween(claimDate, closeDate, null, '[]'))
    return address ? generateClaimButton(className) : generateDisableButton(className, 'Connect Wallet');
  if (nowDate.isAfter(closeDate)) return generateDisableButton(className, 'Closed');
  return null;
}
