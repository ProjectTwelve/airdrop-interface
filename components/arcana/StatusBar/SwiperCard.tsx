import React, { useMemo, useState } from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import { openLink } from '../../../utils';

enum MEME_ICON {
  LIKE,
  SMILE,
  CRY,
}

function Card({ name }: { name: string }) {
  return <div className="h-[100px] w-[210px] text-center leading-[100px]">{name}</div>;
}

export default function SwiperCard() {
  const [checked, setChecked] = useState<MEME_ICON>();

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

  return (
    <div className="flex">
      <div className="h-[160px] w-[224px] bg-[url('/img/arcana/statusbar/swiper_card_bg.webp')] bg-cover bg-no-repeat py-2 px-2">
        <div>
          <Swiper loop modules={[Autoplay]} autoplay={{ delay: 8000, disableOnInteraction: false }}>
            <SwiperSlide>
              <Card name="Card 1" />
            </SwiperSlide>
            <SwiperSlide>
              <Card name="Card 2" />
            </SwiperSlide>
            <SwiperSlide>
              <Card name="Card 3" />
            </SwiperSlide>
            <SwiperSlide>
              <Card name="Card 4" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {activities.map((item) => (
            <div
              key={item.type}
              className="activity flex items-center justify-center py-1.5"
              onClick={() => setChecked(item.type)}
            >
              <img width={24} src={checked === item.type ? item.checked : item.unchecked} alt="activity" />
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-[84px] bg-[url('/img/arcana/statusbar/right.webp')] bg-cover bg-no-repeat">
        <img
          width={27}
          className="activity absolute bottom-[80px] left-[15px]"
          src="/img/arcana/statusbar/info.webp"
          alt="info"
        />
        <img
          width={27}
          onClick={() => openLink('https://discord.gg/p12')}
          className="activity absolute bottom-5 left-[15px]"
          src="/img/arcana/statusbar/discord.webp"
          alt="discord"
        />
      </div>
    </div>
  );
}
