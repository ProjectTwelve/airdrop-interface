import classNames from 'classnames';
import { ReactNode } from 'react';

type ActivityTabProps = {
  title: string;
  score: number | string | ReactNode;
  active?: boolean;
  onClick?: () => void;
};
export default function ActivityTab({ title, score, active, onClick }: ActivityTabProps) {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div
        className={classNames(
          'text-center font-semibold group-hover:text-white',
          active ? 'text-base/5 text-white' : 'text-sm/5 text-gray-400',
        )}
      >
        {title}
      </div>
      <div
        className={classNames(
          'group-hover:text-gradient-yellow flex-center mt-2 gap-2 text-center text-[34px]/10 font-bold text-gray-400',
          active ? 'text-gradient-yellow' : 'text-gray-400',
        )}
      >
        {score}
      </div>
    </div>
  );
}
