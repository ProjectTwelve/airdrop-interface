import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { CollabInfoType } from '../../lib/types';
import { collabUserInfoAtom } from '../../store/collab/state';
import CollabRewardItem from './CollabRewardItem';

export type CollabRewardProps = {
  data: CollabInfoType;
};

export default function CollabReward({ data }: CollabRewardProps) {
  const { projectLogo, projectName, tokenIcon, nftImage, collabName, tokenName, nftName } = data;
  const userInfo = useRecoilValue(collabUserInfoAtom);
  const tokenAmount = useMemo(() => (userInfo?.tokenResult == undefined ? null : userInfo.tokenResult), [userInfo]);
  const nftAmount = useMemo(() => (userInfo?.nftResult == undefined ? null : userInfo.nftResult), [userInfo]);

  return (
    <div className="mt-8 flex flex-col gap-5 border-t border-gray-600 py-7">
      {tokenAmount != null ? (
        <CollabRewardItem
          key={tokenIcon}
          logo={projectLogo}
          icon={tokenIcon}
          amount={tokenAmount}
          title={collabName || projectName}
          desc={tokenName || 'Token Lucky Draw'}
        />
      ) : null}
      {nftAmount != null ? (
        <CollabRewardItem
          key={nftImage}
          logo={projectLogo}
          icon={<img className="max-w-[72px]" src={nftImage} alt={nftImage} />}
          amount={nftAmount}
          title={collabName || projectName}
          desc={nftName || 'NFT Lucky Draw'}
        />
      ) : null}
    </div>
  );
}
CollabReward.defaultProps = {
  show: false,
};
