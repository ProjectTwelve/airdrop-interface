import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import ReactGA from 'react-ga4';
import { toast } from 'react-toastify';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import isBetween from 'dayjs/plugin/isBetween';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Button from '../button';
import Message from '../message';
import { getEtherscanLink } from '../../utils';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useCollabContract } from '../../hooks/useContract';
import { isConnectPopoverOpen } from '../../store/web3/state';
import { ARCANA_CHAIN_ID, COLLAB_CHAIN_ID } from '../../constants';
import { fetchCollabJoin, fetchCollabUserInfo } from '../../lib/api';
import { collabClaimModalAtom, collabUserInfoAtom } from '../../store/collab/state';
import { useCollabIsJoined, useCollabIsClaim, useFetchCollabUserInfo } from '../../hooks/collab';
import type { CollabInfoType, CollabUserInfo, CollabUserParams, Response } from '../../lib/types';

dayjs.extend(isBetween);

const className = 'min-w-fit max-w-[300px] flex-grow';

export type CollabInfoButtonProps = {
  data: CollabInfoType;
};
export default function CollabInfoButton({ data }: CollabInfoButtonProps) {
  const { collabCode, timeJoin, timeAllocation, timeClaim, timeClose, ifOnChain, onChainIpfs } = data;
  const nowDate = dayjs();
  const { chain } = useNetwork();
  const joinDate = dayjs.unix(timeJoin);
  const comingSoonText = joinDate.format('MMM D, YYYY h:mm A');
  const allocDate = dayjs.unix(timeAllocation);
  const claimDate = dayjs.unix(timeClaim);
  const closeDate = dayjs.unix(timeClose);
  const { address } = useAccount();
  const setUserInfo = useSetRecoilState(collabUserInfoAtom);
  const [isConnectOpen, setConnectOpen] = useRecoilState(isConnectPopoverOpen);
  const isJoined = useCollabIsJoined();
  const [isWriteLoading, setIsWriteLoading] = useState<boolean>(false);
  const [isChainJoined, setIsChainJoined] = useState<boolean>(false);
  const isConnected = useMemo(() => !!address, [address]);
  const isClaim = useCollabIsClaim(timeClaim);
  const isMounted = useIsMounted();
  const { isLoading } = useFetchCollabUserInfo(collabCode);
  const setClaimModal = useSetRecoilState(collabClaimModalAtom);
  const isCorrectNetwork = useMemo(() => chain?.id === COLLAB_CHAIN_ID, [chain?.id]);
  const { switchNetwork, isLoading: isSwitchNetworkLoading } = useSwitchNetwork({ chainId: ARCANA_CHAIN_ID });
  const collabContract = useCollabContract();

  const mutationJoin = useMutation<Response<CollabUserInfo>, any, CollabUserParams, any>((data) => fetchCollabJoin(data), {
    onSuccess: (data) => {
      if (data.code !== 200 || !data.data) {
        toast.error(<Message message={data.msg} title="Ah shit, here we go again" />);
        return;
      }
      setUserInfo(data.data);
      if (!ifOnChain) {
        toast.success(<Message message="Join successfully" />);
      }
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
    ReactGA.event({ action: 'Collab-Item', category: 'Click', label: 'join' });
    if (!address) {
      ReactGA.event({ action: 'Collab-Item', category: 'Click', label: 'connect' });
      setConnectOpen(true);
      return;
    }
    mutationJoin.mutate({ collabCode, walletAddress: address });
  }, [collabCode, address, mutationJoin, setConnectOpen, isJoined]);

  const handleChainJoin = useCallback(async () => {
    if (isChainJoined || !collabContract) return;
    ReactGA.event({ action: 'Collab-Item', category: 'Click', label: 'chain-join' });
    if (!address) {
      ReactGA.event({ action: 'Collab-Item', category: 'Click', label: 'chain-connect' });
      setConnectOpen(true);
      return;
    }
    if (!isCorrectNetwork) {
      switchNetwork?.();
      return;
    }
    try {
      setIsWriteLoading(true);
      mutationJoin.mutate({ collabCode, walletAddress: address });
      // @ts-ignore
      const transactionHash = await collabContract.write.saveStamp([collabCode, onChainIpfs]);
      toast.success(
        <Message
          title="Mission Complete"
          message={
            <div>
              <p>Join successfully</p>
              <p>
                <a className="text-blue" target="_blank" href={getEtherscanLink(transactionHash, 'transaction')}>
                  View on Etherscan
                </a>
              </p>
            </div>
          }
        />,
      );
      setIsWriteLoading(false);
      setIsChainJoined(true);
    } catch (error: any) {
      toast.error(<Message title="Ah shit, here we go again" message="save error" />);
      setIsWriteLoading(false);
    }
  }, [isChainJoined, collabContract, address, isCorrectNetwork, setConnectOpen, switchNetwork, collabCode, onChainIpfs]);

  useEffect(() => {
    if (
      isConnectOpen &&
      isConnected &&
      address &&
      !ifOnChain &&
      !isJoined &&
      nowDate.isBetween(joinDate, allocDate, null, '[)')
    ) {
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
    ifOnChain,
  ]);

  useEffect(() => {
    if (!collabContract || !address) return;
    collabContract.read
      .readStamp([address, collabCode])
      .then((res: string | undefined) => {
        setIsChainJoined(!!res);
      })
      .catch((error: any) => {
        console.error(error);
        setIsChainJoined(false);
      });
  }, [address, collabCode, collabContract]);

  const handleClaim = useCallback(() => {
    ReactGA.event({ action: 'Collab-Item', category: 'Click', label: 'claim' });
    setClaimModal(true);
  }, [setClaimModal]);

  const generateDisableButton = useCallback(
    (label: string) => (
      <Button size="large" className={className} disabled={true}>
        {label}
      </Button>
    ),
    [],
  );

  const generateJoinButton = useCallback(
    () =>
      isJoined ? (
        generateDisableButton('Join Successfully')
      ) : (
        <Button size="large" type="gradient" className={className} onClick={handleJoin} loading={isLoading}>
          Join
        </Button>
      ),
    [isJoined, handleJoin, generateDisableButton, isLoading],
  );

  const generateChainJoinButton = useCallback(
    () =>
      isChainJoined ? (
        generateDisableButton('Join Successfully')
      ) : (
        <Button
          size="large"
          type="gradient"
          className={className}
          onClick={handleChainJoin}
          loading={isWriteLoading || isSwitchNetworkLoading}
        >
          {address && !isCorrectNetwork ? 'Switch Network' : 'Join'}
        </Button>
      ),
    [isChainJoined, generateDisableButton, handleChainJoin, isWriteLoading, isSwitchNetworkLoading, address, isCorrectNetwork],
  );

  const generateClaimButton = useCallback(
    () =>
      isClaim ? (
        <Button size="large" type="gradient" className={className} onClick={handleClaim} loading={isLoading}>
          Claim
        </Button>
      ) : (
        generateDisableButton('Unlucky')
      ),
    [isClaim, handleClaim, generateDisableButton, isLoading],
  );

  if (!isMounted) return null;
  if (nowDate.isBefore(joinDate)) return generateDisableButton(comingSoonText);
  if (nowDate.isBetween(joinDate, allocDate, null, '[)')) return ifOnChain ? generateChainJoinButton() : generateJoinButton();
  if (nowDate.isBetween(allocDate, claimDate, null, '[)')) return generateDisableButton('Allocating');
  if (nowDate.isBetween(claimDate, closeDate, null, '[]'))
    return address ? generateClaimButton() : generateDisableButton('Connect Wallet');
  if (nowDate.isAfter(closeDate)) return generateDisableButton('Closed');
  return null;
}
