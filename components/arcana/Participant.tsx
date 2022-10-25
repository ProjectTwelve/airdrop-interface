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
    <div
      className="h-[102px] w-[313px] rounded-[10px] border border-[#EB6A55] lg:max-w-[30%] xl:max-w-[40%]"
      style={{ background: 'linear-gradient(0deg, #98322D 0%, #C84435 50.51%, #E85136 100%)' }}
    >
      <div className="mt-5 ml-5">
        <div className="flex items-center">
          <p className="dota__gold text-sm font-medium">Participants</p>
          <p className="dota__gold flex-1 text-center font-ddin text-2xl font-bold leading-6 text-p12-success">
            {numberFormat.format(count ?? 0)}
          </p>
        </div>
        <div className="mt-3 flex items-center">
          <p className="dota__gold flex-none text-sm font-medium">Prize Pool</p>
          <div className="dota__gold flex flex-1 items-center justify-center text-center font-ddin text-[30px] font-bold leading-[30px]">
            ${current.prize}
          </div>
        </div>
      </div>
    </div>
  );
}
