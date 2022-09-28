import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

export default function ArcanaJoinButton() {
  const [title, setTitle] = useState<string>('P12 Arcana @ TI11');
  const [progress, setProgress] = useState<string>('10/1 - 10/19');

  const progressList = useMemo(
    () => [
      {
        title: 'TI11 Final Ticket Giveaway',
        startTime: 1663171200000,
        endTime: 1664553599000,
      },
      {
        title: 'P12 Arcana @ TI11',
        startTime: 1664553600000,
        endTime: 1666195199000,
      },
      {
        title: 'TI11 Main Event',
        startTime: 1666195200000,
        endTime: 1667231999000,
      },
      {
        title: 'Treasures Drop',
        startTime: 1667232000000,
        endTime: 1667836799000,
      },
    ],
    [],
  );

  useEffect(() => {
    const now = Date.now();
    progressList.map((item) => {
      if (now > item.startTime && now < item.endTime) {
        setTitle(item.title);
        setProgress(`${dayjs(item.startTime).format('MM/DD')} - ${dayjs(item.endTime).format('MM/DD')}`);
      }
    });
  }, [progressList]);

  return (
    <div>
      <p className="text-lg font-medium text-p12-gold">{title}</p>
      <div className="mt-3 flex">
        <p className="h-[26px] bg-[#7A3E1A] px-2 text-center text-sm leading-6" style={{ boxShadow: 'inset 0 0 12px #220F04' }}>
          In progress
        </p>
        <p
          className="h-[26px] bg-[#952E2F] px-4 text-center font-ddin text-sm font-bold leading-6"
          style={{ textShadow: '0 0 4px rgba(0, 0, 0, 0.5)' }}
        >
          {progress}
        </p>
      </div>
    </div>
  );
}
