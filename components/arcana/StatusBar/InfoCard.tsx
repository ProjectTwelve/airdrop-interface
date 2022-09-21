import dayjs from 'dayjs';
import { ArcanaUserInfo } from '../../../lib/types';

type InfoCardProps = {
  data?: ArcanaUserInfo;
  level: number;
  onLevelClick: () => void;
};

export default function InfoCard({ data, level, onLevelClick }: InfoCardProps) {
  return (
    <div className="relative">
      <div className="absolute left-0 top-0 z-20 h-[160px] w-[78px] xs:h-[29.87vw] xs:w-[14.67vw]">
        <img className="h-full w-full" src="/img/arcana/statusbar/left.webp" alt="left" />
        <p
          className="absolute right-[5px] bottom-[5px] z-10 flex h-[40px] w-[40px] cursor-pointer select-none items-center justify-center text-xl text-[#CCB77E] xs:right-[0.9vw] xs:bottom-[0.9vw] xs:h-[8vw] xs:w-[8vw] xs:text-sm"
          style={{
            textShadow: '0 0 6px rgba(255, 131, 41, 0.75)',
          }}
          onClick={onLevelClick}
        >
          {level}
        </p>
      </div>
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
