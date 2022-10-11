import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import Tag from '../tag';
import { useIsMounted } from '../../hooks/useIsMounted';

type ProgressItem = {
  cover: string;
  title: string;
  part: string;
  startTime: number;
  endTime: number;
};

enum PROGRESS_STATUS {
  UPCOMING,
  ONGOING,
  COMPLETED,
}

const progressList: ProgressItem[] = [
  {
    cover: '/img/arcana/part1.webp',
    title: 'TI11 Final Ticket Giveaway',
    part: 'PART I',
    startTime: 1663171200000,
    endTime: 1664553599000,
  },
  {
    cover: '/img/arcana/part2.webp',
    title: 'P12 Arcana @ TI11',
    part: 'PART II',
    startTime: 1664553600000,
    endTime: 1666969200000,
  },
  {
    cover: '/img/arcana/part3.webp',
    title: 'TI11 Main Event',
    part: 'PART III',
    startTime: 1666195200000,
    endTime: 1667231999000,
  },
  {
    cover: '/img/arcana/part4.webp',
    title: 'Treasures Drop',
    part: 'PART IV',
    startTime: 1667232000000,
    endTime: 1667836799000,
  },
];

function ProgressCard({ data, timestamp }: { data: ProgressItem; timestamp?: number }) {
  const [statusType, setStatusType] = useState<PROGRESS_STATUS>(PROGRESS_STATUS.UPCOMING);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!timestamp || timestamp < data.startTime) {
      setStatusType(PROGRESS_STATUS.UPCOMING);
      return;
    }
    if (timestamp > data.endTime) {
      setStatusType(PROGRESS_STATUS.COMPLETED);
      return;
    }
    setStatusType(PROGRESS_STATUS.ONGOING);
  }, [data.endTime, data.startTime, timestamp]);

  return (
    <div className="overflow-hidden rounded-xl border-2 border-[#FFFFFF29] backdrop-blur-lg">
      <div className="h-[148px]">
        <img
          src={data.cover}
          alt="cover"
          className={classNames(
            'h-full w-full object-cover object-bottom',
            statusType === PROGRESS_STATUS.UPCOMING ? 'grayscale' : '',
          )}
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p
            className={classNames(
              'font-medium xl:text-lg xs:text-sm',
              statusType === PROGRESS_STATUS.UPCOMING ? 'text-p12-darkgray' : 'text-p12-gold',
            )}
          >
            {data.part}
          </p>
          {statusType === PROGRESS_STATUS.ONGOING && <Tag type="green" size="small" value="LIVE" />}
        </div>
        <p
          className={classNames(
            'font-medium xl:text-lg xs:text-sm',
            statusType === PROGRESS_STATUS.UPCOMING ? 'text-p12-darkgray' : 'text-p12-gold',
          )}
        >
          {data.title}
        </p>
        <p className={classNames('mt-2 text-sm', statusType === PROGRESS_STATUS.UPCOMING && 'text-p12-darkgray')}>
          {isMounted && dayjs(data.startTime).format('MMM D')} - {isMounted && dayjs(data.endTime).format('MMM D')}
        </p>
      </div>
    </div>
  );
}

export default function ArcanaProgress() {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(0);
  const [isInPart3, setIsInPart3] = useState<boolean>(false);

  useEffect(() => {
    setCurrentTimestamp(Date.now());
  }, []);

  useEffect(() => {
    if (!currentTimestamp) return;
    setIsInPart3(currentTimestamp > progressList[2].startTime && currentTimestamp < progressList[2].endTime);
  }, [currentTimestamp]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 bg-black/30 md:grid-cols-2 md:gap-2">
        {progressList.map((item) => (
          <ProgressCard timestamp={currentTimestamp} key={item.title} data={item} />
        ))}
      </div>
      {isInPart3 && (
        <div className="dota__box mt-5 py-4 text-center text-sm">
          The TI11 MAIN EVENT begins. Join P12 Discord&nbsp;&nbsp;
          <a href="https://discord.gg/p12" target="_blank">
            <img className="inline h-5 w-5" src="/img/discord.png" width={20} height={20} alt="discord" />
          </a>
          &nbsp;&nbsp;tune into the biggest esports tournament of the year!
        </div>
      )}
    </div>
  );
}
