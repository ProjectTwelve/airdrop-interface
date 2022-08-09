import classNames from 'classnames';
import { useMemo } from 'react';
import { CHAIN_ICON, CHAIN_ID } from '../../constants';
import { useCollabTimes } from '../../hooks/collab';
import { CollabInfoType } from '../../lib/types';
import { CollabSocials } from '../socialMedia/CollabSocials';
import CollabInfoButton from './CollabInfoButton';

type CollabInfoProps = {
  data: CollabInfoType;
};
export default function CollabInfo({ data }: CollabInfoProps) {
  const {
    projectName,
    projectInfo,
    projectLogo,
    projectWhitepaper,
    projectChain,
    projectWebsite,
    projectTwitter,
    projectDiscord,
    timeWarmup,
    timeClose,
    tokenAmount,
    nftTotalAmount,
  } = data;
  const { startTime, endTime } = useCollabTimes({ timeWarmup, timeClose });

  const badgeChains = useMemo(() => {
    if (!projectChain?.length) return null;
    return projectChain.map(({ chainId, name }) => {
      if (!chainId) return null;
      return <CollabSocials key={chainId} icon={CHAIN_ICON[chainId as CHAIN_ID]} label={name} />;
    });
  }, [projectChain]);

  return (
    <div className="flex rounded-2xl bg-p12-black/80 md:flex-wrap">
      <div className="flex aspect-square w-[420px] min-w-[420px] items-center justify-center bg-collab-info bg-cover md:min-w-full">
        <img className="h-40 w-40 rounded-3xl" src={projectLogo} alt={`${projectName} Logo`} />
      </div>
      <div className="flex w-full max-w-full flex-grow flex-col p-9">
        <h1 className="text-3xl font-semibold leading-9">{projectName}</h1>
        <div className="pt-1 text-sm leading-5 text-p12-sub">
          Time: {startTime} - {endTime}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {projectWebsite && <CollabSocials key="website" href={projectWebsite} icon="/svg/door.svg" label="Website" />}
          {projectWhitepaper && (
            <CollabSocials key="white_paper" href={projectWhitepaper} icon="/svg/white_paper_2.svg" label="White Paper" />
          )}
          {badgeChains}
          {projectTwitter && (
            <CollabSocials
              key="twitter"
              href={projectTwitter}
              icon="/svg/twitter.svg"
              label="Twitter"
              className="bg-[#02A9F4]/100"
            />
          )}
          {projectDiscord && (
            <CollabSocials
              href={projectDiscord}
              key="discord"
              icon="/svg/discord.svg"
              label="Discord"
              className="bg-[#6882FF]/100"
            />
          )}
        </div>
        <div className="mt-8 flex-grow leading-7">{projectInfo}</div>
        <div className="mt-8 flex items-center justify-between gap-4 md:flex-wrap">
          <div className="flex gap-7 divide-x border-p12-line">
            {tokenAmount ? (
              <div className="align-bottom text-2xl font-bold leading-9 text-[#FFAA2C]">
                Token <span className="text-[42px] font-bold text-[#FFAA2C]">{tokenAmount}</span>
              </div>
            ) : null}
            {nftTotalAmount ? (
              <div
                className={classNames('border-p12-line align-bottom font-ddin text-2xl font-bold leading-9 text-[#1EDB8C]', {
                  'pl-7': tokenAmount,
                })}
              >
                NFT <span className="font-ddin text-[42px] font-bold text-[#1EDB8C]">{nftTotalAmount}</span>
              </div>
            ) : null}
          </div>
          <CollabInfoButton data={data} />
        </div>
      </div>
    </div>
  );
}
