import classNames from 'classnames';

export type CollabTimeLimeItemProps = {
  startTime: string;
  endTime?: string;
  label: string;
  type: 'open' | 'close' | 'normal';
};

export function CollabTimeLineItem({ startTime, endTime, type, label }: CollabTimeLimeItemProps) {
  return (
    <div
      className={classNames(
        'flex h-[72px] basis-1/5 flex-col items-center justify-center p-7 text-base leading-[22px] md:bg-gray-800/80',
        { 'bg-collab-time-start md:bg-none': type === 'open' },
        { 'bg-collab-time-end -ml-4  md:ml-0 md:bg-none': type === 'close' },
        { 'bg-collab-timing -ml-4 md:ml-0 md:bg-none': type === 'normal' },
      )}
    >
      <div className="text-[#1BD386] text-sm">
        {startTime}
        {type !== 'close' && ` - ${endTime}`}
      </div>
      <div className="text-sm">{label}</div>
    </div>
  );
}

CollabTimeLineItem.defaultProps = {
  type: 'normal',
};
export type CollabTimeLimeProps = {
  timeComingSoon: string;
  timeJoin: string;
  timeAllocation: string;
  timeClaim: string;
  timeClose: string;
  [key: string]: string;
};

export function CollabTimeLime({ timeComingSoon, timeJoin, timeAllocation, timeClaim, timeClose }: CollabTimeLimeProps) {
  return (
    <div className="grid grid-cols-5 md:grid-cols-1 md:gap-3">
      <CollabTimeLineItem key="timeComingSoon" startTime={timeComingSoon} endTime={timeJoin} type="open" label="Coming Soon" />
      <CollabTimeLineItem key="timeJoin" startTime={timeJoin} endTime={timeAllocation} label="Join" />
      <CollabTimeLineItem key="timeAllocation" startTime={timeAllocation} endTime={timeClaim} label="Allocation" />
      <CollabTimeLineItem key="timeClaim" startTime={timeClaim} endTime={timeClose} label="Claim" />
      <CollabTimeLineItem key="timeClose" startTime={timeClose} type="close" label="Close" />
    </div>
  );
}
