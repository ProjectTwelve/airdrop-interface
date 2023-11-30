import { useEffect, useState } from 'react';
import { useBadgeNFT } from './bridge';
import { useAccount } from 'wagmi';
import { BadgeInfo, GalxeBadge, NFTQueryResult, P12_COMMUNITY_BADGE } from '@/constants';
import { groupBy } from 'lodash-es';

export const useFetchNFTData = () => {
  const { address } = useAccount();
  const { data, refetch } = useBadgeNFT(address);
  const [nftOwned, setNFTOwned] = useState<GalxeBadge[][]>([]);
  const [restBadge, setRestBadge] = useState<BadgeInfo[]>([]);
  const [AMABadge, setAMABadge] = useState<GalxeBadge[][]>([]);

  useEffect(() => {
    if (!address) return;
    const galxeBadges: GalxeBadge[] = ((data as any)?.user as NFTQueryResult)?.galxeBadges;
    const allCommunityBadge = Object.entries(P12_COMMUNITY_BADGE);
    if (galxeBadges?.length > 0) {
      const communityBadge = galxeBadges.filter((item) => item.galxeCampaign?.campaignType === 'Community');
      const communityBadgeCampaign = communityBadge.map((item) => item.galxeCampaign?.stringId);
      const AMABadge = galxeBadges.filter((item) => item.galxeCampaign?.campaignType === 'AMA');
      const groupCommunityBadge = groupBy(communityBadge, (o) => o.chainId);
      const groupAMABadge = groupBy(AMABadge, (o) => o.chainId);
      const communityBadgeEntries = Object.entries(groupCommunityBadge);
      const AMABadgeEntries = Object.entries(groupAMABadge);

      const chainCommunityBadge: GalxeBadge[][] = [];
      const chainAMABadge: GalxeBadge[][] = [];
      for (const [, value] of communityBadgeEntries) {
        chainCommunityBadge.push(value);
      }
      for (const [, value] of AMABadgeEntries) {
        chainAMABadge.push(value);
      }
      for (let i = 0; i < chainCommunityBadge.length; i++) {
        const chainItem = chainCommunityBadge[i];
        const groupCommunityBadgeById = groupBy(chainItem, (o) => o.galxeCampaign?.stringId);
        const communityBadgeByIdEntries = Object.entries(groupCommunityBadgeById);
        const byIdItem: GalxeBadge[] = [];
        for (const [, value] of communityBadgeByIdEntries) {
          const newItem = value[0];
          newItem.count = value.length;
          const ids = value.map((item) => item.tokenId);
          newItem.tokenIds = ids;
          byIdItem.push(newItem);
        }
        chainCommunityBadge[i] = byIdItem;
      }
      for (let i = 0; i < chainAMABadge.length; i++) {
        const chainItem = chainAMABadge[i];
        const groupAMABadgeById = groupBy(chainItem, (o) => o.galxeCampaign?.stringId);
        const AMABadgeByIdEntries = Object.entries(groupAMABadgeById);
        const byIdItem: GalxeBadge[] = [];
        for (const [, value] of AMABadgeByIdEntries) {
          const newItem = value[0];
          newItem.count = value.length;
          const ids = value.map((item) => item.tokenId);
          newItem.tokenIds = ids;
          byIdItem.push(newItem);
        }
        chainAMABadge[i] = byIdItem;
      }
      chainCommunityBadge.sort((arr1, arr2) => {
        const chainId1 = arr1[0]?.chainId || 0;
        const chainId2 = arr2[0]?.chainId || 0;
        return chainId2 - chainId1;
      });

      setNFTOwned(chainCommunityBadge);
      setAMABadge(chainAMABadge);
      const restBadge = allCommunityBadge
        .filter(([, value]) => !communityBadgeCampaign.includes(value.campaign))
        .map(([, value]) => value);
      setRestBadge(restBadge);
    } else {
      const restBadge = allCommunityBadge.map(([, value]) => value);
      setRestBadge(restBadge);
    }
  }, [data, address]);
  return { nftOwned, restBadge, AMABadge, refetch };
};
