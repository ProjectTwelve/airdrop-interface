import { useQuery } from '@tanstack/react-query';
import { Address, useWalletClient } from 'wagmi';
import { getContract } from 'wagmi/actions';
import { GraphQLClient } from 'graphql-request';
import { BADGE_BRIDGE_ADDRESS } from '@/constants/addresses';
import { bridgeABI } from '@/abis';

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

export function useNFTContract() {
  const { data: walletClient } = useWalletClient();

  if (!walletClient) return null;

  return getContract({
    address: BADGE_BRIDGE_ADDRESS,
    abi: bridgeABI,
    walletClient: walletClient,
  });
}
