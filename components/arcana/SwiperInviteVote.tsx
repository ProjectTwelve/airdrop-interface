import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useArcanaRecentInvitation } from '../../hooks/arcana';
import { RecentInvitationItem } from '../../lib/types';

function SwiperInviteVoteItem({ data }: { data: RecentInvitationItem }) {
  return (
    <div className="flex h-[30px] items-center justify-start">
      <div className="h-[24px] w-[24px] overflow-hidden rounded bg-gray-300">
        <img width={24} height={24} src={data.invitorAvatar} alt="avatar" />
      </div>
      <p className="ml-2 max-w-[120px] truncate text-sm font-medium">{data.invitorName}</p>
      <p className="mx-3 text-sm">invited</p>
      <div className="h-[24px] w-[24px] overflow-hidden rounded bg-gray-300">
        <img width={24} height={24} src={data.inviteeAvatar} alt="avatar" />
      </div>
      <p className="ml-2 max-w-[120px] truncate text-sm font-medium">{data.inviteeName}</p>&nbsp;,
      <p className="ml-2 text-sm">
        get
        <span className="dota__yellow font-medium">
          &nbsp;{data.votes}&nbsp;
          {data.votes > 1 ? 'Votes' : 'Vote'}.
        </span>
      </p>
    </div>
  );
}

export default function SwiperInviteVote() {
  const { data } = useArcanaRecentInvitation();
  return (
    <div className="h-[30px]">
      <Swiper
        className="h-full"
        simulateTouch={false}
        speed={800}
        autoplay={{ delay: 6000 }}
        direction="vertical"
        loop
        modules={[Autoplay]}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <SwiperInviteVoteItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
