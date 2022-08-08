import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useAccount } from 'wagmi';
import { useCollabClaimed, useCollabIsWin } from '../../hooks/collab';
import { fetchCollabJoin } from '../../lib/api';
import { collabUserInfoAtom } from '../../store/collab/state';
import { isConnectPopoverOpen } from '../../store/web3/state';
import Button from '../button';
import { toast } from 'react-toastify';
import type { CollabUserInfo, CollabUserParams, Response } from '../../lib/types';
import Message from '../message';

export type CollabInfoButtonProps = {
  collabCode: string;
  timeJoin: number;
  timeAllocation: number;
  timeClaim: number;
  timeClose: number;
};
export default function CollabInfoButton({
  collabCode,
  timeJoin,
  timeAllocation,
  timeClaim,
  timeClose,
}: CollabInfoButtonProps) {
  const { data: account } = useAccount();
  const [nowUserInfo, setUserInfo] = useRecoilState(collabUserInfoAtom);
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);
  const isClaimed = useCollabClaimed(timeClaim);
  const isWin = useCollabIsWin();

  const mutationJoin = useMutation<Response<CollabUserInfo>, any, CollabUserParams, any>((data) => fetchCollabJoin(data), {
    onSuccess: (data) => {
      if (data.code !== 200) {
        toast.error(<Message message={data.msg} title="Ah shit, here we go again" />);
        return;
      }
      setUserInfo(data.data);
      toast.success(<Message message="Verified successfully" title="Mission Complete" />);
    },
  });

  const handleJoin = useCallback(() => {
    if (!account?.address) return;
    console.log('join!'); // TODO: Join API
    mutationJoin.mutate({ collabCode, walletAddress: account?.address });
  }, [collabCode, account, mutationJoin]);

  const handleClaim = useCallback(() => {
    console.log('claim!'); // TODO: Join API
  }, []);

  const generateDisableButton = useCallback(
    (className: string, label: string) => (
      <Button className={className} disabled={true}>
        {label}
      </Button>
    ),
    [],
  );

  const generateConnectButton = useCallback(
    (className: string) => (
      <Button type="gradient" className={className} onClick={() => setConnectOpen(true)}>
        Connect Wallet
      </Button>
    ),
    [setConnectOpen],
  );

  const generateJoinButton = useCallback(
    (className: string) => (
      <Button type={nowUserInfo ? 'default' : 'gradient'} className={className} onClick={handleJoin} disabled={!!nowUserInfo}>
        Join
      </Button>
    ),
    [nowUserInfo, handleJoin],
  );

  const generateClaimButton = useCallback(
    (className: string) =>
      isWin ? (
        <Button type={isClaimed ? 'default' : 'gradient'} className={className} onClick={handleClaim} disabled={!!isClaimed}>
          {isClaimed ? 'Claimed' : 'Claim'}
        </Button>
      ) : (
        <Button type="default" className={className} disabled={true}>
          Claim
        </Button>
      ),
    [isWin, isClaimed, handleClaim],
  );

  const generateButton = useCallback(() => {
    const className = 'min-w-fit max-w-[300px] flex-grow py-4';
    if (!account?.address) {
      return generateConnectButton(className);
    }
    dayjs.extend(isBetween);
    const nowDate = dayjs('2022.08.03 12:00:00'); // TODO: dayjs(new Date());
    const joinDate = dayjs.unix(timeJoin);
    const allocDate = dayjs.unix(timeAllocation);
    const claimDate = dayjs.unix(timeClaim);
    const closeDate = dayjs.unix(timeClose);
    if (nowDate.isBefore(joinDate)) return generateDisableButton(className, 'Coming Soon');
    if (nowDate.isBetween(joinDate, allocDate)) return generateJoinButton(className);
    if (nowDate.isBetween(allocDate, claimDate)) return generateDisableButton(className, 'Picking');
    if (nowDate.isBetween(claimDate, closeDate)) return generateClaimButton(className);
    if (nowDate.isAfter(closeDate)) return generateDisableButton(className, 'Closed');
  }, [
    account,
    timeJoin,
    timeAllocation,
    timeClaim,
    timeClose,
    generateConnectButton,
    generateJoinButton,
    generateClaimButton,
    generateDisableButton,
  ]);
  return <>{generateButton()}</>;
}
