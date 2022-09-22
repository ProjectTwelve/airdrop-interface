import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import Tag from '../tag';
import classNames from 'classnames';

export type ProgressItem = {
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

function ProgressCard({ data, timestamp }: { data: ProgressItem; timestamp?: number }) {
  const statusType = useMemo<PROGRESS_STATUS>(() => {
    if (!timestamp || timestamp < data.startTime) return PROGRESS_STATUS.UPCOMING;
    if (timestamp > data.endTime) return PROGRESS_STATUS.COMPLETED;
    return PROGRESS_STATUS.ONGOING;
  }, [data.endTime, data.startTime, timestamp]);

  return (
    <div className="rounded-xl border-2 border-[#FFFFFF29] backdrop-blur-lg">
      <img src={data.cover} alt="cover" className={statusType === PROGRESS_STATUS.UPCOMING ? 'grayscale' : ''} />
      <div className="p-6">
        <div className="flex items-center justify-between">
          <p
            className={classNames(
              'text-xl font-medium md:text-base xl:text-lg xs:text-sm',
              statusType === PROGRESS_STATUS.UPCOMING ? 'text-p12-darkgray' : 'text-p12-gold',
            )}
          >
            {data.part}
          </p>
          {statusType === PROGRESS_STATUS.ONGOING && <Tag type="green" size="small" value="LIVE" />}
        </div>
        <p
          className={classNames(
            'text-xl font-medium md:text-base xl:text-lg xs:text-sm',
            statusType === PROGRESS_STATUS.UPCOMING ? 'text-p12-darkgray' : 'text-p12-gold',
          )}
        >
          {data.title}
        </p>
        <p className={classNames('mt-2 text-sm', statusType === PROGRESS_STATUS.UPCOMING && 'text-p12-darkgray')}>
          {dayjs(data.startTime).format('MMM D')} - {dayjs(data.endTime).format('MMM D')}
        </p>
      </div>
    </div>
  );
}

export default function ArcanaProgress({ list }: { list: ProgressItem[] }) {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>();

  const isInPart3 = useMemo(() => {
    if (!currentTimestamp) return false;
    return currentTimestamp > list[2].startTime && currentTimestamp < list[2].endTime;
  }, [currentTimestamp, list]);

  useEffect(() => {
    setCurrentTimestamp(Date.now());
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 bg-black/30 md:grid-cols-2 md:gap-2">
        {list.map((item) => (
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
