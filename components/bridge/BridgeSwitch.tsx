import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Button from '../button';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { isConnectPopoverOpen } from '../../store/web3/state';
import { useSetRecoilState } from 'recoil';
import { polygon, bsc } from 'wagmi/chains';
import classNames from 'classnames';
import { Tooltip } from '../tooltip';
import Table from '../table';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useBadgeNFT } from '@/hooks/bridge';
import { BadgeInfo, GalxeBadge, NFTQueryResult, P12_COMMUNITY_BADGE } from '@/constants';
import { groupBy } from 'lodash-es';
// import { formatEther, parseEther } from 'ethers/lib/utils.js';
// import { BigNumberish } from '@ethersproject/bignumber';
// todo change proxy address

const historyColumnHelper = createColumnHelper<any>();

export default function BridgeSwitch() {
  const [selectedBadge, setSelectedBadge] = useState<GalxeBadge | null>(null);
  const [isApprovedForAll] = useState<boolean>(false); //setIsApprovedForAll
  const setConnectOpen = useSetRecoilState(isConnectPopoverOpen);
  const { switchNetwork } = useSwitchNetwork({ chainId: polygon.id });
  // const [gasEthAmount] = useState<string>('0'); //setGasEthAmount
  const [approveLoading] = useState<boolean>(false); //setApproveLoading
  const [confirmLoading] = useState<boolean>(false); //setConfirmLoading
  const [bridgeCount, setBridgeCount] = useState<number>(1);
  // Todo change nft contract
  // const NFTContract = useNFTContract();
  // const NFTContract = useNFTTestContract();
  // const bridgeProxyContract = useBridgeProxyContract();
  // const bridgeProxyContract = useBridgeProxyTestContract();
  const { chain } = useNetwork();
  const { address } = useAccount();

  const { data } = useBadgeNFT(address);
  const [nftOwned, setNFTOwned] = useState<GalxeBadge[][]>([]);
  const [restBadge, setRestBadge] = useState<BadgeInfo[]>([]);
  const [AMABadge, setAMABadge] = useState<GalxeBadge[][]>([]);

  // useEffect(() => {
  //   if (!NFTContract || !address || chain?.id !== polygon.id) return;
  //   NFTContract.isApprovedForAll(address, BRIDGE_PROXY_ADDRESS).then((isApproved: boolean) => {
  //     setIsApprovedForAll(isApproved);
  //   });
  // }, [NFTContract, chain?.id, address]);

  useEffect(() => {
    console.log(data);
    const galxeBadges: GalxeBadge[] = ((data as any)?.user as NFTQueryResult)?.galxeBadges;

    if (galxeBadges?.length > 0) {
      const communityBadge = galxeBadges.filter((item) => item.galxeCampaign?.campaignType === 'Community');
      const communityBadgeCampaign = communityBadge.map((item) => item.galxeCampaign?.stringId);
      const AMABadge = galxeBadges.filter((item) => item.galxeCampaign?.campaignType === 'AMA');
      const groupCommunityBadge = groupBy(communityBadge, (o) => o.chainId);
      const groupAMABadge = groupBy(AMABadge, (o) => o.chainId);
      console.log(groupCommunityBadge, 'groupCommunityBadge');
      console.log(groupAMABadge, 'groupAMABadge');
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
          byIdItem.push(newItem);
        }
        chainAMABadge[i] = byIdItem;
      }
      console.log(chainCommunityBadge, 'chainCommunityBadge');
      console.log(chainAMABadge, 'chainAMABadge');
      setNFTOwned(chainCommunityBadge);
      setAMABadge(chainAMABadge);
      // filter rest badge
      const allCommunityBadge = Object.entries(P12_COMMUNITY_BADGE);
      const restBadge = allCommunityBadge
        .filter(([, value]) => !communityBadgeCampaign.includes(value.campaign))
        .map(([, value]) => value);
      setRestBadge(restBadge);
    }
  }, [data]);

  const addSelectedBadge = (badge: GalxeBadge) => {
    setSelectedBadge(badge);
  };

  const approveAll = async () => {
    // if (!NFTContract || !address || chain?.id !== polygon.id) return;
    // setApproveLoading(true);
    // try {
    //   const res = await NFTContract.setApprovalForAll(BRIDGE_PROXY_ADDRESS, true);
    //   await res.wait();
    //   const isApproved = await NFTContract.isApprovedForAll(address, BRIDGE_PROXY_ADDRESS);
    //   setIsApprovedForAll(isApproved);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setApproveLoading(false);
    // }
  };

  const bridgeMultiple = async () => {
    // todo wait for contract
    // todo if success refresh balance and clear select?
    // single, only for test
    // if (!bridgeProxyContract || !address || chain?.id !== polygon.id) return;
    // setConfirmLoading(true);
    // try {
    //   const tokenIds = [24, 25];
    //   const res = await bridgeProxyContract.reLocateBatch(tokenIds, address, {
    //     value: parseEther((Number(gasEthAmount) * tokenIds.length).toFixed(2)),
    //   });
    //   await res.wait();
    //   // refresh token balance api
    //   // clear amount
    // } catch (error) {
    // } finally {
    //   setConfirmLoading(false);
    // }
  };

  const calculateGasAmount = async () => {
    // if (!bridgeProxyContract || !address || chain?.id !== polygon.id) return;
    // const gasAmount: BigNumberish = await bridgeProxyContract.calculateGasTokenAmount();
    // const etherAmount = (Number(formatEther(gasAmount)) * 1.1).toFixed(2);
    // // todo change the way to etherAmount
    // setGasEthAmount(etherAmount);
  };

  useEffect(() => {
    if (isApprovedForAll) {
      calculateGasAmount();
    }
  }, [isApprovedForAll]);

  const renderButtons = () => {
    if (isApprovedForAll) {
      return (
        <div className="mt-10 flex gap-5">
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
            Confirm
          </Button>
        </div>
      );
    } else {
      return (
        <div className="mt-[118px]">
          {address ? (
            chain?.id !== polygon.id ? (
              <Button type="error" className="w-full" onClick={() => switchNetwork?.()}>
                Wrong Network
              </Button>
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
      );
    }
  };

  const minus = () => {
    if (bridgeCount === 1) return;
    setBridgeCount(bridgeCount - 1);
  };

  const plus = () => {
    // todo: can't bigger than balance
    setBridgeCount(bridgeCount + 1);
  };

  const countChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    // todo: can't bigger than balance
    setBridgeCount(Number(e.target.value));
  };

  const gamerColumns = useMemo(
    () => [
      historyColumnHelper.accessor('wallet_address', {
        header: 'History No.',
        size: 120,
        cell: ({ getValue }) => <p className="flex h-full items-center">{getValue()}</p>,
      }),
      historyColumnHelper.accessor('createdAt', {
        header: 'Time',
        size: 100,
        cell: ({ getValue }) => <p className="flex h-full items-center">{dayjs(getValue()).format('YYYY/MM/DD')}</p>,
      }),
      historyColumnHelper.display({
        id: 'steam_account',
        header: 'Bridged',
        size: 200,
        cell: ({}) => <div className="flex items-center"></div>,
      }),
      historyColumnHelper.display({
        id: 'amount',
        header: 'Amount',
        size: 120,
        cell: ({ getValue }) => <div className="flex h-full items-center">{getValue()}</div>,
      }),
      historyColumnHelper.accessor('tx', {
        header: 'Bridge tx',
        size: 100,
        cell: ({ getValue }) => <div className="flex h-full items-center">{getValue()}</div>,
      }),
    ],
    [],
  );

  const renderChainIcon = (chainId: number) => {
    if (chainId === polygon.id) {
      return <img className="absolute left-[6px] top-[6px] w-[20px]" src="/img/bridge/polygon.svg" alt="chain icon" />;
    } else if (chainId === bsc.id) {
      return <img className="absolute left-[6px] top-[6px] w-[20px]" src="/img/bridge/bnb_chain.svg" alt="chain icon" />;
    } else if (chainId === 20736) {
      return <img className="absolute left-[6px] top-[6px] w-[20px]" src="/img/bridge/p12_chain.svg" alt="chain icon" />;
    } else {
      return <img className="absolute left-[6px] top-[6px] w-[20px]" src="/img/bridge/p12_chain.svg" alt="chain icon" />;
    }
  };

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

  return (
    <div className="p-9">
      <div className="flex gap-9">
        <div className="w-3/5">
          <div className="border-b border-gray-600 pb-6 font-semibold">
            <img className="mr-2 inline w-[30px]" src="/img/bridge/inventory.svg" alt="inventory icon" />
            Inventory
          </div>
          <div className="mt-8">
            <p className="text-sm font-semibold leading-[30px]">Community Badges</p>
            <div className="mt-3 flex flex-wrap gap-3">
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
                            <span className="flex gap-1">
                              <img className="w-4" src="/img/bridge/polygon.svg" alt="polygon" />
                              <span className="text-inherit">{renderChainName(item.chainId)}</span>
                            </span>
                          </div>
                          <div className="mt-1 flex w-full items-center justify-between text-xs">
                            <span className="text-inherit">Rarity:</span>
                            <span className="text-inherit">Epic</span>
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
                          addSelectedBadge(item);
                        }}
                        className={classNames(
                          'nft-backdrop-box relative flex h-[108px] w-[108px] cursor-pointer items-center justify-center overflow-hidden rounded',
                          {
                            'border-[#A5A6AB]':
                              selectedBadge && selectedBadge.galxeCampaign?.stringId === item.galxeCampaign?.stringId,
                          },
                        )}
                      >
                        <div className="relative h-[80px] w-[80px]">
                          <Image src={item.image} alt="badge" objectFit="contain" layout="fill" />
                        </div>
                        {renderChainIcon(item.chainId)}
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
                          <span className="text-inherit">Epic</span>
                        </div>
                      </div>
                    }
                  >
                    <div
                      className={classNames(
                        'nft-backdrop-box relative flex h-[108px] w-[108px] cursor-pointer items-center justify-center overflow-hidden rounded',
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
            <p className="mt-8 text-sm font-semibold">AMA OATs</p>
            {AMABadge.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
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
                              <span className="flex gap-1">
                                <img className="w-4" src="/img/bridge/polygon.svg" alt="polygon" />
                                <span className="text-inherit">{renderChainName(item.chainId)}</span>
                              </span>
                            </div>
                            <div className="mt-1 flex w-full items-center justify-between text-xs">
                              <span className="text-inherit">Rarity:</span>
                              <span className="text-inherit">Epic</span>
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
                            addSelectedBadge(item);
                          }}
                          className="nft-backdrop-box flex h-[108px] w-[108px] items-center justify-center overflow-hidden rounded"
                        >
                          {selectedBadge && selectedBadge.galxeCampaign?.stringId === item.galxeCampaign?.stringId && (
                            <div className="absolute left-0 top-0 flex h-[108px] w-[108px] items-center justify-center blur-xl">
                              <div className="h-[80px] w-[80px]">
                                <Image src={item.image} alt="badge" objectFit="contain" layout="fill" />
                              </div>
                            </div>
                          )}
                          <div className="relative h-[86px] w-[86px]">
                            <Image src={item.image} alt="badge" objectFit="contain" layout="fill" />
                          </div>
                          {renderChainIcon(item.chainId)}
                          <div className="absolute bottom-[6px] right-[6px] text-xs text-green">{item.count}</div>
                        </div>
                      </Tooltip>
                    );
                  });
                })}
              </div>
            ) : (
              <div className="nft-backdrop-box mt-3 flex h-[118px] flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed backdrop-blur-0">
                <div className="text-xs text-gray-400">To collect more badges & level your game up at</div>
                <div className="cursor-pointer text-sm font-semibold text-blue"> P12 Discord</div>
              </div>
            )}
          </div>
        </div>
        <div className="w-2/5">
          <div className="border-b border-gray-600 pb-6 font-semibold">
            <img className="mr-2 inline w-[30px]" src="/img/bridge/bridge.svg" alt="bridge icon" />
            Bridge
          </div>
          {selectedBadge ? (
            <div className="mt-8">
              {/* <div className="text-sm font-semibold">
                {!isApprovedForAll ? 'Approve P12 Bridge contract ' : 'Bridge from Polygon to BNBChain'}
              </div> */}
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      From:
                      <img className="w-[30px]" src="/img/bridge/polygon.svg" alt="polygon icon" />
                      Polygon
                    </div>
                    <div className="nft-backdrop-box relative mt-3 flex h-[200px] w-[200px] items-center justify-center overflow-hidden rounded-xl backdrop-blur-0">
                      <img className="absolute left-[6px] top-[6px] w-6" src="/img/bridge/polygon.svg" alt="polygon icon" />
                      <div className="relative h-[148px] w-[148px]">
                        <Image src={selectedBadge.image} alt="badge" objectFit="contain" layout="fill" />
                      </div>
                    </div>
                    <div className="mt-4 text-center text-sm font-medium">{selectedBadge.galxeCampaign?.name}</div>
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
                      <img className="absolute left-[6px] top-[6px] w-6" src="/img/bridge/p12_chain.svg" alt="p12 chain icon" />
                      <div className="relative h-[148px] w-[148px]">
                        <Image src={selectedBadge.image} alt="badge" objectFit="contain" layout="fill" />
                      </div>
                    </div>
                    <div className="mt-4 text-center text-sm font-medium">{selectedBadge.galxeCampaign?.name}</div>
                  </div>
                </div>
              </div>
              {/* isApprovedForAll */}
              {true && (
                <div className="mt-8">
                  {/* <p className="text-sm font-semibold">Bridge to BNBChain amount</p> */}
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
                      Get <span className="text-[34px] text-inherit">2,024,25</span> Power Level
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <span className="text-sm font-normal">est. {(Number(gasEthAmount) * bridgeCount).toFixed(2)}</span>
                      <img src="/img/bridge/polygon_circle.svg" alt="" width={20} />
                    </div> */}
                  </div>
                </div>
              )}

              {renderButtons()}
            </div>
          ) : (
            <div className="mt-8">
              <div className="flex items-center gap-2 text-sm font-semibold ">
                TO: <img className="w-[30px]" src="/img/bridge/p12_chain.svg" alt="chain icon" /> P12 Chain
              </div>
              <div className="nft-backdrop-box mt-3 flex h-[306px] flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed backdrop-blur-0">
                <svg
                  className="mx-auto mb-2"
                  width="48"
                  height="37"
                  viewBox="0 0 48 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M39.153 2.31251C38.0162 0.853264 36.2698 0 34.4199 0H13.5802C11.7304 0 9.98394 0.853266 8.84707 2.31251L0.515845 13.0061C0.174662 13.4441 0.051278 13.9489 0.100098 14.4274V34C0.100098 35.6568 1.44324 37 3.1001 37H44.9C46.5569 37 47.9 35.6568 47.9 34V14.4275C47.9489 13.949 47.8255 13.4441 47.4843 13.0061L39.153 2.31251ZM13.5802 2H34.4199C35.6531 2 36.8174 2.56884 37.5753 3.54167L45.9066 14.2353H34.8379C33.181 14.2353 31.8379 15.5784 31.8379 17.2353V19.8824H16.1622V17.2353C16.1622 15.5784 14.8191 14.2353 13.1622 14.2353H2.09355L10.4248 3.54167C11.1827 2.56884 12.347 2 13.5802 2ZM45.9 16.2353H34.8379C34.2856 16.2353 33.8379 16.683 33.8379 17.2353V19.8824C33.8379 20.9869 32.9425 21.8824 31.8379 21.8824H16.1622C15.0577 21.8824 14.1622 20.9869 14.1622 19.8824V17.2353C14.1622 16.683 13.7145 16.2353 13.1622 16.2353H2.1001V34C2.1001 34.5523 2.54781 35 3.1001 35H44.9C45.4523 35 45.9 34.5523 45.9 34V16.2353Z"
                    fill={'#74788B'}
                  />
                </svg>
                <p className="text-p12-bg w-[200px] text-center text-sm leading-5">Choose badge you want to bridge on left</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-[96px] border-b border-gray-600"></div>
      <div className="mt-6 text-lg font-semibold">Bridge History</div>
      <Table loading={false} className="mt-6 max-w-[95vw] overflow-x-auto" dataSource={[]} columns={gamerColumns} />
    </div>
  );
}
