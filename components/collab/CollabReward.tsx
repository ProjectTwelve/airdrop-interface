import { CollabInfoType } from '../../lib/types';
import CollabRewardItem from './CollabRewardItem';

export type CollabRewardProps = {
  show?: boolean;
  data: CollabInfoType;
};

export default function CollabReward({ show, data }: CollabRewardProps) {
  if (!show) return null;
  const { projectLogo, projectName, tokenIcon, tokenAmount, nftImage } = data;

  return (
    <div className="mt-8 flex flex-col gap-5 border-t border-p12-line py-7">
      {tokenIcon && (
        <CollabRewardItem
          key={tokenIcon}
          logo={projectLogo}
          icon={tokenIcon}
          amount={tokenAmount}
          title={projectName}
          desc="Special Airdrop for P12 (Token)"
        />
      )}
      {nftImage && (
        <CollabRewardItem
          key={nftImage}
          logo={projectLogo}
          icon={<img className="max-w-[72px]" src={nftImage} alt={nftImage} />}
          amount={4}
          title={projectName}
          desc="Special Airdrop for P12 (NFT)"
        />
      )}
    </div>
  );
}
CollabReward.defaultProps = {
  show: false,
};
