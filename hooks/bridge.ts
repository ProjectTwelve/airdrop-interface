import { useQuery } from '@tanstack/react-query';
import { Address } from 'wagmi';
import { GraphQLClient } from 'graphql-request';
import { useContract } from './useContract';
import { badgeABI, bridgeABI } from '@/abis';
import { BADGE_BRIDGE_ADDRESS, BADGE_BRIDGE_ADDRESS_BSC } from '@/constants/addresses';
import { polygon } from 'wagmi/chains';
import { GalxeBadge } from '@/constants';
import { fetchPowerLevel } from '@/lib/api-nest';

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

const historyQuery = `
    query($address: String!) {   
        user(addr: $address) {
          bridgeTxs {
            hash   
            chainId  
            timestamp   
            galxeBadges{   
              tokenId   
              image  
              galxeCampaign {
                cid
                name
                stringId
              }
            }
          }
        }
      }
    `;

const PowerLevelQuery = `
    query($address: String!) {   
        user(addr: $address) {
          badgePL
        }
      }
    `;

export type BridgeTxs = {
  chainId: string;
  hash: string;
  timestamp: number;
  galxeBadges: GalxeBadge[];
};

export type HistoryResult = {
  user: {
    bridgeTxs: BridgeTxs[];
  };
};

const client = new GraphQLClient('https://badge-api.p12.games/graphql');

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

export const useBadgeHistory = <T>(address?: Address) => {
  return useQuery(['fetch_badge_history', address], async () => {
    if (!address) return {} as T;
    const variables = {
      address: address,
    };
    const data = await client.request(historyQuery, variables);
    return data as T;
  });
};

export const usePowerLevel = <T>(address?: Address) => {
  return useQuery(['fetch_power_level', address], async () => {
    if (!address) return {} as T;
    const variables = {
      address: address,
    };
    const data = await client.request(PowerLevelQuery, variables);
    return data as T;
  });
};

export function useNFTContract({ token, chainId }: { token?: Address; chainId?: number }) {
  return useContract(token, badgeABI, chainId);
}

export function useBridgeContract({ chainId }: { chainId?: number }) {
  // todo bsc chain address
  const address = chainId === polygon.id ? BADGE_BRIDGE_ADDRESS : BADGE_BRIDGE_ADDRESS_BSC;
  return useContract(address, bridgeABI, chainId);
}

export const useFetchPowerLevel = (address?: Address) => {
  return useQuery(['fetch_power_level_2', address], () => fetchPowerLevel(address), {
    select: (data) => data.data,
    enabled: !!address,
  });
};
