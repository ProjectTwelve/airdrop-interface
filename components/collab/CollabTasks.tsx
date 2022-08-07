import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { CollabInfoType } from '../../lib/types';
import { referralCodeAtom } from '../../store/invite/state';
import Button from '../button';
import { CollabSocials } from '../socialMedia/CollabSocials';
import CollabTaskItem from './CollabTaskItem';

export type CollabTasksProps = {
  data: CollabInfoType;
};

export default function CollabTasks({ data }: CollabTasksProps) {
  const { taskGleam, taskTweetContent } = data;
  const { asPath } = useRouter();
  const referralCode = useRecoilValue(referralCodeAtom);

  const referralLink = useMemo(() => {
    if (typeof window !== 'undefined') {
      return referralCode ? window.location.origin + asPath + `?code=` + referralCode : 'Please connect your wallet first';
    }
    return 'window undefined';
  }, [referralCode, asPath]);

  const handleTwitterShareClick = useCallback(() => {
    const text = encodeURIComponent(taskTweetContent);
    const url = encodeURIComponent(referralLink);
    window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url, '_blank');
  }, [taskTweetContent, referralLink]);

  const handleVerify = () => {
    console.log('verify!'); // TODO: verify api
  };

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
          href={taskGleam}
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
                className="w-fit bg-[#02A9F4]/100"
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
              // value={value}
              // onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-[100px] bg-[#494E69]/60 px-5 py-[.875rem] text-xs leading-4 hover:bg-[#494E69]/80"
              placeholder="Paste the tweet URL here"
            />
            <Button type="gradient" className="w-28 min-w-fit flex-grow py-4 px-7" onClick={handleVerify}>
              Verify
            </Button>
          </div>
        </CollabTaskItem>
      </div>
    </div>
  );
}
