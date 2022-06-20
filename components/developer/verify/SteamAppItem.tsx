import React, { useState } from 'react';
import Button from '../../button';
import Image from 'next/image';
import Message from '../../message';
import { CloseCircle } from '../../svg/CloseCircle';
import { useQuery } from 'react-query';
import { fetchDeveloperGame } from '../../../lib/api';
import { toast } from 'react-toastify';
import { SteamApp } from '../Verify';
import { useSetRecoilState } from 'recoil';
import { roadmapModalAtom } from '../../../store/roadmap/state';

type SteamGameItemProps = {
  app: SteamApp;
  index: number;
  onConfirm: (app: any) => void;
  onRemove: () => void;
};

function SteamAppItem({ app, onConfirm, onRemove, index }: SteamGameItemProps) {
  const [value, setValue] = useState('');
  const setOpen = useSetRecoilState(roadmapModalAtom);
  const { isLoading, refetch } = useQuery(['developer_game', app.index], () => fetchDeveloperGame({ appid: value }), {
    enabled: false,
    onSuccess: (data) => {
      if (data.code !== 0) {
        toast.error(<Message message={data.msg} title="Failed" />);
        return;
      }
      onConfirm(data.data.game_info);
    },
  });

  return (
    <div className="h-[72px] overflow-hidden rounded-2xl bg-p12-black/80">
      {app.steam_appid ? (
        <div className="relative h-[72px] overflow-hidden rounded-2xl bg-p12-black/80 pr-4">
          <div
            className="relative float-left mr-4 flex h-[72px] w-full items-center justify-start bg-[#CEDCFF]/10 bg-cover"
            style={{ maxWidth: 'min(33%, 168px)' }}
          >
            <img src={app.header_image} className="h-auto w-full object-cover" alt="header_image" />
            <div className="absolute bottom-0 left-0 h-[42px] w-[42px] md:hidden">
              <span className="absolute top-5 left-1 z-10 text-sm font-medium">0{index}</span>
              <img src="/svg/index.svg" width={42} height={42} alt="index" />
            </div>
          </div>
          <div className="xs:flex xs:flex-col-reverse">
            <div className="float-right mt-6 xs:float-none xs:mt-0">
              <span className="mr-2 cursor-pointer align-top font-['D-DIN'] text-2xl font-bold" onClick={() => setOpen(true)}>
                ?,???
              </span>
              <Image src="/img/p12.png" width={30} height={30} alt="p12" />
            </div>
            <div className="truncate pt-3">
              <p className="truncate font-medium">{app.name}</p>
              <div className="flex gap-2 text-sm xs:hidden">
                <p>{app.release_date?.date}</p>
                <p>{app.total_reviews ? app.total_reviews + ' reviews' : 0 + ' review'}</p>
              </div>
            </div>
          </div>
          <div className="clear-both"></div>
          <div className="absolute top-1.5 right-1.5" onClick={onRemove}>
            <CloseCircle />
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-between gap-5 px-5 md:gap-2 md:px-2">
          <div className="flex flex-1 items-center justify-start gap-5 text-sm md:gap-2">
            <p>App ID:</p>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full flex-1 bg-black/0"
              placeholder="Please enter"
            />
          </div>
          <Button
            loading={isLoading}
            disabled={!value}
            type={value ? 'gradient' : 'default'}
            size="small"
            className="min-w-[56px] text-sm font-medium"
            onClick={refetch}
          >
            Add
          </Button>
        </div>
      )}
    </div>
  );
}

export default React.memo(SteamAppItem);
