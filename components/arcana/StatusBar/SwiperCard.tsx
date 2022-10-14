import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Autoplay } from 'swiper';
import { useAccount } from 'wagmi';
import { useRecoilValue } from 'recoil';
import { Swiper, SwiperSlide } from 'swiper/react';
import Dialog from '../../dialog';
import InfoDialog from './InfoDialog';
import { openLink } from '../../../utils';
import { MemeEvaluateItem } from '../../../lib/types';
import { useArcanaMemeEvaluate } from '../../../hooks/arcana';
import { arcanaObserverAtom } from '../../../store/arcana/state';

export enum AudioStatus {
  PLAY,
  PAUSE,
}

export enum MEME_ICON {
  LIKE,
  SMILE,
  CRY,
}

function  Card({ data }: { data: MemeEvaluateItem }) {
  const assetRef = useRef<HTMLAudioElement>(null);
  const [audioStatus, setAudioStatus] = useState<AudioStatus>(AudioStatus.PLAY);
  const audioStatusIcon = useMemo<Record<AudioStatus, ReactNode>>(
    () => ({
      [AudioStatus.PLAY]: <img src="/img/arcana/statusbar/play.webp" alt="play" />,
      [AudioStatus.PAUSE]: <img src="/img/arcana/statusbar/pause.webp" alt="pause" />,
    }),
    [],
  );

  const onAudioClick = () => {
    if (!assetRef.current) return;
    const current = assetRef.current;
    if (audioStatus === AudioStatus.PLAY) {
      current.play().then();
      setAudioStatus(AudioStatus.PAUSE);
      return;
    }
    current.pause();
    setAudioStatus(AudioStatus.PLAY);
  };

  if (data.memeType === 'image') {
    return <img src={data.memeUrl} className="h-full w-full object-cover" alt="img" />;
  }
  if (data.memeType === 'audio') {
    return (
      <div className="flex h-full w-full select-none flex-col items-center justify-center">
        <p className="dota__gold text-sm xs:text-xs">{data.memeTitle}</p>
        <div className="activity mt-2 h-[40px] w-[40px] w-[32px] xs:h-[32px]" onClick={onAudioClick}>
          {audioStatusIcon[audioStatus]}
          <audio ref={assetRef} onEnded={() => setAudioStatus(AudioStatus.PLAY)} src={data.memeUrl}></audio>
        </div>
      </div>
    );
  }
  return null;
}

export default function SwiperCard({ data }: { data?: MemeEvaluateItem[] }) {
  const { address } = useAccount();
  const isObserver = useRecoilValue(arcanaObserverAtom);
  const [memeList, setMemeList] = useState<MemeEvaluateItem[]>([]);
  const [swiperItem, setSwiperItem] = useState<MemeEvaluateItem | null>(null);
  const { mutate } = useArcanaMemeEvaluate();

  useEffect(() => {
    if (!data) return;
    setMemeList(data);
    setSwiperItem(data[0]);
  }, [data]);

  const activities = useMemo<{ type: MEME_ICON; checked: string; unchecked: string }[]>(
    () => [
      {
        type: MEME_ICON.LIKE,
        checked: '/img/arcana/statusbar/like_checked.webp',
        unchecked: '/img/arcana/statusbar/like.webp',
      },
      {
        type: MEME_ICON.SMILE,
        checked: '/img/arcana/statusbar/smile_checked.webp',
        unchecked: '/img/arcana/statusbar/smile.webp',
      },
      {
        type: MEME_ICON.CRY,
        checked: '/img/arcana/statusbar/cry_checked.webp',
        unchecked: '/img/arcana/statusbar/cry.webp',
      },
    ],
    [],
  );

  const onMemeClick = useCallback(
    (type: MEME_ICON, item: MemeEvaluateItem | null) => {
      if (!item || !address || isObserver) return;
      setSwiperItem((status) => (status ? { ...status, evaluate: type } : null));
      setMemeList((list) =>
        list.map((i) => {
          if (i.memeCode === item.memeCode) {
            i.evaluate = type;
          }
          return i;
        }),
      );
      mutate({ memeCode: item.memeCode, evaluate: type, walletAddress: address });
    },
    [address, isObserver, mutate],
  );

  return (
    <div className="flex">
      <div className="h-[160px] w-[224px] bg-[url('/img/arcana/statusbar/swiper_card_bg.webp')] bg-cover bg-no-repeat p-2 xs:h-[29.87vw] xs:w-[41.87vw] xs:p-[1.6vw]">
        <div className="h-[100px] w-[210px] xs:h-[18.67vw] xs:w-[39.2vw]">
          <Swiper
            className="h-full w-full"
            loop
            modules={[Autoplay]}
            initialSlide={1}
            longSwipesRatio={0.3}
            longSwipesMs={150}
            autoplay={{ delay: 8000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            onActiveIndexChange={(swiper) => setSwiperItem(memeList[swiper.realIndex])}
          >
            {memeList.map((item) => (
              <SwiperSlide key={item.memeCode}>
                <Card data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2 xs:mt-[1.6vw] xs:gap-[1.6vw]">
          {activities.map((item) => (
            <div
              key={item.type}
              className="activity flex items-center justify-center py-1.5 xs:py-[1vw]"
              onClick={() => onMemeClick(item.type, swiperItem)}
            >
              <img
                className="w-6 xs:w-[4.53vw]"
                src={swiperItem?.evaluate === item.type ? item.checked : item.unchecked}
                alt="activity"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-[84px] bg-[url('/img/arcana/statusbar/right.webp')] bg-cover bg-no-repeat xs:w-[15.73vw]">
        <Dialog render={({ close }) => <InfoDialog close={close} />}>
          <img
            className="activity absolute bottom-[80px] left-[15px] w-[27px] xs:left-[2.67vw] xs:bottom-[15vw] xs:w-[5.33vw]"
            src="/img/arcana/statusbar/info.webp"
            alt="info"
          />
        </Dialog>
        <img
          onClick={() => openLink('https://discord.gg/p12')}
          className="activity absolute bottom-5 left-[15px] w-[27px] xs:left-[2.67vw] xs:bottom-[4vw] xs:w-[5.33vw]"
          src="/img/arcana/statusbar/discord.webp"
          alt="discord"
        />
      </div>
    </div>
  );
}
