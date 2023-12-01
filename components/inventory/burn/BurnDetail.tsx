import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../../button';
import { useAccount, useNetwork, useSwitchNetwork, useWaitForTransaction } from 'wagmi';
import { isConnectPopoverOpen } from '../../../store/web3/state';
import { useSetRecoilState } from 'recoil';
import { polygon, bsc } from 'wagmi/chains';
import { useBridgeContract, useNFTContract } from '@/hooks/bridge';
import { GalxeBadge, GenesisRarity } from '@/constants';
import { BADGE_BRIDGE_ADDRESS, BADGE_BRIDGE_ADDRESS_BSC } from '@/constants/addresses';
import Message from '../../message';
import { toast } from 'react-toastify';
import ReactGA from 'react-ga4';
import { useFetchNFTData } from '@/hooks/inventory';
import { BurnSvg } from '@/components/svg/BurnSvg';
import NFTCardTooltip from '../NFTCardTooltip';
import BadgeCardTooltip from '../BadgeCardTooltip';
import { RarityTag } from '@/components/rarityTag';

export default function BurnDetail() {
  const [selectedBadge, setSelectedBadge] = useState<GalxeBadge | null>(null);
  const [isApprovedForAll, setIsApprovedForAll] = useState<boolean>(false);
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);
  const { switchNetwork } = useSwitchNetwork({ chainId: polygon.id });
  const [bridgeCount, setBridgeCount] = useState<number>(1);
  const NFTContract = useNFTContract({ token: selectedBadge?.contractAddress, chainId: selectedBadge?.chainId });
  const bridgeContract = useBridgeContract({ chainId: selectedBadge?.chainId });
  const { chain } = useNetwork();
  const { address } = useAccount();

  const { nftOwned, restBadge, AMABadge } = useFetchNFTData();
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
        [selectedBadge?.contractAddress, BigInt(20736), slicedTokenIds, address, address],
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

  const targetByRarity = (badge: GalxeBadge) => {
    const rarity = badge.galxeCampaign?.rarity;

    if (rarity === 'White') {
      return {
        type: 'PL',
        value: 12,
        icon: <img width={40} src="/img/pl/power_level.png" alt="power_level" />,
      };
    } else if (rarity === 'Green') {
      return {
        type: 'USDC',
        value: 20,
        icon: <img width={40} src="/img/usdc.webp" alt="usdc" />,
      };
    } else if (rarity === 'Blue') {
      return {
        type: 'USDC',
        value: 70,
        icon: <img width={40} src="/img/usdc.webp" alt="usdc" />,
      };
    } else if (rarity === 'Purple') {
      return {
        type: 'PL',
        value: '???',
        icon: <img width={40} src="/img/pl/power_level.png" alt="power_level" />,
      };
    } else if (rarity === 'Orange') {
      return {
        type: 'PL',
        value: '???',
        icon: <img width={40} src="/img/pl/power_level.png" alt="power_level" />,
      };
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
                    <NFTCardTooltip
                      info={item}
                      key={item.galxeCampaign?.stringId}
                      selectedBadge={selectedBadge}
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
                    />
                  );
                });
              })}
              {restBadge.map((item) => {
                return <BadgeCardTooltip key={item.campaign} info={item} />;
              })}
            </div>
            <p className="mt-7.5 text-base font-semibold">AMA OATs</p>
            {AMABadge.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {AMABadge.map((chainItem) => {
                  return chainItem.map((item) => {
                    return (
                      <NFTCardTooltip
                        info={item}
                        key={item.galxeCampaign?.stringId}
                        selectedBadge={selectedBadge}
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
                      />
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
          <div className="flex items-center gap-1 border-b border-[#4e4e50] pb-4 font-semibold leading-6">
            <BurnSvg className="stroke-white" />
            Burn
          </div>
          {selectedBadge ? (
            <div className="mt-9">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">Formula</div>
                    <div className="nft-backdrop-box relative mt-4 flex h-[200px] w-[200px] items-center justify-center overflow-hidden rounded-xl backdrop-blur-0">
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
                    <p>Burn to get</p>
                  </div>
                  <div>
                    <div className="h-6"></div>
                    <div className=" mt-4 flex h-[200px] w-[200px] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-650">
                      <div className="flex items-center gap-1.5">
                        <span className="text-gradient-yellow text-[34px] font-bold">
                          {targetByRarity(selectedBadge)?.value}
                        </span>
                        {targetByRarity(selectedBadge)?.icon}
                      </div>
                    </div>
                    <div className="mt-4 h-12 w-[200px] text-center text-sm font-medium">Power Level</div>
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
            <div className="mt-7.5 flex flex-grow flex-col">
              <div className="font-semibold leading-6">Formula</div>
              <div className="relative mt-4 h-[300px] w-[377px] rounded-xl border-2 border-dashed border-gray-650">
                <div className="flex flex-col gap-3 p-9">
                  <div className="flex items-center justify-between text-sm font-semibold leading-4 text-gray-400">
                    <div className="text-inherit">Rarity</div>
                    <div className="text-inherit">Recycled PL</div>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold leading-4 text-gray-400">
                    <RarityTag rarity={GenesisRarity.Legendary} />
                    <div className="flex items-center gap-1.5 text-xl font-semibold text-yellow">
                      ??? <img width={30} src="/img/pl/power_level.png" alt="power_level" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold leading-4 text-gray-400">
                    <RarityTag rarity={GenesisRarity.Epic} />
                    <div className="flex items-center gap-1.5 text-xl font-semibold text-yellow">
                      ??? <img width={30} src="/img/pl/power_level.png" alt="power_level" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold leading-4 text-gray-400">
                    <RarityTag rarity={GenesisRarity.Rare} />
                    <div className="flex items-center gap-1.5 text-xl font-semibold text-yellow">
                      70 <img width={30} src="/img/usdc.webp" alt="usdc" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold leading-4 text-gray-400">
                    <RarityTag rarity={GenesisRarity.Uncommon} />
                    <div className="flex items-center gap-1.5 text-xl font-semibold text-yellow">
                      20 <img width={30} src="/img/usdc.webp" alt="usdc" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold leading-4 text-gray-400">
                    <RarityTag rarity={GenesisRarity.Common} />
                    <div className="flex items-center gap-1.5 text-xl font-semibold text-yellow">
                      12 <img width={30} src="/img/pl/power_level.png" alt="power_level" />
                    </div>
                  </div>
                </div>
                <img
                  width={112}
                  height={32}
                  src="/img/bridge/bridge_arrow.webp"
                  alt="bridge_arrow"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="my-7.5 border-b border-[#4e4e50]"></div>
      <div className="text-base font-semibold">Burn History</div>
    </div>
  );
}
