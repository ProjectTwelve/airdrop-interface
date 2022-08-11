import ReactGA from 'react-ga4';
export type CollabTaskItemProps = {
  key: string;
  title: string;
  icon?: JSX.Element;
  content: string | JSX.Element;
  href?: string;
  hrefLabel?: string;
  gaKey?: string;
};

export default function CollabTaskItem({
  title,
  icon,
  content,
  href,
  hrefLabel,
  gaKey,
  children,
}: React.PropsWithChildren<CollabTaskItemProps>) {
  return (
    <div className="flex flex-col justify-between gap-6 rounded-2xl bg-p12-black/80 p-7">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          {icon && <div>{icon}</div>}
          <h2 className="text-[22px] font-semibold leading-6">{title}</h2>
        </div>
        <div className="flex flex-wrap gap-1 leading-7">{content}</div>
      </div>
      {href ? (
        <div className="flex cursor-pointer items-center gap-2 border-t border-p12-line pt-6">
          <a
            className="font-semibold leading-5 text-[#43BBFF]"
            href={href}
            onClick={() => (gaKey ? ReactGA.event({ category: 'Collab-Item', action: 'Click', label: gaKey }) : null)}
          >
            {hrefLabel}
          </a>
          <img src="/svg/more.svg" className="aspect-square h-4" alt="more.svg" />
        </div>
      ) : null}
      {children}
    </div>
  );
}
