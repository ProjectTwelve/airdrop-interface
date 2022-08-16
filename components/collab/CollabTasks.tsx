import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ReactGA from 'react-ga4';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { fetchCollabTweetVerify } from '../../lib/api';
import { referralCodeAtom } from '../../store/invite/state';
import Button from '../button';
import Message from '../message';
import { CollabSocials } from '../socialMedia/CollabSocials';
import CollabTaskItem from './CollabTaskItem';
import type { Response, CollabInfoType, CollabUserInfo, CollabTweetVerifyParams } from '../../lib/types';

export type CollabTasksProps = {
  data: CollabInfoType;
};

export default function CollabTasks({ data }: CollabTasksProps) {
  const { taskGleam, taskTweetContent, collabCode } = data;
  const [isJoinDisable, setIsJoinDisable] = useState<boolean>(false);
  const referralCode = useRecoilValue(referralCodeAtom);
  const { address } = useAccount();
  const [value, setValue] = useState('');
  const mutationVerify = useMutation<Response<CollabUserInfo>, any, CollabTweetVerifyParams, any>(
    (data) => fetchCollabTweetVerify(data),
    {
      onSuccess: (data) => {
        if (!data?.data?.taskTweetStatus) {
          toast.error(<Message message="Verify failed!" />);
          return;
        }
        toast.success(<Message message="Verify successfully!" />);
      },
    },
  );

  const handleTwitterShareClick = useCallback(() => {
    ReactGA.event({ category: 'Collab-Item', action: 'Click', label: 'twitter' });
    const referralLink = window.location.origin + window.location.pathname + (referralCode ? `?code=${referralCode}` : '');
    const url = encodeURIComponent(referralLink);
    const text = encodeURIComponent(taskTweetContent);
    window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url, '_blank');
  }, [taskTweetContent, referralCode]);

  const handleVerify = useCallback(() => {
    ReactGA.event({ category: 'Collab-Item', action: 'Click', label: 'verify' });
    if (!address) {
      toast.error(<Message message="Please connect your wallet first." title="Oops" />);
      return;
    }
    const reg = new RegExp(/(https:\/\/twitter.com\/.*\/status\/)([0-9]{19})/);
    if (reg.test(value)) {
      console.log(value);
      mutationVerify.mutate({ collabCode, walletAddress: address, taskTweetUrl: value });
    } else toast.error(<Message message="Not a legitimate twitter link!" />);
  }, [mutationVerify, value, collabCode, address]);

  useEffect(() => {
    const now = dayjs().unix();
    const isOpen = now > data.timeJoin && now < data.timeAllocation;
    setIsJoinDisable(!isOpen);
  }, [data.timeAllocation, data.timeJoin]);

  return (
    <div className="mt-9 flex flex-col gap-1">
      {taskTweetContent ? (
        <>
          <h1 className="text-3xl font-semibold leading-9">How To Redeem Airdrop</h1>
          <p className="text-sm leading-7 text-[#9A9DAA]">
            Click the above Join Button and finish the following the steps to finish verification.
          </p>
        </>
      ) : null}
      <div className="mt-4 grid grid-cols-3 gap-7 md:grid-cols-1">
        {taskTweetContent ? null : (
          <div className="flex flex-col gap-5">
            <h1 className="mt-7 text-3xl font-semibold leading-9">How To Redeem Airdrop</h1>
            <p className="text-sm leading-7 text-[#9A9DAA]">
              Click the above Join Button and finish the following the steps to finish verification.
            </p>
          </div>
        )}
        <CollabTaskItem
          key="airdrop"
          gaKey="airdrop"
          title="Genesis Airdrop"
          icon={<div className="aspect-[2.19/1] h-7 max-w-[70px] bg-p12-logo bg-cover"></div>}
          content="Go to P12 Genesis Soul-Bound NFT Airdrop to claim P12 Airdrop NFT."
          href="/"
          hrefLabel="To P12 Genesis Airdrop"
        />
        <CollabTaskItem
          key="gleam"
          gaKey="gleam"
          title="Gleam"
          icon={<img className="aspect-square h-8" src="/img/collab/gleam.png" alt="gleam icon" />}
          content="Complete all required tasks on Gleam is a must step."
          href={taskGleam}
          target="_blank"
          hrefLabel="To Gleam"
        />
        {taskTweetContent ? (
          <CollabTaskItem
            key="share"
            title="Share"
            icon={<img className="aspect-square h-8" src="/img/collab/share.png" alt="Share icon" />}
            content={
              <>
                <span>Click button to make a tweet</span>
                <CollabSocials
                  onClick={handleTwitterShareClick}
                  icon="/svg/twitter.svg"
                  label="Send Twitter"
                  className="bg-[#02A9F4]/100"
                />
                <span>
                  Then copy-paste the tweet URL into the below input box{' '}
                  <img className="inline" src={'/svg/down-2.svg'} alt="down-icon" />
                </span>
              </>
            }
          >
            <div className="flex h-11 gap-3">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full rounded-full bg-[#494E69]/60 px-5 leading-4 hover:bg-[#494E69]/80"
                placeholder="Paste the tweet URL"
              />
              <Button type="gradient" disabled={isJoinDisable} className="w-28 min-w-fit flex-grow" onClick={handleVerify}>
                Verify
              </Button>
            </div>
          </CollabTaskItem>
        ) : null}
      </div>
    </div>
  );
}
