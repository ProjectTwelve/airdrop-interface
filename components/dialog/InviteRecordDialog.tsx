import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import Table from '@/components/table';
import { motion } from 'framer-motion';
import Button from '@/components/button';
import { useGamerInvitation } from '@/hooks/gamer';
import { useDevInvitation } from '@/hooks/developer';
import { DEV_BADGES, GAMER_BADGES } from '@/constants';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { shortenAddress, shortenSteamId } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { DevInvitationInfo, GamerInvitationInfo } from '@/lib/types';

type InviteRecordDialogProps = {
  close?: () => void;
  tab?: 'gamer' | 'developer';
};

const gamerColumnHelper = createColumnHelper<GamerInvitationInfo>();
const devColumnHelper = createColumnHelper<DevInvitationInfo>();

export function InviteRecordDialog({ close, tab }: InviteRecordDialogProps) {
  const { address } = useAccount();
  const [selectedTab, setSelectedTab] = useState(tab === 'developer' ? 0 : 1);
  const { data: devInvitation, isLoading: isDevLoading } = useDevInvitation(address);
  const { data: gamerInvitation, isLoading: isGamerLoading } = useGamerInvitation(address);

  const devColumns = useMemo(
    () => [
      devColumnHelper.accessor('wallet_address', {
        size: 120,
        header: 'Dev address',
        cell: ({ getValue }) => <p className="flex h-full items-center">{shortenAddress(getValue())}</p>,
      }),
      devColumnHelper.accessor('createdAt', {
        size: 100,
        header: 'Verify time',
        cell: ({ getValue }) => <p className="flex h-full items-center">{dayjs(getValue()).format('YYYY/MM/DD')}</p>,
      }),
      devColumnHelper.display({
        id: 'game',
        header: 'Game data',
        size: 200,
        cell: ({ row: { original } }) => (
          <div className="flex items-center">
            <img className="mr-2 h-[52px] w-[80px] rounded-2xl" src={original.header_image} alt="avatar" />
            <div className="flex flex-col justify-around truncate">
              <p className="truncate font-semibold">{original.name}</p>
              <p>{original.release_date?.date}</p>
            </div>
          </div>
        ),
      }),
      devColumnHelper.display({
        id: 'reward',
        header: 'Reward',
        size: 120,
        cell: () => (
          <div className="flex h-full items-center">
            <p className="mr-2 cursor-pointer font-ddin text-2xl font-bold">?,???</p>
            <Image className="-z-10" layout="fixed" src="/img/p12.png" width={30} height={30} alt="p12" />
          </div>
        ),
      }),
      devColumnHelper.accessor('nft_level', {
        size: 60,
        header: 'badge',
        cell: ({ getValue }) => (
          <div className="flex h-full items-center">
            <img src={DEV_BADGES[getValue()].img} alt="nft" width={36} height={36} />
          </div>
        ),
      }),
      devColumnHelper.display({
        id: 'get',
        header: 'Will get',
        size: 120,
        cell: () => (
          <div className="flex h-full items-center">
            <p className="mr-2 cursor-pointer font-ddin text-2xl font-bold">?,???</p>
            <Image className="-z-10" src="/img/p12.png" width={30} height={30} alt="p12" />
          </div>
        ),
      }),
    ],
    [],
  );
  const gamerColumns = useMemo(
    () => [
      gamerColumnHelper.accessor('wallet_address', {
        header: 'Gamer address',
        size: 120,
        cell: ({ getValue }) => <p className="flex h-full items-center">{shortenAddress(getValue())}</p>,
      }),
      gamerColumnHelper.accessor('createdAt', {
        header: 'Verify time',
        size: 100,
        cell: ({ getValue }) => <p className="flex h-full items-center">{dayjs(getValue()).format('YYYY/MM/DD')}</p>,
      }),
      gamerColumnHelper.display({
        id: 'steam_account',
        header: 'Steam account data',
        size: 200,
        cell: ({ row: { original } }) => (
          <div className="flex items-center">
            <img width={52} height={52} className="mr-2 rounded" src={original.avatar} alt="avatar" />
            <div className="flex flex-col justify-around truncate">
              <p className="truncate font-semibold">{original.person_name}</p>
              <p className="text-xs">Steam ID: {shortenSteamId(original.steam_id)}</p>
            </div>
          </div>
        ),
      }),
      gamerColumnHelper.display({
        id: 'reward',
        header: 'Reward',
        size: 120,
        cell: () => (
          <div className="flex h-full items-center">
            <p className="mr-2 cursor-pointer font-ddin text-2xl font-bold">?,???</p>
            <Image className="-z-10" layout="fixed" src="/img/p12.png" width={30} height={30} alt="p12" />
          </div>
        ),
      }),
      gamerColumnHelper.accessor('nft_level', {
        header: 'Badge',
        size: 100,
        cell: ({ getValue }) => (
          <div className="flex h-full items-center">
            <img src={GAMER_BADGES[getValue()].img} alt="nft" width={36} height={36} />
          </div>
        ),
      }),
      gamerColumnHelper.display({
        id: 'get',
        header: 'Will get',
        size: 120,
        cell: () => (
          <div className="flex h-full items-center">
            <p className="mr-2 cursor-pointer font-ddin text-2xl font-bold">?,???</p>
            <Image className="-z-10" src="/img/p12.png" width={30} height={30} alt="p12" />
          </div>
        ),
      }),
    ],
    [],
  );

  return (
    <div>
      <h2 className="mb-[18px] text-center text-xl">My P12 Airdrop Referral List</h2>
      <Tabs onSelect={(index) => setSelectedTab(index)} selectedIndex={selectedTab}>
        <TabList>
          <Tab style={{ padding: '14px 16px', fontSize: 18 }}>
            Developer
            <div className="react-tabs__tab--underline">{selectedTab === 0 && <motion.div layoutId="invite_underline" />}</div>
          </Tab>
          <Tab style={{ padding: '14px 16px', fontSize: 18 }}>
            Gamer
            <div className="react-tabs__tab--underline">{selectedTab === 1 && <motion.div layoutId="invite_underline" />}</div>
          </Tab>
        </TabList>
        <TabPanel>
          <div className="h-[400px]">
            <Table
              loading={isDevLoading}
              className="mt-6 max-w-[95vw] overflow-x-auto"
              dataSource={devInvitation || []}
              columns={devColumns}
            />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="h-[400px]">
            <Table
              loading={isGamerLoading}
              className="mt-6 max-w-[95vw] overflow-x-auto"
              dataSource={gamerInvitation || []}
              columns={gamerColumns}
            />
          </div>
        </TabPanel>
      </Tabs>
      <div className="flex justify-end border-t border-gray-600 pt-7">
        <Button type="bordered" onClick={close}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
