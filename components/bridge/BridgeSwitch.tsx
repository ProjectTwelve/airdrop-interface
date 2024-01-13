import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Button from '../button';
import { useAccount, useNetwork, useSwitchNetwork, useWaitForTransaction } from 'wagmi';
import { isConnectPopoverOpen } from '../../store/web3/state';
import { useSetRecoilState } from 'recoil';
import { polygon, bsc } from 'wagmi/chains';
import classNames from 'classnames';
import { Tooltip } from '../tooltip';
import Table from '../table';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { BridgeTxs, HistoryResult, useBadgeHistory, useBadgeNFT, useBridgeContract, useNFTContract } from '@/hooks/bridge';
import { BadgeInfo, COMMUNITY_NFT_CAMPAIGN_ID, GalxeBadge, NFTQueryResult, P12_COMMUNITY_BADGE } from '@/constants';
import { groupBy } from 'lodash-es';
import { BADGE_BRIDGE_ADDRESS, BADGE_BRIDGE_ADDRESS_BSC } from '@/constants/addresses';
import Message from '../message';
import { toast } from 'react-toastify';
import { shortenHash } from '@/utils';
import ChainIcon from './ChainIcon';
import ReactGA from 'react-ga4';

const historyColumnHelper = createColumnHelper<BridgeTxs>();

