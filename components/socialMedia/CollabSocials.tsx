import classNames from 'classnames';

type CollabSocialsProps = {
  href?: string; // url
  icon: string;
  label?: string; // label for the link
  className?: string;
  onClick?: () => void;
};

export function SocialsLabel({ label, icon, className, onClick }: CollabSocialsProps) {
  return (
    <span
      onClick={onClick}
      className={classNames(
        'flex cursor-pointer items-center gap-1 rounded-full bg-[#4383FF]/20 bg-opacity-20 px-3 py-1',
        className,
      )}
    >
      <img src={icon} className="h-4 w-4" alt={label || 'icon'}></img>
      {label && <span className="text-xs">{label}</span>}
    </span>
  );
}

export function CollabSocials({ href, ...args }: CollabSocialsProps) {
  return (
    <>
      {href ? (
        <a href={href}>
          <SocialsLabel {...args} />
        </a>
      ) : (
        <SocialsLabel {...args} />
      )}
    </>
  );
}
