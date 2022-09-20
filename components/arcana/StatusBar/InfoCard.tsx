import dayjs from 'dayjs';
import { ArcanaUserInfo } from '../../../lib/types';

export default function InfoCard({ data }: { data?: ArcanaUserInfo }) {
  return (
    <div className="relative">
      <img
        className="absolute left-0 top-0 z-10 h-[160px] w-[78px] xs:h-[29.87vw] xs:w-[14.67vw]"
        src="/img/arcana/statusbar/left.webp"
        alt="left"
      />
      <div className="relative ml-[53px] h-[160px] w-[175px] bg-gray-400 xs:ml-[9.87vw] xs:h-[29.87vw] xs:w-[32.5vw]">
        <img className="absolute top-0 left-0 z-10 h-full w-full" src="/img/arcana/statusbar/mask.webp" alt="mask" />
        {data?.avatarFull && <img className="absolute top-0 left-0" src={data.avatarFull} alt="avatar" />}
        <p className="relative z-20 pt-2 text-center text-p12-gold xs:text-xs">{data?.personName || '--'}</p>
        <div className="absolute bottom-0 right-2 z-20">
          <p className="mb-1 flex items-center justify-end text-sm xs:mb-0 xs:text-[10px]">
            {data?.level || 0} <img className="ml-0.5 xs:w-3" src="/img/arcana/statusbar/level.svg" alt="level" />
          </p>
          <p className="mb-1 flex items-center justify-end text-sm xs:mb-0 xs:text-[10px]">
            {data?.timeCreated ? dayjs.unix(data.timeCreated).format('YYYY') : '--'}{' '}
            <img className="ml-0.5 xs:w-3" src="/img/arcana/statusbar/year.svg" alt="year" />
          </p>
          <p className="mb-1 flex items-center justify-end text-sm xs:mb-0 xs:text-[10px]">
            {data?.friendsCount || 0} <img className="ml-0.5 xs:w-3" src="/img/arcana/statusbar/friend.svg" alt="friend" />
          </p>
          <p className="mb-1 flex items-center justify-end text-sm xs:mb-0 xs:text-[10px]">
            {data?.badgesCount || 0} <img className="ml-0.5 xs:w-3" src="/img/arcana/statusbar/badge.svg" alt="badge" />
          </p>
        </div>
      </div>
    </div>
  );
}
