import React, { useState } from 'react';
import Button from '../button';
import Image from 'next/image';
import { CloseCircle } from '../svg/CloseCircle';
import { useQuery } from 'react-query';
import { fetchDeveloperGame } from '../../lib/api';
import { toast } from 'react-toastify';
import { SteamApp } from './VerifyGames';

type SteamGameItemProps = {
  app: SteamApp;
  index: number;
  onConfirm: (app: any) => void;
  onRemove: () => void;
};

function SteamAppItem({ app, onConfirm, onRemove, index }: SteamGameItemProps) {
  const [value, setValue] = useState('');
  const { isLoading, refetch } = useQuery(['developer_game', app.index], () => fetchDeveloperGame({ appid: value }), {
    enabled: false,
    onSuccess: (data) => {
      if (data.code !== 0) {
        toast.error(data.msg);
        return;
      }
      onConfirm(data.data.game_info);
    },
  });

  return (
    <div className="h-[72px] overflow-hidden rounded-2xl bg-p12-black/60">
      {app.steam_appid ? (
        <div className="relative flex h-full items-center justify-start gap-4">
          <div
            className="relative h-full w-[168px] bg-[#CEDCFF]/10 bg-cover"
            style={{ backgroundImage: `url(${app.header_image})` }}
          >
            <div className="absolute bottom-0 left-0 h-[42px] w-[42px]">
              <span className="absolute top-5 left-1 z-10 text-sm font-bold">0{index}</span>
              <Image src="/svg/index.svg" width={42} height={42} alt="index" />
            </div>
          </div>
          <div className="flex h-full flex-1 flex-col items-start justify-around">
            <p className="max-w-[295px] truncate font-bold">{app.name}</p>
            <p className="text-sm">
              {app.release_date?.date} &nbsp;&nbsp;
              {app.recommendations?.total} reviews
            </p>
          </div>
          <div className="flex w-[120px] items-center justify-center gap-2">
            <span className="font-['D-DIN'] text-2xl font-bold">?,???</span>
            <Image src="/img/p12.png" width={30} height={30} alt="p12" />
          </div>
          <div className="absolute top-1.5 right-1.5" onClick={onRemove}>
            <CloseCircle />
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-between gap-5 px-5">
          <div className="flex flex-1 items-center justify-start gap-5 text-sm">
            <p>Steam appid:</p>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 bg-black/0"
              placeholder="Please enter"
            />
          </div>
          <Button
            loading={isLoading}
            disabled={!value}
            type={value ? 'gradient' : 'default'}
            size="small"
            className="text-sm font-bold"
            onClick={refetch}
          >
            confirm
          </Button>
        </div>
      )}
    </div>
  );
}

export default React.memo(SteamAppItem);