export default function BridgeSwitch() {
  const [selectedBadge, setSelectedBadge] = useState<GalxeBadge | null>(null);
  const [isApprovedForAll, setIsApprovedForAll] = useState<boolean>(false);
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);
  const { switchNetwork } = useSwitchNetwork({ chainId: polygon.id });
  const [bridgeCount, setBridgeCount] = useState<number>(1);
  const NFTContract = useNFTContract({ token: selectedBadge?.contractAddress, chainId: selectedBadge?.chainId });
  const bridgeContract = useBridgeContract({ chainId: selectedBadge?.chainId });
  const { chain } = useNetwork();
  const { address } = useAccount();

  const { data, refetch } = useBadgeNFT(address);
  const { data: historyData, isLoading } = useBadgeHistory<HistoryResult>(address);
  const [orderData, setOrderData] = useState<BridgeTxs[]>([]);

  const [nftOwned, setNFTOwned] = useState<GalxeBadge[][]>([]);
  const [restBadge, setRestBadge] = useState<BadgeInfo[]>([]);
  const [AMABadge, setAMABadge] = useState<GalxeBadge[][]>([]);
  const [approveHash, setApproveHash] = useState<undefined | `0x${string}`>(undefined);
  const [confirmHash, setConfirmHash] = useState<undefined | `0x${string}`>(undefined);

  const { isLoading: approveLoading } = useWaitForTransaction({
    chainId: selectedBadge?.chainId,
    hash: approveHash,
    onSuccess() {
      setApproveHash(undefined);
      if (!NFTContract || !address || !selectedBadge) return;
      const bridgeAddress = selectedBadge.chainId === polygon.id ? BADGE_BRIDGE_ADDRESS : BADGE_BRIDGE_ADDRESS_BSC;
      NFTContract.read
        .isApprovedForAll([address, bridgeAddress])
        .then((isApproved) => {
          setIsApprovedForAll(isApproved as boolean);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const { isLoading: confirmLoading } = useWaitForTransaction({
    chainId: selectedBadge?.chainId,
    hash: confirmHash,
    onSuccess() {
      ReactGA.event({
        action: 'bridge_result',
        label: 'true',
        category: 'bridge',
      });
      toast.success(<Message title="Bridge Successfully" />);
      setConfirmHash(undefined);
      refetch();
    },
    onError() {
      ReactGA.event({
        action: 'bridge_result',
        label: 'false',
        category: 'bridge',
      });
    },
  });

  useEffect(() => {
    const data: BridgeTxs[] = historyData?.user?.bridgeTxs ?? [];
    if (data.length > 0) {
      data.sort((a, b) => b.timestamp - a.timestamp);
      setOrderData(data);
    }
  }, [historyData]);

  useEffect(() => {
    if (!selectedBadge || !NFTContract || !address || chain?.id !== selectedBadge.chainId) return;
    const bridgeAddress = selectedBadge.chainId === polygon.id ? BADGE_BRIDGE_ADDRESS : BADGE_BRIDGE_ADDRESS_BSC;
    NFTContract.read
      .isApprovedForAll([address, bridgeAddress])
      .then((isApproved) => {
        setIsApprovedForAll(isApproved as boolean);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedBadge, chain?.id, address]);

  useEffect(() => {
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
  }, [data]);

  const addSelectedBadge = (badge: GalxeBadge) => {
    setSelectedBadge(badge);
  };

  const approveAll = async () => {
    ReactGA.event({ action: 'badge_approve', label: selectedBadge?.galxeCampaign?.stringId, category: 'bridge' });
    if (!selectedBadge || !NFTContract || !address || chain?.id !== selectedBadge?.chainId) return;
    try {
      const bridgeAddress = selectedBadge.chainId === polygon.id ? BADGE_BRIDGE_ADDRESS : BADGE_BRIDGE_ADDRESS_BSC;
      const transactionHash = await NFTContract.write.setApprovalForAll([bridgeAddress, true], {
        account: NFTContract.account ?? address,
        chain: selectedBadge.chainId === polygon.id ? polygon : bsc,
      });
      setApproveHash(transactionHash);
    } catch (error) {
      console.log(error);
    }
  };

  const bridgeMultiple = async () => {
    ReactGA.event({
      action: 'bridge_confirm',
      label: `${selectedBadge?.galxeCampaign?.stringId}_${bridgeCount}`,
      category: 'bridge',
    });
    if (
      !bridgeContract ||
      !selectedBadge?.contractAddress ||
      !selectedBadge.tokenIds ||
      !address ||
      chain?.id !== selectedBadge?.chainId
    )
      return;
    try {
      const slicedTokenIds: bigint[] = selectedBadge.tokenIds.slice(0, bridgeCount).map((item) => BigInt(item));
      const transactionHash = await bridgeContract.write.sendBatchNFT(
        [selectedBadge?.contractAddress, BigInt(20736), slicedTokenIds, address],
        { account: bridgeContract.account ?? address, chain: selectedBadge.chainId === polygon.id ? polygon : bsc },
      );
      setConfirmHash(transactionHash);
    } catch (error) {
      console.log(error);
    }
  };

  const minus = () => {
    ReactGA.event({ action: 'badge_amount_reduce', label: selectedBadge?.galxeCampaign?.stringId, category: 'bridge' });
    if (bridgeCount === 1) return;
    setBridgeCount(bridgeCount - 1);
  };

  const plus = () => {
    ReactGA.event({ action: 'badge_amount_add', label: selectedBadge?.galxeCampaign?.stringId, category: 'bridge' });
    if (bridgeCount + 1 > (selectedBadge?.count || 0)) {
      return;
    }
    setBridgeCount(bridgeCount + 1);
  };

  const countChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > (selectedBadge?.count || 0)) {
      setBridgeCount(selectedBadge?.count || 0);
      return;
    }
    setBridgeCount(Number(e.target.value));
  };

  const gamerColumns = useMemo(
    () => [
      historyColumnHelper.accessor('timestamp', {
        header: 'Time',
        size: 100,
        cell: ({ getValue }) => (
          <p className="flex h-full items-center">{dayjs.unix(getValue()).format('YYYY/MM/DD HH:mm:ss')}</p>
        ),
      }),
      historyColumnHelper.display({
        id: 'galxeBadges',
        header: 'Bridged',
        size: 200,
        cell: ({ row: { original } }) => {
          const badges = original.galxeBadges;
          return (
            <div className="flex items-center gap-2">
              {badges[0]?.galxeCampaign?.name ?? 'unknown'}
              <div className="relative h-[20px] w-[20px]">
                <Image src={badges[0]?.image} alt="badge" objectFit="contain" layout="fill" />
              </div>
            </div>
          );
        },
      }),
      historyColumnHelper.display({
        id: 'contractAddress',
        header: 'Amount',
        size: 120,
        cell: ({ row: { original } }) => <div className="flex h-full items-center">{original.galxeBadges.length}</div>,
      }),
      historyColumnHelper.accessor('hash', {
        header: 'Bridge tx',
        size: 100,
        cell: ({ getValue, row: { original } }) => (
          <div
            className="flex h-full cursor-pointer items-center text-blue"
            onClick={() => {
              ReactGA.event({
                action: 'view_history',
                label: `${original.chainId}_${getValue()}`,
                category: 'bridge',
              });
              if (Number(original.chainId) === polygon.id) {
                window.open(`https://polygonscan.com/tx/${getValue()}`, '__blank');
              } else if (Number(original.chainId) === bsc.id) {
                window.open(`https://bscscan.com/tx/${getValue()}`, '__blank');
              }
            }}
          >
            {shortenHash(getValue())}
          </div>
        ),
      }),
    ],
    [],
  );

  const renderChainName = (chainId: number) => {
    if (chainId === polygon.id) {
      return polygon.name;
    } else if (chainId === bsc.id) {
      return bsc.name;
    } else if (chainId === 20736) {
      return 'P12 Chain';
    } else {
      return 'Unknown';
    }
  };

  const targetByRarity = (badge: GalxeBadge) => {
    const rarity = badge.galxeCampaign?.rarity;
    const type = badge.galxeCampaign?.campaignType;
    const stringId = badge.galxeCampaign?.stringId;

    if (type === 'AMA') {
      return;
    }
    if (stringId === 'GCBuzUFh4i') {
      return {
        url: 'https://cdn1.p12.games/airdrop/badge/cbadges/P12_sm_uncommon.gif',
        name: 'P12 StarMaker [UNCOMMON]',
      };
    }
    if (stringId === 'GCbVwUt9SD') {
      return {
        url: 'https://cdn1.p12.games/airdrop/badge/cbadges/P12_sm_epic.gif',
        name: 'P12 StarMaker [EPIC]',
      };
    }
    if (stringId === COMMUNITY_NFT_CAMPAIGN_ID.GCXBcUUM56) {
      return {
        url: 'https://cdn1.p12.games/airdrop/badge/cbadges/P12_dw_rare.gif',
        name: 'P12 Dream Weaver',
      };
    }
    if (rarity === 'White') {
      return {
        url: 'https://cdn1.p12.games/airdrop/badge/cbadges/P12_bs_common.gif',
        name: 'P12 Best Supporter [COMMON]',
      };
    } else if (rarity === 'Green') {
      return {
        url: 'https://cdn1.p12.games/airdrop/badge/cbadges/P12_bs_uncommon.gif',
        name: 'P12 Best Supporter [UNCOMMON]',
      };
    } else if (rarity === 'Blue') {
      return {
        url: 'https://cdn1.p12.games/airdrop/badge/cbadges/P12_bs_rare.gif',
        name: 'P12 Best Supporter [RARE]',
      };
    } else if (rarity === 'Purple') {
      return {
        url: 'https://cdn1.p12.games/airdrop/badge/cbadges/P12_bs_epic.gif',
        name: 'P12 Best Supporter [EPIC]',
      };
    }
  };

  const transferRarity = (rarity?: string) => {
    if (rarity === 'White') {
      return 'Common';
    } else if (rarity === 'Green') {
      return 'Uncommon';
    } else if (rarity === 'Blue') {
      return 'Rare';
    } else if (rarity === 'Purple') {
      return 'Epic';
    }
  };

  const calculatePLByRarity = (rarity?: string) => {
    switch (rarity) {
      case 'White':
        return 12;
      case 'Green':
        return 120;
      case 'Blue':
        return 240;
      case 'Purple':
        return 600;
      default:
        return 0;
    }
  };

  return (
    <div className="p-7.5">
      <div className="flex gap-9">
        <div className="flex-1">
          <div className="border-b border-[#4e4e50] pb-4 text-base font-semibold">
            <img className="mr-2 inline w-6" src="/img/bridge/inventory.svg" alt="inventory icon" />
            Inventory
          </div>
          <div className="mt-7.5">
            <p className="text-base font-semibold">Community Badges</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {nftOwned.map((chainItem) => {
                return chainItem.map((item) => {
                  return (
                    <Tooltip
                      key={item.galxeCampaign?.stringId}
                      placement="bottom"
                      label={
                        <div className="flex w-[194px] flex-col items-center justify-start p-[14px]">
                          <div className="relative h-[180px] w-[180px]">
                            <Image src={item.image} alt="badge" objectFit="contain" layout="fill" />
                          </div>
                          <div className="mt-6 w-full text-center text-sm font-medium">{item.galxeCampaign?.name}</div>
                          <div className="mt-4 flex w-full items-center justify-between text-xs">
                            <span className="text-inherit">Chain:</span>
                            <span className="flex items-center gap-1">
                              <ChainIcon chainId={item.chainId} className="w-4" />
                              <span className="text-inherit">{renderChainName(item.chainId)}</span>
                            </span>
                          </div>
                          <div className="mt-1 flex w-full items-center justify-between text-xs">
                            <span className="text-inherit">Rarity:</span>
                            <span className="text-inherit">
                              {transferRarity(item.galxeCampaign?.rarity) ?? item.galxeCampaign?.rarity}
                            </span>
                          </div>
                          <div className="mt-1 flex w-full items-center justify-between text-xs">
                            <span className="text-inherit">Amount:</span>
                            <span className="text-inherit">{item.count || 0}</span>
                          </div>
                        </div>
                      }
                    >
                      <div
                        onClick={() => {
                          if (approveLoading) {
                            return;
                          }
                          if (item.chainId !== 20736) {
                            ReactGA.event({ action: 'select_badge', label: item.galxeCampaign?.stringId, category: 'bridge' });
                            addSelectedBadge(item);
                            setBridgeCount(item.count ?? 1);
                          }
                        }}
                        className={classNames(
                          'nft-backdrop-box relative flex h-[108px] w-[108px] cursor-pointer items-center justify-center overflow-hidden rounded',
                          {
                            'border-[#A5A6AB]':
                              selectedBadge &&
                              selectedBadge.galxeCampaign?.stringId === item.galxeCampaign?.stringId &&
                              selectedBadge.chainId === item.chainId,
                          },
                        )}
                      >
                        <div className="relative h-[80px] w-[80px]">
                          <Image src={item.image} alt="badge" objectFit="contain" layout="fill" />
                        </div>
                        <ChainIcon chainId={item.chainId} className="absolute left-[6px] top-[6px] w-[20px]" />
                        <div className="absolute bottom-[6px] right-[6px] text-xs text-green">{item.count}</div>
                      </div>
                    </Tooltip>
                  );
                });
              })}
              {restBadge.map((item) => {
                return (
                  <Tooltip
                    key={item.campaign}
                    placement="bottom"
                    label={
                      <div className="flex w-[194px] flex-col items-center justify-start p-[14px]">
                        <div className="relative h-[180px] w-[180px]">
                          <Image src={item.polygonImage} alt="badge" objectFit="contain" layout="fill" />
                        </div>
                        <div className="mt-6 w-full text-center text-sm font-medium">{item.polygonName}</div>
                        <div className="mt-6 flex w-full items-center justify-between text-xs">
                          <span className="text-inherit">Rarity:</span>
                          <span className="text-inherit">{item.rarity}</span>
                        </div>
                      </div>
                    }
                  >
                    <div
                      className={classNames(
                        'nft-backdrop-box relative flex h-[108px] w-[108px] items-center justify-center overflow-hidden rounded opacity-25',
                      )}
                    >
                      <div className="relative h-[80px] w-[80px]">
                        <Image src={item.polygonImage} alt="badge" objectFit="contain" layout="fill" />
                      </div>
                      <div className="absolute bottom-[6px] right-[6px] text-xs text-white/25">0</div>
                    </div>
                  </Tooltip>
                );
              })}
            </div>
            <p className="mt-7.5 text-base font-semibold">AMA OATs</p>
            {AMABadge.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {AMABadge.map((chainItem) => {
                  return chainItem.map((item) => {
                    return (
                      <Tooltip
                        key={item.galxeCampaign?.stringId}
                        placement="bottom"
                        label={
                          <div className="flex w-[194px] flex-col items-center justify-start p-[14px]">
                            <div className="relative h-[180px] w-[180px]">
                              <Image src={item.image} alt="badge" objectFit="contain" layout="fill" />
                            </div>
                            <div className="mt-6 w-full text-center text-sm font-medium">{item.galxeCampaign?.name}</div>
                            <div className="mt-4 flex w-full items-center justify-between text-xs">
                              <span className="text-inherit">Chain:</span>
                              <span className="flex items-center gap-1">
                                <ChainIcon chainId={item.chainId} className="w-4" />
                                <span className="text-inherit">{renderChainName(item.chainId)}</span>
                              </span>
                            </div>
                            <div className="mt-1 flex w-full items-center justify-between text-xs">
                              <span className="text-inherit">Rarity:</span>
                              <span className="text-inherit">
                                {transferRarity(item.galxeCampaign?.rarity) ?? item.galxeCampaign?.rarity}
                              </span>
                            </div>
                            <div className="mt-1 flex w-full items-center justify-between text-xs">
                              <span className="text-inherit">Amount:</span>
                              <span className="text-inherit">{item.count || 0}</span>
                            </div>
                          </div>
                        }
                      >
                        <div
                          onClick={() => {
                            if (approveLoading) {
                              return;
                            }
                            if (item.chainId !== 20736) {
                              ReactGA.event({
                                action: 'select_badge',
                                label: item.galxeCampaign?.stringId,
                                category: 'bridge',
                              });
                              addSelectedBadge(item);
                              setBridgeCount(item.count ?? 1);
                            }
                          }}
                          className={classNames(
                            'nft-backdrop-box flex h-[108px] w-[108px] cursor-pointer items-center justify-center overflow-hidden rounded',
                            {
                              'border-[#A5A6AB]':
                                selectedBadge &&
                                selectedBadge.galxeCampaign?.stringId === item.galxeCampaign?.stringId &&
                                selectedBadge.chainId === item.chainId,
                            },
                          )}
                        >
                          <div className="relative h-[86px] w-[86px]">
                            <Image src={item.image} alt="badge" objectFit="contain" layout="fill" />
                          </div>
                          <ChainIcon chainId={item.chainId} className="absolute left-[6px] top-[6px] w-[20px]" />
                          <div className="absolute bottom-[6px] right-[6px] text-xs text-green">{item.count}</div>
                        </div>
                      </Tooltip>
                    );
                  });
                })}
              </div>
            ) : (
              <div className="nft-backdrop-box mt-4 flex h-[118px] flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed backdrop-blur-0">
                <div className="text-xs text-gray-400">To collect more badges & level your game up at</div>
                <div
                  className="cursor-pointer text-sm font-semibold text-blue"
                  onClick={() => {
                    window.open('https://discord.com/invite/EMrbsZPbxs', '__blank');
                  }}
                >
                  P12 Discord
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex basis-[540px] flex-col">
          <div className="border-b border-[#4e4e50] pb-4 font-semibold">
            <img className="mr-2 inline w-6" src="/img/bridge/bridge.svg" alt="bridge icon" />
            Bridge
          </div>
          {selectedBadge ? (
            <div className="mt-9">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      From:
                      {selectedBadge.chainId === polygon.id ? (
                        <span className="flex items-center gap-2">
                          <img className="w-[30px]" src="/img/bridge/polygon.svg" alt="polygon icon" />
                          Polygon
                        </span>
                      ) : selectedBadge.chainId === bsc.id ? (
                        <span className="flex items-center gap-2">
                          <img className="w-[30px]" src="/img/bridge/bsc.svg" alt="polygon icon" />
                          BSC
                        </span>
                      ) : null}
                    </div>
                    <div className="nft-backdrop-box relative mt-3 flex h-[200px] w-[200px] items-center justify-center overflow-hidden rounded-xl backdrop-blur-0">
                      <div className="relative h-[148px] w-[148px]">
                        <Image src={selectedBadge.image} alt="badge" objectFit="contain" layout="fill" />
                      </div>
                    </div>
                    <div className="mt-4 h-12 w-[200px] text-center text-sm font-medium">
                      {selectedBadge.galxeCampaign?.name}
                    </div>
                  </div>
                  <div>
                    <img width={84} src="/img/bridge/bridge_arrow.webp" alt="bridge_arrow" />
                    <p>Bridge to</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      To:
                      <img className="w-[30px]" src="/img/bridge/p12_chain.svg" alt="chain icon" />
                      P12 Chain
                    </div>
                    <div className="nft-backdrop-box mt-3 flex h-[200px] w-[200px] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed backdrop-blur-0">
                      <div className="relative h-[148px] w-[148px]">
                        <Image
                          src={targetByRarity(selectedBadge)?.url ?? selectedBadge.image}
                          alt="badge"
                          objectFit="contain"
                          layout="fill"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="mt-4 h-12 w-[200px] text-center text-sm font-medium">
                      {targetByRarity(selectedBadge)?.name ?? selectedBadge.galxeCampaign?.name}
                    </div>
                  </div>
                </div>
              </div>
              {isApprovedForAll && (
                <div className="mt-8">
                  <div className="flex items-end gap-4">
                    <div className="mt-3 flex h-[52px] w-[176px] rounded-xl bg-[#494E69]/60 py-1">
                      <div
                        className="flex basis-[52px] cursor-pointer select-none items-center justify-center text-3xl font-medium"
                        onClick={minus}
                      >
                        -
                      </div>
                      <div className="flex-1">
                        <input
                          type="number"
                          className="w-full bg-transparent text-center text-3xl font-semibold leading-[44px]"
                          value={bridgeCount}
                          onChange={countChanged}
                        />
                      </div>
                      <div
                        className="flex flex-none basis-[52px] cursor-pointer select-none items-center justify-center text-3xl font-medium"
                        onClick={plus}
                      >
                        +
                      </div>
                    </div>
                    <div className="text-gradient-yellow mt-3.5 text-[20px]/[34px] font-bold">
                      Get
                      <span className="mx-1 text-[34px] text-inherit">
                        {bridgeCount * calculatePLByRarity(selectedBadge?.galxeCampaign?.rarity)}
                      </span>
                      Power Level
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-[94px]">
                {address ? (
                  chain?.id !== selectedBadge?.chainId ? (
                    <Button
                      type="error"
                      className="w-full"
                      onClick={() => {
                        switchNetwork?.(selectedBadge?.chainId);
                      }}
                    >
                      Wrong Network
                    </Button>
                  ) : isApprovedForAll ? (
                    <div className="flex gap-5">
                      <Button type="bordered" className="flex-1" onClick={() => setSelectedBadge(null)}>
                        Cancel
                      </Button>
                      <Button
                        type="gradient"
                        onClick={bridgeMultiple}
                        className="flex-1"
                        disabled={!selectedBadge}
                        loading={confirmLoading}
                      >
                        Bridge
                      </Button>
                    </div>
                  ) : (
                    <Button type="gradient" onClick={approveAll} className="w-full" loading={approveLoading}>
                      Approve
                    </Button>
                  )
                ) : (
                  <Button type="gradient" onClick={() => setConnectOpen(true)} className="w-full">
                    Connect wallet
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-4 flex flex-grow flex-col">
              <div className="flex items-center gap-2 text-sm font-semibold ">
                TO: <img className="w-[30px]" src="/img/bridge/p12_chain.svg" alt="chain icon" /> P12 Chain
              </div>
              <div className="nft-backdrop-box mt-3 flex flex-grow flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed fill-gray-400 backdrop-blur-0">
                <svg
                  className="mx-auto mb-2"
                  width="48"
                  height="37"
                  viewBox="0 0 48 37"
                  fill="current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M39.153 2.31251C38.0162 0.853264 36.2698 0 34.4199 0H13.5802C11.7304 0 9.98394 0.853266 8.84707 2.31251L0.515845 13.0061C0.174662 13.4441 0.051278 13.9489 0.100098 14.4274V34C0.100098 35.6568 1.44324 37 3.1001 37H44.9C46.5569 37 47.9 35.6568 47.9 34V14.4275C47.9489 13.949 47.8255 13.4441 47.4843 13.0061L39.153 2.31251ZM13.5802 2H34.4199C35.6531 2 36.8174 2.56884 37.5753 3.54167L45.9066 14.2353H34.8379C33.181 14.2353 31.8379 15.5784 31.8379 17.2353V19.8824H16.1622V17.2353C16.1622 15.5784 14.8191 14.2353 13.1622 14.2353H2.09355L10.4248 3.54167C11.1827 2.56884 12.347 2 13.5802 2ZM45.9 16.2353H34.8379C34.2856 16.2353 33.8379 16.683 33.8379 17.2353V19.8824C33.8379 20.9869 32.9425 21.8824 31.8379 21.8824H16.1622C15.0577 21.8824 14.1622 20.9869 14.1622 19.8824V17.2353C14.1622 16.683 13.7145 16.2353 13.1622 16.2353H2.1001V34C2.1001 34.5523 2.54781 35 3.1001 35H44.9C45.4523 35 45.9 34.5523 45.9 34V16.2353Z"
                    fill="current"
                  />
                </svg>
                <p className="w-[200px] text-center text-sm leading-5 text-gray-400">Choose badge you want to bridge on left</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="my-7.5 border-b border-[#4e4e50]"></div>
      <div className="text-base font-semibold">Bridge History</div>
      <Table loading={isLoading} className="mt-6 max-w-[95vw] overflow-x-auto" dataSource={orderData} columns={gamerColumns} />
    </div>
  );
}
