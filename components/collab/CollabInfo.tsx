import classNames from 'classnames';
import { useMemo } from 'react';
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
    nftImage,
    projectWhitepaper,
    projectChain,
    projectWebsite,
    projectTwitter,
    projectDiscord,
    projectOpensea,
    timeComingSoon,
    timeClose,
    tokenAmount,
    tokenName,
    nftTotalAmount,
    nftName,
  } = data;
  const { startTime, endTime } = useCollabTimes({ timeComingSoon, timeClose });

  const badgeChains = useMemo(() => {
    if (!projectChain?.length) return null;
    return projectChain.map(({ chainId, name, url, contractAddress }) => {
      if (!chainId || !url) return null;
      return <CollabSocials key={chainId} icon={url} label={name} href={contractAddress} />;
    });
  }, [projectChain]);

  return (
    <div className="flex rounded-2xl bg-gray-700/30 md:flex-wrap">
      <div className="flex aspect-square w-[380px] flex-none items-center justify-center bg-collab-info bg-cover md:w-full">
        {nftImage ? (
          <img className="aspect-square w-full" src={nftImage} alt={`${projectName} nftImage`} />
        ) : (
          <img className="aspect-square h-[120px]" src={projectLogo} alt={`${projectName} Logo`} />
        )}
      </div>
      <div className="flex w-full max-w-full flex-grow flex-col p-[30px]">
        <h1 className="text-3xl font-semibold leading-9">{projectName}</h1>
        <div className="text-xs leading-5 text-gray">
          Time: {startTime} - {endTime}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {projectWebsite && (
            <CollabSocials
              key="website"
              href={projectWebsite}
              icon={<img src="/svg/website.svg" className="h-4 w-4 brightness-200" alt="White Paper"></img>}
              label="Website"
            />
          )}
          {projectWhitepaper && (
            <CollabSocials key="white_paper" href={projectWhitepaper} icon="/svg/white_paper_2.svg" label="Whitepaper" />
          )}
          {badgeChains}
          {projectOpensea && (
            <CollabSocials key="projectOpensea" icon="/svg/opensea.svg" label="Marketplace" href={projectOpensea} />
          )}
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
              icon="/img/discord-outline.png"
              label="Discord"
              className="bg-[#6882FF]/100"
            />
          )}
        </div>
        <div
          className="mt-5 flex-grow whitespace-pre-wrap text-sm leading-7"
          dangerouslySetInnerHTML={{ __html: projectInfo }}
        />
        <div className="mt-5 flex items-center justify-between gap-4 md:flex-wrap">
          <div className="flex flex-col">
            {tokenAmount ? (
              <div className="font-ddin text-base font-bold leading-9 text-[#FFAA2C]">
                <span className="align-middle text-4xl font-bold text-[#FFAA2C]">{tokenAmount} </span>
                {tokenName || 'Token'}
              </div>
            ) : null}
            {nftTotalAmount ? (
              <div
                className={classNames('font-ddin font-bold leading-9 text-[#1EDB8C]', {
                  'pt-1': tokenAmount,
                })}
              >
                <span className="align-middle text-4xl font-bold text-[#1EDB8C]">{nftTotalAmount} </span>
                {nftName || 'NFT'}
              </div>
            ) : null}
          </div>
          <CollabInfoButton data={data} />
        </div>
      </div>
    </div>
  );
}
