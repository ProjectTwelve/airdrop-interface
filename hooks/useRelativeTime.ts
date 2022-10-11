import { useEffect, useMemo, useState } from 'react';
import { useInterval } from 'react-use';
import dayjs, { Dayjs } from 'dayjs';

function getTimeState(time?: Dayjs): string {
  if (!time) return '0d0h0m0s';
  const diff = time.diff(dayjs(), 'second');
  const d = Math.floor(diff / (60 * 60 * 24));
  const h = Math.floor((diff - d * 24 * 60 * 60) / (60 * 60));
  const m = Math.floor((diff - d * 24 * 60 * 60 - h * 60 * 60) / 60);
  const s = Math.floor(diff - d * 24 * 60 * 60 - h * 60 * 60 - m * 60);
  return `${d}d${h}h${m}m${s}s`;
}

export const useRelativeTime = (timestamp?: number) => {
  const [time, setTime] = useState<Dayjs>();
  const [state, setState] = useState<string>();
  useEffect(() => {
    if (!timestamp) return;
    setTime(dayjs.unix(timestamp));
  }, [timestamp]);
  useInterval(() => setState(getTimeState(time)), timestamp ? 1000 : null);
  return useMemo(() => state ?? getTimeState(time), [state, time]);
};
