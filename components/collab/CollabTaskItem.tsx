import classNames from 'classnames';
import ReactGA from 'react-ga4';

export type CollabTaskItemProps = {
  key: string;
  title: string;
  target?: string;
  icon?: JSX.Element;
  content: string | JSX.Element;
  href?: string;
  hrefLabel?: string; // success
  errorLabel?: string | JSX.Element; // error
  gaKey?: string;
  className?: string;
};

export default function CollabTaskItem({
  title,
  icon,
  content,
  href,
  hrefLabel,
  errorLabel,
  gaKey,
  target,
  children,
  className,
}: React.PropsWithChildren<CollabTaskItemProps>) {
  const generateLabel = () => {
    if (errorLabel) {
      return (
        <div className="w-full border-t border-p12-line pt-4">
          <div className="rounded-lg bg-[#FF3768]/20 px-4 py-2 text-sm font-medium leading-5 text-[#F13361]">{errorLabel}</div>
        </div>
      );
    }
    if (!href || !hrefLabel) return null;
    return (
      <div className="flex cursor-pointer items-center gap-2 border-t border-p12-line pt-6">
        <a
          className="font-semibold leading-5 text-[#43BBFF]"
          href={href}
          target={target}
          onClick={() =>
            gaKey
              ? ReactGA.event({
                  category: 'Collab-Item',
                  action: 'Click',
                  label: gaKey,
                })
              : null
          }
        >
          {hrefLabel}
        </a>
        <img src="/svg/more.svg" className="aspect-square h-4" alt="more.svg" />
      </div>
    );
  };
  return (
    <div className={classNames('flex flex-col justify-between gap-5 rounded-2xl bg-p12-black/80 p-7', className)}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          {icon && <div>{icon}</div>}
          <h2 className="text-xl font-semibold leading-6">{title}</h2>
        </div>
        <div className="flex flex-wrap gap-1 text-sm leading-7">{content}</div>
      </div>
      {generateLabel()}
      {children}
    </div>
  );
}
