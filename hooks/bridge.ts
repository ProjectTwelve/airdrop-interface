import { useQuery } from '@tanstack/react-query';
import { Address } from 'wagmi';
import { GraphQLClient } from 'graphql-request';
import { useContract } from './useContract';
import { badgeABI, bridgeABI } from '@/abis';
import { BADGE_BRIDGE_TEST_ADDRESS } from '@/constants/addresses';
import { polygon } from 'wagmi/chains';

const nftQuery = `
    query($address: String!) {   
        user(addr: $address) {
          address
          galxeBadges{
            chainId   
            image      
            galxeCampaign {
              cid           
              stringId      
              name          
              rarity        
              campaignType  
            }
            contractAddress  
            tokenId    
          }
        }
      }
    `;

const client = new GraphQLClient('https://badge-api-test.p12.games/graphql');

export const useBadgeNFT = (address?: Address) => {
  return useQuery(['fetch_badge_nft', address], async () => {
    if (!address) return [];
    const variables = {
      address: address,
    };
    const data = await client.request(nftQuery, variables);
    return data;
  });
};

export function useNFTContract({ token, chainId }: { token?: Address; chainId?: number }) {
  return useContract(token, badgeABI, chainId);
}

export function useBridgeContract({ chainId }: { chainId?: number }) {
  // todo bsc chain address
  const address = chainId === polygon.id ? BADGE_BRIDGE_TEST_ADDRESS : BADGE_BRIDGE_TEST_ADDRESS;
  return useContract(address, bridgeABI, chainId);
}
