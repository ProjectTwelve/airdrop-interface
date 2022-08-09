import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { fetchCollabTweetVerify } from '../../lib/api';
import { referralCodeAtom } from '../../store/invite/state';
import Button from '../button';
import Message from '../message';
import { CollabSocials } from '../socialMedia/CollabSocials';
import CollabTaskItem from './CollabTaskItem';
import { useAccount } from 'wagmi';
import type { Response, CollabInfoType, CollabUserInfo, CollabTweetVerifyParams } from '../../lib/types';

export type CollabTasksProps = {
  data: CollabInfoType;
};

export default function CollabTasks({ data }: CollabTasksProps) {
  const { taskGleam, taskTweetContent, collabCode } = data;
  const referralCode = useRecoilValue(referralCodeAtom);
  const { address } = useAccount();
  const [value, setValue] = useState('');
  const mutationVerify = useMutation<Response<CollabUserInfo>, any, CollabTweetVerifyParams, any>(
    (data) => fetchCollabTweetVerify(data),
    {
      onSuccess: (data) => {
        if (!data.data) {
          toast.error(<Message message={data.msg} title="Ah shit, here we go again" />);
          return;
        }
        toast.success(<Message message="Verified successfully!" />);
      },
    },
  );

  const handleTwitterShareClick = useCallback(() => {
    const referralLink = window.location.origin + window.location.pathname + (referralCode ? `?code=${referralCode}` : '');
    const url = encodeURIComponent(referralLink);
    const text = encodeURIComponent(taskTweetContent);
    window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url, '_blank');
  }, [taskTweetContent, referralCode]);

  const handleVerify = useCallback(() => {
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

  return (
    <div className="mt-12 flex flex-col gap-1">
      <h1 className="text-3xl font-semibold leading-9">How To Redeem Airdrop</h1>
      <p className="leading-7 text-[#9A9DAA]">
        Click the above Join Button and finish the following three steps to finish verification.
      </p>
      <div className=" mt-5 grid grid-cols-3 gap-7 md:grid-cols-1">
        <CollabTaskItem
          key="Genesis Airdrop"
          title="Genesis Airdrop"
          icon={<div className="aspect-[2.19/1] h-7 max-w-[70px] bg-p12-logo bg-cover"></div>}
          content="Go to P12 Genesis Soul-Bound NFT Airdrop to claim P12 Airdrop NFT."
          href="/"
          hrefLabel="To P12 Genesis Airdrop"
        />
        <CollabTaskItem
          key="Gleam"
          title="Gleam"
          icon={<img className="aspect-square h-8" src="/img/collab/gleam.png" alt="gleam icon" />}
          content="Complete all required tasks on Gleam is a must step."
          href={taskGleam}
          hrefLabel="To Gleam"
        />
        <CollabTaskItem
          key="Share"
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
          <div className="flex gap-3">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-full bg-[#494E69]/60 px-5 py-[.875rem] text-xs leading-4 hover:bg-[#494E69]/80"
              placeholder="Paste the tweet URL here"
            />
            <Button type="gradient" className="w-28 min-w-fit flex-grow" onClick={handleVerify}>
              Verify
            </Button>
          </div>
        </CollabTaskItem>
      </div>
    </div>
  );
}
