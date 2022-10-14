import { useEffect, useState } from 'react';
import { useArcanaDistinctAddressCount } from '../../hooks/arcana';

const participantProgress = [
  { prize: '20,000', participants: 30000, nextUnlock: '30K to Unlock' },
  { prize: '30,000', participants: 60000, nextUnlock: '60K to Unlock' },
  { prize: '55,000', participants: 150000, nextUnlock: '150K to Unlock' },
  { prize: '70,000', participants: 300000, nextUnlock: '300K to Unlock' },
  { prize: '100,000', participants: Infinity, nextUnlock: '' },
];

export default function Participant() {
  const { data: count } = useArcanaDistinctAddressCount();
  const [numberFormat] = useState(new Intl.NumberFormat());
  const [current, setCurrent] = useState({ prize: '20,000', participants: 30000, nextUnlock: '30K to Unlock' });

  useEffect(() => {
    setCurrent((status) => {
      if (count === undefined) return status;
      let item: any = status;
      for (let i = 0; i < participantProgress.length; i++) {
        if (count < participantProgress[i].participants) {
          item = participantProgress[i];
          break;
        }
      }
      return item;
    });
  }, [count]);

  return (
    <div className="max-w-[600px] overflow-x-scroll">
      <div className="relative flex w-[600px] bg-black/30">
        <div className="z-10 h-[120px] w-[289px] bg-[url('/img/arcana/participant_now.svg')]">
          <div className="mt-5 ml-5">
            <div className="flex items-center">
              <p className="font-medium text-p12-gold">Participants</p>
              <p className="dota__gold flex-1 text-center font-ddin text-[30px] font-bold leading-[30px] text-p12-success">
                {numberFormat.format(count ?? 0)}
              </p>
            </div>
            <div className="mt-3 flex items-center">
              <p className="flex-none font-medium text-p12-gold">Prize Pool</p>
              <div className="dota__gold flex flex-1 items-center justify-center text-center font-ddin text-[36px] font-bold leading-[36px]">
                ${current.prize}
              </div>
            </div>
          </div>
        </div>
        <div className="-ml-[26px] h-[120px] w-[268px] bg-participant-1 bg-cover backdrop-blur">
          <p className="mt-5 text-center font-ddin text-xl font-bold leading-[30px] text-p12-darkgray">{current.nextUnlock}</p>
          <div className="mt-3 flex items-center justify-center text-center font-ddin text-[36px] font-bold leading-[36px] text-p12-darkgray">
            ?,???
          </div>
        </div>
        <div className="z-20 -ml-[26px] h-[120px] w-[95px] bg-participant-2 bg-cover" />
        <div className="absolute right-0 top-0 z-20 -ml-[26px] h-[120px] w-[95px] bg-participant-2 bg-cover" />
        <div className="absolute right-0 top-0 z-20 -ml-[26px] h-[120px] w-[95px] bg-participant-2 bg-cover" />
      </div>
    </div>
  );
}
