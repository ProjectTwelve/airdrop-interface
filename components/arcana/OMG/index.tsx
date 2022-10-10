import { useRelativeTime } from '../../../hooks/useRelativeTime';
import OMGPrediction from './OMGPrediction';
import OMGTopVotes from './OMGTopVotes';
import OMGLuckyDraw from './OMGLuckyDraw';

export default function OMG() {
  const timestamp = 1666451600000;
  const relativeTime = useRelativeTime(timestamp);
  const isSubmit = true;

  return (
    <div className="rounded-xl border border-white/20 bg-black/30 p-7 backdrop-blur-lg">
      <div className="flex items-center justify-between gap-2 xs:flex-col xs:items-start">
        <div>
          <h2 className="text-[40px] font-medium">OMG</h2>
          <p className="text-sm">Simple predictions, independent jackpots, early draws!</p>
        </div>
        <div className="text-xl font-medium">
          Drop Time <span className="font-ddin text-[30px] font-bold text-p12-gold">{relativeTime}</span>
        </div>
      </div>
      <div className="mt-12 mb-10">
        {!isSubmit ? (
          <div className="flex items-center justify-center">
            <OMGPrediction />
          </div>
        ) : (
          <div>
            <p className="text-center text-[30px] font-medium leading-[36px] text-p12-success">Correct Answer!</p>
            <p className="text-center text-xl font-medium leading-[22px]">You have the chance to win the following rewards.</p>
            <div className="mt-8 flex items-stretch justify-between md:flex-col gap-4">
              <OMGPrediction />
              <OMGTopVotes />
              <OMGLuckyDraw />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
