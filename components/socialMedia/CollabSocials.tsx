import classNames from 'classnames';

type CollabSocialsProps = {
  href?: string; // url
  icon: string | JSX.Element;
  label?: string; // label for the link
  className?: string;
  onClick?: () => void;
};

export function SocialsLabel({ label, icon, className, onClick }: CollabSocialsProps) {
  return (
    <span
      onClick={onClick}
      className={classNames(
        'flex max-h-6 cursor-pointer items-center gap-1 rounded-full bg-[#4383FF]/20 bg-opacity-20 px-3 py-1 leading-4',
        className,
      )}
    >
      {typeof icon === 'string' ? <img src={icon} className="h-4 w-4" alt={label || 'icon'}></img> : icon}
      {label && <span className="text-xs">{label}</span>}
    </span>
  );
}

export function CollabSocials({ href, ...args }: CollabSocialsProps) {
  return (
    <>
      {href ? (
        <a href={href} target="_blank">
          <SocialsLabel {...args} />
        </a>
      ) : (
        <SocialsLabel {...args} />
      )}
    </>
  );
}
