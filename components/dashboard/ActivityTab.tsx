import classNames from 'classnames';

type ActivityTabProps = {
  title: string;
  score: string;
  active?: boolean;
  onClick?: () => void;
};
export default function ActivityTab({ title, score, active, onClick }: ActivityTabProps) {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div
        className={classNames(
          'text-center font-semibold group-hover:text-white',
          active ? 'text-[26px]/6.5 text-white' : 'text-xl/6.5 text-gray-400',
        )}
      >
        {title}
      </div>
      <div
        className={classNames(
          'group-hover:text-gradient-yellow mt-4 text-center font-bold text-gray-400',
          active ? 'text-gradient-yellow text-5xl/12' : 'text-[34px]/12 text-gray-400',
        )}
      >
        {score}
      </div>
    </div>
  );
}
