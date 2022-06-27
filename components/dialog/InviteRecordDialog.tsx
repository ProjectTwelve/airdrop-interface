import React, { useState } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Button from '../button';
import Table from '../table';
import { shortenAddress, shortenSteamId } from '../../utils';
import { motion } from 'framer-motion';
import { useDevInvitation } from '../../hooks/developer';
import { useGamerInvitation } from '../../hooks/gamer';
import { DEV_BADGES, DEV_NFT_LEVEL, GAMER_BADGES, GAMER_NFT_LEVEL } from '../../constants';

type InviteRecordDialogProps = {
  close?: () => void;
  tab?: 'gamer' | 'developer';
};

export function InviteRecordDialog({ close, tab }: InviteRecordDialogProps) {
  const { data: account } = useAccount();
  const [selectedTab, setSelectedTab] = useState(tab === 'developer' ? 0 : 1);
  const { data: devInvitation } = useDevInvitation(account?.address);
  const { data: gamerInvitation } = useGamerInvitation(account?.address);

  const DevColumns = [
    {
      width: 120,
      Header: 'Dev address',
      accessor: 'wallet_address',
      Cell: ({ value }: any) => <p className="flex h-full items-center">{shortenAddress(value)}</p>,
    },
    {
      width: 100,
      Header: 'Verify time',
      accessor: 'createAt',
      Cell: ({ value }: any) => <p className="flex h-full items-center">{dayjs(value).format('YYYY/MM/DD')}</p>,
    },
    {
      width: 200,
      Header: 'Game data',
      accessor: (row: any) => (
        <div className="flex items-center">
          <img className="h-[52px] w-[80px] rounded-2xl mr-2" src={row.header_image} alt="avatar" />
          <div className="flex flex-col justify-around truncate">
            <p className="truncate font-semibold">{row.name}</p>
            <p>{row.release_date?.date}</p>
          </div>
        </div>
      ),
    },
    {
      width: 120,
      Header: 'Reward',
      accessor: () => (
        <div className="flex h-full items-center">
          <p className="cursor-pointer font-din text-2xl font-bold mr-2">?,???</p>
          <Image className="-z-10" layout="fixed" src="/img/p12.png" width={30} height={30} alt="p12" />
        </div>
      ),
    },
    {
      width: 60,
      Header: 'Badge',
      accessor: 'nft_level',
      Cell: ({ value }: { value: DEV_NFT_LEVEL }) => (
        <div className="flex h-full items-center">
          <img src={DEV_BADGES[value].img} alt="nft" width={36} height={36} />
        </div>
      ),
    },
    {
      width: 120,
      Header: 'Will get',
      accessor: () => (
        <div className="flex h-full items-center">
          <p className="cursor-pointer font-din text-2xl font-bold mr-2">?,???</p>
          <Image className="-z-10" src="/img/p12.png" width={30} height={30} alt="p12" />
        </div>
      ),
    },
  ];
  const GamerColumns = [
    {
      width: 120,
      Header: 'Gamer address',
      accessor: 'wallet_address',
      Cell: ({ value }: any) => <p className="flex h-full items-center">{shortenAddress(value)}</p>,
    },
    {
      width: 100,
      Header: 'Verify time',
      accessor: 'createAt',
      Cell: ({ value }: any) => <p className="flex h-full items-center">{dayjs(value).format('YYYY/MM/DD')}</p>,
    },
    {
      width: 200,
      Header: 'Steam account data',
      accessor: (row: any) => (
        <div className="flex items-center">
          <img width={52} height={52} className="rounded mr-2" src={row.avatar} alt="avatar" />
          <div className="flex flex-col justify-around truncate">
            <p className="truncate font-semibold">{row.person_name}</p>
            <p className="text-xs">Steam ID: {shortenSteamId(row.steam_id)}</p>
          </div>
        </div>
      ),
    },
    {
      width: 120,
      Header: 'Reward',
      accessor: () => (
        <div className="flex h-full items-center">
          <p className="cursor-pointer font-din text-2xl font-bold mr-2">?,???</p>
          <Image className="-z-10" layout="fixed" src="/img/p12.png" width={30} height={30} alt="p12" />
        </div>
      ),
    },
    {
      width: 60,
      Header: 'Badge',
      accessor: 'nft_level',
      Cell: ({ value }: { value: GAMER_NFT_LEVEL }) => (
        <div className="flex h-full items-center">
          <img src={GAMER_BADGES[value].img} alt="nft" width={36} height={36} />
        </div>
      ),
    },
    {
      width: 120,
      Header: 'Will get',
      accessor: () => (
        <div className="flex h-full items-center">
          <p className="cursor-pointer font-din text-2xl font-bold mr-2">?,???</p>
          <Image className="-z-10" src="/img/p12.png" width={30} height={30} alt="p12" />
        </div>
      ),
    },
  ];

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
            <Table className="mt-6 max-w-[95vw] overflow-x-auto" dataSource={devInvitation || []} columns={DevColumns} />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="h-[400px]">
            <Table className="mt-6 max-w-[95vw] overflow-x-auto" dataSource={gamerInvitation || []} columns={GamerColumns} />
          </div>
        </TabPanel>
      </Tabs>
      <div className="flex justify-end border-t border-p12-line pt-7">
        <Button type="bordered" onClick={close}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
