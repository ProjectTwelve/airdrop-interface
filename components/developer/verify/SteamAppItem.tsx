import BlueButton from '@/components/button/BlueButton';
import { fetchDeveloperGame } from '@/lib/api';
import { roadmapModalAtom } from '@/store/roadmap/state';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import Message from '../../message';
import { CloseCircle } from '../../svg/CloseCircle';
import { SteamApp } from '../Verify';

type SteamGameItemProps = {
  app: SteamApp;
  index: number;
  onConfirm: (app: any) => void;
  onRemove: () => void;
};

function SteamAppItem({ app, onConfirm, onRemove, index }: SteamGameItemProps) {
  const [value, setValue] = useState('');
  const setOpen = useSetRecoilState(roadmapModalAtom);
  const { isLoading, mutate } = useMutation<any, any, { appid: string }>((data) => fetchDeveloperGame(data), {
    onSuccess: (data) => {
      if (data.code !== 0) {
        toast.error(<Message message={data.msg} title="Ah shit, here we go again" />);
        return;
      }
      onConfirm(data.data.game_info);
    },
  });

  return (
    <div className="h-[72px] overflow-hidden rounded-2xl bg-gray-700/30">
      {app.steam_appid ? (
        <div className="relative h-[72px] overflow-hidden rounded-2xl pr-4">
          <div
            className="relative float-left mr-4 flex h-[72px] w-full items-center justify-start bg-[#CEDCFF]/10 bg-cover"
            style={{ maxWidth: 'min(33%, 168px)' }}
          >
            <img src={app.header_image} className="h-auto w-full object-cover" alt="header_image" />
            <div className="absolute bottom-0 left-0 h-[42px] w-[42px] md:hidden">
              <span className="absolute left-1 top-5 z-10 text-sm font-medium">0{index}</span>
              <img src="/svg/index.svg" width={42} height={42} alt="index" />
            </div>
          </div>
          <div className="sm:flex sm:flex-col-reverse">
            <div className="float-right mt-6 flex sm:float-none sm:mt-0">
              <span className="mr-2 cursor-pointer align-top font-ddin text-2xl font-bold" onClick={() => setOpen(true)}>
                ?,???
              </span>
              <Image src="/img/p12.png" width={30} height={30} alt="p12" />
            </div>
            <div className="truncate pt-3">
              <p className="truncate font-medium">{app.name}</p>
              <div className="flex text-sm sm:hidden">
                <p className="mr-2">{app.release_date?.date}</p>
                <p>{app.total_reviews ? app.total_reviews + ' reviews' : 0 + ' review'}</p>
              </div>
            </div>
          </div>
          <div className="clear-both"></div>
          <div className="absolute right-1.5 top-1.5" onClick={onRemove}>
            <CloseCircle />
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-between px-4 md:px-2">
          <div className="flex flex-1 items-center justify-start text-sm/6">
            <p className="mr-4 font-semibold md:mr-2">App ID:</p>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full flex-1 bg-black/0"
              placeholder="Please enter"
            />
          </div>
          <BlueButton
            loading={isLoading}
            disabled={!value}
            type={value ? 'blue' : 'default'}
            className="flex-center min-w-[56px] text-sm font-medium"
            onClick={() => mutate({ appid: value })}
          >
            Add
          </BlueButton>
        </div>
      )}
    </div>
  );
}

export default React.memo(SteamAppItem);
